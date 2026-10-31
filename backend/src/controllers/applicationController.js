const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Application = require('../models/Application');
const Job = require('../models/Job');
const { STATUSES, INTERVIEW_ROUNDS, INTERVIEW_MODES, INTERVIEW_OUTCOMES } = require('../models/Application');
const { escapeRegex, csvCell } = require('../utils/http');
const { notifyApplication } = require('../utils/mailer');

const RESUME_ROOT = path.resolve('uploads', 'resumes');
const DOC_ROOT = path.resolve('uploads', 'documents');

const DOCUMENTS = {
    resume: { pathKey: 'resumePath', nameKey: 'resumeName', root: RESUME_ROOT, label: 'resume' },
    degree: { pathKey: 'degreePath', nameKey: 'degreeName', root: DOC_ROOT, label: 'degree' },
    masters: { pathKey: 'mastersPath', nameKey: 'mastersName', root: DOC_ROOT, label: 'masters' },
    engineering: { pathKey: 'engineeringPath', nameKey: 'engineeringName', root: DOC_ROOT, label: 'engineering' },
    salary: { pathKey: 'salarySlipPath', nameKey: 'salarySlipName', root: DOC_ROOT, label: 'salary-slip' },
};

const NEEDS_FIELD = new Set(["Diploma", "Bachelor's Degree", "Master's Degree", "Doctorate (PhD)", 'Other']);
const NEEDS_MASTERS = new Set(["Master's Degree", 'Doctorate (PhD)']);

const makeRef = () => {
    const day = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `KGA-${day}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
};

const removeUpload = (file) => {
    if (file?.path) fs.promises.unlink(file.path).catch(() => {});
};

const uploadedFiles = (req) => Object.values(req.files || {}).flat().filter(Boolean);

const removeUploads = (req) => uploadedFiles(req).forEach(removeUpload);

const fileOf = (req, field) => req.files?.[field]?.[0] || null;

const text = (value, max) => String(value || '').trim().slice(0, max);

const urlOrEmpty = (value, label) => {
    const v = text(value, 300);
    if (!v) return '';
    let parsed;
    try {
        parsed = new URL(v);
    } catch {
        throw new Error(`Enter a valid ${label} link, including https://`);
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        throw new Error(`Enter a valid ${label} link, including https://`);
    }
    return v;
};

const ageOn = (dob) => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const month = today.getMonth() - dob.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) age -= 1;
    return age;
};

// @route   POST /api/applications
// @access  Public
const storedFile = (file) => (file ? {
    path: path.relative(process.cwd(), file.path),
    name: file.originalname,
} : null);

