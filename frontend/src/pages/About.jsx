import React from 'react';
import { Target, Eye, Shield, Laptop, Cloud, Users, TrendingUp, Info, Rocket, Globe, CheckCircle2, ShieldCheck, Handshake, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="hero-content"
                    >
                        <span className="hero-badge">Global Technology Partner</span>
                        <h1>About KAM Global AI</h1>
                        <p>Bridging Kuwait’s Strategic Vision with India’s Engineering Excellence</p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section className="section our-story">
                <div className="container story-grid">
                    <div className="story-text">
                        <h2>Our Story</h2>
                        <p>Founded in 2026, KAM Global AI is a premium IT solutions provider headquartered in India and backed by KAM Group, Kuwait. We bridge Middle Eastern business leadership with India’s world-class engineering talent.</p>
                        <p>We partner with global enterprises to deliver secure, scalable, and future-ready digital solutions. Our execution-driven approach focuses on creating measurable business impact through innovation and continuous improvement.</p>
                        <p>Backed by deep regional expertise, we empower businesses with intelligent technology built for today and engineered for tomorrow.</p>
                    </div>
                    <div className="story-image">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team collaborating" />
                    </div>
                </div>
            </section>

            {/* Removed duplicate Foundation section */}

            <section className="section mv-section">
                <div className="container mv-grid">
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="mv-card glass"
                    >
                        <Target size={32} className="mv-icon" />
                        <span className="badge-small">Our Mission</span>
                        <h2 className="mv-title">Accelerating Business Through Intelligent, Secure, Scalable Technology</h2>
                        <div className="title-underline"></div>
                        <div className="mv-lines">
                            <p>We deliver intelligent, secure, and scalable technology that enables organizations to innovate and grow in a digital world.</p>
                            <p>Focusing on AI-driven innovation and cloud-native architectures, we solve complex challenges with engineering excellence.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="mv-card glass"
                    >
                        <Eye size={32} className="mv-icon" />
                        <span className="badge-small">Our Vision</span>
                        <h2 className="mv-title">Globally Trusted Technology Partner</h2>
                        <div className="title-underline"></div>
                        <div className="mv-lines">
                            <p>To be a globally trusted technology partner, recognized for setting benchmarks in innovation and digital impact.</p>
                            <ul className="mv-list">
                                <li><CheckCircle2 size={18} className="check" /> Anticipating technological change</li>
                                <li><CheckCircle2 size={18} className="check" /> Delivering future-ready solutions</li>
                                <li><CheckCircle2 size={18} className="check" /> Building lasting partnerships</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Removed standalone Vision section to avoid duplication */}

            {/* Enterprise Values Section */}
            <section className="section enterprise-values">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header-centered"
                    >
                        <span className="badge-enterprise">OUR VALUES</span>
                        <h2>Principles of Excellence</h2>
                        <p className="subtitle-premium">Foundational beliefs that drive our global delivery and innovation.</p>
                    </motion.div>

                    <div className="values-glass-grid">
                        {[
                            {
                                icon: Sparkles,
                                title: "Innovation with Purpose",
                                desc: "We pursue innovation that delivers real business impact with AI, automation, and cloud."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Integrity & Transparency",
                                desc: "We operate with uncompromising integrity, open communication, and accountability."
                            },
                            {
                                icon: CheckCircle2,
                                title: "Excellence in Execution",
                                desc: "We deliver quality with precision, reliability, and continuous improvement."
                            },
                            {
                                icon: Users,
                                title: "Customer-Centric Mindset",
                                desc: "We align solutions with objectives to ensure measurable and sustainable value."
                            },
                            {
                                icon: Handshake,
                                title: "Collaboration & Ownership",
                                desc: "We work as an extension of our clients with shared responsibility and trust."
                            },
                            {
                                icon: Lock,
                                title: "Security & Compliance",
                                desc: "We embed governance, compliance, and risk management into all solutions."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="value-glass-card"
                            >
                                <div className="icon-glow-wrap">
                                    <item.icon size={24} className="value-icon-svg" />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                                <div className="card-hover-arrow">
                                    <ArrowRight size={18} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enterprise Departments Section */}
            <section className="section enterprise-departments">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header-centered"
                    >
                        <span className="badge-enterprise">OUR DEPARTMENTS</span>
                        <h2>Specialized Global Divisions</h2>
                        <p className="subtitle-premium">Driving technical excellence across the enterprise landscape.</p>
                    </motion.div>

                    <div className="departments-hierarchy-grid">
                        {/* Primary Departments - More prominent */}
                        <div className="deps-row primary-deps">
                            {[
                                {
                                    icon: Laptop,
                                    title: "IT Development",
                                    desc: "Custom web and mobile engineering designed for global scalability."
                                },
                                {
                                    icon: Cloud,
                                    title: "Cloud Services",
                                    desc: "Expert cloud architecture and DevOps management at scale."
                                },
                                {
                                    icon: Rocket,
                                    title: "Product Development",
                                    desc: "AI-driven education and smart solutions for the next generation."
                                },
                                {
                                    icon: Users,
                                    title: "IT Staffing",
                                    desc: "Connecting businesses with top-tier technical talent."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Digital Marketing",
                                    desc: "Growth through data-driven AI-powered campaigns."
                                },
                                {
                                    icon: Info,
                                    title: "Consulting",
                                    desc: "Strategic guidance for digital transformation."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -10 }}
                                    className="dep-card-enterprise primary"
                                >
                                    <div className="dep-card-content">
                                        <item.icon size={32} className="dep-icon" />
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                        <span className="dep-tag">Strategic Division</span>
                                    </div>
                                    <div className="card-accent-line"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Reordered: Vision and Values moved above, Departments moved below */}

            {/* Kuwait-India Expansion */}
            <section className="expansion-banner">
                <div className="container text-center">
                    <Globe size={48} className="globe-icon" />
                    <h2>Kuwait-India Expansion</h2>
                    <p>Our strategic dual-location model combines the best of both worlds.</p>
                    <div className="expansion-grid">
                        <div className="expansion-box">
                            <h3>Kuwait Headquarters</h3>
                            <ul>
                                <li>Strategic business operations and client relations</li>
                                <li>Regional market expertise and partnerships</li>
                                <li>Consulting and business development hub</li>
                                <li>Client support and project management</li>
                            </ul>
                        </div>
                        <div className="expansion-box">
                            <h3>India Operations</h3>
                            <ul>
                                <li>Large-scale development and engineering teams</li>
                                <li>24/7 operations and technical support</li>
                                <li>Innovation lab for AI and emerging technologies</li>
                                <li>Cost-effective delivery without compromising quality</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Business Expansion */}
            <section className="section featured-lms-highlight">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lms-highlight-card"
                    >
                        <div className="lms-highlight-grid">
                            <div className="lms-h-text">
                                <span className="badge-small">Launching 2026</span>
                                <h2>AI-Powered Learning Management System</h2>
                                <p>We are engineering a revolutionary Learning Management System designed for the next generation. From Pre-KG to Grade 12, our platform leverages adaptive AI to personalize education, providing students with tailored paths and educators with deep, actionable insights.</p>
                                <div className="lms-h-features">
                                    <div className="h-f-item"><CheckCircle2 size={18} /> Adaptive Learning</div>
                                    <div className="h-f-item"><CheckCircle2 size={18} /> Real-time Analytics</div>
                                    <div className="h-f-item"><CheckCircle2 size={18} /> Global Standards</div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="btn btn-primary mt-2"
                                    onClick={() => window.location.href = '/lms'}
                                >
                                    Explore Future of EdTech <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                                </motion.button>
                            </div>
                            <div className="lms-h-image">
                                <motion.div
                                    className="image-frame-lux"
                                    whileHover={{ scale: 1.02, rotate: -1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1000" alt="LMS Product Showcase" />
                                    <div className="frame-glow"></div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
