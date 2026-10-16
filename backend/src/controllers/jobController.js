const mongoose = require('mongoose');
const Job = require('../models/Job');
const Application = require('../models/Application');
const { BOARDS, STATUSES, DOCUMENT_KEYS } = require('../models/Job');

const EDITABLE = [
    'board', 'title', 'category', 'department', 'location', 'country', 'experience', 'employmentType',
    'vacancies', 'package', 'summary', 'description', 'requirements', 'requiredDocuments', 'status', 'publishAt', 'closesAt',
];

const dateOrNull = (value, label) => {
    if (value === '' || value === null) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        const error = new Error(`Enter a valid ${label}`);
        error.name = 'ValidationError';
        throw error;
    }
    return date;
};

const pick = (body = {}) => {
    const out = {};
    EDITABLE.forEach((key) => {
        if (body[key] !== undefined) out[key] = body[key];
    });
    if (typeof out.requirements === 'string') {
        out.requirements = out.requirements.split('\n').map((r) => r.trim()).filter(Boolean);
    }
    if (out.requiredDocuments !== undefined) {
        const list = Array.isArray(out.requiredDocuments) ? out.requiredDocuments : [out.requiredDocuments];
        out.requiredDocuments = [...new Set(list.map((key) => String(key)).filter((key) => DOCUMENT_KEYS.includes(key)))];
    }
    if (out.publishAt !== undefined) out.publishAt = dateOrNull(out.publishAt, 'publish date and time');
    if (out.closesAt === '') out.closesAt = null;
    if (typeof out.closesAt === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(out.closesAt)) {
        out.closesAt = `${out.closesAt}T23:59:59.999Z`;
    }
    if (typeof out.closesAt === 'string') out.closesAt = dateOrNull(out.closesAt, 'apply-by date');
    return out;
};

const PUBLIC_FIELDS = 'board title category department location country experience employmentType vacancies package summary description requirements requiredDocuments publishedAt closesAt';

const openFilter = () => {
    const now = new Date();
    return {
        status: 'published',
        $and: [
            { $or: [{ closesAt: null }, { closesAt: { $exists: false } }, { closesAt: { $gte: now } }] },
            { $or: [{ publishAt: null }, { publishAt: { $exists: false } }, { publishAt: { $lte: now } }] },
        ],
    };
};

// @route   GET /api/jobs?board=hr|careers
const listPublicJobs = async (req, res) => {
    const filter = openFilter();
    if (BOARDS.includes(req.query.board)) filter.board = req.query.board;
    const jobs = await Job.find(filter).select(PUBLIC_FIELDS).sort({ publishedAt: -1 }).limit(500);
    res.json({ success: true, data: jobs });
};

// @route   GET /api/jobs/:id
const getPublicJob = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, error: 'Job not found' });
    const job = await Job.findOne({ _id: req.params.id, ...openFilter() }).select(PUBLIC_FIELDS);
    if (!job) return res.status(404).json({ success: false, error: 'This opening is no longer available' });
    res.json({ success: true, data: job });
};

// @route   GET /api/admin/jobs
const listJobs = async (req, res) => {
    const filter = {};
    if (BOARDS.includes(req.query.board)) filter.board = req.query.board;
    if (STATUSES.includes(req.query.status)) filter.status = req.query.status;
    const jobs = await Job.find(filter).sort({ updatedAt: -1 }).populate('createdBy', 'name').lean();
    const counts = await Application.aggregate([
        { $match: { job: { $in: jobs.map((j) => j._id) } } },
        { $group: { _id: '$job', total: { $sum: 1 } } },
    ]);
    const byJob = Object.fromEntries(counts.map((c) => [c._id.toString(), c.total]));
    res.json({ success: true, data: jobs.map((j) => ({ ...j, applications: byJob[j._id.toString()] || 0 })) });
};

// @route   GET /api/admin/jobs/:id
const getJob = async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, error: 'Job not found' });
    res.json({ success: true, data: job });
};

// @route   POST /api/admin/jobs
const createJob = async (req, res) => {
    const job = new Job({ ...pick(req.body), createdBy: req.user._id, updatedBy: req.user._id });
    await job.save();
    res.status(201).json({ success: true, data: job });
};

// @route   PUT /api/admin/jobs/:id
const updateJob = async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, error: 'Job not found' });
    job.set({ ...pick(req.body), updatedBy: req.user._id });
    await job.save();
    res.json({ success: true, data: job });
};

// @route   DELETE /api/admin/jobs/:id
const deleteJob = async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, error: 'Job not found' });
    const linked = await Application.countDocuments({ job: job._id });
    if (linked > 0) {
        return res.status(400).json({ success: false, error: `This job has ${linked} application(s). Close it instead of deleting.` });
    }
    await job.deleteOne();
    res.json({ success: true });
};

module.exports = { listPublicJobs, getPublicJob, listJobs, getJob, createJob, updateJob, deleteJob };
