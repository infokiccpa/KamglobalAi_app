import {
    AnimatePresence,
    motion,
    MotionConfig,
    useInView,
    useReducedMotion,
    useScroll,
    useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CountUp from 'react-countup';
import {
    ArrowRight,
    ArrowUpRight,
    Globe,
    Laptop,
    Cloud,
    Users,
    Handshake,
    Shield,
    MapPin,
    GraduationCap,
    BookOpen,
    Brain,
    CheckCircle2,
    Building2,
    Layers,
    Headset,
    PhoneCall,
    ClipboardCheck,
    UserSearch,
    HeartPulse,
    ShoppingCart,
    Landmark,
    Truck,
    UserPlus,
    FolderKanban,
    Settings2,
    Search,
    FileText,
    Puzzle,
    Rocket,
    Code2,
    Briefcase,
    Check,
    ChevronLeft,
    ChevronRight,
    Target,
    RefreshCw,
    BarChart3,
    Play,
    Pause,
    Clock,
    Mail,
    Sparkles,
} from 'lucide-react';
import HeroShowcase from '../components/HeroShowcase';
import Flag from '../components/Flag';
import { networkCountries } from '../data/countries';
import { COMPANY } from '../data/company';
import { OFFICE_SCHEDULES, localTime, useNow } from '../lib/officeHours';
import { Reveal, SplitText } from '../components/motion/Reveal';
import {
    EASE_OUT,
    VIEWPORT,
    fadeUpItem,
    popItem,
    resetTilt,
    staggerParent,
    trackPointer,
    trackTilt,
} from '../components/motion/motionPresets';
import './Home.css';

const MotionLink = motion.create(Link);

const contactLink = (subject) => `/contact?subject=${encodeURIComponent(subject)}#form`;

const products = [
    {
        badge: 'Live',
        badgeClass: 'hm-badge--live',
        title: 'LearnX',
        desc: 'Modular school ERP + LMS + AI Academic Studio for CBSE, ICSE, and State Boards.',
        to: '/products/learnx',
        cta: 'Explore LearnX',
        secondary: { label: 'Book a demo', to: '/products/learnx#demo' },
        icon: GraduationCap,
        image: '/images/products/learnx-app.webp',
        alt: 'LearnX school dashboard showing enrolled students, attendance, fee collection and outstanding fees',
        audience: 'For schools',
        features: ['School ERP', 'Learning management (LMS)', 'AI Academic Studio', 'CBSE, ICSE & State Boards'],
    },
    {
        badge: 'Live',
        badgeClass: 'hm-badge--live',
        title: 'EduAiTutors',
        desc: 'Live NEET & JEE coaching with AI mocks, mentorship, and GCC-friendly batches.',
        to: '/products/eduaitutors',
        cta: 'Explore EduAiTutors',
        secondary: { label: 'Talk to us', to: contactLink('EduAiTutors enquiry') },
        icon: BookOpen,
        image: '/images/products/eduaitutors-app.webp',
        alt: 'EduAiTutors website showing the Foundation Program for Classes 6 to 10',
        audience: 'NEET & JEE aspirants',
        features: ['Live coaching', 'AI mock tests', 'Mentorship'],
    },
    {
        badge: 'Live',
        badgeClass: 'hm-badge--live',
        title: 'AI-Powered LMS',
        desc: 'Adaptive learning platform for Pre-KG to Grade 12 — personalized mastery at scale.',
        to: '/products/ai-powered-lms',
        cta: 'Explore AI LMS',
        secondary: { label: 'Talk to us', to: contactLink('AI-Powered LMS enquiry') },
        icon: Brain,
        image: '/images/products/ai-lms-app.webp',
        alt: 'AI-Powered LMS home page with a personalised study plan and learner progress',
        audience: 'Pre-KG to Grade 12',
        features: ['Adaptive learning', 'Personalised mastery', 'Pre-KG to Grade 12'],
    },
];

const industries = [
    { icon: GraduationCap, title: 'Education & EdTech', desc: 'School operations, learning platforms, and student support — informed by our own LearnX and EduAiTutors products.', to: '/industries/education', image: '/images/pages/pg-ind-education.webp' },
    { icon: HeartPulse, title: 'Healthcare', desc: 'Patient communication, scheduling support, back-office processing, and secure digital systems.', to: '/industries/healthcare', image: '/images/pages/pg-ind-healthcare.webp' },
    { icon: ShoppingCart, title: 'Retail & E-commerce', desc: 'Storefront and app development, order support, customer service, and catalogue operations.', to: '/industries/retail-ecommerce', image: '/images/pages/pg-ind-retail.webp' },
    { icon: Landmark, title: 'Banking, Finance & FinTech', desc: 'Process digitisation, customer onboarding support, and document-heavy back-office work.', to: '/industries/fintech', image: '/images/pages/pg-ind-fintech.webp' },
    { icon: Truck, title: 'Logistics & Supply Chain', desc: 'Tracking and reporting platforms, dispatch coordination, and operations support.', to: '/industries/logistics', image: '/images/pages/pg-ind-logistics.webp' },
    { icon: Building2, title: 'Real Estate', desc: 'CRM and portal development, enquiry handling, and administrative support.', to: '/industries/real-estate', image: '/images/pages/pg-ind-real-estate.webp' },
];

const engagementModels = [
    { icon: UserPlus, step: '01', title: 'Dedicated Resource', desc: 'Add one skilled professional who works within your existing team and processes.', fit: 'Specific skill gaps', to: '/engagement-models/dedicated-resource' },
    { icon: Users, step: '02', title: 'Dedicated Team', desc: 'A focused team aligned to your priorities, scaled up or down as needs change.', fit: 'Ongoing roadmaps', to: '/engagement-models/dedicated-team' },
    { icon: FolderKanban, step: '03', title: 'Defined Project', desc: 'Agreed scope, milestones, and deliverables with clear ownership on our side.', fit: 'Fixed outcomes', to: '/engagement-models/project-outsourcing' },
    { icon: Settings2, step: '04', title: 'Managed Operations', desc: 'We run an ongoing function against agreed service expectations and reporting.', fit: 'Long-term functions', to: '/engagement-models/managed-services' },
];

const processSteps = [
    {
        icon: Search,
        title: 'Discover',
        desc: 'Understand your goals, current setup, and the challenge behind the request.',
        covers: ['Business goals and context', 'Current systems and workflows', 'Constraints and priorities'],
        outcome: 'A shared understanding of the challenge',
    },
    {
        icon: FileText,
        title: 'Define',
        desc: 'Document scope, requirements, priorities, and how success will be measured.',
        covers: ['Scope and requirements', 'Priorities and milestones', 'How success will be measured'],
        outcome: 'A documented scope you review and approve',
    },
    {
        icon: Puzzle,
        title: 'Match',
        desc: 'Confirm the right capabilities, delivery engine, and engagement model.',
        covers: ['Capabilities and skills required', 'India or Philippines delivery engine', 'Best-fit engagement model'],
        outcome: 'A recommended delivery approach',
    },
    {
        icon: Handshake,
        title: 'Agree',
        desc: 'Align on timelines, roles, communication, and service expectations.',
        covers: ['Timelines and roles', 'Communication rhythm', 'Service expectations'],
        outcome: 'Clear commitments on both sides',
    },
    {
        icon: Rocket,
        title: 'Deliver',
        desc: 'Execute with regular reviews and transparent reporting as needs evolve.',
        covers: ['Execution against the agreed scope', 'Regular progress reviews', 'Transparent reporting'],
        outcome: 'Delivery that adapts as your needs evolve',
    },
];

const processPromises = [
    { icon: ClipboardCheck, text: 'Scope agreed before work begins' },
    { icon: RefreshCw, text: 'Regular reviews throughout delivery' },
    { icon: BarChart3, text: 'Transparent reporting as needs evolve' },
];

const advantages = [
    { icon: Briefcase, title: 'One accountable partner', desc: 'Technology, operations and HR & workforce coordinated through a single team and point of contact.' },
    { icon: Shield, title: 'KAM Group backing', desc: 'Enterprise stability, governance and Gulf regional trust from Kuwait.' },
    { icon: Code2, title: 'India engineering talent', desc: 'Software, cloud, AI and data delivery without quality compromise.' },
    { icon: Headset, title: 'Philippines operations', desc: 'Customer experience, sales support and back-office capacity.' },
    { icon: UserSearch, title: 'HR & workforce reach', desc: 'Recruitment, staffing and payroll across India, the GCC and the USA.' },
    { icon: Layers, title: 'Consult, build and run', desc: 'Consulting, build, cloud, staffing, operations and products — Kuwait strategy with multi-hub execution.' },
];

const whyLines = [
    { icon: Code2, label: 'Technology', to: '/services' },
    { icon: Headset, label: 'Operations', to: '/outsourcing' },
    { icon: UserSearch, label: 'HR & Workforce', to: '/hr' },
];

const Eyebrow = ({ children, center }) => (
    <div className={`hm-eyebrow${center ? ' hm-eyebrow-center' : ''}`}>
        <span className="hm-eyebrow-line" aria-hidden="true" />
        <span>{children}</span>
        <span className="hm-eyebrow-line" aria-hidden="true" />
    </div>
);

const pathways = [
    {
        to: '/services',
        icon: Laptop,
        title: 'IT & Technology',
        desc: 'Custom software and apps, AI and data, cloud and DevOps, managed IT, IT staffing and the BOT model, delivered by our India technology team.',
        tags: ['Custom software', 'Cloud & DevOps', 'AI & data', 'Managed IT'],
        cta: 'Explore IT services',
        path: 'Service 01',
        audience: 'Build & run technology',
        image: '/images/hm-path-enterprise.webp',
        alt: 'Project lead and operations manager reviewing a delivery dashboard on a large screen',
    },
    {
        to: '/outsourcing',
        icon: Headset,
        title: 'Global Outsourcing',
        desc: 'Customer experience, sales support, back-office BPO, virtual assistants and recruitment process outsourcing, run by operations teams in the Philippines.',
        tags: ['CX & support', 'Sales support', 'BPO', 'RPO'],
        cta: 'Explore outsourcing',
        path: 'Service 02',
        audience: 'Scale operations',
        image: '/images/slide-outsourcing-ph.jpg',
        alt: 'Customer support team working on headsets in a bright operations office',
    },
    {
        to: '/hr',
        icon: UserSearch,
        title: 'HR & Workforce',
        desc: 'Recruitment, contract staffing, payroll outsourcing, HR advisory, executive search and background verification across India, the GCC and the USA.',
        tags: ['Recruitment', 'Staffing', 'Payroll', 'Executive search'],
        cta: 'Explore HR & Workforce',
        path: 'Service 03',
        audience: 'Hire, pay & manage people',
        image: '/images/hr/hr-hero.jpg',
        alt: 'Recruiter shaking hands with a candidate while the HR team reviews profiles',
    },
    {
        to: '/products',
        icon: GraduationCap,
        title: 'Education Products',
        desc: 'LearnX school operating system, EduAiTutors coaching, and AI-powered LMS — designed for Indian boards and modern campuses.',
        tags: ['LearnX', 'EduAiTutors', 'AI-Powered LMS'],
        cta: 'View Products',
        accent: true,
        wide: true,
        path: 'Products',
        audience: 'For schools & institutes',
        image: '/images/hm-path-education.webp',
        alt: 'School principal and administrator reviewing student progress on a tablet',
    },
];

const presence = [
    { role: 'Strategic HQ', title: 'Kuwait', code: 'KW', utc: 'UTC+3', icon: Building2, angle: -90, desc: 'Parent company backing through KAM Group — regional trust, client relationships, and enterprise governance.' },
    { role: 'Technology Engine', title: 'India', code: 'IN', utc: 'UTC+5:30', icon: Code2, angle: 30, desc: 'Technology and delivery center — engineering excellence, AI products, and scalable offshore operations.' },
    { role: 'Operations Engine', title: 'Philippines', code: 'PH', utc: 'UTC+8', icon: Headset, angle: 150, desc: 'Business operations capacity — customer experience, sales support, BPO, and recruitment process outsourcing.' },
];

const partnerMarkets = networkCountries.filter((c) => c.type === 'partner');

const orbitPoint = (angle, radius) => ({
    left: `${50 + radius * Math.cos((angle * Math.PI) / 180)}%`,
    top: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
});

const ctaIntents = [
    { icon: Code2, title: 'Technology delivery', hint: 'Software, cloud, AI & teams from India', subject: 'India Technology Delivery' },
    { icon: Headset, title: 'Business operations', hint: 'CX, sales support & BPO from the Philippines', subject: 'Philippines Operations' },
    { icon: UserSearch, title: 'Hiring & payroll', hint: 'Recruitment, staffing, payroll & HR advisory', subject: 'HR & Workforce' },
    { icon: GraduationCap, title: 'Education products', hint: 'LearnX, EduAiTutors & AI-Powered LMS', subject: 'Products' },
    { icon: PhoneCall, title: 'Not sure yet?', hint: 'Start with a discovery call', subject: 'Discovery Call' },
];

const ctaNextSteps = ['Share your requirement', 'We review the context', 'Discuss a suitable next step'];

const directContacts = [
    { code: 'KW', label: 'Kuwait HQ', value: '+965 22087764', href: 'tel:+96522087764' },
    { code: 'IN', label: 'India Center', value: COMPANY.phone, href: `tel:${COMPANY.tel}` },
    { label: 'Email us', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
];

const PresenceNetwork = () => {
    const [active, setActive] = useState(0);
    const reduceMotion = useReducedMotion();
    const now = useNow();

    return (
        <div className="hm-net">
            <Reveal className="hm-net-stage" y={24}>
                <div className="hm-net-orbit">
                    <svg className="hm-net-rings" viewBox="0 0 100 100" aria-hidden="true">
                        <circle cx="50" cy="50" r="44" className="hm-net-ring hm-net-ring--outer" />
                        <circle cx="50" cy="50" r="27" className="hm-net-ring" />
                        <circle cx="50" cy="50" r="13" className="hm-net-ring hm-net-ring--core" />
                        {presence.map((p, i) => {
                            const rad = (p.angle * Math.PI) / 180;
                            const d = `M50 50 L${50 + 27 * Math.cos(rad)} ${50 + 27 * Math.sin(rad)}`;
                            return (
                                <g key={p.code}>
                                    <path d={d} className={'hm-net-spoke' + (i === active ? ' is-lit' : '')} />
                                    {!reduceMotion && (
                                        <circle r="0.9" className="hm-net-pulse">
                                            <animateMotion dur={`${2.4 + i * 0.6}s`} repeatCount="indefinite" path={d} />
                                        </circle>
                                    )}
                                </g>
                            );
                        })}
                    </svg>

                    <div className="hm-net-partners" aria-hidden="true">
                        {partnerMarkets.map((c, i) => (
                            <span key={c.code} className="hm-net-partner" style={orbitPoint(-54 + i * 72, 44)}>
                                <span className="hm-net-partner-inner">
                                    <Flag code={c.code} round />
                                    <small>{c.name}</small>
                                </span>
                            </span>
                        ))}
                    </div>

                    <span className="hm-net-core" aria-hidden="true">
                        <img src="/logo-mark.png?v=7" alt="" width="199" height="120" loading="lazy" />
                    </span>

                    {presence.map((p, i) => (
                        <span
                            key={p.code}
                            className={'hm-net-hub' + (i === active ? ' is-active' : '')}
                            style={orbitPoint(p.angle, 27)}
                            onMouseEnter={() => setActive(i)}
                            aria-hidden="true"
                        >
                            <Flag code={p.code} round />
                            <span className="hm-net-hub-label">
                                <strong>{p.title}</strong>
                                <small>{p.role}</small>
                            </span>
                        </span>
                    ))}
                </div>
                <div className="hm-net-legend" aria-hidden="true">
                    <span><i className="hm-net-key hm-net-key--hub" /> Delivery hub</span>
                    <span><i className="hm-net-key hm-net-key--partner" /> Partner market</span>
                </div>
            </Reveal>

            <div className="hm-net-side">
                <motion.ul className="hm-net-list" {...gridMotion(0.12, 0.2)}>
                    {presence.map((p, i) => (
                        <motion.li key={p.code} variants={fadeUpItem}>
                            <button
                                type="button"
                                className={'hm-net-card' + (i === active ? ' is-active' : '')}
                                onMouseEnter={() => setActive(i)}
                                onFocus={() => setActive(i)}
                                onClick={() => setActive(i)}
                                aria-pressed={i === active}
                            >
                                <Flag code={p.code} className="hm-net-card-flag" />
                                <span className="hm-net-card-body">
                                    <span className="hm-net-card-head">
                                        <span className="hm-presence-role">{p.role}</span>
                                        <span className="hm-net-time">
                                            <Clock size={12} aria-hidden="true" />
                                            {localTime(OFFICE_SCHEDULES[p.code].timeZone, now)} · {p.utc}
                                        </span>
                                    </span>
                                    <strong className="hm-net-card-title">{p.title}</strong>
                                    <span className="hm-net-card-desc">{p.desc}</span>
                                </span>
                            </button>
                        </motion.li>
                    ))}
                </motion.ul>

                <Reveal className="hm-net-partnerbar" delay={0.3} y={12}>
                    <span className="hm-net-partnerbar-label">
                        <Globe size={14} aria-hidden="true" /> Partner markets
                    </span>
                    <ul>
                        {partnerMarkets.map((c) => (
                            <li key={c.code}>
                                <Flag code={c.code} />
                                {c.name}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </div>
    );
};

const gridMotion = (stagger = 0.08, delay = 0) => ({
    variants: staggerParent(stagger, delay),
    initial: 'hidden',
    whileInView: 'show',
    viewport: VIEWPORT,
});

const SectionHeader = ({ eyebrow, title, accent, children, wide, breakAccent }) => (
    <div className={'hm-section-header' + (wide ? ' hm-section-header--wide' : '')}>
        <Reveal y={12}>
            <Eyebrow center>{eyebrow}</Eyebrow>
        </Reveal>
        <SplitText text={title} accent={accent} breakBeforeAccent={breakAccent} />
        {children && (
            <Reveal delay={0.2} y={16}>
                <p>{children}</p>
            </Reveal>
        )}
    </div>
);

const STEP_AUTOPLAY_MS = 5000;

const ProcessJourney = () => {
    const [active, setActive] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const rootRef = useRef(null);
    const inView = useInView(rootRef, { amount: 0.4 });
    const reduceMotion = useReducedMotion();
    const step = processSteps[active];
    const last = processSteps.length - 1;
    const playing = autoplay && inView && !reduceMotion;

    useEffect(() => {
        if (!playing) return undefined;
        const id = setTimeout(() => setActive((i) => (i === last ? 0 : i + 1)), STEP_AUTOPLAY_MS);
        return () => clearTimeout(id);
    }, [playing, active, last]);

    const select = (i) => {
        setAutoplay(false);
        setActive(Math.max(0, Math.min(last, i)));
    };

    const onRailKey = (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const next = e.key === 'ArrowRight' ? (active === last ? 0 : active + 1) : (active === 0 ? last : active - 1);
            select(next);
            e.currentTarget.querySelectorAll('[role="tab"]')[next]?.focus();
        }
    };

    return (
        <div className="hm-flow" ref={rootRef}>
            <div className="hm-flow-rail-wrap">
                <span className="hm-flow-track" aria-hidden="true">
                    <motion.span
                        className="hm-flow-fill"
                        initial={false}
                        animate={{ scaleX: active / last }}
                        transition={{ duration: 0.6, ease: EASE_OUT }}
                    />
                </span>
                <motion.div
                    className="hm-flow-rail"
                    role="tablist"
                    aria-label="How we work, step by step"
                    onKeyDown={onRailKey}
                    {...gridMotion(0.12, 0.15)}
                >
                    {processSteps.map((s, i) => {
                        const state = i === active ? ' is-active' : i < active ? ' is-done' : '';
                        return (
                            <motion.button
                                key={s.title}
                                type="button"
                                role="tab"
                                id={`flow-tab-${i}`}
                                aria-selected={i === active}
                                aria-controls="flow-panel"
                                tabIndex={i === active ? 0 : -1}
                                className={'hm-flow-step' + state}
                                onClick={() => select(i)}
                                variants={popItem}
                            >
                                <span className="hm-flow-node" aria-hidden="true">
                                    {i < active ? <Check size={18} strokeWidth={2.6} /> : <s.icon size={18} />}
                                    {i === active && playing && (
                                        <svg className="hm-flow-timer" viewBox="0 0 60 60" key={`t-${active}`}>
                                            <circle cx="30" cy="30" r="28" style={{ animationDuration: `${STEP_AUTOPLAY_MS}ms` }} />
                                        </svg>
                                    )}
                                </span>
                                <span className="hm-flow-label">
                                    <small>Step {String(i + 1).padStart(2, '0')}</small>
                                    <strong>{s.title}</strong>
                                </span>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>

            <Reveal className="hm-flow-panel" y={24} delay={0.3}>
                <div id="flow-panel" role="tabpanel" aria-labelledby={`flow-tab-${active}`} aria-live="polite">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={step.title}
                            className="hm-flow-detail"
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
                            transition={{ duration: 0.45, ease: EASE_OUT }}
                        >
                            <div className="hm-flow-copy">
                                <span className="hm-flow-ghost" aria-hidden="true">
                                    {String(active + 1).padStart(2, '0')}
                                </span>
                                <span className="hm-flow-kicker">
                                    <step.icon size={14} aria-hidden="true" /> Step {active + 1} of {processSteps.length}
                                </span>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                                <div className="hm-flow-outcome">
                                    <span className="hm-flow-outcome-icon" aria-hidden="true"><Target size={16} /></span>
                                    <span>
                                        <small>Outcome</small>
                                        <strong>{step.outcome}</strong>
                                    </span>
                                </div>
                            </div>
                            <div className="hm-flow-covers">
                                <span className="hm-flow-covers-title">What we cover</span>
                                <motion.ul variants={staggerParent(0.09, 0.15)} initial="hidden" animate="show">
                                    {step.covers.map((c, ci) => (
                                        <motion.li key={c} variants={fadeUpItem}>
                                            <span className="hm-flow-covers-num">{ci + 1}</span>
                                            {c}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="hm-flow-controls">
                    <div className="hm-flow-bars" aria-hidden="true">
                        {processSteps.map((s, i) => (
                            <span key={s.title} className={i <= active ? 'is-on' : ''} />
                        ))}
                    </div>
                    <div className="hm-flow-nav">
                        <button
                            type="button"
                            className="hm-flow-btn"
                            onClick={() => select(active - 1)}
                            disabled={active === 0}
                            aria-label="Previous step"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            type="button"
                            className="hm-flow-btn hm-flow-btn--next"
                            onClick={() => select(active + 1)}
                            disabled={active === last}
                            aria-label="Next step"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </Reveal>

            <motion.ul className="hm-flow-promises" {...gridMotion(0.1, 0.1)}>
                {processPromises.map((p) => (
                    <motion.li key={p.text} variants={fadeUpItem}>
                        <span className="hm-flow-promise-icon" aria-hidden="true"><p.icon size={16} /></span>
                        {p.text}
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
};

const CountryMarquee = () => {
    const [paused, setPaused] = useState(false);
    const renderList = (copy) => (
        <ul className="hm-reach-list" aria-hidden={copy ? 'true' : undefined}>
            {networkCountries.map((c) => (
                <li key={c.code} className="hm-reach-item" title={c.role}>
                    <Flag code={c.code} />
                    <span>{c.name}</span>
                </li>
            ))}
        </ul>
    );

    return (
        <section className="hm-reach" aria-label="Countries in our network">
            <div className="container hm-reach-inner">
                <p className="hm-reach-label">
                    <span className="hm-reach-live" aria-hidden="true" />
                    Our network
                    <span className="hm-reach-count">{networkCountries.length}</span>
                </p>
                <div className={'hm-reach-viewport' + (paused ? ' is-paused' : '')}>
                    <div className="hm-reach-track">
                        {renderList(false)}
                        {renderList(true)}
                    </div>
                </div>
                <button
                    type="button"
                    className="hm-reach-toggle"
                    onClick={() => setPaused((p) => !p)}
                    aria-pressed={paused}
                    aria-label={paused ? 'Play country list animation' : 'Pause country list animation'}
                >
                    {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
                </button>
            </div>
        </section>
    );
};

const IndustriesGallery = () => {
    const [active, setActive] = useState(0);

    return (
        <motion.ul className="hm-ind-gallery" {...gridMotion(0.08)}>
            {industries.map((ind, i) => (
                <motion.li
                    key={ind.title}
                    className={'hm-ind-panel' + (i === active ? ' is-active' : '')}
                    variants={fadeUpItem}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                >
                    <Link to={ind.to} className="hm-ind-link">
                        <img src={ind.image} alt="" loading="lazy" width="1280" height="720" />
                        <span className="hm-ind-shade" aria-hidden="true" />
                        <span className="hm-ind-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                        <span className="hm-ind-vertical" aria-hidden="true">
                            <ind.icon size={18} strokeWidth={1.75} />
                            <span>{ind.title}</span>
                        </span>
                        <span className="hm-ind-content">
                            <span className="hm-ind-icon" aria-hidden="true">
                                <ind.icon size={20} strokeWidth={1.75} />
                            </span>
                            <h3>{ind.title}</h3>
                            <p>{ind.desc}</p>
                            <span className="hm-ind-more">
                                Explore industry <ArrowUpRight size={15} aria-hidden="true" />
                            </span>
                        </span>
                    </Link>
                </motion.li>
            ))}
        </motion.ul>
    );
};

const PRODUCT_AUTOPLAY_MS = 7000;

const ProductShowcase = () => {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [autoplay, setAutoplay] = useState(true);
    const rootRef = useRef(null);
    const inView = useInView(rootRef, { amount: 0.35 });
    const reduceMotion = useReducedMotion();
    const product = products[active];
    const last = products.length - 1;
    const playing = autoplay && !paused && inView && !reduceMotion;

    useEffect(() => {
        if (!playing) return undefined;
        const id = setTimeout(() => setActive((i) => (i === last ? 0 : i + 1)), PRODUCT_AUTOPLAY_MS);
        return () => clearTimeout(id);
    }, [playing, active, last]);

    const select = (i) => {
        setAutoplay(false);
        setActive(i);
    };

    const onTabKey = (e) => {
        const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (!(e.key in keys)) return;
        e.preventDefault();
        const next = (active + keys[e.key] + products.length) % products.length;
        select(next);
        e.currentTarget.querySelectorAll('[role="tab"]')[next]?.focus();
    };

    return (
        <div
            className="hm-px"
            ref={rootRef}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <motion.div
                className="hm-px-tabs"
                role="tablist"
                aria-label="Our products"
                aria-orientation="vertical"
                onKeyDown={onTabKey}
                {...gridMotion(0.1, 0.1)}
            >
                {products.map((p, i) => (
                    <motion.button
                        key={p.title}
                        type="button"
                        role="tab"
                        id={`px-tab-${i}`}
                        aria-selected={i === active}
                        aria-controls="px-panel"
                        tabIndex={i === active ? 0 : -1}
                        className={'hm-px-tab' + (i === active ? ' is-active' : '')}
                        onClick={() => select(i)}
                        variants={fadeUpItem}
                    >
                        <span className="hm-px-tab-icon" aria-hidden="true"><p.icon size={20} /></span>
                        <span className="hm-px-tab-text">
                            <strong>{p.title}</strong>
                            <small>{p.audience}</small>
                            <em>{p.desc}</em>
                        </span>
                        <span className="hm-px-tab-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                        {i === active && (
                            <span className="hm-px-tab-progress" aria-hidden="true">
                                <span
                                    key={`${active}-${playing}`}
                                    className={playing ? 'is-running' : autoplay && !reduceMotion ? 'is-waiting' : ''}
                                    style={{ animationDuration: `${PRODUCT_AUTOPLAY_MS}ms` }}
                                />
                            </span>
                        )}
                    </motion.button>
                ))}
                <Link to={contactLink('Product enquiry')} className="hm-px-all">
                    <span>
                        <strong>Not sure which fits?</strong>
                        <small>Talk to our product team</small>
                    </span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
            </motion.div>

            <Reveal className="hm-px-stage" y={30} delay={0.15}>
                <div id="px-panel" role="tabpanel" aria-labelledby={`px-tab-${active}`}>
                    <div className="hm-px-screen" onPointerMove={(e) => trackTilt(e, 3)} onPointerLeave={resetTilt}>
                        <div className="hm-pd-browser hm-pd-browser--tilt">
                            <span className="hm-pd-browser-bar">
                                <span className="hm-pd-browser-dots" aria-hidden="true"><i /><i /><i /></span>
                                <span className="hm-pd-browser-title">{product.title}</span>
                                <span className={`hm-badge ${product.badgeClass}`}>
                                    <span className="hm-badge-dot" aria-hidden="true" />
                                    {product.badge}
                                </span>
                            </span>
                            <span className="hm-px-shot">
                                <AnimatePresence initial={false}>
                                    <motion.img
                                        key={product.image}
                                        src={product.image}
                                        alt={product.alt}
                                        width="1024"
                                        height="463"
                                        loading="lazy"
                                        initial={{ opacity: 0, scale: 1.03 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.55, ease: EASE_OUT }}
                                    />
                                </AnimatePresence>
                            </span>
                        </div>
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={product.title}
                            className="hm-px-info"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.4, ease: EASE_OUT }}
                            aria-live="polite"
                        >
                            <div className="hm-px-copy">
                                <h3>
                                    {product.title}
                                    {active === 0 && (
                                        <span className="hm-px-flag">
                                            <Sparkles size={12} aria-hidden="true" /> Flagship
                                        </span>
                                    )}
                                </h3>
                                <p>{product.desc}</p>
                                <ul className="hm-px-features">
                                    {product.features.map((f) => (
                                        <li key={f}><CheckCircle2 size={14} aria-hidden="true" /> {f}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="hm-px-actions">
                                <Link to={product.to} className="hm-btn hm-btn-primary">
                                    {product.cta} <ArrowRight size={15} />
                                </Link>
                                <Link to={product.secondary.to} className="hm-text-link">
                                    {product.secondary.label} <ArrowRight size={15} />
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </Reveal>
        </div>
    );
};

const Home = () => {
    const pageRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end end'] });
    const scrollBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <MotionConfig reducedMotion="user">
        <div className="home-page" ref={pageRef}>
            {/* Reading progress bar */}
            <motion.div
                className="hm-reading-progress"
                style={{ width: scrollBarWidth }}
                aria-hidden="true"
            />
            <Helmet>
                <title>KAM Global AI | Technology, Outsourcing &amp; Digital Solutions</title>
                <meta
                    name="description"
                    content="Explore KAM Global AI's technology services, digital products, and flexible outsourcing capabilities for organizations across industries."
                />
                <meta
                    name="keywords"
                    content="KAM Global AI, technology services, outsourcing, BPO, customer experience, RPO, software development, cloud, BOT model, LearnX, EduAiTutors, India, Philippines"
                />
                <link rel="canonical" href="https://kamglobalai.com/" />
                <meta property="og:url" content="https://kamglobalai.com/" />
                <meta property="og:title" content="KAM Global AI | Technology, Outsourcing & Digital Solutions" />
                <meta
                    property="og:description"
                    content="Explore KAM Global AI's technology services, digital products, and flexible outsourcing capabilities for organizations across industries."
                />
            </Helmet>

            {/* 1. Hero */}
            <HeroShowcase />

            {/* 1b. Country network marquee */}
            <CountryMarquee />

            {/* 2. Intro */}
            <section className="hm-about">
                <div className="container">
                    <div className="hm-ab-head">
                        <div>
                            <Reveal y={12}>
                                <Eyebrow>Who We Are</Eyebrow>
                            </Reveal>
                            <h2>
                                Technology, Talent and Operations—<span>Aligned to Your Goals</span>
                            </h2>
                        </div>
                        <Reveal className="hm-ab-head-copy" delay={0.1} y={14}>
                            <p>
                                KAM Global AI is a technology and workforce services company. It provides software
                                development, AI and automation, data and analytics, cloud and DevOps, managed IT, HR and
                                recruitment services, and global outsourcing, with technology delivery from India and
                                business operations support from the Philippines. Whether you are building a platform,
                                improving IT operations, expanding customer-facing capacity or hiring, we can help you
                                define the next step.
                            </p>
                            <div className="hm-about-actions">
                                <Link to="/about" className="hm-btn hm-btn-primary">
                                    About KAM Global AI <ArrowRight size={15} />
                                </Link>
                                <a href="#global-presence" className="hm-text-link">
                                    See where we operate <ArrowRight size={15} />
                                </a>
                            </div>
                        </Reveal>
                    </div>

                    <div className="hm-ab-bento hm-ab-bento--duo">
                        <motion.figure
                            className="hm-ab-photo"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, ease: EASE_OUT }}
                        >
                            <img
                                src="/images/hm-who-we-are.webp"
                                alt="KAM Group executive shaking hands with the KAM Global AI technology and operations team in a bright office"
                                loading="lazy"
                                width="1024"
                                height="768"
                            />
                            <figcaption className="hm-ab-tag hm-ab-tag--top">
                                <span className="hm-ab-tag-icon" aria-hidden="true"><Shield size={15} /></span>
                                <span>
                                    <strong>Backed by KAM Group</strong>
                                    <small>Kuwait</small>
                                </span>
                            </figcaption>
                            <span className="hm-ab-tag hm-ab-tag--bottom">
                                <span className="hm-ab-tag-icon" aria-hidden="true"><MapPin size={15} /></span>
                                <span>
                                    <strong>One partner, three service lines</strong>
                                    <small>Kuwait · India · Philippines</small>
                                </span>
                            </span>
                        </motion.figure>

                        <Reveal className="hm-ab-stats" delay={0.2} y={20}>
                            <p className="hm-ab-backing">
                                <Handshake size={18} aria-hidden="true" />
                                Strategically backed by KAM Group, Kuwait, we connect regional business trust with
                                reliable delivery, AI products, and long-term partnership.
                            </p>
                            <div className="hm-ab-stat-row">
                                <div className="hm-ab-stat">
                                    <strong>
                                        <CountUp end={10} duration={2} enableScrollSpy scrollSpyOnce /><em>+</em>
                                    </strong>
                                    <span>Years group legacy</span>
                                </div>
                                <div className="hm-ab-stat">
                                    <strong>
                                        <CountUp end={3} duration={2} enableScrollSpy scrollSpyOnce />
                                    </strong>
                                    <span>Service lines</span>
                                </div>
                                <div className="hm-ab-stat">
                                    <strong>
                                        <CountUp end={networkCountries.length} duration={2} enableScrollSpy scrollSpyOnce />
                                    </strong>
                                    <span>Countries in our network</span>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 5. Dual pathways */}
            <section className="hm-pathways">
                <div className="container">
                    <SectionHeader eyebrow="What We Offer" title="Three service lines for" accent="your organisation">
                        IT &amp; technology, global outsourcing, and HR &amp; workforce, plus our education products. Pick the line that matches what you need and start there.
                    </SectionHeader>
                    <div className="hm-paths">
                        <svg className="hm-paths-fork" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true">
                            {['M500 0 V28 Q500 44 484 44 H182 Q166 44 166 60 V80', 'M500 0 V80', 'M500 0 V28 Q500 44 516 44 H818 Q834 44 834 60 V80'].map((d) => (
                                <motion.path
                                    key={d}
                                    d={d}
                                    vectorEffect="non-scaling-stroke"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={VIEWPORT}
                                    transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.3 }}
                                />
                            ))}
                        </svg>
                        <motion.div className="hm-paths-grid hm-paths-grid--three" {...gridMotion(0.15, 0.6)} viewport={{ ...VIEWPORT, amount: 0.08 }}>
                            {pathways.map(({ to, icon: Icon, title, desc, tags, cta, accent, wide, path, audience, image, alt }) => (
                                <MotionLink
                                    key={title}
                                    to={to}
                                    className={'hm-path-card rv-spot' + (accent ? ' hm-path-card--accent' : '') + (wide ? ' hm-path-card--wide' : '')}
                                    variants={fadeUpItem}
                                    onPointerMove={trackPointer}
                                >
                                    <div className="hm-path-media">
                                        <img src={image} alt={alt} loading="lazy" width="1024" height="576" />
                                        <span className="hm-path-badge">{path}</span>
                                    </div>
                                    <div className="hm-path-body">
                                        <span className="hm-path-audience">
                                            <span className="hm-path-audience-icon" aria-hidden="true"><Icon size={15} /></span>
                                            {audience}
                                        </span>
                                        <h3>{title}</h3>
                                        <p>{desc}</p>
                                        <ul className="hm-path-tags">
                                            {tags.map((t) => <li key={t}>{t}</li>)}
                                        </ul>
                                        <span className="hm-path-cta">
                                            {cta}
                                            <span className="hm-path-cta-arrow" aria-hidden="true"><ArrowRight size={16} /></span>
                                        </span>
                                    </div>
                                </MotionLink>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 7. Industries */}
            <section className="hm-industries" id="industries">
                <div className="container">
                    <SectionHeader eyebrow="Industries" title="Built for Different" accent="Industries" wide>
                        We work to understand the workflows, customers, and operating requirements that make each
                        industry different. Explore how our technology and support capabilities may apply to your
                        sector.
                    </SectionHeader>
                    <IndustriesGallery />
                    <div className="hm-section-footer">
                        <Link to="/industries" className="hm-btn hm-btn-outline">
                            Explore Industries <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 8. Engagement models */}
            <section className="hm-engagement" id="engagement-models">
                <div className="container">
                    <SectionHeader eyebrow="Engagement Models" title="Choose a Delivery Model" accent="That Fits" wide breakAccent>
                        Start with a dedicated resource, build a team, commission a defined project, or discuss
                        ongoing managed operations. The model is selected around scope, ownership, timelines, and
                        service expectations.
                    </SectionHeader>
                    <div className="hm-eng-spectrum" aria-hidden="true">
                        <div className="hm-eng-spectrum-labels">
                            <span><Users size={14} /> You lead day-to-day</span>
                            <span>We run it end-to-end <Settings2 size={14} /></span>
                        </div>
                        <div className="hm-eng-track">
                            <motion.span
                                className="hm-eng-track-fill"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={VIEWPORT}
                                transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.2 }}
                            />
                            <motion.span className="hm-eng-nodes" {...gridMotion(0.3, 0.35)}>
                                {engagementModels.map((m) => (
                                    <motion.span key={m.title} className="hm-eng-node" variants={popItem}>
                                        {m.step}
                                    </motion.span>
                                ))}
                            </motion.span>
                        </div>
                    </div>
                    <motion.ol className="hm-engagement-flow hm-eng-flow" {...gridMotion(0.15, 0.3)}>
                        {engagementModels.map((m, i) => (
                            <motion.li
                                key={m.title}
                                className="hm-engagement-step hm-eng-card rv-spot"
                                variants={fadeUpItem}
                                onPointerMove={trackPointer}
                            >
                                <div className="hm-engagement-top">
                                    <span className="hm-engagement-icon" aria-hidden="true">
                                        <m.icon size={20} />
                                    </span>
                                    <span className="hm-engagement-num">{m.step}</span>
                                </div>
                                <h3><Link to={m.to}>{m.title}</Link></h3>
                                <p>{m.desc}</p>
                                <div className="hm-eng-meter">
                                    <span className="hm-eng-meter-label">Our ownership</span>
                                    <span className="hm-eng-meter-bars" role="img" aria-label={`Ownership level ${i + 1} of 4`}>
                                        {engagementModels.map((_, k) => (
                                            <span key={k} className={k <= i ? 'is-on' : undefined} />
                                        ))}
                                    </span>
                                </div>
                                <span className="hm-engagement-fit">Suited for: {m.fit}</span>
                                <span className="hm-eng-go" aria-hidden="true"><ArrowUpRight size={16} /></span>
                            </motion.li>
                        ))}
                    </motion.ol>
                    <Reveal className="hm-eng-bot" y={20}>
                        <span className="hm-eng-bot-icon" aria-hidden="true"><Handshake size={22} /></span>
                        <div className="hm-eng-bot-text">
                            <strong>Planning to own the team long-term?</strong>
                            <span>
                                Ask about our Build-Operate-Transfer (BOT) model — we build and run the team, then
                                transfer it to you.
                            </span>
                        </div>
                        <Link to="/services/bot-model" className="hm-btn hm-btn-primary">
                            Explore BOT Model <ArrowRight size={15} />
                        </Link>
                    </Reveal>
                    <div className="hm-section-footer">
                        <Link to="/engagement-models" className="hm-btn hm-btn-outline">
                            Compare Engagement Models <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 9. Products */}
            <section className="hm-products" id="products">
                <div className="container">
                    <SectionHeader eyebrow="Products" title="Digital Products from" accent="KAM Global AI" breakAccent>
                        Discover LearnX, EduAiTutors, and our AI-powered learning platform offerings — from school
                        ERP to competitive exam coaching.
                    </SectionHeader>
                    <ProductShowcase />
                    <div className="hm-section-footer">
                        <Link to="/products" className="hm-btn hm-btn-outline">
                            Explore Our Products <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 10. How we work */}
            <section className="hm-process" id="how-we-work">
                <div className="container">
                    <SectionHeader eyebrow="How We Work" title="Clear Scope." accent="Collaborative Delivery." wide breakAccent>
                        We begin by understanding your goals, defining requirements, confirming the appropriate
                        capabilities, and agreeing on delivery expectations before work begins.
                    </SectionHeader>
                    <ProcessJourney />
                    <div className="hm-section-footer">
                        <Link to="/about#approach" className="hm-btn hm-btn-outline">
                            How We Engage <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 11. Why */}
            <section className="hm-why">
                <div className="container">
                    <div className="hm-wy">
                        <Reveal className="hm-wy-media" y={24}>
                            <figure className="hm-wy-photo">
                                <img
                                    src="/office_team_collab.webp"
                                    alt="Two KAM Global AI consultants reviewing a client delivery plan on a laptop"
                                    loading="lazy"
                                    width="1024"
                                    height="1024"
                                />
                                <figcaption className="hm-wy-badge">
                                    <span className="hm-wy-badge-icon" aria-hidden="true">
                                        <Handshake size={18} />
                                    </span>
                                    <span>
                                        <strong>One accountable partner</strong>
                                        <small>Across three service lines</small>
                                    </span>
                                </figcaption>
                            </figure>
                            <nav className="hm-wy-lines" aria-label="Service lines">
                                {whyLines.map((l) => (
                                    <Link key={l.to} to={l.to} className="hm-wy-line">
                                        <l.icon size={16} aria-hidden="true" />
                                        {l.label}
                                        <ArrowUpRight size={14} aria-hidden="true" className="hm-wy-line-arrow" />
                                    </Link>
                                ))}
                            </nav>
                        </Reveal>

                        <div className="hm-wy-content">
                            <Reveal y={12}>
                                <Eyebrow>Why KAM Global AI</Eyebrow>
                            </Reveal>
                            <SplitText text="Global capability. Local trust." accent="Proven execution." />
                            <Reveal delay={0.2} y={16}>
                                <p className="hm-wy-lead">
                                    Clients choose us for one accountable partner across technology, operations and HR
                                    &amp; workforce: regional relationships and governance paired with cost-efficient,
                                    high-quality delivery.
                                </p>
                            </Reveal>

                            <motion.ol className="hm-wy-list" {...gridMotion(0.07, 0.15)}>
                                {advantages.map((a, i) => (
                                    <motion.li key={a.title} className="hm-wy-item" variants={fadeUpItem}>
                                        <span className="hm-wy-icon" aria-hidden="true">
                                            <a.icon size={18} />
                                        </span>
                                        <div>
                                            <h3>
                                                <span className="hm-wy-num" aria-hidden="true">
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                                {a.title}
                                            </h3>
                                            <p>{a.desc}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ol>

                            <Reveal delay={0.2} y={12} className="hm-why-actions">
                                <Link to="/about#why-us" className="hm-btn hm-btn-primary">
                                    Why KAM Global AI <ArrowRight size={15} />
                                </Link>
                                <Link to="/contact" className="hm-why-talk">
                                    Talk to our team <ArrowUpRight size={15} />
                                </Link>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* 12. Global presence */}
            <section className="hm-presence" id="global-presence">
                <div className="container">
                    <SectionHeader eyebrow="Global Presence" title="Three hubs. Eight countries." accent="One delivery standard." breakAccent>
                        Strategy and governance in Kuwait, technology delivery from India, and business operations
                        from the Philippines — extended through partner markets across the GCC and the USA.
                    </SectionHeader>
                    <PresenceNetwork />
                </div>
            </section>

            {/* 13. Final CTA */}
            <section className="hm-cta">
                <div className="container">
                    <motion.div
                        className="hm-talk"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ ...VIEWPORT, amount: 0.1 }}
                        transition={{ duration: 0.8, ease: EASE_OUT }}
                    >
                        <div className="hm-talk-main rv-spot" onPointerMove={trackPointer}>
                            <svg className="hm-cta-art" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                                <g fill="none" stroke="currentColor" strokeWidth="1">
                                    <ellipse cx="600" cy="200" rx="520" ry="150" />
                                    <ellipse cx="600" cy="200" rx="380" ry="110" />
                                    <ellipse cx="600" cy="200" rx="230" ry="66" />
                                    <path d="M80 200 Q600 -40 1120 200" />
                                    <path d="M80 200 Q600 440 1120 200" />
                                </g>
                            </svg>
                            <motion.div className="hm-talk-copy" {...gridMotion(0.1, 0.2)}>
                                <motion.span className="hm-cta-kicker" variants={fadeUpItem}>
                                    <span className="hm-cta-kicker-dot" aria-hidden="true" /> Let&apos;s talk
                                </motion.span>
                                <SplitText text="Tell Us What Your" accent="Business Needs" breakBeforeAccent />
                                <motion.p variants={fadeUpItem}>
                                    Share your goals, challenge, timeline, or resource requirement. Our team can review
                                    the context and discuss a suitable next step.
                                </motion.p>
                                <motion.ul className="hm-talk-points" variants={staggerParent(0.08)}>
                                    <motion.li variants={fadeUpItem}><CheckCircle2 size={15} aria-hidden="true" /> Free consultation for qualified enquiries</motion.li>
                                    <motion.li variants={fadeUpItem}><CheckCircle2 size={15} aria-hidden="true" /> Modular product &amp; service engagement</motion.li>
                                    <motion.li variants={fadeUpItem}><CheckCircle2 size={15} aria-hidden="true" /> Onboarding support included</motion.li>
                                </motion.ul>
                                <motion.div className="hm-talk-actions" variants={fadeUpItem}>
                                    <Link to="/contact" className="hm-btn hm-btn-accent">
                                        Start a Conversation <ArrowRight size={16} />
                                    </Link>
                                    <Link to={contactLink('Request a Proposal')} className="hm-btn hm-btn-secondary">
                                        Request a Proposal
                                    </Link>
                                </motion.div>
                                <motion.div variants={fadeUpItem}>
                                    <Link to="/products/learnx#demo" className="hm-cta-tertiary">
                                        Looking for LearnX? Book a demo <ArrowRight size={14} />
                                    </Link>
                                </motion.div>
                            </motion.div>

                            <div className="hm-talk-direct">
                                <span className="hm-talk-direct-label">Prefer to talk directly?</span>
                                <div className="hm-talk-direct-list">
                                    {directContacts.map((c) => (
                                        <a key={c.href} href={c.href} className="hm-talk-direct-item">
                                            {c.code ? (
                                                <Flag code={c.code} />
                                            ) : (
                                                <span className="hm-talk-direct-icon" aria-hidden="true"><Mail size={14} /></span>
                                            )}
                                            <span>
                                                <small>{c.label}</small>
                                                <strong>{c.value}</strong>
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <aside className="hm-talk-panel" aria-labelledby="cta-panel-title">
                            <span className="hm-talk-step-tag">Step 1 of 2</span>
                            <h3 id="cta-panel-title" className="hm-talk-panel-title">What do you need help with?</h3>
                            <p className="hm-talk-panel-sub">Pick a starting point — we&apos;ll pre-fill the enquiry for you.</p>
                            <motion.div className="hm-talk-intents" {...gridMotion(0.07, 0.3)}>
                                {ctaIntents.map((it, i) => (
                                    <MotionLink
                                        key={it.subject}
                                        to={contactLink(it.subject)}
                                        className={'hm-talk-intent' + (i === ctaIntents.length - 1 ? ' hm-talk-intent--wide' : '')}
                                        variants={fadeUpItem}
                                    >
                                        <span className="hm-talk-intent-icon" aria-hidden="true"><it.icon size={18} /></span>
                                        <span className="hm-talk-intent-text">
                                            <strong>{it.title}</strong>
                                            <small>{it.hint}</small>
                                        </span>
                                        <ArrowUpRight size={16} className="hm-talk-intent-arrow" aria-hidden="true" />
                                    </MotionLink>
                                ))}
                            </motion.div>
                            <div className="hm-talk-next">
                                <span className="hm-talk-next-title">What happens next</span>
                                <ol>
                                    {ctaNextSteps.map((s, i) => (
                                        <li key={s}>
                                            <span className="hm-talk-next-num">{i + 1}</span>
                                            {s}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </aside>
                    </motion.div>
                </div>
            </section>
        </div>
        </MotionConfig>
    );
};

export default Home;
