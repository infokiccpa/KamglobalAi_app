import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import { Globe, DollarSign, Shield, BookOpen, Clock, ArrowRight, Laptop, Award, Search, Handshake, Sprout, Trophy, FileText, UserCheck, Mail, Briefcase, MapPin, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
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

const MagneticButton = ({ children, className, onClick, style }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Calculate distance from center
        const distance = Math.sqrt(middleX * middleX + middleY * middleY);
        const maxDistance = 100; // Activation radius

        if (distance < maxDistance) {
            setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
        } else {
            setPosition({ x: 0, y: 0 });
        }
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            style={{ ...style, display: "inline-block" }}
        >
            <button className={className} onClick={onClick}>
                {children}
            </button>
        </motion.div>
    );
};

const benefits = [
    { icon: DollarSign, title: 'Global Compensation', desc: 'Premium payouts aligned with international standards.', flag: 'KW' },
    { icon: Shield, title: 'Wellness Ecosystem', desc: 'Total health shielding for you and your dependents.', flag: 'IN' },
    { icon: Clock, title: 'Fluid Flexibility', desc: 'Syncing work across time zones with ease.', flag: 'KW' },
    { icon: BookOpen, title: 'Knowledge Hub', desc: 'Unlimited access to global engineering certifications.', flag: 'IN' },
    { icon: Laptop, title: 'Modern Workspace', desc: 'State-of-the-art labs in Bengaluru & Kuwait.', flag: 'KW' },
    { icon: Award, title: 'Elite Recognition', desc: 'Joining a legacy backed by KAM Group, Kuwait.', flag: 'IN' }
];

const jobs = [
    { title: 'Ai Developer', team: 'Engineering', location: 'Bengaluru, India', id: '1', experience: '3+ Years', skills: ['Python', 'PyTorch', 'NLP'] },
    { title: 'Digital Marketing', team: 'Strategy', location: 'Bengaluru / India', id: '2', experience: '2+ Years', skills: ['SEO', 'SEM', 'Social Media'] },
    { title: 'Full Stack Developer', team: 'Engineering', location: 'Bengaluru, India', experience: '5+ Years', id: '3', skills: ['React', 'Node.js', 'AWS'] },
    { title: 'Technical Support', team: 'Support', location: 'Bengaluru, India', id: '4', experience: '1 Years', skills: ['Troubleshooting', 'CRM', 'Communication'] },
];

