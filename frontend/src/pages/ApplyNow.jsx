import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { request } from '../lib/api';
import { useJob } from '../lib/useJobs';
import { COUNTRIES, COUNTRY_CODES, statesFor } from '../data/locations';
import { formatDeadline } from '../lib/deadline';
import { JOB_DOCUMENTS } from '../data/jobDocuments';
import {
    ArrowLeft,
    CheckCircle,
    AlertCircle,
    Loader,
    User,
    GraduationCap,
    Briefcase,
    FileText,
    MapPin,
    Clock,
    Calendar,
    Copy,
    Check,
} from 'lucide-react';
import './ApplyNow.css';

const QUALIFICATIONS = [
    'Secondary (10th)',
    'Higher Secondary (12th)',
    'ITI',
    'Diploma',
    "Bachelor's Degree",
    "Master's Degree",
    'Doctorate (PhD)',
    'Other',
];

const NEEDS_FIELD = new Set(['Diploma', "Bachelor's Degree", "Master's Degree", 'Doctorate (PhD)', 'Other']);
const NEEDS_MASTERS = new Set(["Master's Degree", 'Doctorate (PhD)']);

const FIELDS_OF_STUDY = [
    'Engineering',
    'Computer Science / Information Technology',
    'Management',
    'Commerce',
    'Science',
    'Arts / Humanities',
    'Law',
    'Medicine / Healthcare',
    'Other',
];

const FRESHER_EXPERIENCE = ['Fresher (0 years)', 'Less than 1 year'];
const EXPERIENCED_EXPERIENCE = ['Less than 1 year', '1–2 years', '2–4 years', '4–6 years', '6–8 years', '8–10 years', '10+ years'];
const NOTICE_PERIODS = ['Immediate', '15 days', '30 days', '45 days', '60 days', '90 days', 'More than 90 days', 'Serving notice period'];

const FILE_RULES = {
    resume: {
        accept: '.pdf,.doc,.docx',
        types: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        hint: 'PDF, DOC or DOCX, up to 5 MB',
    },
    certificate: {
        accept: '.pdf,.jpg,.jpeg,.png',
        types: ['application/pdf', 'image/jpeg', 'image/png'],
        hint: 'PDF, JPG or PNG, up to 5 MB',
    },
};

const degreeLabel = (qualification) => {
    if (qualification === "Master's Degree") return "Bachelor's degree certificate";
    if (qualification === 'Doctorate (PhD)') return 'Doctorate certificate';
    if (qualification === 'Diploma') return 'Diploma certificate';
    if (qualification === 'ITI') return 'ITI certificate';
    if (qualification === 'Secondary (10th)' || qualification === 'Higher Secondary (12th)') return 'School certificate';
    if (qualification === "Bachelor's Degree") return "Bachelor's degree certificate";
    return 'Qualification certificate';
};

const maxDob = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 16);
    return date.toISOString().slice(0, 10);
};

const isHttpUrl = (value) => {
    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
};

const Field = ({ id, label, required = false, error, full = false, children }) => (
    <div className={`input-box${full ? ' full' : ''}`}>
        <label htmlFor={id}>
            {label}
            {required ? <span className="req"> *</span> : <span className="opt"> Optional</span>}
        </label>
        {children}
        {error && <span className="field-error">{error}</span>}
    </div>
);

