import { Target, Eye, Laptop, Cloud, Users, TrendingUp, Info, Rocket, Globe, CheckCircle2, ShieldCheck, Handshake, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import CountUp from 'react-countup';
import './About.css';

const About = () => {
    return (
        <div className="about-page premium-redesign">
            {/* Hero Section */}
            <section className="about-hero-modern">
                <div className="abstract-shape shape-1"></div>
                <div className="abstract-shape shape-2"></div>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="hero-content-modern"
                    >
                        <span className="hero-badge-glow">Global Technology Partner</span>
                        <h1>About KAM Global AI</h1>
                        <p className="hero-modern-subtitle">Bridging Kuwait’s Strategic Vision with India’s Engineering Excellence</p>
                    </motion.div>
                </div>
            </section>

            {/* Split Layout: Our Story */}
            <section className="section story-split-section">
                <div className="container">
                    <div className="story-split-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="story-text-container"
                        >
                            <span className="badge-small">OUR STORY</span>
                            <h2 className="premium-heading">Architecting the <span className="highlight-purple">Future</span></h2>
                            <div className="title-underline-gradient"></div>
                            <p className="premium-p">Founded in 2026, KAM Global AI is a premium IT solutions provider headquartered in India and backed by KAM Group, Kuwait. We seamlessly bridge Middle Eastern business leadership with India’s world-class engineering talent.</p>
                            <p className="premium-p">We partner with global enterprises to architect secure, scalable, and future-ready digital foundations. Our execution-driven approach ensures measurable business impact through continuous technical innovation.</p>

                            <div className="about-mini-stats">
                                <div className="mini-stat-item glass-card-premium">
                                    <span className="ms-num"><CountUp end={10} suffix="+" enableScrollSpy scrollSpyOnce /></span>
                                    <span className="ms-lbl">Years Legacy</span>
                                </div>
                                <div className="mini-stat-item glass-card-premium">
                                    <span className="ms-num"><CountUp end={100} suffix="%" enableScrollSpy scrollSpyOnce /></span>
                                    <span className="ms-lbl">Delivery Rate</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="story-image-asymmetric"
                        >
                            <div className="asymmetric-image-wrapper">
                                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team collaborating" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission Split Layers */}
            <section className="section vision-layers">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="vision-card-layered glass-card-premium"
                    >
                        <div className="layer-content">
                            <Target size={36} className="layer-icon text-purple" />
                            <h3>Accelerating Business</h3>
                            <p>Delivering intelligent, secure, and scalable technology frameworks that enable organizations to dominate the digital transformation era.</p>
                        </div>
                        <div className="layer-content">
                            <Eye size={36} className="layer-icon text-blue" />
                            <h3>Globally Trusted</h3>
                            <p>Setting enterprise benchmarks in innovation, anticipating technological change, and engineering future-ready software solutions.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Principles of Excellence (Accordion instead of cards) */}
            <section className="section enterprise-principles">
                <div className="container">
                    <div className="principles-split">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="principles-sticky-header"
                        >
                            <span className="badge-small">CORE VALUES</span>
                            <h2 className="premium-heading">Principles of <br />Excellence</h2>
                            <p className="premium-p">Foundational beliefs driving our global delivery, ensuring high-compliance and uncompromised quality.</p>
                        </motion.div>

                        <div className="principles-list">
                            {[
                                { icon: Sparkles, title: "Innovation with Purpose", desc: "We pursue innovation that delivers real business impact with AI, automation, and cloud." },
                                { icon: ShieldCheck, title: "Integrity & Transparency", desc: "We operate with uncompromising integrity, open communication, and accountability." },
                                { icon: CheckCircle2, title: "Excellence in Execution", desc: "We deliver quality with precision, reliability, and continuous improvement." },
                                { icon: Users, title: "Customer-Centric Mindset", desc: "We align solutions with objectives to ensure measurable and sustainable value." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="principle-list-item glass-card-premium"
                                >
                                    <div className="ple-icon-wrap"><item.icon size={24} /></div>
                                    <div className="ple-text">
                                        <h4>{item.title}</h4>
                                        <p>{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Expansion Map Section */}
            <section className="section expansion-modern">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-4"
                    >
                        <Globe size={48} color="#0ea5e9" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
                        <h2 className="premium-heading">Kuwait-India <span className="highlight-blue">Expansion</span></h2>
                        <p className="premium-p max-w-800 mx-auto">Our dual-location model combines strategic investment with top-tier engineering talent.</p>
                    </motion.div>

                    <div className="expansion-glass-cards">
                        <motion.div className="exp-card glass-card-premium" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
                            <div className="exp-dot kw"></div>
                            <h3>Kuwait Headquarters</h3>
                            <ul>
                                <li><CheckCircle2 size={16} /> Strategic investor relations & business hub</li>
                                <li><CheckCircle2 size={16} /> Regional market access & partnerships</li>
                                <li><CheckCircle2 size={16} /> Client relationship management</li>
                            </ul>
                        </motion.div>
                        <motion.div className="exp-card glass-card-premium" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
                            <div className="exp-dot in"></div>
                            <h3>India Delivery Center</h3>
                            <ul>
                                <li><CheckCircle2 size={16} /> World-class engineering & product teams</li>
                                <li><CheckCircle2 size={16} /> 24/7 support & technical operations</li>
                                <li><CheckCircle2 size={16} /> Cloud & AI innovation labs</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sticky Lead Capture CTA */}
            <section className="section footer-lead-cta">
                <div className="container">
                    <div className="cta-modern-box glass-card-premium" style={{ marginBottom: 0 }}>
                        <h2>Ready to transform your enterprise?</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: '#64748b', fontSize: '1.1rem' }}>Get in touch with our consulting experts today to explore global solutions for your organization.</p>
                        <a href="/contact" className="btn btn-orange">Schedule a Consultation</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
