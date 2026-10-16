import { useRef, useState } from 'react';
import { motion, AnimatePresence, MotionConfig, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CalendarCheck, Layers, MapPin, ShieldAlert, Sparkles, Workflow } from 'lucide-react';
import { Seo, Breadcrumbs } from '../components/page/PageKit';
import { Reveal, SplitText } from '../components/motion/Reveal';
import { EASE_OUT, VIEWPORT, fadeUpItem, popItem, staggerParent, trackPointer, trackTilt, resetTilt } from '../components/motion/motionPresets';
import { industries, INDUSTRY_APPROACH } from '../data/industries';
import { findService } from '../data/serviceLinks';
import { contactLink, discoveryLink } from '../data/links';
import './Industries.css';

const SERVICE_SHORT = {
    'custom-development': 'Software',
    'ai-automation': 'AI & Data',
    'cloud-devops': 'Cloud & IT',
    'customer-experience': 'Customer Experience',
    'business-process-outsourcing': 'BPO',
    'sales-lead-generation': 'Sales & Leads',
    'virtual-assistance': 'Virtual Assistance',
    'digital-marketing-creative': 'Marketing & Creative',
    'industry-operations': 'Industry Operations',
};

const serviceName = (slug) => findService(slug)?.name ?? SERVICE_SHORT[slug] ?? slug;
const servicePath = (slug) => findService(slug)?.to ?? '/services';

const MATRIX_SERVICES = Object.keys(SERVICE_SHORT).filter((slug) => industries.some((ind) => ind.services.includes(slug)));

const pad = (n) => String(n).padStart(2, '0');

const ORBIT = industries.slice(0, 8);

const gridMotion = (stagger = 0.08, delay = 0) => ({
    variants: staggerParent(stagger, delay),
    initial: 'hidden',
    whileInView: 'show',
    viewport: VIEWPORT,
});

const Eyebrow = ({ children, center }) => (
    <div className={`in-eyebrow${center ? ' in-eyebrow--center' : ''}`}>
        <span className="in-eyebrow-line" aria-hidden="true" />
        <span>{children}</span>
    </div>
);

/* ---------------- Hero ---------------- */
const HeroVisual = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);

    return (
        <div className="in-hero-visual" ref={ref}>
            <div className="in-orbit" aria-hidden="true">
                <span className="in-orbit-ring in-orbit-ring--outer" />
                <span className="in-orbit-ring in-orbit-ring--inner" />
                <div className="in-orbit-spin">
                    {ORBIT.map((ind, i) => {
                        const Icon = ind.icon;
                        return (
                            <span key={ind.slug} className="in-orbit-node" style={{ '--a': `${(360 / ORBIT.length) * i}deg` }}>
                                <span className="in-orbit-chip">
                                    <Icon size={18} />
                                </span>
                            </span>
                        );
                    })}
                </div>
            </div>

            <motion.div
                className="in-hero-frame"
                initial={{ opacity: 0, clipPath: 'inset(12% 12% 12% 12% round 32px)' }}
                animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 32px)' }}
                transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.15 }}
            >
                <motion.img
                    src="/images/pages/pg-svc-industry-ops.webp"
                    alt="Operations coordinator reviewing workflows with healthcare, warehouse and retail settings in the background"
                    style={{ y: imgY, scale: imgScale }}
                    width="640"
                    height="720"
                    fetchpriority="high"
                />
                <span className="in-hero-frame-shade" aria-hidden="true" />
                <div className="in-hero-frame-caption">
                    <Workflow size={16} aria-hidden="true" />
                    <span>Workflow first, then the right service fit</span>
                </div>
            </motion.div>

            <motion.div
                className="in-hero-float in-hero-float--a"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: EASE_OUT }}
            >
                <span className="in-hero-float-icon"><Layers size={16} aria-hidden="true" /></span>
                <span>
                    <strong>{industries.length} sectors</strong>
                    <small>with dedicated pages</small>
                </span>
            </motion.div>
            <motion.div
                className="in-hero-float in-hero-float--b"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease: EASE_OUT }}
            >
                <span className="in-hero-float-icon in-hero-float-icon--navy"><MapPin size={16} aria-hidden="true" /></span>
                <span>
                    <strong>Kuwait &amp; India</strong>
                    <small>delivery offices</small>
                </span>
            </motion.div>
        </div>
    );
};

