import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, Cpu, BarChart, Users, Zap, Award, DollarSign, Laptop, ArrowRight, ShieldCheck, X } from 'lucide-react';
import './WhyKamGlobalAI.css';

const WhyKamGlobalAI = () => {
    const [showVideo, setShowVideo] = useState(false);

    const advantages = [
        {
            icon: Shield,
            title: "Global Backing",
            desc: "Strategically backed by KAM Group Kuwait, offering enterprise-level stability and a strong regional presence."
        },
        {
            icon: Globe,
            title: "India Delivery Advantage",
            desc: "Accessing India's premier technical talent pool while maintaining global service quality standards."
        },
        {
            icon: Cpu,
            title: "End-to-End Services",
            desc: "From initial consulting to full-scale digital implementation and ongoing maintenance."
        },
        {
            icon: Award,
            title: "Enterprise Standards",
            desc: "Strict adherence to international security protocols and industry best practices."
        },
        {
            icon: Users,
            title: "Long-Term Partnership",
            desc: "We focus on scalable relationships that grow alongside your business transformation."
        }
    ];


    const storytelling = [
        {
            icon: Zap,
            title: "Innovation Focus",
            desc: "Driving growth through AI-powered solutions and next-gen technology stacks."
        },
        {
            icon: BarChart,
            title: "Rapid Deployment",
            desc: "Accelerated development cycles ensuring faster time-to-market for your projects."
        },
        {
            icon: DollarSign,
            title: "Cost Efficiency",
            desc: "Maximizing ROI through optimized offshore delivery models and lean execution."
        }
    ];

    return (
        <div className="why-kam-page">
            {/* Redesigned Hero Section */}
            <section className="why-hero-new">
                <div className="container why-hero-grid">
                    <motion.div
                        className="why-hero-text"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="trust-badge-new">
                            <ShieldCheck size={16} />
                            <span>Strategic Enterprise Partner – KAM Group Kuwait</span>
                        </div>

                        <h1 className="hero-main-title">
                            Strategic Vision <br />
                            Meets Precision <br />
                            <span>Execution.</span>�
                        </h1>

                        <p className="hero-subtext">
                            We bridge the gap between complex business challenges and
                            world-class technical implementation. Leverage our dual-location
                            excellence to scale your enterprise with confidence.
                        </p>

                        <div className="hero-actions-new">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="btn-cta-expert"
                                onClick={() => window.location.href = '/contact'}
                            >
                                <Users size={20} />
                                <span>Talk to an Expert</span>
                            </motion.button>
                            <button
                                className="btn-watch-demo"
                                onClick={() => setShowVideo(true)}
                            >
                                <div className="play-icon">▶</div>
                                <span>Learn Our Model</span>
                            </button>
                        </div>

                    </motion.div>

                    <motion.div
                        className="why-hero-visual"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="visual-circle-bg"></div>
                        <img
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                            alt="Professional Expert"
                            className="hero-person-img"
                        />
                        <div className="floating-accent star-1">✦</div>
                        <div className="floating-accent star-2">✦</div>
                        <div className="floating-accent dot"></div>
                    </motion.div>
                </div>
                <div className="hero-wave-bottom">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53.3 600 46.7 720 36.7C840 26.7 960 13.3 1080 13.3C1200 13.3 1320 26.7 1380 33.3L1440 40V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Redesigned Advantages Section */}
            <section className="section advantage-new-section">
                <div className="container">
                    <div className="section-header-centered">
                        <h2>The Strategic Advantage</h2>
                        <div className="title-bar"></div>
                    </div>

                    <div className="advantages-new-grid">
                        {advantages.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="adv-new-card"
                            >
                                <div className="card-top-accent"></div>
                                <div className="adv-new-icon">
                                    <item.icon size={24} />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                                <button className="adv-read-more">
                                    Read More <ArrowRight size={16} />
                                </button>
                                <div className="card-bottom-accent"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Storytelling Section */}
            <section className="section storytelling-section">
                <div className="container centered-content">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="advantage-badge"
                    >
                        The KamGlobalAI Advantage
                    </motion.div>

                    <div className="story-headline-wrap">
                        {"Where Global Vision Meets Technical Excellence".split(' ').map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                viewport={{ once: true }}
                                className="story-split-word"
                            >
                                {word}{' '}
                            </motion.span>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="story-para"
                    >
                        We bridge the gap between high-level industrial strategy and precision technical execution.
                        Our team transforms complex business challenges into streamlined, future-ready digital platforms.
                    </motion.p>

                    <div className="story-cards-row">
                        {storytelling.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.15 + 1 }}
                                viewport={{ once: true }}
                                className="story-item-card"
                            >
                                <item.icon size={32} strokeWidth={1.5} color="#0ea5e9" />
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Video Modal Overlay */}
            <AnimatePresence>
                {showVideo && (
                    <motion.div
                        className="video-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="video-container"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        >
                            <button
                                className="close-video"
                                onClick={() => setShowVideo(false)}
                            >
                                <X size={32} />
                            </button>
                            <div className="video-player-wrapper">
                                <iframe
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                    title="KAM Global AI Model"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WhyKamGlobalAI;
