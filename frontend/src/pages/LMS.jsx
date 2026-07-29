import { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    ExternalLink,
    CheckCircle2,
    GraduationCap,
    Brain,
    BarChart3,
    Users,
    Mail,
    XCircle,
    CheckCircle,
    Video,
    Target,
    MessageCircle,
    Globe2,
    BookOpen,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './LMS.css';

const gradeLevels = [
    { title: 'Pre-KG', desc: 'Early foundations & play-based learning' },
    { title: 'Elementary', desc: 'Core skills G1–G5' },
    { title: 'Middle School', desc: 'Concept mastery G6–G8' },
    { title: 'High School', desc: 'Exam prep & success G9–G12' },
];

const lmsFeatures = [
    { icon: Brain, title: 'Adaptive AI Paths', desc: 'Personalized learning journeys based on each student\'s pace and strengths.' },
    { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Real-time insights for educators, parents, and administrators.' },
    { icon: Users, title: 'Multi-Role Access', desc: 'Built for students, teachers, parents, and school leadership.' },
    { icon: GraduationCap, title: 'Pre-KG to Grade 12', desc: 'One platform covering the full educational journey.' },
];

const eduaiPillars = [
    {
        icon: Video,
        title: 'Live interactive classes',
        desc: 'Real-time two-way sessions with digital whiteboards, polling, and doubt-solving — India & GCC batches.',
    },
    {
        icon: Brain,
        title: 'AI-powered mock analytics',
        desc: 'Time-per-question tracking, gap reports, predictive rank trajectory, and repeat-error tagging.',
    },
    {
        icon: MessageCircle,
        title: '24/7 doubts & 1:1 mentorship',
        desc: 'Text, photo, and voice doubts with weekly mentor calls from IITian and doctor mentors.',
    },
    {
        icon: Globe2,
        title: 'GCC / NRI-ready batches',
        desc: 'UAE, Saudi & Oman-friendly timings, DASA/CIWG counselling, same NCERT curriculum.',
    },
];

const eduaiPrograms = [
    { title: 'NEET Full-Time / Crash', desc: 'Structured medical entrance prep with AI diagnostics and mentor reviews.' },
    { title: 'JEE Mains & Advanced', desc: 'Concept-first Physics, Chemistry, and Maths with live mentoring.' },
    { title: 'Foundation (Classes 6–10)', desc: 'Maths & Science basics for school success and future NEET/JEE readiness.' },
    { title: 'Dropper batches', desc: 'Gap-led personalisation from your previous attempt — not a generic repeat syllabus.' },
];

const eduaiMethod = ['Diagnose', 'Design', 'Deliver', 'Evaluate', 'Improve'];

const Eyebrow = ({ children, center }) => (
    <div className={`prod-eyebrow${center ? ' prod-eyebrow-center' : ''}`}>
        <span className="prod-eyebrow-line" aria-hidden="true" />
        <span>{children}</span>
        <span className="prod-eyebrow-line" aria-hidden="true" />
    </div>
);

const LMS = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        institution: '',
        role: '',
        gradeRange: '',
    });
    const [status, setStatus] = useState({ type: 'idle', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Submitting your request...' });

        if (!formData.name || !formData.email || !formData.role) {
            setStatus({ type: 'error', message: 'Please complete the required fields.' });
            return;
        }

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Request received! We\'ll be in touch soon.' });
                setFormData({ name: '', email: '', phone: '', institution: '', role: '', gradeRange: '' });
            } else {
                setStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
            }
        } catch {
            setStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
        }
    };

    return (
        <div className="products-page">
            <Helmet>
                <title>Our Products | KamGlobal AI — LearnX, EduAiTutors & LMS</title>
                <meta
                    name="description"
                    content="Explore KamGlobal AI products: LearnX school ERP + LMS + AI, EduAiTutors for NEET & JEE, and our AI-Powered LMS for Pre-KG to Grade 12."
                />
            </Helmet>

            <section className="prod-hero">
                <div className="container">
                    <motion.div
                        className="prod-hero-inner"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Eyebrow center>Our Products</Eyebrow>
                        <h1>AI-Powered Learning Solutions</h1>
                        <p>
                            Education platforms from KamGlobal AI — school ERP &amp; AI Academic Studio,
                            competitive exam coaching, and intelligent learning for campuses.
                        </p>
                        <nav className="prod-jump-nav" aria-label="Product sections">
                            <Link to="/products/learnx" className="prod-jump-link">LearnX</Link>
                            <a href="#eduaitutors" className="prod-jump-link">EduAiTutors</a>
                            <a href="#ai-lms" className="prod-jump-link">AI-Powered LMS</a>
                            <a href="#demo" className="prod-jump-link">Request Demo</a>
                        </nav>
                    </motion.div>
                </div>
            </section>

            <section className="prod-overview">
                <div className="container">
                    <div className="prod-overview-grid prod-overview-grid--3">
                        <Link to="/products/learnx" className="prod-overview-card">
                            <span className="prod-badge prod-badge--live">Flagship</span>
                            <h3>LearnX</h3>
                            <p>School ERP + LMS + AI Academic Studio for Indian boards</p>
                        </Link>
                        <a href="#eduaitutors" className="prod-overview-card">
                            <span className="prod-badge prod-badge--live">Live</span>
                            <h3>EduAiTutors</h3>
                            <p>NEET & JEE online coaching for India and the GCC</p>
                        </a>
                        <a href="#ai-lms" className="prod-overview-card">
                            <span className="prod-badge prod-badge--live">Live</span>
                            <h3>AI-Powered LMS</h3>
                            <p>Adaptive learning platform for Pre-KG to Grade 12</p>
                        </a>
                    </div>
                </div>
            </section>

            <section id="learnx" className="prod-section">
                <div className="container">
                    <div className="prod-section-grid">
                        <motion.div
                            className="prod-section-content"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                        >
                            <Eyebrow>Flagship Product</Eyebrow>
                            <h2>LearnX</h2>
                            <p className="prod-lead">
                                The complete school operating system — modular ERP, LMS, white-label websites,
                                parent portals, and AI Academic Studio built for CBSE, ICSE, and State Boards.
                            </p>
                            <ul className="prod-features-list">
                                {[
                                    'White-label school website + admin',
                                    'Fees, attendance, transport & HR',
                                    'AI question paper & lesson PPT tools',
                                    'Multi-branch with secure tenancy',
                                ].map((item) => (
                                    <li key={item}>
                                        <CheckCircle2 size={15} aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/products/learnx" className="prod-btn prod-btn-primary">
                                Explore LearnX <ArrowRight size={15} />
                            </Link>
                        </motion.div>
                        <motion.div
                            className="prod-section-visual"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.08 }}
                        >
                            <img
                                src="/images/learnx-hero.png"
                                alt="LearnX school management platform"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="eduaitutors" className="prod-section">
                <div className="container">
                    <div className="prod-section-grid">
                        <motion.div
                            className="prod-section-content"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                        >
                            <Eyebrow>Live Product</Eyebrow>
                            <h2>EduAiTutors</h2>
                            <p className="prod-lead">
                                Best-in-class online NEET &amp; JEE coaching for India and the GCC — live mentor-led
                                classes, AI mock analytics, NCERT mastery, and personalised study systems. Built by
                                KamGlobal AI and available at{' '}
                                <a href="https://www.eduaitutors.com/" target="_blank" rel="noopener noreferrer">
                                    eduaitutors.com
                                </a>.
                            </p>
                            <ul className="prod-features-list">
                                {[
                                    'Live India & GCC batches',
                                    'AI mock tests & rank prediction',
                                    '1:1 mentor calls (IITian / Doctor mentors)',
                                    'Foundation Classes 6–10 + dropper tracks',
                                    'Parent dashboard & monthly reviews',
                                    'Zero commute — HD recordings 24/7',
                                ].map((item) => (
                                    <li key={item}>
                                        <CheckCircle2 size={15} aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="prod-btn-row">
                                <a
                                    href="https://www.eduaitutors.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="prod-btn prod-btn-primary"
                                >
                                    Visit EduAiTutors <ExternalLink size={15} />
                                </a>
                                <a href="#demo" className="prod-btn prod-btn-outline-navy">
                                    Talk to our team
                                </a>
                            </div>
                        </motion.div>
                        <motion.div
                            className="prod-section-visual"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.08 }}
                        >
                            <img src="/images/hm-eduaitutors.png" alt="EduAiTutors NEET and JEE online coaching" loading="lazy" />
                        </motion.div>
                    </div>

                    <div className="prod-eduai-deep">
                        <div className="prod-section-header">
                            <Eyebrow center>How EduAiTutors Works</Eyebrow>
                            <h2>A system — not just content</h2>
                            <p>
                                Most platforms give lectures. EduAiTutors runs Diagnose → Design → Deliver → Evaluate → Improve
                                so every student closes the right gaps before the real exam.
                            </p>
                        </div>

                        <div className="prod-method-row" aria-label="Methodology stages">
                            {eduaiMethod.map((step, i) => (
                                <div key={step} className="prod-method-step">
                                    <span>{i + 1}</span>
                                    <strong>{step}</strong>
                                </div>
                            ))}
                        </div>

                        <div className="prod-eduai-pillars">
                            {eduaiPillars.map((p) => (
                                <div key={p.title} className="prod-eduai-pillar">
                                    <span className="prod-feature-icon" aria-hidden="true">
                                        <p.icon size={18} strokeWidth={1.75} />
                                    </span>
                                    <h3>{p.title}</h3>
                                    <p>{p.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="prod-eduai-programs">
                            <h3 className="prod-eduai-programs-title">
                                <BookOpen size={18} aria-hidden="true" /> Featured programs
                            </h3>
                            <div className="prod-eduai-programs-grid">
                                {eduaiPrograms.map((prog) => (
                                    <div key={prog.title} className="prod-eduai-program">
                                        <strong>{prog.title}</strong>
                                        <span>{prog.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="prod-eduai-compare">
                            <h3>Why students &amp; parents choose EduAiTutors</h3>
                            <ul>
                                {[
                                    'Small mentor-accessible live batches — not 150–300 student mass halls',
                                    'AI-personalised plans from diagnostic gaps, not one plan for everyone',
                                    'Weekly AI reports shared with parents + real-time dashboard',
                                    'Dedicated NRI/GCC support with local-friendly class timings',
                                    'Study material, mocks, and recordings included — no hidden premium tiers',
                                ].map((t) => (
                                    <li key={t}>
                                        <Target size={14} aria-hidden="true" />
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="ai-lms" className="prod-section prod-section--alt">
                <div className="container">
                    <div className="prod-section-grid prod-section-grid--reverse">
                        <motion.div
                            className="prod-section-content"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                        >
                            <Eyebrow>Live Product</Eyebrow>
                            <h2>AI-Powered LMS</h2>
                            <p className="prod-lead">
                                An intelligent learning management system for Pre-KG to Grade 12 — adaptive paths,
                                multi-role access, and analytics for schools and learners. More detailed product data
                                will be published here soon.
                            </p>
                            <div className="prod-feature-cards">
                                {lmsFeatures.map(({ icon: Icon, title, desc }) => (
                                    <div key={title} className="prod-feature-card">
                                        <span className="prod-feature-icon" aria-hidden="true">
                                            <Icon size={18} strokeWidth={1.75} />
                                        </span>
                                        <div>
                                            <strong>{title}</strong>
                                            <p>{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <a href="#demo" className="prod-section-link">
                                Request a demo <ArrowRight size={15} />
                            </a>
                        </motion.div>
                        <motion.div
                            className="prod-section-visual"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.08 }}
                        >
                            <img
                                src="/images/hm-ai-lms.png"
                                alt="AI-Powered LMS for Pre-KG to Grade 12"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="prod-grades">
                <div className="container">
                    <div className="prod-section-header">
                        <Eyebrow center>Grade Coverage</Eyebrow>
                        <h2>Universal Educational Journey</h2>
                        <p>One platform supporting learners from early childhood through high school graduation.</p>
                    </div>
                    <div className="prod-grades-grid">
                        {gradeLevels.map((g, i) => (
                            <motion.div
                                key={g.title}
                                className="prod-grade-card"
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                            >
                                <strong>{g.title}</strong>
                                <span>{g.desc}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="demo" className="prod-waitlist">
                <div className="container">
                    <motion.div
                        className="prod-waitlist-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <div className="prod-waitlist-head">
                            <Eyebrow center>Get Started</Eyebrow>
                            <h2>Request a product demo</h2>
                            <p>
                                Interested in LearnX, EduAiTutors partnerships, or AI-Powered LMS for your school?
                                Share your details and our team will respond.
                            </p>
                        </div>

                        {status.type !== 'idle' && (
                            <div className={`prod-form-status prod-form-status--${status.type}`}>
                                {status.type === 'success' && <CheckCircle size={18} aria-hidden="true" />}
                                {status.type === 'error' && <XCircle size={18} aria-hidden="true" />}
                                {status.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="prod-form">
                            <input type="text" name="name" placeholder="Full name *" value={formData.name} onChange={handleInputChange} required />
                            <input type="email" name="email" placeholder="Email address *" value={formData.email} onChange={handleInputChange} required />
                            <input type="tel" name="phone" placeholder="Phone (optional)" value={formData.phone} onChange={handleInputChange} />
                            <select name="role" value={formData.role} onChange={handleInputChange} required>
                                <option value="" disabled>I am a...</option>
                                <option value="Student">Student</option>
                                <option value="Parent">Parent</option>
                                <option value="Educator">Educator</option>
                                <option value="Administrator">Administrator</option>
                                <option value="Other">Other</option>
                            </select>
                            <input type="text" name="institution" placeholder="Institution / organization" value={formData.institution} onChange={handleInputChange} />
                            <select name="gradeRange" value={formData.gradeRange} onChange={handleInputChange}>
                                <option value="" disabled>Product interest</option>
                                <option value="LearnX">LearnX</option>
                                <option value="EduAiTutors">EduAiTutors</option>
                                <option value="AI-Powered LMS">AI-Powered LMS</option>
                                <option value="Multiple">Multiple products</option>
                            </select>
                            <button type="submit" className="prod-btn prod-btn-primary prod-btn-full" disabled={status.type === 'loading'}>
                                {status.type === 'loading' ? 'Submitting...' : 'Request Demo'}
                                {status.type !== 'loading' && <ArrowRight size={16} />}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            <section className="prod-cta">
                <div className="container">
                    <motion.div
                        className="prod-cta-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <h2>Interested in our education products?</h2>
                        <p>Speak with our team about partnerships, pilots, or enterprise licensing.</p>
                        <div className="prod-cta-actions">
                            <Link to="/contact" className="prod-btn prod-btn-primary">
                                Contact Us <ArrowRight size={16} />
                            </Link>
                            <a href="mailto:info@kamglobalai.com" className="prod-btn prod-btn-secondary">
                                <Mail size={16} /> info@kamglobalai.com
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default LMS;