const submitApplication = async (req, res) => {
    const body = req.body || {};
    if (body.website) {
        removeUploads(req);
        return res.status(201).json({ success: true, message: 'Application submitted successfully' });
    }

    const resume = fileOf(req, 'resume');
    const degree = fileOf(req, 'degreeCertificate');
    const masters = fileOf(req, 'mastersCertificate');
    const engineering = fileOf(req, 'engineeringCertificate');
    const salary = fileOf(req, 'salarySlip');

    try {
        if (!resume) throw new Error('Resume file is required');

        const qualification = text(body.qualification, 120);
        const fieldOfStudy = text(body.fieldOfStudy, 80);
        const candidateType = text(body.candidateType, 30);
        const experienced = candidateType === 'Experienced';

        if (NEEDS_FIELD.has(qualification) && !fieldOfStudy) throw new Error('Please select your field of study');
        if (experienced && !text(body.noticePeriod, 40)) throw new Error('Please select your notice period');
        if (experienced && !text(body.expectedCtc, 60)) throw new Error('Please enter your expected pay');
        if (experienced && !text(body.currentCompany, 120)) throw new Error('Please enter your current or last company');

        const dob = body.dateOfBirth ? new Date(body.dateOfBirth) : null;
        if (!dob || Number.isNaN(dob.getTime())) throw new Error('Please enter your date of birth');
        const age = ageOn(dob);
        if (age < 16 || age > 80) throw new Error('Please enter a valid date of birth');

        const country = text(body.country, 80);
        const state = text(body.state, 80);
        const city = text(body.city, 80);
        if (!country || !state || !city) throw new Error('Please complete your country, state, and city');
        if (!text(body.gender, 20)) throw new Error('Please select your gender');
        if (!['Fresher', 'Experienced'].includes(candidateType)) throw new Error('Please select fresher or experienced');
        if (!/^[0-9]{7,15}$/.test(text(body.phone, 30))) throw new Error('Enter a valid phone number');

        let job = null;
        if (body.jobId) {
            if (!mongoose.isValidObjectId(body.jobId)) throw new Error('This opening is no longer available');
            job = await Job.findOne({ _id: body.jobId, status: 'published' });
            const now = new Date();
            if (!job || (job.closesAt && job.closesAt < now) || (job.publishAt && job.publishAt > now)) {
                throw new Error('This opening is no longer available');
            }
        }

        const jobDocuments = Array.isArray(job?.requiredDocuments) ? job.requiredDocuments : null;
        if (jobDocuments) {
            const uploaded = { degree, masters, engineering, salary };
            const labels = {
                degree: 'qualification certificate',
                masters: "master's degree certificate",
                engineering: 'engineering degree certificate',
                salary: 'salary slip from your last company',
            };
            jobDocuments.forEach((key) => {
                if (!uploaded[key]) throw new Error(`Please upload your ${labels[key]}`);
            });
        } else {
            if (!degree) throw new Error('Please upload your qualification certificate');
            if (NEEDS_MASTERS.has(qualification) && !masters) throw new Error("Please upload your master's degree certificate");
            if (fieldOfStudy === 'Engineering' && !engineering) throw new Error('Please upload your engineering degree certificate');
            if (experienced && !salary) throw new Error('Please upload the salary slip from your last company');
        }

        const resumeFile = storedFile(resume);
        const degreeFile = storedFile(degree);
        const mastersFile = storedFile(masters);
        const engineeringFile = storedFile(engineering);
        const salaryFile = storedFile(salary);
        const payload = {
            firstName: text(body.firstName, 60),
            middleName: text(body.middleName, 60),
            lastName: text(body.lastName, 60),
            dateOfBirth: dob,
            email: text(body.email, 160),
            phone: text(body.phone, 30),
            countryCode: text(body.countryCode, 6) || '+91',
            country,
            state,
            city,
            location: [city, state, country].filter(Boolean).join(', '),
            qualification,
            fieldOfStudy,
            specialization: text(body.specialization, 120),
            experience: text(body.experience, 60),
            position: job ? `${job.title} (${job.location})` : text(body.position, 160),
            job: job?._id,
            board: job?.board || (body.board === 'hr' ? 'hr' : 'careers'),
            gender: text(body.gender, 20),
            candidateType,
            currentCompany: text(body.currentCompany, 120),
            expectedCtc: text(body.expectedCtc, 60),
            noticePeriod: text(body.noticePeriod, 40),
            linkedinUrl: urlOrEmpty(body.linkedinUrl, 'LinkedIn'),
            githubUrl: urlOrEmpty(body.githubUrl, 'GitHub'),
            portfolioUrl: urlOrEmpty(body.portfolioUrl, 'portfolio'),
            message: text(body.message, 5000),
            resumePath: resumeFile.path,
            resumeName: resumeFile.name,
            degreePath: degreeFile?.path,
            degreeName: degreeFile?.name,
            mastersPath: mastersFile?.path,
            mastersName: mastersFile?.name,
            engineeringPath: engineeringFile?.path,
            engineeringName: engineeringFile?.name,
            salarySlipPath: salaryFile?.path,
            salarySlipName: salaryFile?.name,
            consent: body.consent === 'true' || body.consent === true,
        };

        let application;
        for (let attempt = 0; attempt < 3; attempt += 1) {
            try {
                application = await Application.create({ ...payload, applicationRef: makeRef() });
                break;
            } catch (err) {
                if (err?.code !== 11000 || attempt === 2) throw err;
            }
        }

        const brand = application.board === 'hr' ? 'KAM Global' : 'KAM Global AI';
        notifyApplication({ application, resumeFile: resume, brand }).catch((err) => console.error('Email sending failed:', err.message));

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            reference: application.applicationRef,
        });
    } catch (error) {
        removeUploads(req);
        res.status(400).json({ success: false, error: error.message || 'Failed to submit application' });
    }
};

const buildFilter = (query) => {
    const filter = {};
    if (STATUSES.includes(query.status)) filter.status = query.status;
    if (['hr', 'careers'].includes(query.board)) filter.board = query.board;
    if (query.job && mongoose.isValidObjectId(query.job)) filter.job = query.job;
    if (query.q) {
        const re = new RegExp(escapeRegex(String(query.q).slice(0, 80)), 'i');
        filter.$or = [
            { firstName: re }, { middleName: re }, { lastName: re }, { email: re }, { phone: re },
            { position: re }, { location: re }, { applicationRef: re },
        ];
    }
    return filter;
};

// @route   GET /api/admin/applications
const getApplications = async (req, res) => {
    const filter = buildFilter(req.query);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25));
    const page = Math.max(1, Number(req.query.page) || 1);
    const [total, items] = await Promise.all([
        Application.countDocuments(filter),
        Application.find(filter).sort({ appliedAt: -1 }).skip((page - 1) * limit).limit(limit).select('-notes'),
    ]);
    res.json({ success: true, total, page, pages: Math.max(1, Math.ceil(total / limit)), data: items });
};

// @route   GET /api/admin/applications/:id
const getApplication = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, error: 'Application not found' });
    const application = await Application.findById(req.params.id).populate('job', 'title location board status serviceLine');
    if (!application) return res.status(404).json({ success: false, error: 'Application not found' });
    res.json({ success: true, data: application });
};

