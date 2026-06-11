import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    Shield,
    Globe,
    Cpu,
    Award,
    Users,
    Zap,
    BarChart3,
    DollarSign,
    CheckCircle2,
    ArrowRight,
    Mail,
    MapPin,
    Play,
    X,
} from 'lucide-react';
import './WhyKamGlobalAI.css';

const advantages = [
    {
        icon: Shield,
        title: 'Global Backing',
        desc: 'Strategically backed by KAM Group Kuwait, offering enterprise-level stability and a strong regional presence.',
    },
    {
        icon: Globe,
        title: 'India Delivery Advantage',
        desc: "Access India's premier technical talent pool while maintaining global service quality standards.",
    },
    {
        icon: Cpu,
        title: 'End-to-End Services',
        desc: 'From initial consulting to full-scale digital implementation and ongoing maintenance.',
    },
    {
        icon: Award,
        title: 'Enterprise Standards',
        desc: 'Strict adherence to international security protocols and industry best practices.',
    },
    {
        icon: Users,
        title: 'Long-Term Partnership',
        desc: 'We focus on scalable relationships that grow alongside your business transformation.',
    },
];

const deliveryPillars = [
    {
        icon: Zap,
        title: 'Innovation Focus',
        desc: 'Driving growth through AI-powered solutions and next-gen technology stacks.',
    },
    {
        icon: BarChart3,
        title: 'Rapid Deployment',
        desc: 'Accelerated development cycles ensuring faster time-to-market for your projects.',
    },
    {
        icon: DollarSign,
        title: 'Cost Efficiency',
        desc: 'Maximizing ROI through optimized offshore delivery models and lean execution.',
    },
];

const comparisonRows = [
    {
        criteria: 'Delivery Speed',
        traditional: 'Slow, bureaucratic processes',
        kamglobal: 'Agile delivery — up to 2× faster',
    },
    {
        criteria: 'Cost Efficiency',
        traditional: 'High domestic overhead limits ROI',
        kamglobal: 'Up to 50% cost advantage via India hub',
    },
    {
        criteria: 'Compliance & Security',
        traditional: 'Fragmented security protocols',
        kamglobal: 'ISO/SOC-aligned Kuwait–India bridge',
    },
    {
        criteria: 'Vested Interest',
        traditional: 'Transactional hourly billing',
        kamglobal: 'Long-term BOT strategic partnerships',
    },
    {
        criteria: 'Talent Quality',
        traditional: 'Generalized B-tier resources',
        kamglobal: 'Silicon Valley–caliber AI specialists',
    },
];

const hubs = [
    {
        icon: MapPin,
        location: 'Kuwait',
        role: 'Strategic HQ',
        desc: 'Regional leadership, client trust, and enterprise governance backed by KAM Group.',
    },
    {
        icon: MapPin,
        location: 'India',
        role: 'Delivery Hub',
        desc: 'World-class engineering talent, agile execution, and scalable offshore operations.',
    },
];

const jumpLinks = [
    { href: '#our-model', label: 'Our Model' },
    { href: '#advantages', label: 'Advantages' },
    { href: '#model', label: 'Delivery Model' },
    { href: '#compare', label: 'Why Us' },
    { href: '#pillars', label: 'Value' },
];

const Eyebrow = ({ children, center, lines = true }) => (
    <div className={`wk-eyebrow${center ? ' wk-eyebrow-center' : ''}`}>
        {lines && <span className="wk-eyebrow-line" aria-hidden="true" />}
        <span>{children}</span>
        {lines && <span className="wk-eyebrow-line" aria-hidden="true" />}
    </div>
);

