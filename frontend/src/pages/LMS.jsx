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
                setStatus({ type: 'success', message: 'You\'re on the waitlist! We\'ll be in touch soon.' });
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
                <title>Our Products | KamGlobal AI — EduAiTutors & AI-Powered LMS</title>
                <meta
                    name="description"
                    content="Explore KamGlobal AI products: EduAiTutors for NEET & JEE coaching and our upcoming AI-Powered LMS for Pre-KG to Grade 12."
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
                            Innovative education platforms developed by KamGlobal AI — from competitive
                            exam coaching to school-wide intelligent learning.
                        </p>
                        <nav className="prod-jump-nav" aria-label="Product sections">
                            <a href="#eduaitutors" className="prod-jump-link">EduAiTutors</a>
                            <a href="#ai-lms" className="prod-jump-link">AI-Powered LMS</a>
                            <a href="#waitlist" className="prod-jump-link">Join Waitlist</a>
                        </nav>
                    </motion.div>
                </div>
            </section>

            <section className="prod-overview">
                <div className="container">
                    <div className="prod-overview-grid">
                        <a href="#eduaitutors" className="prod-overview-card">
                            <span className="prod-badge prod-badge--live">Live</span>
                            <h3>EduAiTutors</h3>
                            <p>NEET & JEE online coaching for India and the GCC</p>
                        </a>
                        <a href="#ai-lms" className="prod-overview-card">
                            <span className="prod-badge prod-badge--soon">Launching Soon</span>
                            <h3>AI-Powered LMS</h3>
                            <p>Adaptive learning platform for Pre-KG to Grade 12</p>
                        </a>
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
                            <Eyebrow>Flagship Product</Eyebrow>
                            <h2>EduAiTutors</h2>
                            <p className="prod-lead">
                                A comprehensive, AI-powered online coaching platform for NEET and JEE aspirants
                                across India and the GCC — combining live classes with intelligent analytics.
                            </p>
                            <ul className="prod-features-list">
                                {['Live NEET & JEE coaching', 'AI-powered rank analytics', 'GCC-friendly online batches', 'Weekly mentor-led insights'].map((item) => (
                                    <li key={item}>
                                        <CheckCircle2 size={15} aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="https://www.eduaitutors.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="prod-btn prod-btn-primary"
                            >
                                Visit EduAiTutors <ExternalLink size={15} />
                            </a>
                        </motion.div>
                        <motion.div
                            className="prod-section-visual"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.08 }}
                        >
                            <img src="/images/eduaitutors.png" alt="EduAiTutors platform" loading="lazy" />
                        </motion.div>
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
                            <Eyebrow>Coming Soon</Eyebrow>
                            <h2>AI-Powered LMS</h2>
                            <p className="prod-lead">
                                A revolutionary learning management system for Pre-KG to Grade 12 — personalized
                                mastery through adaptive intelligence for schools and students.
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
                            <a href="#waitlist" className="prod-section-link">
                                Join the waitlist <ArrowRight size={15} />
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
                                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
                                alt="Students learning with technology"
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

            <section id="waitlist" className="prod-waitlist">
                <div className="container">
                    <motion.div
                        className="prod-waitlist-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <div className="prod-waitlist-head">
                            <Eyebrow center>Early Access</Eyebrow>
                            <h2>Join the AI-Powered LMS Waitlist</h2>
                            <p>Be among the first schools and educators to experience the next generation of intelligent education.</p>
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
                                <option value="" disabled>Grade range (if applicable)</option>
                                <option value="Pre-KG">Pre-KG</option>
                                <option value="Elementary">Elementary (G1–G5)</option>
                                <option value="Middle School">Middle School (G6–G8)</option>
                                <option value="High School">High School (G9–G12)</option>
                                <option value="Multiple">Multiple levels</option>
                            </select>
                            <button type="submit" className="prod-btn prod-btn-primary prod-btn-full" disabled={status.type === 'loading'}>
                                {status.type === 'loading' ? 'Submitting...' : 'Request Invitation'}
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
