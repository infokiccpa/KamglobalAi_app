import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Globe, DollarSign, Shield, BookOpen, Clock, Send, ArrowRight, Laptop, Award, Search, Handshake, Sparkles, Sprout, Trophy } from 'lucide-react';
import './Careers.css';

// Custom Flag Components for Kuwait & India Motifs
const KuwaitFlag = () => (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flag-motif">
        <path d="M0 0H24V5.33333H0V0Z" fill="#007A3D" />
        <path d="M0 5.33333H24V10.6667H0V5.33333Z" fill="white" />
        <path d="M0 10.6667H24V16H0V10.6667Z" fill="#CE1126" />
        <path d="M0 0L6 5.33333V10.6667L0 16V0Z" fill="black" />
    </svg>
);

const IndiaFlag = () => (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flag-motif">
        <path d="M0 0H24V5.33333H0V0Z" fill="#FF9933" />
        <path d="M0 5.33333H24V10.6667H0V5.33333Z" fill="white" />
        <path d="M0 10.6667H24V16H0V10.6667Z" fill="#138808" />
        <circle cx="12" cy="8" r="2" fill="#000080" />
    </svg>
);

const Careers = () => {
    const shouldReduceMotion = useReducedMotion();
    const containerRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const benefits = [
        { icon: DollarSign, title: 'Global Compensation', desc: 'Premium payouts aligned with international standards.', flag: 'KW' },
        { icon: Shield, title: 'Wellness Ecosystem', desc: 'Total health shielding for you and your dependents.', flag: 'IN' },
        { icon: Clock, title: 'Fluid Flexibility', desc: 'Syncing work across time zones with ease.', flag: 'KW' },
        { icon: BookOpen, title: 'Knowledge Hub', desc: 'Unlimited access to global engineering certifications.', flag: 'IN' },
        { icon: Laptop, title: 'Modern Workspace', desc: 'State-of-the-art labs in Bengaluru & Kuwait.', flag: 'KW' },
        { icon: Award, title: 'Elite Recognition', desc: 'Joining a legacy backed by KAM Group, Kuwait.', flag: 'IN' }
    ];

    const jobs = [
        { title: 'Senior Full Stack Developer', team: 'Engineering', location: 'Bengaluru, India', id: '1' },
        { title: 'Cloud Solutions Architect', team: 'Infrastructure', location: 'Kuwait City, Kuwait', id: '2' },
        { title: 'AI/ML Research Engineer', team: 'Data Science', location: 'Bengaluru, India', id: '3' },
        { title: 'Enterprise Digital Lead', team: 'Strategy', location: 'Kuwait City, Kuwait', id: '4' },
        { title: 'Talent Acquisition Partner', team: 'People', location: 'Remote / India', id: '5' },
        { title: 'DevOps Lead Engineer', team: 'Infrastructure', location: 'Bengaluru, India', id: '6' },
    ];

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === "All" || job.team === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    // 3D Carousel Logic
    const [carouselIndex, setCarouselIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCarouselIndex(prev => (prev + 1) % benefits.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [benefits.length]);

    // Particle Interaction (Low impact/performant)
    const particleRef = useRef(null);
    const handleMouseMove = (e) => {
        if (!particleRef.current || shouldReduceMotion) return;
        const { clientX, clientY } = e;
        const x = (clientX - window.innerWidth / 2) / 30;
        const y = (clientY - window.innerHeight / 2) / 30;
        particleRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    return (
        <div className="global-careers-container" ref={containerRef} onMouseMove={handleMouseMove}>
            {/* Interactive Particle Hero */}
            <section className="particle-hero">
                <div className="particle-layer" ref={particleRef}>
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className={`p-orb p-${i}`} />
                    ))}
                </div>

                <div className="hero-content">
                    <div className="trust-badge">
                        <KuwaitFlag />
                        <span>Kuwait-owned, India-delivered</span>
                        <IndiaFlag />
                    </div>

                    <h1 className="hero-heading">
                        {"Shape the Future Globally.".split(' ').map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.08 }}
                                className="word-3d"
                            >
                                {word}{" "}
                            </motion.span>
                        ))}
                    </h1>

                    <p className="hero-description">
                        Building a bridge of technical excellence between Kuwait’s industrial legacy and India’s engineering brilliance.
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="hero-actions"
                    >
                        <button className="btn-primary-lux" onClick={() => document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' })}>
                            Explore Open Roles
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* 3D Carousel for Benefits */}
            <section className="section benefits-3d-showcase">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-label">GLOBAL EMPOWERMENT</span>
                        <h2 className="section-title">Rooted Locally, Valued Globally</h2>
                        <div className="luxury-bar"></div>
                    </div>

                    <div className="carousel-3d-wrapper">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={carouselIndex}
                                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotateY: 30, x: 50 }}
                                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotateY: -30, x: -50 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                                className="benefit-3d-card"
                            >
                                <div className="card-flag-box">
                                    {benefits[carouselIndex].flag === 'KW' ? <KuwaitFlag /> : <IndiaFlag />}
                                </div>
                                <div className="b-icon-lux">
                                    {React.createElement(benefits[carouselIndex].icon, { size: 42 })}
                                </div>
                                <h3>{benefits[carouselIndex].title}</h3>
                                <p>{benefits[carouselIndex].desc}</p>
                            </motion.div>
                        </AnimatePresence>

                        <div className="carousel-nav">
                            {benefits.map((_, i) => (
                                <button
                                    key={i}
                                    className={`nav-dot ${i === carouselIndex ? 'active' : ''}`}
                                    onClick={() => setCarouselIndex(i)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* AI-Powered Physics Job Filters */}
            <section className="section job-physics-explorer" id="jobs">
                <div className="container">
                    <div className="explorer-header-lux">
                        <div className="header-text">
                            <h2 className="section-title text-left">Strategic Career Openings</h2>
                            <p>Intelligent filtering for high-impact roles at KamGlobalAI.</p>
                        </div>

                        <div className="filters-wrapper">
                            <div className="search-lux">
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by role, skills, or tech..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="category-chips">
                                {["All", "Engineering", "Infrastructure", "Data Science", "Strategy"].map(cat => (
                                    <button
                                        key={cat}
                                        className={`chip ${activeCategory === cat ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <motion.div layout className="job-physics-grid">
                        <AnimatePresence mode="popLayout">
                            {filteredJobs.map((job) => (
                                <motion.div
                                    layout
                                    key={job.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{
                                        duration: 0.4,
                                        type: shouldReduceMotion ? "tween" : "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                    className="job-physics-card"
                                >
                                    <div className="job-meta-top">
                                        <span className="j-team">{job.team}</span>
                                        <div className="j-loc"><Globe size={12} /> {job.location}</div>
                                    </div>
                                    <h3>{job.title}</h3>
                                    <button className="btn-apply-3d">
                                        Apply Now <ArrowRight size={16} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Global Trust Closing Motifs */}
            <section className="global-trust-footer">
                <div className="container">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="trust-banner"
                    >
                        <h2>The Bridge of Engineering Trust</h2>
                        <p>Join the 200+ professionals driving innovation between Kuwait’s capital and India’s silicon valley.</p>
                        <div className="flag-motifs-footer">
                            <div className="motif-group">
                                <KuwaitFlag /> <span>Strategic Vision</span>
                            </div>
                            <div className="motif-divider"></div>
                            <div className="motif-group">
                                <IndiaFlag /> <span>Engineering Excellence</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Work Culture Section */}
            <section className="section work-culture-section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-5"
                    >
                        <span className="badge-premium-blue">Our Work Culture</span>
                        <h2 className="culture-main-heading">Where Talent Thrives and Innovation Flourishes</h2>
                        <p className="culture-description">
                            We foster a collaborative environment that encourages continuous learning, creativity, and professional growth.
                        </p>
                    </motion.div>

                    <div className="culture-grid">
                        {[
                            {
                                icon: Sprout,
                                title: "Growth Mindset",
                                desc: "Continuous learning and career development opportunities."
                            },
                            {
                                icon: Handshake,
                                title: "Collaboration",
                                desc: "Cross-functional teams solving complex challenges together."
                            },
                            {
                                icon: Trophy,
                                title: "Excellence",
                                desc: "Commitment to quality and client success in everything we do."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="culture-card glass-premium"
                            >
                                <div className="culture-icon-wrapper">
                                    <item.icon size={32} />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Careers;