const WhyKamGlobalAI = () => {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <div className="why-kam-page">
            <Helmet>
                <title>Why KamGlobal AI | Kuwait–India Global Delivery</title>
                <meta
                    name="description"
                    content="Discover why enterprises choose KamGlobal AI — KAM Group backing, India delivery excellence, and end-to-end digital transformation."
                />
            </Helmet>

            <section className="wk-hero">
                <div className="container">
                    <motion.div
                        className="wk-hero-inner"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Eyebrow center lines={false}>Why KamGlobal AI</Eyebrow>
                        <h1>Strategic Vision Meets Precision Execution</h1>
                        <p>
                            We bridge complex business challenges and world-class technical implementation —
                            leveraging Kuwait&apos;s strategic leadership with India&apos;s engineering excellence.
                        </p>

                        <div className="wk-hero-stats">
                            <div className="wk-stat">
                                <strong>10+</strong>
                                <span>Years Legacy</span>
                            </div>
                            <div className="wk-stat">
                                <strong>2</strong>
                                <span>Global Hubs</span>
                            </div>
                            <div className="wk-stat">
                                <strong>100%</strong>
                                <span>Delivery Focus</span>
                            </div>
                        </div>

                        <nav className="wk-jump-nav" aria-label="Page sections">
                            {jumpLinks.map((link) => (
                                <a key={link.href} href={link.href} className="wk-jump-link">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                </div>
            </section>

            <section id="our-model" className="wk-video">
                <div className="container">
                    <div className="wk-video-grid">
                        <motion.div
                            className="wk-video-content"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                        >
                            <Eyebrow>How We Work</Eyebrow>
                            <h2>Learn Our Global Delivery Model</h2>
                            <p className="wk-video-lead">
                                See how KamGlobal AI combines Kuwait&apos;s strategic leadership with
                                India&apos;s engineering excellence — delivering enterprise AI and IT
                                solutions at scale.
                            </p>
                            <p>
                                From consulting and build-operate-transfer engagements to full-scale
                                digital transformation, our dual-hub model is built for trust, speed,
                                and long-term partnership.
                            </p>
                            <button
                                type="button"
                                className="wk-btn wk-btn-primary wk-btn-inline"
                                onClick={() => setShowVideo(true)}
                            >
                                <Play size={16} /> Watch Presentation
                            </button>
                        </motion.div>

                        <motion.div
                            className="wk-video-player"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.08 }}
                        >
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                poster="/images/wk-global-delivery-bridge.png"
                                aria-label="KamGlobal AI delivery model preview"
                            >
                                <source src="/hero-background.mp4" type="video/mp4" />
                            </video>
                            <button
                                type="button"
                                className="wk-video-play"
                                onClick={() => setShowVideo(true)}
                                aria-label="Play full presentation"
                            >
                                <Play size={22} fill="currentColor" />
                            </button>
                            <span className="wk-video-caption">KamGlobal AI — Kuwait &amp; India</span>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="advantages" className="wk-advantages">
                <div className="container">
                    <div className="wk-section-header">
                        <Eyebrow center>The Strategic Advantage</Eyebrow>
                        <h2>Why Enterprises Choose Us</h2>
                        <p>Five pillars that set KamGlobal AI apart from traditional IT vendors.</p>
                    </div>

                    <div className="wk-adv-grid">
                        {advantages.map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="wk-adv-card"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                            >
                                <span className="wk-adv-icon" aria-hidden="true">
                                    <item.icon size={20} strokeWidth={1.75} />
                                </span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="model" className="wk-model">
                <div className="container">
                    <div className="wk-section-header">
                        <Eyebrow center>Global Delivery Model</Eyebrow>
                        <h2>Kuwait Strategy, India Execution</h2>
                        <p>
                            A dual-location model that combines regional trust with technical scale —
                            the bridge between Gulf business networks and global technology delivery.
                        </p>
                    </div>

                    <div className="wk-hubs-grid">
                        {hubs.map((hub, i) => (
                            <motion.div
                                key={hub.location}
                                className="wk-hub-card"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                            >
                                <span className="wk-hub-icon" aria-hidden="true">
                                    <hub.icon size={18} strokeWidth={1.75} />
                                </span>
                                <span className="wk-hub-role">{hub.role}</span>
                                <h3>{hub.location}</h3>
                                <p>{hub.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="wk-model-visual"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <img
                            src="/images/wk-global-delivery-bridge.png"
                            alt="Kuwait and India connected through KamGlobal AI global delivery bridge"
                            loading="lazy"
                        />
                    </motion.div>
                </div>
            </section>

            <section id="compare" className="wk-compare">
                <div className="container">
                    <div className="wk-section-header">
                        <Eyebrow center>Why Us</Eyebrow>
                        <h2>The KamGlobal AI Advantage</h2>
                        <p>How we compare against traditional enterprise IT delivery models.</p>
                    </div>

                    <motion.div
                        className="wk-compare-table-wrap"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <table className="wk-compare-table">
                            <thead>
                                <tr>
                                    <th scope="col">Criteria</th>
                                    <th scope="col">Traditional IT Vendors</th>
                                    <th scope="col" className="wk-compare-highlight">KamGlobal AI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonRows.map((row) => (
                                    <tr key={row.criteria}>
                                        <td>{row.criteria}</td>
                                        <td>{row.traditional}</td>
                                        <td className="wk-compare-highlight">
                                            <span className="wk-compare-cell">
                                                <CheckCircle2 size={14} aria-hidden="true" />
                                                {row.kamglobal}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </section>

            <section id="pillars" className="wk-pillars">
                <div className="container">
                    <div className="wk-section-header">
                        <Eyebrow center>Execution Excellence</Eyebrow>
                        <h2>Where Vision Meets Technical Delivery</h2>
                        <p>
                            We transform complex business challenges into streamlined,
                            future-ready digital platforms.
                        </p>
                    </div>

                    <div className="wk-pillars-grid">
                        {deliveryPillars.map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="wk-pillar-card"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                            >
                                <span className="wk-pillar-icon" aria-hidden="true">
                                    <item.icon size={22} strokeWidth={1.75} />
                                </span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="wk-cta">
                <div className="container">
                    <motion.div
                        className="wk-cta-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <h2>Ready to partner with KamGlobal AI?</h2>
                        <p>Speak with our team about your digital transformation, BOT model, or enterprise IT needs.</p>
                        <div className="wk-cta-actions">
                            <Link to="/contact" className="wk-btn wk-btn-primary">
                                Talk to an Expert <ArrowRight size={16} />
                            </Link>
                            <Link to="/services" className="wk-btn wk-btn-secondary">
                                View Services
                            </Link>
                            <a href="mailto:info@kamglobalai.com" className="wk-btn wk-btn-secondary">
                                <Mail size={16} /> info@kamglobalai.com
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {showVideo && (
                    <motion.div
                        className="wk-video-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowVideo(false)}
                    >
                        <motion.div
                            className="wk-video-modal-inner"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="wk-video-close"
                                onClick={() => setShowVideo(false)}
                                aria-label="Close video"
                            >
                                <X size={22} />
                            </button>
                            <video controls autoPlay playsInline>
                                <source src="/hero-background.mp4" type="video/mp4" />
                            </video>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WhyKamGlobalAI;
