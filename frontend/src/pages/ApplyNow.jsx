import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowLeft,
    Upload,
    CheckCircle,
    AlertCircle,
    Loader,
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    GraduationCap,
    Calendar,
    Linkedin,
    FileText,
    Send,
    DollarSign,
    Globe,
    Clock,
    Github
} from 'lucide-react';
import './ApplyNow.css';

const ApplyNow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const job = location.state?.job || {};
    const jobTitle = job?.title || '';

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        countryCode: '+1',
        location: '',
        candidateType: '', // 'Fresher' or 'Experienced'
        qualification: '',
        experience: '',
        position: jobTitle,
        expectedCtc: '',
        noticePeriod: '',
        linkedinUrl: '',
        githubUrl: '',
        portfolioUrl: '',
        message: '',
        consent: false
    });

    const countryCodes = [
        { code: '+91', country: 'India' },
        { code: '+965', country: 'Kuwait' },
        { code: '+971', country: 'UAE' },
        { code: '+966', country: 'Saudi Arabia' },
        { code: '+974', country: 'Qatar' },
        { code: '+968', country: 'Oman' },
        { code: '+973', country: 'Bahrain' },
        { code: '+1', country: 'USA/Canada' },
        { code: '+44', country: 'UK' },
        { code: '+61', country: 'Australia' },
        { code: '+65', country: 'Singapore' },
        { code: '+49', country: 'Germany' },
        { code: '+33', country: 'France' },
        { code: '+81', country: 'Japan' },
        { code: '+86', country: 'China' },
    ];

    const [resumeFile, setResumeFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isParsing, setIsParsing] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [honeypot, setHoneypot] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        { id: 1, title: 'Identity', icon: User },
        { id: 2, title: 'Experience', icon: Briefcase },
        { id: 3, title: 'Documents', icon: FileText }
    ];

    // Simulated LinkedIn Auto-fill
    const handleLinkedInApply = () => {
        setIsParsing(true);
        setTimeout(() => {
            setFormData(prev => ({
                ...prev,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@linkedin-demo.com',
                location: 'Bengaluru, India',
                linkedinUrl: 'https://linkedin.com/in/johndoe'
            }));
            setIsParsing(false);
            setCurrentStep(2);
        }, 1500);
    };

    // Simulated Resume Parsing
    const simulateResumeParsing = (file) => {
        setIsParsing(true);
        setTimeout(() => {
            // Simulate extracting data from "resume"
            setFormData(prev => ({
                ...prev,
                firstName: prev.firstName || 'John',
                lastName: prev.lastName || 'Doe',
                candidateType: 'Experienced',
                experience: '3-5',
                qualification: "Bachelor's Degree",
                position: jobTitle || 'Full Stack Developer',
                skills: ['React', 'Node.js', 'AI Integration']
            }));
            setIsParsing(false);
            // After parsing, move back to step 1 to show the filled data
            setCurrentStep(1);
        }, 2500);
    };

    const validateStep = (step) => {
        const stepErrors = {};
        if (step === 1) {
            ['firstName', 'lastName', 'gender', 'email', 'phone', 'consent'].forEach(field => {
                const error = validateField(field, formData[field]);
                if (error) stepErrors[field] = error;
            });
        } else if (step === 2) {
            ['candidateType', 'qualification', 'experience', 'position'].forEach(field => {
                const error = validateField(field, formData[field]);
                if (error) stepErrors[field] = error;
            });
            if (formData.candidateType === 'Experienced' && !formData.expectedCtc) {
                stepErrors.expectedCtc = 'Expected CTC is required';
            }
        } else if (step === 3) {
            if (!resumeFile) stepErrors.resume = 'Please upload your resume';
        }

        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setShowErrors(true);
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'firstName':
            case 'lastName':
                return value.trim() ? '' : 'This field is required';
            case 'gender':
                return value ? '' : 'Please select your gender';
            case 'email': {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value) ? '' : 'Invalid email address';
            }
            case 'phone': {
                const phoneRegex = /^[0-9]{7,15}$/;
                return phoneRegex.test(value) ? '' : 'Enter a valid phone number';
            }
            case 'candidateType':
                return value ? '' : 'Please select candidate type';
            case 'qualification':
            case 'experience':
            case 'position':
                return value ? '' : 'Please select an option';
            case 'expectedCtc':
                if (formData.candidateType === 'Experienced') {
                    return value.trim() ? '' : 'Expected CTC is required';
                }
                return '';
            case 'noticePeriod':
                return ''; // Optional
            case 'consent':
                return value ? '' : 'You must agree to continue';
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: fieldValue
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                setErrors(prev => ({ ...prev, resume: 'Only PDF, DOC, and DOCX allowed' }));
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, resume: 'Max 5MB allowed' }));
                return;
            }
            setResumeFile(file);
            setErrors(prev => ({ ...prev, resume: '' }));
            simulateResumeParsing(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const fieldsToValidate = ['firstName', 'lastName', 'gender', 'email', 'phone', 'candidateType', 'qualification', 'experience', 'position', 'consent'];

        if (formData.candidateType === 'Experienced') {
            fieldsToValidate.push('expectedCtc');
        }

        fieldsToValidate.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        if (!resumeFile) newErrors.resume = 'Please upload your resume';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (honeypot) return;
        if (!validateForm()) {
            setShowErrors(true);
            const firstError = document.querySelector('.error-message');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        setIsSubmitting(true);
        setShowErrors(false);
        try {
            const submitData = new FormData();
            Object.keys(formData).forEach(key => submitData.append(key, formData[key]));
            submitData.append('resume', resumeFile);
            const response = await fetch('/api/applications', { method: 'POST', body: submitData });
            if (response.ok) {
                setSubmitStatus('success');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => navigate('/careers'), 3000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="apply-now-page">
            <AnimatePresence>
                {isParsing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="parsing-overlay"
                    >
                        <div className="parsing-content">
                            <div className="ai-scanner">
                                <div className="scanner-line"></div>
                                <FileText size={48} className="scan-icon" />
                            </div>
                            <h3>AI Resume Scanning...</h3>
                            <p>Our AI is extracting your details to save your time.</p>
                            <div className="scan-progress-bar">
                                <motion.div
                                    className="progress-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 2.2 }}
                                ></motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {submitStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="success-overlay"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 15 }}
                            className="success-modal glass-card"
                        >
                            <div className="success-icon-wrap">
                                <CheckCircle size={80} color="#f7941d" />
                                <div className="confetti-sim"></div>
                            </div>
                            <h2>Application Received!</h2>
                            <p>Fantastic! Our AI has logged your application. A member of our HR team will review your profile and reach out within 48 hours.</p>
                            <div className="success-actions">
                                <button className="btn-finish" onClick={() => navigate('/careers')}>Return to Careers</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="apply-layout">
                {/* Left Sidebar - Job Info */}
                <aside className="apply-sidebar">
                    <button className="back-link" onClick={() => navigate('/careers')}>
                        <ArrowLeft size={18} /> Back
                    </button>

                    <div className="sidebar-job-card glass-card">
                        <span className="badge-premium">Careers @ KamGlobalAI</span>
                        <h1>{jobTitle || 'General Application'}</h1>
                        <div className="sidebar-meta">
                            {job.team && <div className="meta-item"><Briefcase size={16} /> {job.team}</div>}
                            {job.location && <div className="meta-item"><MapPin size={16} /> {job.location}</div>}
                            <div className="meta-item"><Clock size={16} /> Full-time / Global</div>
                        </div>
                        <div className="job-description-short">
                            <p>Join a fast-growing team of innovators. We're building the future of AI agents and digital transformation tools across Kuwait and India.</p>
                        </div>
                    </div>

                    <div className="progress-stepper">
                        {steps.map(step => (
                            <div key={step.id} className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
                                <div className="step-point">
                                    {currentStep > step.id ? <CheckCircle size={16} /> : <step.icon size={16} />}
                                </div>
                                <span className="step-label">{step.title}</span>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Right Column - Form Wizard */}
                <main className="apply-main">
                    <form className="wizard-form glass-card" onSubmit={handleSubmit}>
                        <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex="-1" />

                        <AnimatePresence mode="wait">
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="step-container"
                                >
                                    <div className="step-header">
                                        <div className="one-click-apply">
                                            <span>Fast Apply with:</span>
                                            <div className="social-apply-btns">
                                                <button type="button" className="btn-linkedin" onClick={handleLinkedInApply}>
                                                    <Linkedin size={16} /> LinkedIn
                                                </button>
                                                <button type="button" className="btn-google">
                                                    <Globe size={16} /> Google
                                                </button>
                                            </div>
                                        </div>
                                        <div className="divider-text"><span>OR FILL MANUALLY</span></div>
                                        <h2>Personal Identity</h2>
                                        <p>Tell us who you are and how we can reach you.</p>
                                    </div>

                                    <div className="form-grid">
                                        <div className="input-box">
                                            <label>First Name</label>
                                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Ex: John" className={errors.firstName ? 'error-field' : ''} />
                                            {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                                        </div>
                                        <div className="input-box">
                                            <label>Last Name</label>
                                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Ex: Doe" />
                                        </div>
                                        <div className="input-box">
                                            <label>Gender</label>
                                            <select name="gender" value={formData.gender} onChange={handleInputChange} className={errors.gender ? 'error-field' : ''}>
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {errors.gender && <span className="field-error">{errors.gender}</span>}
                                        </div>
                                        <div className="input-box">
                                            <label>Email Address</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
                                            {errors.email && <span className="field-error">{errors.email}</span>}
                                        </div>
                                        <div className="input-box">
                                            <label>Date of Birth</label>
                                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                                        </div>
                                        <div className="input-box full">
                                            <label>Phone Number</label>
                                            <div className="phone-wrapper">
                                                <select name="countryCode" value={formData.countryCode} onChange={handleInputChange}>
                                                    {countryCodes.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                                                </select>
                                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Mobile number" />
                                            </div>
                                            {errors.phone && <span className="field-error">{errors.phone}</span>}
                                        </div>
                                    </div>

                                    <div className="consent-checkbox">
                                        <label>
                                            <input type="checkbox" name="consent" checked={formData.consent} onChange={handleInputChange} />
                                            <span>I agree to the <u>Data & Privacy Policy</u> of KamGlobal AI.</span>
                                        </label>
                                        {errors.consent && <span className="field-error">{errors.consent}</span>}
                                    </div>

                                    <div className="step-actions">
                                        <button type="button" className="btn-next" onClick={nextStep}>
                                            Continue <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="step-container"
                                >
                                    <div className="step-header">
                                        <h2>Professional Background</h2>
                                        <p>Your expertise and what you bring to the table.</p>
                                    </div>

                                    <div className="form-grid">
                                        <div className="input-box">
                                            <label>Candidate Type</label>
                                            <select name="candidateType" value={formData.candidateType} onChange={handleInputChange}>
                                                <option value="">Select Category</option>
                                                <option value="Fresher">Graduate / Fresher</option>
                                                <option value="Experienced">Experienced Professional</option>
                                            </select>
                                        </div>
                                        <div className="input-box">
                                            <label>Qualification</label>
                                            <select name="qualification" value={formData.qualification} onChange={handleInputChange}>
                                                <option value="">Select Education</option>
                                                <option value="Bachelor's Degree">Bachelor's Degree</option>
                                                <option value="Master's Degree">Master's Degree</option>
                                                <option value="PhD">PhD</option>
                                            </select>
                                        </div>
                                        <div className="input-box">
                                            <label>Work Experience</label>
                                            <select name="experience" value={formData.experience} onChange={handleInputChange}>
                                                <option value="">Total Years</option>
                                                <option value="0-1">0-1 Year</option>
                                                <option value="1-3">1-3 Years</option>
                                                <option value="3-5">3-5 Years</option>
                                                <option value="5+">5+ Years</option>
                                            </select>
                                        </div>
                                        <div className="input-box">
                                            <label>Notice Period</label>
                                            <select name="noticePeriod" value={formData.noticePeriod} onChange={handleInputChange}>
                                                <option value="">Joining Status</option>
                                                <option value="Immediate">Immediate / Serving Notice</option>
                                                <option value="15-30 Days">15-30 Days</option>
                                                <option value="60-90 Days">60-90 Days</option>
                                            </select>
                                        </div>

                                        {formData.candidateType === 'Experienced' && (
                                            <div className="input-box full">
                                                <label>Expected CTC (Annual / Monthly)</label>
                                                <div className="icon-input">
                                                    <DollarSign size={16} />
                                                    <input type="text" name="expectedCtc" value={formData.expectedCtc} onChange={handleInputChange} placeholder="Ex: 8.5 LPA or 4,000 KWD" />
                                                </div>
                                            </div>
                                        )}

                                        <div className="input-box full">
                                            <label>Profiles (LinkedIn / GitHub / Portfolio)</label>
                                            <div className="social-inputs">
                                                <div className="icon-input-simple">
                                                    <Linkedin size={16} />
                                                    <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleInputChange} placeholder="LinkedIn URL" />
                                                </div>
                                                <div className="icon-input-simple">
                                                    <Github size={16} />
                                                    <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleInputChange} placeholder="GitHub URL" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="step-actions split">
                                        <button type="button" className="btn-back" onClick={prevStep}>Back</button>
                                        <button type="button" className="btn-next" onClick={nextStep}>
                                            Continue <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="step-container"
                                >
                                    <div className="step-header">
                                        <h2>Submission & Documents</h2>
                                        <p>Upload your resume and any final thoughts.</p>
                                    </div>

                                    <div className="upload-zone">
                                        <input type="file" id="resume-upload" accept=".pdf,.doc,.docx" onChange={handleFileChange} style={{ display: 'none' }} />
                                        <label htmlFor="resume-upload" className={`drop-card ${resumeFile ? 'has-file' : ''}`}>
                                            <div className="upload-icon-circle">
                                                {resumeFile ? <CheckCircle size={32} /> : <Upload size={32} />}
                                            </div>
                                            <h3>{resumeFile ? 'Resume Attached' : 'Upload your CV / Resume'}</h3>
                                            <p>{resumeFile ? resumeFile.name : 'PDF, DOC, DOCX up to 5MB'}</p>
                                            {!resumeFile && <div className="btn-browse">Browse Files</div>}
                                        </label>
                                        {errors.resume && <span className="field-error centered">{errors.resume}</span>}
                                    </div>

                                    <div className="input-box full top-spaced">
                                        <label>Optional Message / Cover Note</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Write anything you want us to know..."
                                            rows="4"
                                        />
                                    </div>

                                    <div className="step-actions split">
                                        <button type="button" className="btn-back" onClick={prevStep}>Back</button>
                                        <button type="submit" className="btn-submit" disabled={isSubmitting}>
                                            {isSubmitting ? <Loader className="spinning" size={18} /> : <span>Submit Application</span>}
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
