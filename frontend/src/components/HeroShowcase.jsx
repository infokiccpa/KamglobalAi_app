import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
    ArrowRight,
    Briefcase,
    Building2,
    Code2,
    Handshake,
    Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { contactLink } from '../data/links';
import './HeroShowcase.css';

const EASE = [0.16, 1, 0.3, 1];

const SLIDES = [
    {
        src: '/images/hero/hero-sunset.webp',
        label: 'One global partner',
        alt: 'Colleagues working together at laptops in an office at sunset, with a world map and a city skyline behind them',
        width: 1024,
        height: 853,
    },
    {
        src: '/images/slide-tech-india.jpg',
        label: 'IT services',
        alt: 'Software and IT team reviewing application and cloud work on screens in a modern office',
        width: 1376,
        height: 768,
    },
    {
        src: '/images/pages/pg-svc-bpo.jpg',
        label: 'Outsourcing',
        alt: 'Operations team working through documents and process screens in an office',
        width: 1280,
        height: 720,
    },
    {
        src: '/images/hr/hr-hero.jpg',
        label: 'HR',
        alt: 'Two colleagues shaking hands across a desk during a hiring conversation',
        width: 1280,
        height: 720,
    },
    {
        src: '/images/pages/pg-svc-marketing.jpg',
        label: 'AI media',
        alt: 'Creative team reviewing design and content on a large screen',
        width: 1280,
        height: 720,
    },
];

const AUDIENCE = [
    { title: 'For Clients', text: 'Build and scale', to: '/services', icon: Building2 },
    { title: 'For Partners', text: 'Deliver together', to: contactLink('Partnership', 'Partnership'), icon: Handshake },
    { title: 'For Careers', text: 'Grow with us', to: '/hr/jobs', icon: Briefcase },
];

const rise = (reduced, delay) => (
    reduced
        ? {}
        : {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay, ease: EASE },
        }
);

const HeroShowcase = () => {
    const reduced = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (reduced || paused) return undefined;
        const id = window.setInterval(() => {
            setIndex((current) => (current + 1) % SLIDES.length);
        }, 4800);
        return () => window.clearInterval(id);
    }, [reduced, paused]);

    return (
        <section className="hx" aria-labelledby="hx-title">
            <div className="container hx-top">
                <div className="hx-copy">
                    <motion.p className="hx-eyebrow" {...rise(reduced, 0.05)}>
                        <span className="hx-eyebrow-rule" aria-hidden="true" />
                        Software · IT services · Outsourcing · HR · AI media
                    </motion.p>
                    <h1 id="hx-title" className="hx-title">
                        <motion.span {...rise(reduced, 0.12)}>Technology That</motion.span>
                        <motion.span {...rise(reduced, 0.2)}>Moves Business</motion.span>
                        <motion.span className="hx-title-accent" {...rise(reduced, 0.28)}>Forward.</motion.span>
                    </h1>
                    <motion.p className="hx-partner" {...rise(reduced, 0.36)}>
                        One global partner. Connected teams.
                    </motion.p>
                    <motion.p className="hx-lead" {...rise(reduced, 0.44)}>
                        KAM Global AI builds software and IT services from India, runs business operations from
                        the Philippines, supports recruitment, staffing and payroll, and produces AI video, design
                        and content.
                    </motion.p>
                    <motion.div className="hx-actions" {...rise(reduced, 0.52)}>
                        <Link to="/services" className="hx-btn hx-btn--primary">
                            <Code2 size={18} aria-hidden="true" />
                            Explore Our Services
                            <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                        <Link to="/contact" className="hx-btn hx-btn--ghost">
                            <Users size={18} aria-hidden="true" />
                            Talk to Our Team
                            <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                    </motion.div>
                    <motion.ul className="hx-audience" {...rise(reduced, 0.6)}>
                        {AUDIENCE.map((item) => (
                            <li key={item.title}>
                                <Link to={item.to}>
                                    <span className="hx-audience-icon" aria-hidden="true">
                                        <item.icon size={18} />
                                    </span>
                                    <span>
                                        <strong>{item.title}</strong>
                                        <small>{item.text}</small>
                                    </span>
                                    <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                            </li>
                        ))}
                    </motion.ul>
                </div>

                <div
                    className="hx-visual"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                >
                    <div
                        className="hx-track"
                        style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
                    >
                        {SLIDES.map((slide, slideIndex) => (
                            <div className={`hx-slide${slideIndex === index ? ' is-active' : ''}`} key={slide.src}>
                                <img
                                    className="hx-photo"
                                    src={slide.src}
                                    alt={slide.alt}
                                    width={slide.width}
                                    height={slide.height}
                                    fetchpriority={slideIndex === 0 ? 'high' : 'auto'}
                                    decoding="async"
                                />
                            </div>
                        ))}
                    </div>
                    <span className="hx-frame" aria-hidden="true">
                        <span /><span /><span /><span />
                    </span>
                    <p className="hx-slide-label" key={SLIDES[index].label}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        {SLIDES[index].label}
                    </p>
                    <div className="hx-dots" role="tablist" aria-label="Service images">
                        {SLIDES.map((slide, slideIndex) => (
                            <button
                                key={slide.label}
                                type="button"
                                role="tab"
                                className={slideIndex === index ? 'is-active' : undefined}
                                aria-selected={slideIndex === index}
                                aria-label={slide.label}
                                onClick={() => setIndex(slideIndex)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroShowcase;