// @route   PATCH /api/admin/applications/:id
const updateApplication = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, error: 'Application not found' });
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ success: false, error: 'Application not found' });

    const { status, note, interview, interviewUpdate } = req.body || {};
    const actor = { by: req.user._id, byName: req.user.name };
    if (status !== undefined) {
        if (!STATUSES.includes(status)) return res.status(400).json({ success: false, error: 'Invalid status' });
        if (status !== application.status) {
            application.notes.push({ text: `Status changed from ${application.status} to ${status}`, ...actor });
            application.status = status;
        }
    }
    if (note && String(note).trim()) {
        application.notes.push({ text: String(note).trim(), ...actor });
    }
    if (interview) {
        if (!INTERVIEW_ROUNDS.includes(interview.round)) {
            return res.status(400).json({ success: false, error: 'Choose a valid interview round' });
        }
        const scheduledAt = new Date(interview.scheduledAt);
        if (Number.isNaN(scheduledAt.getTime())) {
            return res.status(400).json({ success: false, error: 'Enter a valid interview date and time' });
        }
        const roundLabel = { screening: 'Screening call', interview: 'Interview', final: 'Final discussion' }[interview.round];
        application.interviews.push({
            round: interview.round,
            scheduledAt,
            mode: INTERVIEW_MODES.includes(interview.mode) ? interview.mode : 'video',
            interviewer: String(interview.interviewer || '').trim().slice(0, 80),
            notes: String(interview.notes || '').trim().slice(0, 1000),
            outcome: 'scheduled',
            ...actor,
        });
        application.notes.push({ text: `${roundLabel} scheduled for ${scheduledAt.toISOString()}`, ...actor });
        if (['pending', 'reviewed', 'shortlisted'].includes(application.status)) {
            application.notes.push({ text: `Status changed from ${application.status} to interview`, ...actor });
            application.status = 'interview';
        }
    }
    if (interviewUpdate?.id) {
        const item = application.interviews.id(interviewUpdate.id);
        if (!item) return res.status(404).json({ success: false, error: 'Interview not found' });
        if (interviewUpdate.outcome !== undefined) {
            if (!INTERVIEW_OUTCOMES.includes(interviewUpdate.outcome)) {
                return res.status(400).json({ success: false, error: 'Choose a valid interview outcome' });
            }
            item.outcome = interviewUpdate.outcome;
        }
        if (interviewUpdate.notes !== undefined) {
            item.notes = String(interviewUpdate.notes).trim().slice(0, 1000);
        }
    }
    await application.save();
    await application.populate('job', 'title location board status serviceLine');
    res.json({ success: true, data: application });
};

const sendDocument = (application, kind, res) => {
    const doc = DOCUMENTS[kind];
    if (!doc) return res.status(404).json({ success: false, error: 'Document not found' });
    const stored = application[doc.pathKey];
    if (!stored) return res.status(404).json({ success: false, error: 'Document not found' });
    const full = path.resolve(stored);
    if (!full.startsWith(doc.root + path.sep) || !fs.existsSync(full)) {
        return res.status(404).json({ success: false, error: 'Document file is missing' });
    }
    const safeName = `${application.applicationRef || application.firstName}-${doc.label}${path.extname(full)}`.replace(/[^\w.-]+/g, '_');
    return res.download(full, safeName);
};

// @route   GET /api/admin/applications/:id/resume
const downloadResume = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, error: 'Not found' });
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ success: false, error: 'Not found' });
    return sendDocument(application, 'resume', res);
};

// @route   GET /api/admin/applications/:id/files/:kind
const downloadDocument = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, error: 'Not found' });
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ success: false, error: 'Not found' });
    return sendDocument(application, req.params.kind, res);
};

// @route   GET /api/admin/applications/export
const exportApplications = async (req, res) => {
    const items = await Application.find(buildFilter(req.query)).sort({ appliedAt: -1 }).limit(5000).lean();
    const header = [
        'Application ID', 'Applied', 'First name', 'Middle name', 'Last name', 'Email', 'Phone', 'Date of birth',
        'City', 'State', 'Country', 'Position', 'Board', 'Qualification', 'Field of study', 'Experience',
        'Candidate type', 'Current company', 'Expected pay', 'Notice period', 'Gender', 'Status', 'LinkedIn', 'GitHub', 'Portfolio',
    ];
    const lines = items.map((a) => [
        a.applicationRef, new Date(a.appliedAt).toISOString(), a.firstName, a.middleName, a.lastName, a.email,
        `${a.countryCode || ''} ${a.phone}`, a.dateOfBirth ? new Date(a.dateOfBirth).toISOString().slice(0, 10) : '',
        a.city, a.state, a.country, a.position, a.board, a.qualification, a.fieldOfStudy, a.experience,
        a.candidateType, a.currentCompany, a.expectedCtc, a.noticePeriod, a.gender,
        a.status, a.linkedinUrl, a.githubUrl, a.portfolioUrl,
    ].map(csvCell).join(','));
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="applications-${new Date().toISOString().slice(0, 10)}.csv"`);
    res.send(`\uFEFF${[header.map(csvCell).join(','), ...lines].join('\r\n')}`);
};

module.exports = {
    submitApplication,
    getApplications,
    getApplication,
    updateApplication,
    downloadResume,
    downloadDocument,
    exportApplications
};