const ApplyNow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();
    const jobId = params.get('job');
    const { status: jobStatus, job: postedJob } = useJob(jobId);
    const job = postedJob || location.state?.job || {};
    const jobTitle = job?.title || '';
    const board = job.board || (params.get('board') === 'hr' ? 'hr' : 'careers');
    const backTo = board === 'hr' ? '/hr/jobs' : '/careers';
    const jobUnavailable = Boolean(jobId) && jobStatus === 'missing';

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        countryCode: '+91',
        country: '',
        state: '',
        city: '',
        candidateType: '',
        qualification: '',
        fieldOfStudy: '',
        specialization: '',
        experience: '',
        position: jobTitle,
        currentCompany: '',
        expectedCtc: '',
        noticePeriod: '',
        linkedinUrl: '',
        githubUrl: '',
        message: '',
        consent: false,
    });
    const [files, setFiles] = useState({
        resume: null,
        degreeCertificate: null,
        mastersCertificate: null,
        engineeringCertificate: null,
        salarySlip: null,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [submitError, setSubmitError] = useState('');
    const [applicationRef, setApplicationRef] = useState('');
    const [copied, setCopied] = useState(false);
    const [honeypot, setHoneypot] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

    const experienced = formData.candidateType === 'Experienced';
    const needsField = NEEDS_FIELD.has(formData.qualification);
    const needsMasters = NEEDS_MASTERS.has(formData.qualification);
    const needsEngineering = formData.fieldOfStudy === 'Engineering';
    const stateOptions = statesFor(formData.country);
    const experienceOptions = experienced ? EXPERIENCED_EXPERIENCE : FRESHER_EXPERIENCE;

    useEffect(() => {
        if (jobTitle) setFormData((prev) => ({ ...prev, position: jobTitle }));
    }, [jobTitle]);

    const steps = [
        { id: 1, title: 'Personal', icon: User },
        { id: 2, title: 'Education', icon: GraduationCap },
        { id: 3, title: 'Experience', icon: Briefcase },
        { id: 4, title: 'Documents', icon: FileText },
    ];

    const jobDocuments = Array.isArray(postedJob?.requiredDocuments) ? postedJob.requiredDocuments : null;
    const documents = jobDocuments
        ? [
            { key: 'resume', label: 'CV / Résumé', hint: FILE_RULES.resume.hint, required: true },
            ...JOB_DOCUMENTS.filter((doc) => jobDocuments.includes(doc.key)).map((doc) => ({
                key: doc.field,
                label: doc.label,
                hint: FILE_RULES.certificate.hint,
                required: true,
            })),
        ]
        : [
            { key: 'resume', label: 'CV / Résumé', hint: FILE_RULES.resume.hint, required: true },
            { key: 'degreeCertificate', label: degreeLabel(formData.qualification), hint: FILE_RULES.certificate.hint, required: true },
            needsMasters && { key: 'mastersCertificate', label: "Master's degree certificate", hint: FILE_RULES.certificate.hint, required: true },
            needsEngineering && { key: 'engineeringCertificate', label: 'Engineering degree certificate', hint: FILE_RULES.certificate.hint, required: true },
            experienced && { key: 'salarySlip', label: 'Salary slip of last working company', hint: FILE_RULES.certificate.hint, required: true },
        ].filter(Boolean);

    const validateField = (name, value) => {
        switch (name) {
            case 'firstName':
            case 'lastName':
            case 'city':
                return String(value).trim() ? '' : 'This field is required';
            case 'gender':
            case 'country':
            case 'qualification':
            case 'candidateType':
                return value ? '' : 'Please select an option';
            case 'state':
                return String(value).trim() ? '' : 'Please enter your state';
            case 'dateOfBirth': {
                if (!value) return 'Date of birth is required';
                const dob = new Date(value);
                if (Number.isNaN(dob.getTime()) || value > maxDob()) return 'You must be at least 16 years old';
                return '';
            }
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address';
            case 'phone':
                return /^[0-9]{7,15}$/.test(value) ? '' : 'Enter a valid mobile number';
            case 'fieldOfStudy':
                return needsField && !value ? 'Please select your field of study' : '';
            case 'experience':
                return value ? '' : 'Please select your experience';
            case 'position':
                return String(value).trim() ? '' : 'Tell us which role you are applying for';
            case 'currentCompany':
                return experienced && !String(value).trim() ? 'Enter your current or last company' : '';
            case 'expectedCtc':
                return experienced && !String(value).trim() ? 'Expected pay is required' : '';
            case 'noticePeriod':
                return experienced && !value ? 'Please select your notice period' : '';
            case 'linkedinUrl':
                return value && !isHttpUrl(value) ? 'Enter a full LinkedIn link, starting with https://' : '';
            case 'githubUrl':
                return value && !isHttpUrl(value) ? 'Enter a full GitHub link, starting with https://' : '';
            case 'consent':
                return value ? '' : 'Please confirm the declaration to submit';
            default:
                return '';
        }
    };

    const validateStep = (step) => {
        const stepErrors = {};
        const check = (field) => {
            const error = validateField(field, formData[field]);
            if (error) stepErrors[field] = error;
        };
        if (step === 1) ['firstName', 'lastName', 'gender', 'dateOfBirth', 'email', 'phone', 'country', 'state', 'city'].forEach(check);
        if (step === 2) {
            check('qualification');
            if (needsField) check('fieldOfStudy');
        }
        if (step === 3) {
            check('candidateType');
            check('experience');
            if (!jobTitle) check('position');
            if (experienced) ['noticePeriod', 'currentCompany', 'expectedCtc'].forEach(check);
            ['linkedinUrl', 'githubUrl'].forEach(check);
        }
        if (step === 4) {
            documents.forEach((doc) => {
                if (doc.required && !files[doc.key]) stepErrors[doc.key] = `Please upload your ${doc.label.toLowerCase()}`;
            });
            check('consent');
        }
        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData((prev) => {
            const next = { ...prev, [name]: fieldValue };
            if (name === 'country') next.state = '';
            if (name === 'qualification' && !NEEDS_FIELD.has(value)) next.fieldOfStudy = '';
            if (name === 'candidateType') {
                const options = value === 'Experienced' ? EXPERIENCED_EXPERIENCE : FRESHER_EXPERIENCE;
                if (!options.includes(prev.experience)) next.experience = '';
                if (value !== 'Experienced') {
                    next.noticePeriod = '';
                    next.currentCompany = '';
                    next.expectedCtc = '';
                }
            }
            return next;
        });
        if (name === 'candidateType' && value !== 'Experienced') {
            setFiles((prev) => ({ ...prev, salarySlip: null }));
        }
        if (name === 'qualification' && !NEEDS_MASTERS.has(value)) {
            setFiles((prev) => ({ ...prev, mastersCertificate: null }));
        }
        if (name === 'fieldOfStudy' && value !== 'Engineering') {
            setFiles((prev) => ({ ...prev, engineeringCertificate: null }));
        }
        if (name === 'qualification' && !NEEDS_FIELD.has(value)) {
            setFiles((prev) => ({ ...prev, engineeringCertificate: null }));
        }
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleFileChange = (key, rule) => (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        const extension = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = key === 'resume' ? ['pdf', 'doc', 'docx'] : ['pdf', 'jpg', 'jpeg', 'png'];
        if (!rule.types.includes(file.type) && !allowedExtensions.includes(extension)) {
            setErrors((prev) => ({ ...prev, [key]: `Use ${rule.hint}` }));
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, [key]: 'Each file must be 5 MB or smaller' }));
            return;
        }
        setFiles((prev) => ({ ...prev, [key]: file }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (honeypot) return;
        if (!validateStep(4)) return;
        setIsSubmitting(true);
        setSubmitError('');
        try {
            const submitData = new FormData();
            Object.entries(formData).forEach(([key, value]) => submitData.append(key, value));
            if (jobTitle) submitData.set('position', jobTitle);
            if (postedJob) submitData.append('jobId', postedJob.id);
            submitData.append('board', board);
            documents.forEach((doc) => {
                if (files[doc.key]) submitData.append(doc.key, files[doc.key]);
            });
            const data = await request('/api/applications', { body: submitData });
            setApplicationRef(data.reference || '');
            setSubmitStatus('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            setSubmitStatus('error');
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyRef = async () => {
        try {
            await navigator.clipboard.writeText(applicationRef);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    };

    const selectClass = (name) => (errors[name] ? 'error-field' : undefined);

    return (
        <div className="apply-now-page">
            <AnimatePresence>
                {submitStatus === 'success' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="success-overlay">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', damping: 15 }}
                            className="success-modal glass-card"
                        >
                            <div className="success-icon-wrap">
                                <CheckCircle size={80} color="#f7941d" />
                            </div>
                            <h2>Application received</h2>
                            <p>
                                Thank you{formData.firstName ? `, ${formData.firstName}` : ''}. Your application
                                {jobTitle ? ` for ${jobTitle}` : ''} has been received. Keep this application ID for any follow-up.
                            </p>
                            {applicationRef && (
                                <div className="app-ref-box">
                                    <span>Application ID</span>
                                    <strong>{applicationRef}</strong>
                                    <button type="button" onClick={copyRef}>
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                        {copied ? 'Copied' : 'Copy ID'}
                                    </button>
                                </div>
                            )}
                            <div className="success-actions">
                                <button className="btn-finish" onClick={() => navigate(backTo)}>
                                    {board === 'hr' ? 'Browse more jobs' : 'Return to Careers'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="apply-layout">
                <aside className="apply-sidebar">
                    <button className="back-link" onClick={() => navigate(backTo)}>
                        <ArrowLeft size={18} /> Back
                    </button>
                    <div className="sidebar-job-card glass-card">
                        <span className="badge-premium">{board === 'hr' ? 'Jobs @ KAM Global' : 'Careers @ KamGlobalAI'}</span>
                        <h1>{jobId && jobStatus === 'loading' ? 'Loading role…' : jobTitle || 'General Application'}</h1>
                        <div className="sidebar-meta">
                            {(job.team || job.category) && <div className="meta-item"><Briefcase size={16} /> {job.team || job.category}</div>}
                            {job.location && <div className="meta-item"><MapPin size={16} /> {job.location}</div>}
                            <div className="meta-item"><Clock size={16} /> {job.type || 'Full-time'}</div>
                            {job.closesAt && <div className="meta-item"><Calendar size={16} /> Applications close {formatDeadline(job.closesAt)}</div>}
                        </div>
                        <div className="job-description-short">
                            {jobUnavailable ? (
                                <p>This opening is no longer accepting applications. You can still send a general application below.</p>
                            ) : (
                                <p>{job.summary || 'Complete each section in order. Your application ID is issued after a successful submission.'}</p>
                            )}
                        </div>
                    </div>
                    <div className="progress-stepper">
                        {steps.map((step) => (
                            <div key={step.id} className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
                                <div className="step-point">
                                    {currentStep > step.id ? <CheckCircle size={16} /> : <step.icon size={16} />}
                                </div>
                                <span className="step-label">{step.title}</span>
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="apply-main">
                    <form className="wizard-form glass-card" onSubmit={handleSubmit} noValidate>
                        <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                        <AnimatePresence mode="wait">
                            {currentStep === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container">
                                    <div className="step-header">
                                        <h2>Personal details</h2>
                                        <p>Use the name and contact details that should appear on your application.</p>
                                    </div>
                                    <div className="form-grid">
                                        <Field id="firstName" label="First name" required error={errors.firstName}>
                                            <input id="firstName" name="firstName" autoComplete="given-name" value={formData.firstName} onChange={handleInputChange} className={selectClass('firstName')} />
                                        </Field>
                                        <Field id="middleName" label="Middle name" error={errors.middleName}>
                                            <input id="middleName" name="middleName" autoComplete="additional-name" value={formData.middleName} onChange={handleInputChange} />
                                        </Field>
                                        <Field id="lastName" label="Last name" required error={errors.lastName}>
                                            <input id="lastName" name="lastName" autoComplete="family-name" value={formData.lastName} onChange={handleInputChange} className={selectClass('lastName')} />
                                        </Field>
                                        <Field id="dateOfBirth" label="Date of birth" required error={errors.dateOfBirth}>
                                            <input id="dateOfBirth" type="date" name="dateOfBirth" max={maxDob()} value={formData.dateOfBirth} onChange={handleInputChange} className={selectClass('dateOfBirth')} />
                                        </Field>
                                        <Field id="gender" label="Gender" required error={errors.gender}>
                                            <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className={selectClass('gender')}>
                                                <option value="">Select</option>
                                                <option value="Female">Female</option>
                                                <option value="Male">Male</option>
                                                <option value="Other">Other</option>
                                                <option value="Prefer not to say">Prefer not to say</option>
                                            </select>
                                        </Field>
                                        <Field id="email" label="Email address" required error={errors.email}>
                                            <input id="email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleInputChange} className={selectClass('email')} />
                                        </Field>
                                        <Field id="phone" label="Mobile number" required full error={errors.phone}>
                                            <div className="phone-wrapper">
                                                <select name="countryCode" aria-label="Country code" value={formData.countryCode} onChange={handleInputChange}>
                                                    {COUNTRY_CODES.map((item) => <option key={`${item.code}-${item.country}`} value={item.code}>{item.code} {item.country}</option>)}
                                                </select>
                                                <input id="phone" type="tel" name="phone" inputMode="numeric" autoComplete="tel-national" placeholder="Mobile number" value={formData.phone} onChange={handleInputChange} className={selectClass('phone')} />
                                            </div>
                                        </Field>
                                        <Field id="country" label="Country" required error={errors.country}>
                                            <select id="country" name="country" autoComplete="country-name" value={formData.country} onChange={handleInputChange} className={selectClass('country')}>
                                                <option value="">Select country</option>
                                                {COUNTRIES.map((country) => <option key={country} value={country}>{country}</option>)}
                                            </select>
                                        </Field>
                                        <Field id="state" label="State / province" required error={errors.state}>
                                            {stateOptions ? (
                                                <select id="state" name="state" value={formData.state} onChange={handleInputChange} className={selectClass('state')}>
                                                    <option value="">Select state</option>
                                                    {stateOptions.map((state) => <option key={state} value={state}>{state}</option>)}
                                                </select>
                                            ) : (
                                                <input id="state" name="state" autoComplete="address-level1" placeholder={formData.country ? 'State or province' : 'Select a country first'} value={formData.state} onChange={handleInputChange} className={selectClass('state')} />
                                            )}
                                        </Field>
                                        <Field id="city" label="City" required error={errors.city}>
                                            <input id="city" name="city" autoComplete="address-level2" value={formData.city} onChange={handleInputChange} className={selectClass('city')} />
                                        </Field>
                                    </div>
                                    <div className="step-actions">
                                        <button type="button" className="btn-next" onClick={nextStep}>Continue <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} /></button>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container">
                                    <div className="step-header">
                                        <h2>Education</h2>
                                        <p>{jobDocuments ? 'Add your highest qualification. The documents for this role are set by the hiring team.' : 'Start with your highest qualification. Later documents follow this selection.'}</p>
                                    </div>
                                    <div className="form-grid">
                                        <Field id="qualification" label="Highest qualification" required error={errors.qualification}>
                                            <select id="qualification" name="qualification" value={formData.qualification} onChange={handleInputChange} className={selectClass('qualification')}>
                                                <option value="">Select qualification</option>
                                                {QUALIFICATIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                                            </select>
                                        </Field>
                                        {needsField && (
                                            <Field id="fieldOfStudy" label="Field of study" required error={errors.fieldOfStudy}>
                                                <select id="fieldOfStudy" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleInputChange} className={selectClass('fieldOfStudy')}>
                                                    <option value="">Select field</option>
                                                    {FIELDS_OF_STUDY.map((item) => <option key={item} value={item}>{item}</option>)}
                                                </select>
                                            </Field>
                                        )}
                                        <Field id="specialization" label="Specialization" full error={errors.specialization}>
                                            <input id="specialization" name="specialization" placeholder="Example: Computer Science, Mechanical, Finance" value={formData.specialization} onChange={handleInputChange} />
                                        </Field>
                                    </div>
                                    <div className="step-actions split">
                                        <button type="button" className="btn-back" onClick={prevStep}>Back</button>
                                        <button type="button" className="btn-next" onClick={nextStep}>Continue <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} /></button>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container">
                                    <div className="step-header">
                                        <h2>Work experience</h2>
                                        <p>Tell us whether you are a fresher or already working, then add your profiles.</p>
                                    </div>
                                    <div className="form-grid">
                                        {!jobTitle && (
                                            <Field id="position" label="Role you are applying for" required full error={errors.position}>
                                                <input id="position" name="position" maxLength={150} value={formData.position} onChange={handleInputChange} className={selectClass('position')} />
                                            </Field>
                                        )}
                                        <Field id="candidateType" label="Candidate type" required error={errors.candidateType}>
                                            <select id="candidateType" name="candidateType" value={formData.candidateType} onChange={handleInputChange} className={selectClass('candidateType')}>
                                                <option value="">Select</option>
                                                <option value="Fresher">Fresher</option>
                                                <option value="Experienced">Experienced</option>
                                            </select>
                                        </Field>
                                        <Field id="experience" label="Total experience" required error={errors.experience}>
                                            <select id="experience" name="experience" value={formData.experience} onChange={handleInputChange} className={selectClass('experience')} disabled={!formData.candidateType}>
                                                <option value="">{formData.candidateType ? 'Select experience' : 'Select candidate type first'}</option>
                                                {experienceOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                                            </select>
                                        </Field>
                                        {experienced && (
                                            <>
                                                <Field id="noticePeriod" label="Notice period" required error={errors.noticePeriod}>
                                                    <select id="noticePeriod" name="noticePeriod" value={formData.noticePeriod} onChange={handleInputChange} className={selectClass('noticePeriod')}>
                                                        <option value="">Select notice period</option>
                                                        {NOTICE_PERIODS.map((item) => <option key={item} value={item}>{item}</option>)}
                                                    </select>
                                                </Field>
                                                <Field id="currentCompany" label="Current or last company" required error={errors.currentCompany}>
                                                    <input id="currentCompany" name="currentCompany" value={formData.currentCompany} onChange={handleInputChange} className={selectClass('currentCompany')} />
                                                </Field>
                                                <Field id="expectedCtc" label="Expected pay" required full error={errors.expectedCtc}>
                                                    <input id="expectedCtc" name="expectedCtc" placeholder="Example: 8.5 LPA or 4,000 KWD" value={formData.expectedCtc} onChange={handleInputChange} className={selectClass('expectedCtc')} />
                                                </Field>
                                            </>
                                        )}
                                        <Field id="linkedinUrl" label="LinkedIn" full error={errors.linkedinUrl}>
                                            <input id="linkedinUrl" type="url" name="linkedinUrl" placeholder="https://www.linkedin.com/in/…" value={formData.linkedinUrl} onChange={handleInputChange} className={selectClass('linkedinUrl')} />
                                        </Field>
                                        <Field id="githubUrl" label="GitHub" full error={errors.githubUrl}>
                                            <input id="githubUrl" type="url" name="githubUrl" placeholder="https://github.com/…" value={formData.githubUrl} onChange={handleInputChange} className={selectClass('githubUrl')} />
                                        </Field>
                                    </div>
                                    <div className="step-actions split">
                                        <button type="button" className="btn-back" onClick={prevStep}>Back</button>
                                        <button type="button" className="btn-next" onClick={nextStep}>Continue <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} /></button>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container">
                                    <div className="step-header">
                                        <h2>Documents and declaration</h2>
                                        <p>{jobDocuments ? 'Upload the résumé and the documents selected for this role.' : 'These documents follow the qualification and experience you selected.'}</p>
                                    </div>
                                    <ul className="apply-review">
                                        <li><span>Applicant</span><strong>{[formData.firstName, formData.middleName, formData.lastName].filter(Boolean).join(' ') || '—'}</strong></li>
                                        <li><span>Role</span><strong>{jobTitle || formData.position || 'General application'}</strong></li>
                                        <li><span>Education</span><strong>{[formData.qualification, formData.fieldOfStudy].filter(Boolean).join(' · ') || '—'}</strong></li>
                                        <li><span>Location</span><strong>{[formData.city, formData.state, formData.country].filter(Boolean).join(', ') || '—'}</strong></li>
                                    </ul>
                                    <div className="doc-list">
                                        {documents.map((doc) => {
                                            const file = files[doc.key];
                                            const rule = doc.key === 'resume' ? FILE_RULES.resume : FILE_RULES.certificate;
                                            return (
                                                <div key={doc.key} className={`doc-row${file ? ' has-file' : ''}`}>
                                                    <div>
                                                        <h3>{doc.label}{doc.required && <span className="req"> *</span>}</h3>
                                                        <p>{file ? file.name : doc.hint}</p>
                                                        {errors[doc.key] && <span className="field-error">{errors[doc.key]}</span>}
                                                    </div>
                                                    <div className="doc-actions">
                                                        <input id={doc.key} type="file" accept={rule.accept} onChange={handleFileChange(doc.key, rule)} />
                                                        <label htmlFor={doc.key} className="btn-browse">{file ? 'Replace' : 'Upload'}</label>
                                                        {file && <button type="button" className="btn-back" onClick={() => setFiles((prev) => ({ ...prev, [doc.key]: null }))}>Remove</button>}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="input-box full top-spaced">
                                        <label htmlFor="message">Cover note <span className="opt">Optional</span></label>
                                        <textarea id="message" name="message" rows="4" maxLength={5000} value={formData.message} onChange={handleInputChange} placeholder="Anything you want the recruitment team to know" />
                                    </div>
                                    <div className="consent-checkbox">
                                        <label>
                                            <input type="checkbox" name="consent" checked={formData.consent} onChange={handleInputChange} />
                                            <span>
                                                I confirm that the details and documents I have provided are accurate, and I agree to the{' '}
                                                <Link to="/privacy-policy">privacy policy</Link>.
                                            </span>
                                        </label>
                                        {errors.consent && <span className="field-error">{errors.consent}</span>}
                                    </div>
                                    {submitStatus === 'error' && (
                                        <p className="field-error centered" role="alert">
                                            <AlertCircle size={14} /> {submitError || 'We could not submit your application. Please try again.'}
                                        </p>
                                    )}
                                    <div className="step-actions split">
                                        <button type="button" className="btn-back" onClick={prevStep}>Back</button>
                                        <button type="submit" className="btn-submit" disabled={isSubmitting}>
                                            {isSubmitting ? <Loader className="spinning" size={18} /> : <span>Submit application</span>}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default ApplyNow;
