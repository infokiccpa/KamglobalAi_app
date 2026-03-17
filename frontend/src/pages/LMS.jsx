import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { BarChart3, CheckCircle, ArrowRight, Rocket, Target, Cpu, XCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './LMS.css';
import './LMS-new-sections.css';

const VisionCard = ({ icon: Icon, title, desc, delay }) => { // eslint-disable-line no-unused-vars
    return (
        <motion.div
            className="glass-vision vision-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="v-card-icon">
                <Icon size={28} />
            </div>
            <h3 className="v-card-title">{title}</h3>
            <p className="v-card-desc">{desc}</p>
        </motion.div>
    );
};

const AnimatedLineText = ({ text, className, delay = 0 }) => {
    return (
        <h1 className={className}>
            {text.split(' ').map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: delay + (i * 0.12), ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'inline-block', marginRight: '0.3em' }}
                >
                    {word}
                </motion.span>
            ))}
        </h1>
    );
};

const LMS = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        institution: '',
        role: '',
        gradeRange: ''
    });
    const [status, setStatus] = useState({ type: 'idle', message: '' });

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
    const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Processing your request...' });

        if (!formData.name || !formData.email || !formData.role) {
            setStatus({ type: 'error', message: 'Please complete the required fields.' });
            return;
        }

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Successfully joined the waitlist! We will contact you soon.' });
                setFormData({ name: '', email: '', phone: '', institution: '', role: '', gradeRange: '' });
            } else {
                setStatus({ type: 'error', message: data.message || 'Failed to join waitlist. Please try again.' });
            }
        } catch {
            setStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
        }
    };

    return (
        <div className="lms-page">
            <Helmet>
                <title>AI-Powered LMS | Future of Educational Technology | KamGlobal AI</title>
                <meta name="description" content="Discover our revolutionary, AI-powered Learning Management System for Pre-KG to Grade 12. Personalized mastery through adaptive intelligence." />
            </Helmet>

            {/* Top: Our Products */}
            <section className="section products-hero">
                <div className="products-hero-overlay" />
                <div className="container products-hero-inner">
                    <div className="products-hero-content">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9 }}
                            className="products-hero-title"
                        >
                            Our Products
                        </motion.h2>
                        <div className="products-hero-underline" />
                        <motion.p
                            className="products-hero-subtitle"
                            initial={{ opacity: 0, y: 6 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.12 }}
                        >
                            Innovative AI-powered learning solutions developed and owned by KamGlobal AI.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Top: Flagship Products */}
            <section className="section flagship-product">
                <div className="container">
                    <div className="section-header-centered">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2 }}
                            className="section-title-premium"
                        >
                            Flagship Products
                        </motion.h2>
                        <motion.p
                            className="section-subtitle"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                        >
                            Our leading digital platforms transforming competitive preparation and school learning.
                        </motion.p>
                    </div>

                    <div className="glass-vision vision-card flagship-layout">
                        <div className="flagship-grid">
                            <div className="flagship-visual">
                                <img
                                    src="/images/eduaitutors.png"
                                    alt="EduAiTutors online NEET & JEE coaching"
                                    style={{ width: '100%', borderRadius: '26px 0 0 26px', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="flagship-content">
                                <h3 className="v-card-title" style={{ fontSize: '2.2rem' }}>EduAiTutors</h3>
                                <p className="v-card-desc">
                                    EduAiTutors is a comprehensive, AI-powered online coaching platform for NEET and JEE aspirants across India and the GCC.
                                    Built around personalised, mentor-driven preparation, it combines live interactive classes with intelligent analytics
                                    so students can study smarter, not just harder.
                                </p>
                                <ul className="flagship-bullets">
                                    <li>Live NEET & JEE coaching</li>
                                    <li>AI-powered rank analytics</li>
                                    <li>GCC-friendly online batches</li>
                                    <li>Weekly mentor-led insights</li>
                                </ul>
                                <button
                                    className="glass-pill primary"
                                    onClick={() => window.open('https://www.eduaitutors.com/', '_blank')}
                                    style={{ marginTop: '1.5rem' }}
                                >
                                    Visit EduAiTutors
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Grade Coverage Horizontal Segments */}
            <section className="section grade-coverage">
                <div className="container">
                    <div className="text-center">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                            style={{ fontSize: '2.5rem', fontWeight: 800 }}
                        >
                            Universal Educational Journey
                        </motion.h2>
                    </div>

                    <div className="journey-segments">
                        {[
                            { title: "Pre-KG", desc: "Early Foundations" },
                            { title: "Elementary", desc: "Core Skills" },
                            { title: "Middle School", desc: "Excellence" },
                            { title: "High School", desc: "Prep & Success" }
                        ].map((g, i) => (
                            <motion.div
                                key={i}
                                className="glass-segment"
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="segment-title">{g.title}</span>
                                <span className="segment-desc">{g.desc}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Waitlist Dark Frost */}
            <section className="section waitlist-section" id="waitlist">
                <div className="container">
                    <motion.div
                        className="glass-vision vision-card waitlist-glass"
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="text-center">
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Reserve Early Access</h2>
                            <p className="v-card-desc">Enter the next generation of intelligent education.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="lux-input-grid">
                            <input type="text" name="name" placeholder="Full Name" className="frosted-input" value={formData.name} onChange={handleInputChange} required />
                            <input type="email" name="email" placeholder="Email" className="frosted-input" value={formData.email} onChange={handleInputChange} required />
                            <input type="tel" name="phone" placeholder="Phone (Optional)" className="frosted-input" value={formData.phone} onChange={handleInputChange} />
                            <select name="role" className="frosted-input" value={formData.role} onChange={handleInputChange} required>
                                <option value="" disabled>I am a...</option>
                                <option value="Student">Student</option>
                                <option value="Parent">Parent</option>
                                <option value="Educator">Educator</option>
                                <option value="Administrator">Administrator</option>
                                <option value="Other">Other</option>
                            </select>
                            <input type="text" name="institution" placeholder="Institution / Organization" className="frosted-input" value={formData.institution} onChange={handleInputChange} />
                            <select name="gradeRange" className="frosted-input" value={formData.gradeRange} onChange={handleInputChange}>
                                <option value="" disabled>Grade Range (If applicable)</option>
                                <option value="Pre-KG">Pre-KG</option>
                                <option value="Elementary">Elementary (G1-G5)</option>
                                <option value="Middle School">Middle School (G6-G8)</option>
                                <option value="High School">High School (G9-G12)</option>
                                <option value="Multiple">Multiple Levels</option>
                            </select>

                            <div style={{ gridColumn: '1 / -1' }}>
                                <AnimatePresence mode="wait">
                                    {status.type !== 'idle' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            style={{
                                                marginBottom: '1.5rem',
                                                textAlign: 'center',
                                                padding: '1rem',
                                                borderRadius: '12px',
                                                background: status.type === 'error' ? 'rgba(255, 59, 48, 0.1)' : (status.type === 'success' ? 'rgba(52, 199, 89, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
                                                color: status.type === 'error' ? '#ff3b30' : (status.type === 'success' ? '#34c759' : '#888'),
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '10px'
                                            }}
                                        >
                                            {status.type === 'success' && <CheckCircle size={20} />}
                                            {status.type === 'error' && <XCircle size={20} />}
                                            {status.message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <button type="submit" className="glass-pill primary w-full" style={{ padding: '1.4rem' }} disabled={status.type === 'loading'}>
                                    {status.type === 'loading' ? 'Encrypting...' : 'Request Invitation'} <ArrowRight size={20} style={{ marginLeft: '12px' }} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default LMS;