const Careers = () => {
    const shouldReduceMotion = useReducedMotion();
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Parallax Effects
    const { scrollY } = useScroll();
    const bannerY = useTransform(scrollY, [0, 500], [0, 200]);
    const heroBgY = useTransform(scrollY, [500, 1500], [-50, 50]);

    const handleApply = (job) => {
        navigate('/apply-now', { state: { job } });
    };

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === "All" || job.team === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    return (
        <div className="amazon-careers-container" ref={containerRef}>
            <Helmet>
                <title>Careers at KamGlobal AI | Join Our Global Team</title>
                <meta name="description" content="Explore job opportunities in AI development, Digital Marketing, and Engineering. Join a global team bridging Kuwait and India." />
            </Helmet>
            {/* New: Top Banner & Intro Section */}
            <section className="careers-intro-banner">
                <motion.img
                    style={{ y: bannerY }}
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2000"
                    alt="KamGlobal AI Team"
                />
            </section>

            <section className="careers-main-intro">
                <div className="intro-container">
                    <div className="intro-left">
                        <span className="sub-heading">ARTIFICIAL INTELLIGENCE - {jobs.length} OPEN JOBS</span>
                        <h1 className="main-heading">Breakthrough research meets real-world impact</h1>

                        <div className="intro-text">
                            <p>KamGlobal AI is transforming how people work and live through practical, useful generative AI. We've been developing and deploying AI and machine learning models to power customer experiences for more than a decade. Today, with our growing suite of AI services and applications—we're pioneering the future of AI agents to make businesses smarter and lives easier every day.</p>

                            <p>We innovate across customer-facing services and internal operations, from our AI assistants used by global enterprises to the intelligent systems that optimize workflows in modern workspaces. We've launched entirely new capabilities based on AI, like our next-generation AI personal assistants and specialized enterprise models.</p>

                            <p>We continue to build at all layers of the generative AI stack, including best-in-class infrastructure, AI models, and AI applications. Our approach is to blend breakthrough research with real-world impact, harnessing the power of generative AI to reinvent every customer experience.</p>
                        </div>
                    </div>

                    <div className="intro-right-sidebar">
                        <div className="sidebar-line"></div>
                        <p>Join us in building AI that matters. Explore our teams and opportunities.</p>
                        <MagneticButton
                            className="btn-view-roles"
                            onClick={() => document.querySelector('.job-search-bar').scrollIntoView({ behavior: 'smooth' })}
                        >
                            View open roles
                        </MagneticButton>
                    </div>
                </div>
            </section>

            {/* New: Video Section */}
            <section className="careers-video-story">
                <div className="video-container">
                    <div className="video-player-box">
                        <div className="video-placeholder">
                            <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200" alt="AI Team" />
                            <div className="play-button-overlay">
                                <div className="play-triangle"></div>
                            </div>
                            <div className="video-info-bar">
                                <span>Build AI That Matters at KamGlobal AI</span>
                            </div>
                        </div>
                    </div>

                    <div className="video-text-content">
                        <h2>How will you change the world?</h2>
                        <p>From groundbreaking custom solutions to pioneering frontier models, KamGlobal AI is rapidly reinventing what's possible in AI technology. Meet some of the passionate people behind our AI services and applications, and learn how we combine a start-up mindset with global infrastructure to build technology that makes a meaningful difference for businesses worldwide.</p>
                    </div>
                </div>
            </section>

            {/* Task 1 & 2: Talent Network Hero */}
            <section className="talent-network-hero">
                <motion.div
                    className="hero-parallax-bg"
                    style={{ y: heroBgY }}
                ></motion.div>
                <div className="hero-overlay"></div>
                <div className="hero-inner">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="talent-card"
                    >
                        <h1>KamGlobal AI Talent Network</h1>
                        <p>Join our talent network to learn about the latest AI news and career opportunities at KamGlobal AI.</p>

                        <div className="subscribe-container">
                            <MagneticButton
                                className={`btn-subscribe ${isSubscribed ? 'success' : ''}`}
                                onClick={() => setIsSubscribed(true)}
                            >
                                {isSubscribed ? <CheckCircle size={18} /> : <Mail size={18} />}
                                {isSubscribed ? "Subscribed Successfully!" : "Subscribe to interest list"}
                            </MagneticButton>
                            <p className="consent-text">
                                Opt in to receive email newsletters from KamGlobal AI. Unsubscribe at any time. For more details, check out our <span>Privacy and Data policies</span>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Search Section */}
            <section className="job-search-bar">
                <div className="search-grid">
                    <div className="search-field">
                        <label>Keyword search</label>
                        <div className="input-with-icon">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Job title, keywords, or skills"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Board Layout */}
            <section className="job-board-section">
                <div className="job-board-container">
                    {/* Sidebar Filters */}
                    <aside className="job-filters-sidebar">
                        <div className="filter-group">
                            <h3>Category</h3>
                            {["All", "Engineering", "Strategy", "Support"].map(cat => (
                                <button
                                    key={cat}
                                    className={`filter-link ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Job List */}
                    <div className="job-results-list">
                        <div className="results-count">
                            {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
                        </div>

                        <AnimatePresence mode="popLayout">
                            {filteredJobs.map((job) => (
                                <motion.div
                                    layout
                                    key={job.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="job-list-item"
                                >
                                    <div className="item-header">
                                        <h2 onClick={() => handleApply(job)}>{job.title}</h2>
                                        <div className="item-meta">
                                            <span><Briefcase size={14} /> {job.team}</span>
                                            <span><MapPin size={14} /> {job.location}</span>
                                            {job.experience && <span className="exp-badge">{job.experience}</span>}
                                        </div>
                                    </div>

                                    <div className="item-body">
                                        <div className="skill-tags">
                                            {job.skills?.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
                                        </div>
                                        <MagneticButton className="btn-view-details" onClick={() => handleApply(job)}>
                                            View details <ArrowRight size={16} />
                                        </MagneticButton>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Careers;
