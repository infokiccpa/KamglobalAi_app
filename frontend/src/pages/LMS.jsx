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

    const features = [
        { icon: Cpu, title: 'Adaptive AI Core', desc: 'Learning paths that evolve in real-time based on student cognitive patterns.' },
        { icon: BarChart3, title: 'Vision Analytics', desc: 'Predictive insights that help educators anticipate academic needs.' },
        { icon: Target, title: 'Gamified Mastery', desc: 'Education turned into an immersive journey with rewards and goals.' }
    ];

    return (
        <div className="lms-page">
            <Helmet>
                <title>AI-Powered LMS | Future of Educational Technology | KamGlobal AI</title>
                <meta name="description" content="Discover our revolutionary, AI-powered Learning Management System for Pre-KG to Grade 12. Personalized mastery through adaptive intelligence." />
            </Helmet>
            {/* Hero Section */}
            <motion.section
                className="lms-hero"
                ref={heroRef}
                style={{ opacity: heroOpacity }}
            >
                {/* Video Background */}
                <video
                    className="hero-video-background"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/hero-background.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="hero-video-overlay"></div>

                <div className="container">
                    <motion.div className="hero-content" style={{ translateY: heroContentY }}>
                        <motion.div
                            className="floating-glass-badge"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Rocket size={16} style={{ marginRight: '10px' }} /> Launching — Late 2026
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
                            <button className="glass-pill" style={{ marginLeft: '1.5rem' }} onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>Request Demo</button>
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

            {/* About Our Product Section - NEW */}
            <section className="section about-product-section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header-centered"
                    >
                        <h2 className="section-title-premium">About Our Product</h2>
                        <p className="section-subtitle">Revolutionizing education through artificial intelligence</p>
                    </motion.div>

                    <div className="about-product-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="about-product-content"
                        >
                            <h3>The Future of Personalized Learning</h3>
                            <p>Our AI-Powered LMS isn't just another learning platform—it's a revolutionary educational ecosystem designed to adapt to each student's unique learning style, pace, and goals.</p>

                            <div className="product-benefits">
                                <div className="benefit-item">
                                    <CheckCircle size={20} className="benefit-icon" />
                                    <div>
                                        <h4>Real-Time Adaptation</h4>
                                        <p>AI algorithms continuously analyze student performance and adjust difficulty levels in real-time.</p>
                                    </div>
                                </div>
                                <div className="benefit-item">
                                    <CheckCircle size={20} className="benefit-icon" />
                                    <div>
                                        <h4>Comprehensive Coverage</h4>
                                        <p>Complete curriculum from Pre-KG to Grade 12 across all major subjects and learning paths.</p>
                                    </div>
                                </div>
                                <div className="benefit-item">
                                    <CheckCircle size={20} className="benefit-icon" />
                                    <div>
                                        <h4>Teacher Empowerment</h4>
                                        <p>Advanced analytics and AI assistance free up educators to focus on mentorship and creative teaching.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="about-product-visual"
                        >
                            <div className="glass-vision stats-container">
                                <div className="stat-box">
                                    <h3>15+</h3>
                                    <p>Subjects Covered</p>
                                </div>
                                <div className="stat-box">
                                    <h3>1000+</h3>
                                    <p>Interactive Lessons</p>
                                </div>
                                <div className="stat-box">
                                    <h3>24/7</h3>
                                    <p>AI Tutor Access</p>
                                </div>
                                <div className="stat-box">
                                    <h3>99%</h3>
                                    <p>Student Satisfaction</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Technology Stack Section - NEW */}
            <section className="section tech-stack-section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header-centered"
                    >
                        <h2 className="section-title-premium">Built with Cutting-Edge Technology</h2>
                        <p className="section-subtitle">Powered by the latest in AI and cloud infrastructure</p>
                    </motion.div>

                    <div className="tech-stack-grid">
                        {[
                            { name: 'GPT-4 AI', desc: 'Advanced natural language processing' },
                            { name: 'Cloud Infrastructure', desc: '99.99% uptime guarantee' },
                            { name: 'Adaptive Algorithms', desc: 'Real-time learning optimization' },
                            { name: 'Secure Platform', desc: 'Enterprise-grade encryption' },
                            { name: 'Mobile Ready', desc: 'iOS, Android, and Web' },
                            { name: 'Analytics Dashboard', desc: 'Deep performance insights' }
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="tech-card glass-vision"
                            >
                                <Cpu size={32} style={{ color: '#6366f1', marginBottom: '1rem' }} />
                                <h4>{tech.name}</h4>
                                <p>{tech.desc}</p>
                            </motion.div>
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