/* ---------------- Marquee ---------------- */
const IndustryMarquee = () => (
    <div className="in-marquee" aria-hidden="true">
        <div className="in-marquee-track">
            {[0, 1].map((dup) => (
                <div className="in-marquee-group" key={dup}>
                    {industries.map((ind) => {
                        const Icon = ind.icon;
                        return (
                            <span className="in-marquee-item" key={`${dup}-${ind.slug}`}>
                                <Icon size={20} />
                                {ind.name}
                                <span className="in-marquee-star">✦</span>
                            </span>
                        );
                    })}
                </div>
            ))}
        </div>
    </div>
);

/* ---------------- Explorer ---------------- */
const IndustryExplorer = () => {
    const [active, setActive] = useState(0);
    const current = industries[active];
    const Icon = current.icon;

    return (
        <div className="in-explorer">
            <ol className="in-list">
                {industries.map((ind, i) => {
                    const ItemIcon = ind.icon;
                    const isActive = i === active;
                    return (
                        <motion.li
                            key={ind.slug}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.55, delay: (i % 5) * 0.05, ease: EASE_OUT }}
                        >
                            <Link
                                to={`/industries/${ind.slug}`}
                                className={`in-list-item${isActive ? ' is-active' : ''}`}
                                onMouseEnter={() => setActive(i)}
                                onFocus={() => setActive(i)}
                                aria-describedby={isActive ? 'in-panel-desc' : undefined}
                            >
                                {isActive && <motion.span layoutId="in-list-pill" className="in-list-pill" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                                <span className="in-list-num">{pad(i + 1)}</span>
                                <span className="in-list-icon"><ItemIcon size={18} aria-hidden="true" /></span>
                                <span className="in-list-text">
                                    <strong>{ind.name}</strong>
                                    <small>{ind.cardDesc}</small>
                                </span>
                                <ArrowUpRight className="in-list-arrow" size={18} aria-hidden="true" />
                            </Link>
                        </motion.li>
                    );
                })}
            </ol>

            <div className="in-panel-wrap">
                <div className="in-panel" onMouseMove={trackPointer}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.slug}
                            className="in-panel-inner"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.4, ease: EASE_OUT }}
                        >
                            <div className="in-panel-media">
                                <motion.img
                                    src={current.image}
                                    alt={current.alt}
                                    loading="lazy"
                                    width="640"
                                    height="400"
                                    initial={{ scale: 1.12, clipPath: 'inset(0 0 100% 0)' }}
                                    animate={{ scale: 1, clipPath: 'inset(0 0 0% 0)' }}
                                    transition={{ duration: 0.75, ease: EASE_OUT }}
                                />
                                <span className="in-panel-badge">
                                    <Icon size={16} aria-hidden="true" /> {pad(active + 1)} / {pad(industries.length)}
                                </span>
                            </div>

                            <div className="in-panel-body">
                                <h3>{current.name}</h3>
                                <p id="in-panel-desc">{current.hero.title}</p>

                                <span className="in-panel-label">Potential needs</span>
                                <motion.ul className="in-chips" variants={staggerParent(0.04, 0.15)} initial="hidden" animate="show">
                                    {current.needs.map((need) => (
                                        <motion.li key={need} variants={popItem}>{need}</motion.li>
                                    ))}
                                </motion.ul>

                                <span className="in-panel-label">Relevant services</span>
                                <ul className="in-panel-services">
                                    {current.services.map((slug) => (
                                        <li key={slug}>
                                            <Link to={servicePath(slug)}>
                                                {serviceName(slug)} <ArrowRight size={13} aria-hidden="true" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                {current.notice && (
                                    <p className="in-panel-notice">
                                        <ShieldAlert size={16} aria-hidden="true" />
                                        <span>{current.notice}</span>
                                    </p>
                                )}

                                <Link to={`/industries/${current.slug}`} className="in-btn in-btn--primary in-panel-cta">
                                    Explore industry <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

/* ---------------- Capability matrix ---------------- */
const CapabilityMatrix = () => {
    const [col, setCol] = useState(null);

    return (
        <div className="in-matrix-scroll">
            <p className="in-matrix-hint" aria-hidden="true">
                Swipe to see all services <ArrowRight size={13} />
            </p>
            <table className="in-matrix" onMouseLeave={() => setCol(null)}>
                <caption className="sr-only">Service lines typically discussed for each industry</caption>
                <thead>
                    <tr>
                        <th scope="col" className="in-matrix-corner">Industry</th>
                        {MATRIX_SERVICES.map((slug, ci) => (
                            <th
                                key={slug}
                                scope="col"
                                className={col === ci ? 'is-col' : undefined}
                                onMouseEnter={() => setCol(ci)}
                            >
                                <Link to={servicePath(slug)} title={serviceName(slug)}>
                                    {SERVICE_SHORT[slug]}
                                </Link>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {industries.map((ind, ri) => {
                        const Icon = ind.icon;
                        return (
                            <tr key={ind.slug}>
                                <th scope="row">
                                    <Link to={`/industries/${ind.slug}`}>
                                        <Icon size={16} aria-hidden="true" />
                                        <span>{ind.name}</span>
                                    </Link>
                                </th>
                                {MATRIX_SERVICES.map((slug, ci) => {
                                    const on = ind.services.includes(slug);
                                    return (
                                        <td
                                            key={slug}
                                            className={col === ci ? 'is-col' : undefined}
                                            onMouseEnter={() => setCol(ci)}
                                        >
                                            {on ? (
                                                <motion.span
                                                    className="in-dot"
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    whileInView={{ scale: 1, opacity: 1 }}
                                                    viewport={{ once: true, amount: 0.6 }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 16, delay: ri * 0.04 + ci * 0.02 }}
                                                >
                                                    <span className="sr-only">Yes</span>
                                                </motion.span>
                                            ) : (
                                                <span className="in-dot-off" aria-hidden="true" />
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

/* ---------------- Approach timeline ---------------- */
const ApproachTimeline = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
    const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

    return (
        <ol className="in-steps" ref={ref} aria-label="Our approach">
            <span className="in-steps-rail" aria-hidden="true">
                <motion.span className="in-steps-fill" style={{ scaleY: fill }} />
            </span>
            {INDUSTRY_APPROACH.map((step, i) => (
                <motion.li
                    key={step.title}
                    className="in-step"
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                >
                    <span className="in-step-num">{pad(i + 1)}</span>
                    <div className="in-step-card" onMouseMove={(e) => trackTilt(e, 4)} onMouseLeave={resetTilt}>
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                    </div>
                </motion.li>
            ))}
        </ol>
    );
};

/* ---------------- Page ---------------- */
const Industries = () => {
    const crumbs = [{ label: 'Home', to: '/' }, { label: 'Industries', to: '/industries' }];

    return (
        <MotionConfig reducedMotion="user">
            <div className="in-page">
                <Seo
                    title="Industries We Support | KAM Global AI"
                    description="Explore how KAM Global AI technology and operational support can apply across education, healthcare, finance, retail, real estate, hospitality, manufacturing, logistics, SaaS, and professional services."
                    path="/industries"
                    crumbs={crumbs}
                />

                {/* Hero */}
                <section className="in-hero">
                    <span className="in-hero-glow" aria-hidden="true" />
                    <div className="container in-hero-grid">
                        <div className="in-hero-copy">
                            <Breadcrumbs crumbs={[{ label: 'Home', to: '/' }, { label: 'Industries' }]} />
                            <motion.span
                                className="in-kicker"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: EASE_OUT }}
                            >
                                <Sparkles size={14} aria-hidden="true" /> Industries
                            </motion.span>
                            <SplitText as="h1" text="Capabilities for Different" accent="Business Contexts" breakBeforeAccent />
                            <Reveal delay={0.25} y={14}>
                                <p className="in-hero-sub">Technology and operational support shaped around the workflows of your sector.</p>
                                <p className="in-hero-lead">
                                    Every industry has its own systems, controls, and customer expectations. We start with the
                                    workflow and its constraints, then confirm whether the relevant service fit exists before
                                    proposing an engagement.
                                </p>
                            </Reveal>
                            <Reveal delay={0.4} y={14} className="in-hero-actions">
                                <Link to={contactLink('Industry Solutions')} className="in-btn in-btn--primary">
                                    Discuss Your Industry Requirement <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                                <Link to="/outsourcing" className="in-btn in-btn--ghost">
                                    Global Outsourcing <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                            </Reveal>
                        </div>
                        <HeroVisual />
                    </div>
                </section>

                <IndustryMarquee />

                {/* Explore by industry */}
                <section id="industries" className="in-section in-section--tint">
                    <span className="in-ghost-word" aria-hidden="true">Sectors</span>
                    <div className="container">
                        <div className="in-head">
                            <Reveal y={12}><Eyebrow>Sectors</Eyebrow></Reveal>
                            <SplitText text="Explore by" accent="Industry" />
                            <Reveal delay={0.15} y={14}>
                                <p>
                                    Each page describes potential applications of our capabilities. Specific fit is confirmed for
                                    each requirement.
                                </p>
                            </Reveal>
                        </div>
                        <IndustryExplorer />
                    </div>
                </section>

                {/* Capability matrix */}
                <section id="capabilities" className="in-section">
                    <div className="container">
                        <div className="in-head in-head--center">
                            <Reveal y={12}><Eyebrow center>Capability Map</Eyebrow></Reveal>
                            <SplitText text="Where Our Services" accent="Typically Fit" />
                            <Reveal delay={0.15} y={14}>
                                <p>
                                    The service lines most often discussed for each sector. Select an industry or a service to
                                    see the detail — the final scope is always confirmed against your requirement.
                                </p>
                            </Reveal>
                        </div>
                        <Reveal y={24}>
                            <CapabilityMatrix />
                        </Reveal>
                    </div>
                </section>

                {/* Approach */}
                <section id="approach" className="in-section in-section--tint">
                    <div className="container in-approach-grid">
                        <div className="in-approach-intro">
                            <Reveal y={12}><Eyebrow>Our Approach</Eyebrow></Reveal>
                            <SplitText text="Scope the Work, Controls," accent="and Expectations" />
                            <Reveal delay={0.15} y={14}>
                                <p>
                                    We review the business objective, users, systems, process owners, data sensitivity, service
                                    hours, and success criteria. A proposed engagement follows only once feasibility and
                                    responsibilities are clear.
                                </p>
                                <Link to={discoveryLink('Industry Solutions')} className="in-btn in-btn--primary">
                                    <CalendarCheck size={16} aria-hidden="true" /> Book a Discovery Call
                                </Link>
                            </Reveal>
                        </div>
                        <ApproachTimeline />
                    </div>
                </section>

                {/* CTA */}
                <section className="in-section in-cta-section">
                    <div className="container">
                        <motion.div
                            className="in-cta"
                            onMouseMove={trackPointer}
                            initial={{ opacity: 0, y: 40, scale: 0.97 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={VIEWPORT}
                            transition={{ duration: 0.8, ease: EASE_OUT }}
                        >
                            <span className="in-cta-spot" aria-hidden="true" />
                            <span className="in-cta-word" aria-hidden="true">Industries</span>
                            <motion.div className="in-cta-copy" {...gridMotion(0.1, 0.2)}>
                                <motion.h2 variants={fadeUpItem}>Let&apos;s Discuss Your Industry Requirement</motion.h2>
                                <motion.p variants={fadeUpItem}>
                                    Tell us about your workflow, current challenge, and the type of technology or operational
                                    support you are considering.
                                </motion.p>
                                <motion.div className="in-cta-actions" variants={fadeUpItem}>
                                    <Link to={contactLink('Industry Solutions')} className="in-btn in-btn--light">
                                        Contact Us <ArrowRight size={16} aria-hidden="true" />
                                    </Link>
                                    <Link to="/engagement-models" className="in-btn in-btn--outline-light">
                                        Compare Engagement Models <ArrowRight size={16} aria-hidden="true" />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </MotionConfig>
    );
};

export default Industries;
