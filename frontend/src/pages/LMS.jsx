import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Sparkles, BarChart3, Presentation, Users2, BookOpen, ScrollText, CheckCircle, ShieldCheck, ArrowRight, Zap, Globe, Smartphone, Lock, Rocket, Target, Cpu } from 'lucide-react';
import './LMS.css';

const VisionCard = ({ icon: Icon, title, desc, delay }) => {
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
        role: 'I am a...',
        gradeRange: 'Grade Range'
    });
    const [formStatus, setFormStatus] = useState({ type: '', message: '' });

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
        setFormStatus({ type: 'loading', message: 'Processing your request...' });

        if (!formData.name || !formData.email || formData.role === 'I am a...') {
            setFormStatus({ type: 'error', message: 'Please complete the required fields.' });
            return;
        }

        setTimeout(() => {
            setFormStatus({ type: 'success', message: 'Access granted. We will contact you shortly.' });
            setFormData({ name: '', email: '', phone: '', institution: '', role: 'I am a...', gradeRange: 'Grade Range' });
        }, 1800);
    };

    const features = [
        { icon: Cpu, title: 'Adaptive AI Core', desc: 'Learning paths that evolve in real-time based on student cognitive patterns.' },
        { icon: BarChart3, title: 'Vision Analytics', desc: 'Predictive insights that help educators anticipate academic needs.' },
        { icon: Target, title: 'Gamified Mastery', desc: 'Education turned into an immersive journey with rewards and goals.' }
    ];

    return (
        <div className="lms-page">
            {/* Hero Section */}
            <motion.section
                className="lms-hero"
                ref={heroRef}
                style={{ opacity: heroOpacity }}
            >
                <div className="container">
                    <motion.div className="hero-content" style={{ translateY: heroContentY }}>
                        <motion.div
                            className="floating-glass-badge"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Rocket size={16} style={{ marginRight: '10px' }} /> Launching soon — 2026
                        </motion.div>

                        <AnimatedLineText
                            text="AI-Powered Learning Management System"
                            className="hero-headline"
                        />

                        <motion.p
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            The future of education, re-engineered for personal mastery.
                            From Pre-KG to Grade 12.
                        </motion.p>

                        <motion.div
                            className="hero-ctas"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5, delay: 1.5 }}
                        >
                            <button className="glass-pill primary" onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>Join Waitlist</button>
                            <button className="glass-pill" style={{ marginLeft: '1.5rem' }}>Request Demo</button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Features Glass Panels */}
            <section className="section intelligent-features">
                <div className="container">
                    <div className="text-center">
                        <motion.h2
                            className="v-card-title"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                            style={{ fontSize: '3rem' }}
                        >
                            Powered by Intelligence
                        </motion.h2>
                    </div>
                    <div className="features-grid">
                        {features.map((f, i) => (
                            <VisionCard key={i} {...f} delay={i * 0.2} />
                        ))}
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

            {/* Split Panel Value Prop */}
            <section className="section value-proposition-panel">
                <div className="container">
                    <div className="glass-vision vision-card">
                        <div className="split-glass-layout">
                            <motion.div
                                className="prop-list"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2 }}
                            >
                                <h3 className="v-card-title" style={{ fontSize: '2.5rem' }}>Designed for Success</h3>
                                <p className="v-card-desc">Our platform bridges the gap between traditional learning and future capabilities.</p>
                                {[
                                    { title: "Immersive Engagement", text: "3x higher retention through gamified experiences." },
                                    { title: "Teacher Co-Pilot", text: "AI handles grading so teachers can focus on mentorship." },
                                    { title: "Parent Connectivity", text: "Real-time visibility into digital learning milestones." }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="prop-item"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                                    >
                                        <CheckCircle className="prop-icon" />
                                        <div>
                                            <h4 style={{ fontWeight: 700 }}>{item.title}</h4>
                                            <p style={{ color: '#86868b', fontSize: '0.95rem' }}>{item.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                            <motion.div
                                className="prop-image-container"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5 }}
                            >
                                <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1000" alt="Students learning" />
                            </motion.div>
                        </div>
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, letterspacing: '-0.02em' }}>Reserve Early Access</h2>
                            <p className="v-card-desc">Enter the next generation of intelligent education.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="lux-input-grid">
                            <input type="text" name="name" placeholder="Full Name" className="frosted-input" value={formData.name} onChange={handleInputChange} required />
                            <input type="email" name="email" placeholder="Email" className="frosted-input" value={formData.email} onChange={handleInputChange} required />
                            <input type="tel" name="phone" placeholder="Phone (Optional)" className="frosted-input" value={formData.phone} onChange={handleInputChange} />
                            <select name="role" className="frosted-input" value={formData.role} onChange={handleInputChange}>
                                <option>I am a...</option>
                                <option>Student</option>
                                <option>Parent</option>
                                <option>Educator</option>
                                <option>Administrator</option>
                                <option>Other</option>
                            </select>

                            <div style={{ gridColumn: '1 / -1' }}>
                                {formStatus.message && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{
                                            marginBottom: '1.5rem',
                                            textAlign: 'center',
                                            color: formStatus.type === 'error' ? '#ff3b30' : '#34c759',
                                            fontWeight: 600
                                        }}
                                    >
                                        {formStatus.message}
                                    </motion.p>
                                )}
                                <button type="submit" className="glass-pill primary w-full" style={{ padding: '1.4rem' }} disabled={formStatus.type === 'loading'}>
                                    {formStatus.type === 'loading' ? 'Encrypting...' : 'Request Invitation'} <ArrowRight size={20} style={{ marginLeft: '12px' }} />
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
