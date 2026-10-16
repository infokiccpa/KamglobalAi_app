import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import {
    Target,
    Eye,
    Sparkles,
    ShieldCheck,
    CheckCircle2,
    Users,
    ArrowRight,
    ArrowUpRight,
    Compass,
    Globe2,
    Shield,
    Cpu,
    Award,
    Zap,
    BarChart3,
    DollarSign,
    Code2,
    Cloud,
    Wrench,
    TrendingUp,
    GraduationCap,
    Building2,
    Headset,
    MapPin,
    ExternalLink,
    Handshake,
    Play,
    X,
    Check,
    Minus,
    Quote,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
    MessageCircle,
} from 'lucide-react';
import CountUp from 'react-countup';
import { SplitText, Reveal } from '../components/motion/Reveal';
import { VIEWPORT, staggerParent, fadeUpItem, trackPointer, trackTilt, resetTilt } from '../components/motion/motionPresets';
import { OFFICE_LOCATIONS } from '../config/officeLocations';
import {
    founderProfile,
    executiveBoard,
    kuwaitHighlights,
    indiaHighlights,
    teamDepartments,
    getInitials,
} from '../data/leadershipContent';
import { COMPANY } from '../data/company';
import { networkCountries } from '../data/countries';
import Flag from '../components/Flag';
import { useNow } from '../lib/officeHours';
import './About.css';

const heroStats = [
    { value: 10, suffix: '+', label: 'Years group legacy' },
    { value: 3, suffix: '', label: 'Delivery hubs' },
    { value: networkCountries.length, suffix: '', label: 'Countries in our network' },
];

const heroHubs = [
    { code: 'KW', country: 'Kuwait', role: 'Strategy & client trust', timeZone: 'Asia/Kuwait' },
    { code: 'IN', country: 'India', role: 'Technology & engineering', timeZone: 'Asia/Kolkata' },
    { code: 'PH', country: 'Philippines', role: 'Operations & CX', timeZone: 'Asia/Manila' },
];

const NOW_SERVING = ['TECHNOLOGY', 'HR & WORKFORCE', 'OUTSOURCING', 'EDTECH'];
const FLAP_CHARS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&:-';

const hubTime = (timeZone, now) =>
    new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(now);

function FlapChar({ char, delay, instant }) {
    const [shown, setShown] = useState(' ');

    useEffect(() => {
        let steps = instant ? 0 : 4 + Math.floor(Math.random() * 6);
        let timer;
        const tick = () => {
            if (steps <= 0) {
                setShown(char);
                return;
            }
            steps -= 1;
            setShown(FLAP_CHARS[1 + Math.floor(Math.random() * (FLAP_CHARS.length - 1))]);
            timer = window.setTimeout(tick, 60);
        };
        timer = window.setTimeout(tick, instant ? 0 : delay);
        return () => window.clearTimeout(timer);
    }, [char, delay, instant]);

    return (
        <span className="ab-flap">
            <span key={shown} className="ab-flap-ch">{shown}</span>
        </span>
    );
}

function FlapText({ text, length, delay = 0, instant, className }) {
    const chars = text.toUpperCase().padEnd(length, ' ').slice(0, length).split('');
    return (
        <span className={`ab-flaps${className ? ` ${className}` : ''}`} aria-hidden="true">
            {chars.map((c, i) => (
                <FlapChar key={i} char={c} delay={delay + i * 40} instant={instant} />
            ))}
        </span>
    );
}

function HeroBoard() {
    const reduceMotion = useReducedMotion();
    const now = useNow(30000);
    const [serving, setServing] = useState(0);

    useEffect(() => {
        if (reduceMotion) return undefined;
        const id = window.setInterval(() => setServing((i) => (i + 1) % NOW_SERVING.length), 4200);
        return () => window.clearInterval(id);
    }, [reduceMotion]);

    return (
        <div className="ab-board">
            <span className="ab-board-rod ab-board-rod--l" aria-hidden="true" />
            <span className="ab-board-rod ab-board-rod--r" aria-hidden="true" />

            <div className="ab-board-panel">
                <div className="ab-board-head">
                    <span className="ab-board-brand">
                        <img src="/logo-mark.png" alt="" width="28" height="28" />
                        KAM Global AI
                    </span>
                    <span className="ab-board-live">
                        <i aria-hidden="true" /> Delivery board
                    </span>
                </div>

                <div className="ab-board-cols" aria-hidden="true">
                    <span>Hub</span>
                    <span>Local time</span>
                </div>

                <ul className="ab-board-rows">
                    {heroHubs.map((h, i) => {
                        const time = hubTime(h.timeZone, now);
                        return (
                            <li key={h.code} className="ab-board-row">
                                <span className="sr-only">{`${h.country}: ${h.role}. Local time ${time}.`}</span>
                                <Flag code={h.code} className="ab-board-flag" round />
                                <span className="ab-board-hub">
                                    <FlapText text={h.country} length={11} delay={200 + i * 260} instant={reduceMotion} />
                                    <small aria-hidden="true">{h.role}</small>
                                </span>
                                <FlapText
                                    text={time}
                                    length={5}
                                    delay={500 + i * 260}
                                    instant={reduceMotion}
                                    className="ab-flaps--time"
                                />
                            </li>
                        );
                    })}
                </ul>

                <div className="ab-board-now">
                    <span className="ab-board-now-label">Now serving</span>
                    <span className="sr-only">Technology, HR &amp; Workforce, Outsourcing and EdTech</span>
                    <FlapText text={NOW_SERVING[serving]} length={14} delay={900} instant={reduceMotion} className="ab-flaps--accent" />
                </div>
            </div>

            <div className="ab-board-foot">
                <Handshake size={15} aria-hidden="true" />
                {COMPANY.backing} · one team, three hubs
            </div>
        </div>
    );
}

const sections = [
    { id: 'who-we-are', label: 'Who We Are' },
    { id: 'purpose', label: 'Purpose & Values' },
    { id: 'capabilities', label: 'What We Do' },
    { id: 'global-model', label: 'Global Model' },
    { id: 'network', label: 'Global Network' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'approach', label: 'How We Work' },
    { id: 'leadership', label: 'Leadership & Teams' },
];

const storyHighlights = [
    'Backed by KAM Group, Kuwait',
    'Delivery hub in Bengaluru, India',
    'AI, cloud, and enterprise digital transformation',
];

const coreValues = [
    { icon: Sparkles, title: 'Innovation with Purpose', desc: 'AI, automation, and cloud solutions that deliver measurable business impact.' },
    { icon: ShieldCheck, title: 'Integrity & Transparency', desc: 'Open communication and accountability in every client engagement.' },
    { icon: CheckCircle2, title: 'Excellence in Execution', desc: 'Precision, reliability, and continuous improvement at scale.' },
    { icon: Users, title: 'Customer-Centric Mindset', desc: 'Solutions aligned to sustainable value and client objectives.' },
];

const practices = [
    {
        key: 'it',
        icon: Code2,
        name: 'IT & Technology',
        tagline: 'Build and run your software',
        desc: 'Custom platforms, cloud and DevOps, engineering talent and managed IT — delivered by our technology team in India.',
        from: 'India',
        image: '/images/pages/pg-svc-software.webp',
        alt: 'Software engineers collaborating on a product build',
        to: '/services',
        cta: 'Explore IT & Technology',
        items: [
            { label: 'IT & Development', to: '/services/custom-development' },
            { label: 'Cloud & DevOps', to: '/services/cloud-devops' },
            { label: 'IT staffing', to: '/services/it-staffing' },
            { label: 'Managed IT support', to: '/services/managed-it' },
            { label: 'Build-Operate-Transfer (BOT)', to: '/services/bot-model' },
        ],
    },
    {
        key: 'hr',
        icon: Users,
        name: 'HR & Workforce',
        tagline: 'Hire, staff and pay your people',
        desc: 'Recruitment, contract staffing, payroll and HR advisory — so the right people join and stay supported.',
        from: 'India · GCC',
        image: '/images/hr/hr-hero.jpg',
        alt: 'Recruiter meeting a candidate for an interview',
        to: '/hr',
        cta: 'Explore HR & Workforce',
        items: [
            { label: 'Recruitment', to: '/hr/services/recruitment' },
            { label: 'Contract staffing', to: '/hr/services/contract-staffing' },
            { label: 'Payroll outsourcing', to: '/hr/services/payroll-outsourcing' },
            { label: 'HR advisory', to: '/hr/services/hr-advisory' },
            { label: 'Executive search', to: '/hr/services/executive-search' },
            { label: 'Background verification', to: '/hr/services/background-verification' },
        ],
    },
    {
        key: 'outsourcing',
        icon: Headset,
        name: 'Outsourcing',
        tagline: 'Extend your daily operations',
        desc: 'Customer support, sales, back-office and AI automation teams that work as an extension of yours.',
        from: 'Philippines · India',
        image: '/images/pages/pg-svc-cx.webp',
        alt: 'Customer support team wearing headsets in a contact centre',
        to: '/outsourcing',
        cta: 'Explore Outsourcing',
        items: [
            { label: 'Customer experience & support', to: '/outsourcing/customer-experience' },
            { label: 'Sales & lead generation', to: '/outsourcing/sales-lead-generation' },
            { label: 'Business process outsourcing', to: '/outsourcing/business-process-outsourcing' },
            { label: 'Recruitment process outsourcing', to: '/outsourcing/recruitment-rpo' },
            { label: 'Virtual assistance', to: '/outsourcing/virtual-assistance' },
            { label: 'AI, data & automation', to: '/services/ai-automation' },
        ],
        more: { label: '+4 more services', to: '/outsourcing' },
    },
    {
        key: 'edtech',
        icon: GraduationCap,
        name: 'EdTech Products',
        tagline: 'Ready-made learning platforms',
        desc: 'Our own platforms for schools, coaching institutes and learners — from school ERP to AI-assisted exam prep.',
        from: 'Built in India',
        image: '/images/pages/pg-ind-education.webp',
        alt: 'Students learning together with laptops in a classroom',
        to: '/products',
        cta: 'Explore our products',
        items: [
            { label: 'LearnX — School ERP & LMS', to: '/products/learnx' },
            { label: 'EduAiTutors — NEET & JEE prep', to: '/products/eduaitutors' },
            { label: 'AI-Powered LMS', to: '/products/ai-powered-lms' },
        ],
    },
];

function PracticeExplorer() {
    const [active, setActive] = useState(0);
    const practice = practices[active];
    const PracticeIcon = practice.icon;

    return (
        <div className="ab-pr">
            <div className="ab-pr-tabs" role="tablist" aria-label="Our practices">
                {practices.map((p, i) => {
                    const Icon = p.icon;
                    const isActive = i === active;
                    return (
                        <button
                            key={p.key}
                            type="button"
                            role="tab"
                            id={`ab-pr-tab-${p.key}`}
                            aria-selected={isActive}
                            aria-controls="ab-pr-panel"
                            className={`ab-pr-tab${isActive ? ' is-active' : ''}`}
                            onClick={() => setActive(i)}
                            onMouseEnter={() => setActive(i)}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="ab-pr-active"
                                    className="ab-pr-tab-bg"
                                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                />
                            )}
                            <span className="ab-pr-tab-num">{String(i + 1).padStart(2, '0')}</span>
                            <span className="ab-pr-tab-icon"><Icon size={20} strokeWidth={1.75} aria-hidden="true" /></span>
                            <span className="ab-pr-tab-text">
                                <strong>{p.name}</strong>
                                <small>{p.tagline}</small>
                            </span>
                            <ArrowRight size={16} className="ab-pr-tab-arrow" aria-hidden="true" />
                        </button>
                    );
                })}
            </div>

            <div className="ab-pr-stage" id="ab-pr-panel" role="tabpanel" aria-labelledby={`ab-pr-tab-${practice.key}`}>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.article
                        key={practice.key}
                        className="ab-pr-panel"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="ab-pr-media">
                            <motion.img
                                src={practice.image}
                                alt={practice.alt}
                                loading="lazy"
                                initial={{ scale: 1.08 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <span className="ab-pr-media-icon"><PracticeIcon size={22} aria-hidden="true" /></span>
                            <span className="ab-pr-media-from"><MapPin size={13} aria-hidden="true" /> {practice.from}</span>
                        </div>
                        <div className="ab-pr-body">
                            <h3>{practice.name}</h3>
                            <p>{practice.desc}</p>
                            <motion.ul
                                className={`ab-pr-items${practice.items.length < 4 ? ' is-single' : ''}`}
                                variants={staggerParent(0.04, 0.1)}
                                initial="hidden"
                                animate="show"
                            >
                                {practice.items.map((item) => (
                                    <motion.li key={item.to} variants={fadeUpItem}>
                                        <Link to={item.to} className="ab-pr-item">
                                            <CheckCircle2 size={15} aria-hidden="true" />
                                            <span>{item.label}</span>
                                            <ArrowUpRight size={14} className="ab-pr-item-arrow" aria-hidden="true" />
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                            <div className="ab-pr-foot">
                                <Link to={practice.to} className="ab-btn ab-btn--primary">
                                    {practice.cta} <ArrowRight size={16} />
                                </Link>
                                {practice.more && (
                                    <Link to={practice.more.to} className="ab-pr-more">{practice.more.label}</Link>
                                )}
                            </div>
                        </div>
                    </motion.article>
                </AnimatePresence>
            </div>
        </div>
    );
}

const kuwaitOffice = OFFICE_LOCATIONS.find((o) => o.addressCountry === 'KW');
const indiaOffice = OFFICE_LOCATIONS.find((o) => o.addressCountry === 'IN');

const hubs = [
    {
        code: 'KW',
        tag: 'Strategic HQ',
        title: 'Kuwait',
        icon: Building2,
        desc: 'Regional leadership, client trust, and enterprise governance backed by KAM Group.',
        points: kuwaitHighlights,
        office: kuwaitOffice,
    },
    {
        code: 'IN',
        tag: 'Technology Engine',
        title: 'India',
        icon: Cpu,
        desc: 'Software, AI, data, cloud, infrastructure, QA, and IT support.',
        points: indiaHighlights,
        office: indiaOffice,
        link: { label: 'Explore India Engine', to: '/outsourcing/india-engine' },
    },
    {
        code: 'PH',
        tag: 'Business Operations Engine',
        title: 'Philippines',
        icon: Headset,
        desc: 'Sales support, CX, BPO, RPO, virtual assistance, and back-office workflows.',
        points: ['Customer experience & sales support', 'BPO and RPO workflows', 'Availability confirmed during discovery'],
        link: { label: 'Explore Philippines Engine', to: '/outsourcing/philippines-engine' },
    },
];

const advantages = [
    { icon: Shield, title: 'Global Backing', desc: 'Strategically backed by KAM Group Kuwait, offering enterprise-level stability and a strong regional presence.' },
    { icon: Globe2, title: 'India Delivery Advantage', desc: "Access India's premier technical talent pool while maintaining global service quality standards." },
    { icon: Cpu, title: 'Consult, Build and Support', desc: 'From initial consulting through implementation to ongoing maintenance, scoped per engagement.' },
    { icon: Award, title: 'Enterprise Standards', desc: 'Security expectations and industry best practices agreed and followed on every engagement.' },
    { icon: Users, title: 'Long-Term Partnership', desc: 'We focus on scalable relationships that grow alongside your business transformation.' },
    { icon: Zap, title: 'Innovation Focus', desc: 'Driving growth through AI-powered solutions and next-gen technology stacks.' },
    { icon: BarChart3, title: 'Rapid Deployment', desc: 'Accelerated development cycles for a faster time-to-market on your projects.' },
    { icon: DollarSign, title: 'Cost Efficiency', desc: 'Better value through optimised offshore delivery models and lean execution.' },
];

const comparisonRows = [
    { criteria: 'Starting point', traditional: 'Pre-packaged offerings', kam: 'Requirement-first discovery and clear scope' },
    { criteria: 'Delivery speed', traditional: 'Slow, bureaucratic processes', kam: 'Agile delivery with accelerated development cycles' },
    { criteria: 'Cost efficiency', traditional: 'High domestic overhead limits ROI', kam: 'Optimised offshore delivery and lean execution' },
    { criteria: 'Security & compliance', traditional: 'Fragmented security protocols', kam: 'Security expectations agreed before mobilisation' },
    { criteria: 'Vested interest', traditional: 'Transactional hourly billing', kam: 'Long-term partnerships, including BOT engagements' },
    { criteria: 'Talent quality', traditional: 'Generalised resources', kam: 'Skills validated against your defined roles' },
];

const approachSteps = [
    { title: 'Business objective', desc: 'Understand the outcome you need.', question: 'What has to be true when this is done?' },
    { title: 'Current environment', desc: 'Map systems, constraints, and owners.', question: 'What exists today, and who owns it?' },
    { title: 'Success criteria', desc: 'Agree how progress will be measured.', question: 'How will we both know it is working?' },
    { title: 'Timeline', desc: 'Clarify urgency and dependencies.', question: 'What is the deadline, and what depends on it?' },
    { title: 'Realistic plan', desc: 'Discuss options and a practical way forward.', question: 'Which option fits your budget and pace?' },
];

const commitments = [
    { icon: Target, label: 'Scope' },
    { icon: Users, label: 'Responsibilities' },
    { icon: MessageCircle, label: 'Communication' },
    { icon: ShieldCheck, label: 'Security expectations' },
    { icon: BarChart3, label: 'Service measures' },
];

const marqueeWords = ['Kuwait · Strategy', 'India · Technology', 'Philippines · Operations', 'One accountable partner'];

const SectionHead = ({ eyebrow, title, accent, children, center = false, light = false, breakAccent = false }) => (
    <div className={`ab-head${center ? ' ab-head--center' : ''}${light ? ' ab-head--light' : ''}`}>
        <Reveal y={12}>
            <span className="ab-eyebrow">{eyebrow}</span>
        </Reveal>
        <SplitText text={title} accent={accent} className="ab-title" breakBeforeAccent={breakAccent} />
        {children && (
            <Reveal delay={0.15} y={14}>
                <p className="ab-intro">{children}</p>
            </Reveal>
        )}
    </div>
);

const GRID_VIEWPORT = { ...VIEWPORT, amount: 0.08 };

const gridMotion = (stagger = 0.07) => ({
    variants: staggerParent(stagger),
    initial: 'hidden',
    whileInView: 'show',
    viewport: GRID_VIEWPORT,
});

const useActiveSection = (ids) => {
    const [active, setActive] = useState(null);
    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const line = window.innerHeight * 0.35;
            let current = null;
            ids.forEach((id) => {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= line) current = id;
            });
            const last = document.getElementById(ids[ids.length - 1]);
            if (last && last.getBoundingClientRect().bottom < line) current = null;
            setActive(current);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [ids]);
    return active;
};

const TeamGallery = () => {
    const [flipped, setFlipped] = useState(null);
    const [progress, setProgress] = useState(0);
    const [current, setCurrent] = useState(0);
    const trackRef = useRef(null);
    const total = teamDepartments.length;

    const onScroll = () => {
        const el = trackRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        setProgress(max > 0 ? el.scrollLeft / max : 0);
        const card = el.firstElementChild;
        const step = card ? card.getBoundingClientRect().width : 1;
        setCurrent(Math.min(total - 1, Math.round(el.scrollLeft / step)));
    };

    const scrollByCard = (dir) => {
        const el = trackRef.current;
        const card = el?.firstElementChild;
        if (!card) return;
        el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 22), behavior: 'smooth' });
    };

    const toggle = (i) => setFlipped((f) => (f === i ? null : i));

    return (
        <div className="ab-tm">
            <motion.ul className="ab-tm-track" ref={trackRef} onScroll={onScroll} {...gridMotion(0.09)}>
                {teamDepartments.map((d, i) => {
                    const isFlipped = flipped === i;
                    return (
                        <motion.li
                            key={d.key}
                            variants={fadeUpItem}
                            className={`ab-tm-item${isFlipped ? ' is-flipped' : ''}`}
                            onMouseLeave={resetTilt}
                            onMouseMove={(e) => trackTilt(e, 5)}
                        >
                            <div className="ab-tm-inner">
                                <div className="ab-tm-front" aria-hidden={isFlipped}>
                                    <div className={`ab-tm-photo${d.wide ? ' ab-tm-photo--wide' : ''}`}>
                                        {d.wide && <span className="ab-tm-brand-bg" aria-hidden="true">KAM</span>}
                                        <img
                                            src={d.image}
                                            alt={d.alt}
                                            loading="lazy"
                                            width="864"
                                            height={d.wide ? 720 : 1152}
                                            className={d.wide ? 'ab-tm-wide-img' : undefined}
                                        />
                                        <span className="ab-tm-tint" aria-hidden="true" />
                                        <span className="ab-tm-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                                        <div className="ab-tm-reveal">
                                            <p>{d.summary}</p>
                                            <button
                                                type="button"
                                                className="ab-tm-flip"
                                                onClick={() => toggle(i)}
                                                aria-label={`Show what the ${d.name} team handles`}
                                                aria-expanded={isFlipped}
                                                tabIndex={isFlipped ? -1 : 0}
                                            >
                                                <ArrowUpRight size={15} aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="ab-tm-meta">
                                        <h4>{d.name}</h4>
                                        <span><MapPin size={12} aria-hidden="true" /> {d.location}</span>
                                    </div>
                                </div>
                                <div className="ab-tm-back" aria-hidden={!isFlipped}>
                                    <span className="ab-tm-back-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="ab-tm-back-loc"><MapPin size={12} aria-hidden="true" /> {d.location}</span>
                                    <p className="ab-tm-back-title">{d.name}</p>
                                    <ul>
                                        {d.points.map((p) => (
                                            <li key={p}><CheckCircle2 size={15} aria-hidden="true" /> {p}</li>
                                        ))}
                                    </ul>
                                    <div className="ab-tm-back-actions">
                                        <Link to={d.link.to} className="ab-tm-link" tabIndex={isFlipped ? 0 : -1}>
                                            {d.link.label} <ArrowRight size={15} aria-hidden="true" />
                                        </Link>
                                        <button
                                            type="button"
                                            className="ab-tm-back-btn"
                                            onClick={() => toggle(i)}
                                            aria-label={`Back to the ${d.name} photo`}
                                            tabIndex={isFlipped ? 0 : -1}
                                        >
                                            <RotateCcw size={16} aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.li>
                    );
                })}
            </motion.ul>

            <div className="ab-tm-controls">
                <span className="ab-tm-count" aria-hidden="true">
                    <strong>{String(current + 1).padStart(2, '0')}</strong> / {String(total).padStart(2, '0')}
                </span>
                <span className="ab-tm-bar" aria-hidden="true">
                    <span style={{ transform: `scaleX(${Math.max(0.12, progress)})` }} />
                </span>
                <div className="ab-tm-nav">
                    <button type="button" onClick={() => scrollByCard(-1)} aria-label="Previous teams" disabled={progress <= 0.001}>
                        <ChevronLeft size={20} aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => scrollByCard(1)} aria-label="Next teams" disabled={progress >= 0.999}>
                        <ChevronRight size={20} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ModelPlayer = ({ onPlay }) => {
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
    const rotateX = useTransform(scrollYProgress, [0, 1], [26, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

    return (
        <div className="ab-gm-player-wrap" ref={ref}>
            <motion.button
                type="button"
                className="ab-gm-player"
                onClick={onPlay}
                aria-label="Play the global delivery model presentation"
                style={reduceMotion ? undefined : { rotateX, scale, y }}
            >
                <img
                    src="/images/wk-global-delivery-bridge.webp"
                    alt="Kuwait and India connected through the KamGlobal AI global delivery bridge"
                    loading="lazy"
                />
                <span className="ab-gm-play" aria-hidden="true">
                    <Play size={22} fill="currentColor" />
                </span>
                <span className="ab-gm-caption">KamGlobal AI — Kuwait &amp; India</span>
            </motion.button>
        </div>
    );
};

const HowSteps = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });

    return (
        <div className="ab-hw-steps" ref={ref}>
            <span className="ab-hw-rail" aria-hidden="true">
                <motion.span className="ab-hw-rail-fill" style={{ scaleY: scrollYProgress }} />
            </span>
            <ol>
            {approachSteps.map(({ title, desc, question }, i) => (
                <motion.li
                    key={title}
                    className="ab-hw-step"
                    initial={{ opacity: 0.35, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.7, margin: '0px 0px -10% 0px' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="ab-hw-dot" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <div className="ab-hw-card">
                        <small>Step {String(i + 1).padStart(2, '0')}</small>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                        <span className="ab-hw-q">
                            <MessageCircle size={14} aria-hidden="true" /> {question}
                        </span>
                    </div>
                </motion.li>
            ))}
            </ol>
        </div>
    );
};

const sectionIds = sections.map((s) => s.id);

const About = () => {
    const location = useLocation();
    const active = useActiveSection(sectionIds);
    const [showVideo, setShowVideo] = useState(false);
    const subnavRef = useRef(null);

    useEffect(() => {
        const list = subnavRef.current;
        const link = active && list?.querySelector(`a[href="#${active}"]`);
        if (!link) return;
        const target = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
        list.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    }, [active]);

    useEffect(() => {
        if (!location.hash) return undefined;
        const timer = setTimeout(() => {
            document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
        return () => clearTimeout(timer);
    }, [location.hash]);

    useEffect(() => {
        if (!showVideo) return undefined;
        const onKey = (e) => e.key === 'Escape' && setShowVideo(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [showVideo]);

    return (
        <div className="about-page ab-page">
            <Helmet>
                <title>About KAM Global AI | Who We Are, Why Us &amp; Leadership</title>
                <meta
                    name="description"
                    content="Learn about KAM Global AI — our story, purpose, capabilities, Kuwait–India global delivery model, why clients choose us, how we work, and our leadership."
                />
            </Helmet>

            {/* Hero */}
            <section className="ab-hero">
                <div className="ab-hero-bg" aria-hidden="true" />
                <div className="container ab-hero-grid">
                    <motion.div
                        className="ab-hero-copy"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="ab-eyebrow">About KAM Global AI</span>
                        <h1>
                            One Partner for <span>Technology, Operations &amp; Workforce</span>
                        </h1>
                        <p className="ab-hero-lead">
                            Backed by KAM Group, Kuwait, we help businesses build technology, run daily operations and
                            hire the right people — with one team that starts from what you actually need.
                        </p>
                        <div className="ab-actions">
                            <Link to="/contact" className="ab-btn ab-btn--primary">
                                Talk to Our Team <ArrowRight size={16} />
                            </Link>
                            <Link to="/services" className="ab-btn ab-btn--ghost">
                                Explore Services
                            </Link>
                        </div>
                        <dl className="ab-hero-stats">
                            {heroStats.map((stat) => (
                                <div key={stat.label} className="ab-hero-stat">
                                    <dt>{stat.label}</dt>
                                    <dd>
                                        <CountUp end={stat.value} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </motion.div>

                    <motion.div
                        className="ab-hero-visual"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <HeroBoard />
                    </motion.div>
                </div>
            </section>

            {/* Sticky section navigation */}
            <nav className="ab-subnav" aria-label="About page sections">
                <div className="container">
                    <ul ref={subnavRef}>
                        {sections.map((s) => (
                            <li key={s.id}>
                                <a
                                    href={`#${s.id}`}
                                    className={active === s.id ? 'is-active' : undefined}
                                    aria-current={active === s.id ? 'true' : undefined}
                                >
                                    {s.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Who we are + our story */}
            <section id="who-we-are" className="ab-section">
                <div className="container ab-story">
                    <div className="ab-story-copy">
                        <SectionHead
                            eyebrow="Who We Are"
                            title="Technology and Operations with a"
                            accent="Business-First Mindset"
                        />
                        <Reveal delay={0.1}>
                            <p className="ab-lead">
                                KAM Global AI brings together technology services, digital product experience, and a
                                developing global outsourcing proposition. We focus on understanding the challenge,
                                setting a clear scope, and establishing practical delivery expectations.
                            </p>
                        </Reveal>
                        <Reveal delay={0.15} className="ab-story-block">
                            <h3>Our Story — Architecting the Future</h3>
                            <p>
                                Founded in 2026, KAM Global AI is a technology and workforce services company headquartered in Kuwait,
                                backed by KAM Group, with its technology centre in India — built to connect strategic
                                Gulf business leadership with an engineering team in India.
                            </p>
                            <p>
                                We help enterprises design secure, scalable, and AI-ready digital foundations. From
                                cloud-native platforms to intelligent automation, our teams deliver with precision,
                                transparency, and a relentless focus on business outcomes.
                            </p>
                            <p>
                                Our Kuwait–India operating model brings together regional trust, global partnerships,
                                and round-the-clock execution — so clients get strategy and engineering in one
                                accountable partner.
                            </p>
                            <p className="ab-note">
                                We describe group relationships clearly and do not conflate broader group capabilities
                                with services KAM Global AI itself can deliver for a given engagement.
                            </p>
                        </Reveal>
                        <motion.ul className="ab-checks" {...gridMotion(0.08)}>
                            {storyHighlights.map((item) => (
                                <motion.li key={item} variants={fadeUpItem}>
                                    <Check size={15} aria-hidden="true" /> {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>

                    <Reveal className="ab-story-visual" delay={0.1}>
                        <figure>
                            <img
                                src="/images/about-story.webp"
                                alt="KamGlobal AI team — Kuwait and India partnership"
                                loading="lazy"
                            />
                            <figcaption>
                                <span className="ab-dot" aria-hidden="true" />
                                Strategy from Kuwait. Engineering from India.
                            </figcaption>
                        </figure>
                        <div className="ab-story-stamp" aria-hidden="true">
                            <strong>2026</strong>
                            <span>Founded</span>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Purpose: mission, vision, values */}
            <section id="purpose" className="ab-section ab-section--tint">
                <div className="container">
                    <SectionHead eyebrow="Purpose & Values" title="Vision, Mission &" accent="Core Values" center>
                        The direction behind every partnership, product, and delivery milestone — and the beliefs that
                        guide how we lead, build, and deliver for clients worldwide.
                    </SectionHead>

                    <motion.div className="ab-mv" {...gridMotion(0.1)}>
                        <motion.article className="ab-mv-card ab-mv-card--mission" variants={fadeUpItem}>
                            <span className="ab-mv-icon"><Target size={22} aria-hidden="true" /></span>
                            <span className="ab-mv-tag">Mission</span>
                            <h3>Accelerating Business</h3>
                            <p>
                                Intelligent, secure, and scalable technology frameworks that help organizations lead in
                                the digital transformation era.
                            </p>
                        </motion.article>
                        <motion.article className="ab-mv-card ab-mv-card--vision" variants={fadeUpItem}>
                            <span className="ab-mv-icon"><Eye size={22} aria-hidden="true" /></span>
                            <span className="ab-mv-tag">Vision</span>
                            <h3>Globally Trusted</h3>
                            <p>
                                Enterprise benchmarks in innovation — anticipating change and engineering future-ready
                                solutions across markets.
                            </p>
                        </motion.article>
                    </motion.div>

                    <motion.div className="ab-values" {...gridMotion(0.07)}>
                        {coreValues.map(({ icon: Icon, title, desc }, i) => (
                            <motion.article key={title} className="ab-value" variants={fadeUpItem}>
                                <span className="ab-value-num">{String(i + 1).padStart(2, '0')}</span>
                                <span className="ab-value-icon"><Icon size={20} strokeWidth={1.75} aria-hidden="true" /></span>
                                <h3>{title}</h3>
                                <p>{desc}</p>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Capabilities */}
            <section id="capabilities" className="ab-section">
                <div className="container">
                    <div className="ab-split-head">
                        <SectionHead eyebrow="What We Do" title="Four Practices," accent="One Partner">
                            IT &amp; technology, HR &amp; workforce, outsourcing and our own EdTech products — run by one
                            team, so you can start with one and add the others when you need them.
                        </SectionHead>
                        <Reveal delay={0.2} y={12}>
                            <Link to="/services" className="ab-btn ab-btn--ghost">
                                View All Capabilities <ArrowRight size={16} />
                            </Link>
                        </Reveal>
                    </div>

                    <Reveal y={20}>
                        <PracticeExplorer />
                    </Reveal>
                </div>
            </section>

            {/* Global delivery model */}
            <section id="global-model" className="ab-section ab-gm">
                <div className="ab-gm-bg" aria-hidden="true" />
                <div className="ab-gm-marquee" aria-hidden="true">
                    {[false, true].map((reverse) => (
                        <div key={String(reverse)} className={`ab-gm-marquee-row${reverse ? ' is-reverse' : ''}`}>
                            {[0, 1].map((copy) => (
                                <span key={copy} className="ab-gm-marquee-track">
                                    {marqueeWords.map((w) => (
                                        <span key={w} className="ab-gm-marquee-word">{w}<i /></span>
                                    ))}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="container">
                    <SectionHead
                        eyebrow="Global Delivery Model"
                        title="Kuwait Strategy,"
                        accent="India & Philippines Execution"
                        center
                        breakAccent
                    >
                        Regional trust and governance from Kuwait, technology delivery from India, and business
                        operations, customer experience, sales support, BPO, and RPO capabilities associated with the
                        Philippines. Specific delivery availability is confirmed during discovery.
                    </SectionHead>

                    <div className="ab-gm-stage">
                        <svg className="ab-gm-link" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
                            <path id="ab-gm-path" d="M 40 30 C 250 -10, 350 70, 500 30 S 760 -10, 960 30" />
                            <circle r="5">
                                <animateMotion dur="6s" repeatCount="indefinite">
                                    <mpath href="#ab-gm-path" />
                                </animateMotion>
                            </circle>
                        </svg>
                        <motion.div className="ab-gm-hubs" {...gridMotion(0.12)}>
                            {hubs.map((hub, i) => (
                                <motion.article
                                    key={hub.code}
                                    className="ab-gm-hub"
                                    variants={fadeUpItem}
                                    onPointerMove={(e) => trackTilt(e, 7)}
                                    onPointerLeave={resetTilt}
                                >
                                    <div className="ab-gm-hub-inner">
                                        <span className="ab-gm-hub-code" aria-hidden="true">{hub.code}</span>
                                        <div className="ab-gm-hub-top">
                                            <Flag code={hub.code} className="ab-gm-hub-flag" round />
                                            <span className="ab-gm-hub-tag">
                                                <hub.icon size={13} aria-hidden="true" /> {hub.tag}
                                            </span>
                                        </div>
                                        <span className="ab-gm-hub-step">Hub {String(i + 1).padStart(2, '0')}</span>
                                        <h3>{hub.title}</h3>
                                        <p>{hub.desc}</p>
                                        <ul>
                                            {hub.points.map((p) => (
                                                <li key={p}>
                                                    <CheckCircle2 size={14} aria-hidden="true" /> {p}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="ab-gm-hub-foot">
                                            {hub.office && (
                                                <a href={hub.office.mapsUrl} target="_blank" rel="noopener noreferrer" className="ab-gm-hub-office">
                                                    <MapPin size={14} aria-hidden="true" />
                                                    <span>{hub.office.shortName}</span>
                                                    <ExternalLink size={12} aria-hidden="true" />
                                                </a>
                                            )}
                                            {hub.link && (
                                                <Link to={hub.link.to} className="ab-gm-hub-link">
                                                    {hub.link.label} <ArrowRight size={14} aria-hidden="true" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    </div>

                    <div className="ab-gm-model">
                        <Reveal className="ab-gm-model-copy">
                            <span className="ab-eyebrow">Watch the model</span>
                            <h3>Learn Our Global Delivery Model</h3>
                            <p>
                                See how KamGlobal AI combines Kuwait&apos;s strategic leadership with India&apos;s
                                engineering excellence — delivering enterprise AI and IT solutions at scale. From
                                consulting and build-operate-transfer engagements to full-scale digital transformation,
                                our dual-hub model is built for trust, speed, and long-term partnership.
                            </p>
                            <p className="ab-gm-backing">
                                <Handshake size={18} aria-hidden="true" />
                                <span>
                                    KamGlobal AI is backed by <strong>KAM Group, Kuwait</strong> — combining regional
                                    business leadership with technology delivery from India.
                                </span>
                            </p>
                            <button type="button" className="ab-btn ab-btn--primary" onClick={() => setShowVideo(true)}>
                                <Play size={16} aria-hidden="true" /> Watch Presentation
                            </button>
                        </Reveal>
                        <ModelPlayer onPlay={() => setShowVideo(true)} />
                    </div>
                </div>
            </section>

            {/* Global network */}
            <section id="network" className="ab-section ab-section--tint">
                <div className="container">
                    <SectionHead eyebrow="Global Network" title="Part of an International" accent="Workforce Network" center>
                        Supporting technology, operations and workforce solutions across multiple international markets
                        through trusted partnerships and local expertise.
                    </SectionHead>

                    <motion.ul className="ab-network" {...gridMotion(0.06)}>
                        {networkCountries.map((c) => (
                            <motion.li key={c.code} className="ab-network-card rv-spot" variants={fadeUpItem} onPointerMove={trackPointer}>
                                <Flag code={c.code} className="ab-network-flag" />
                                <h3>{c.name}</h3>
                                <p>{c.role}</p>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </section>

            {/* Why us */}
            <section id="why-us" className="ab-section">
                <div className="container">
                    <SectionHead eyebrow="Why KAM Global AI" title="Why Enterprises" accent="Choose Us" center>
                        Strategic vision meets precision execution — we bridge complex business challenges and
                        technical implementation, leveraging Kuwait&apos;s strategic leadership with India&apos;s
                        engineering excellence.
                    </SectionHead>

                    <motion.div className="ab-wy" {...gridMotion(0.06)}>
                        {advantages.map(({ icon: Icon, title, desc }, i) => (
                            <motion.article
                                key={title}
                                className={`ab-wy-card rv-spot${i === 0 ? ' is-feature' : ''}`}
                                variants={fadeUpItem}
                                onPointerMove={trackPointer}
                            >
                                <span className="ab-wy-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                                <span className="ab-wy-icon"><Icon size={i === 0 ? 26 : 20} strokeWidth={1.75} aria-hidden="true" /></span>
                                <h3>{title}</h3>
                                <p>{desc}</p>
                                {i === 0 && (
                                    <span className="ab-wy-tag">
                                        <Handshake size={15} aria-hidden="true" /> {COMPANY.backing}
                                    </span>
                                )}
                            </motion.article>
                        ))}
                        <motion.div className="ab-wy-cta-wrap" variants={fadeUpItem}>
                            <Link to="/contact?subject=Discuss%20a%20Requirement#form" className="ab-wy-cta">
                                <span className="ab-wy-cta-icon" aria-hidden="true"><ArrowUpRight size={22} /></span>
                                <strong>See if we are the right fit</strong>
                                <small>Share your requirement — we reply with options.</small>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <Reveal className="ab-vs">
                        <div className="ab-vs-head">
                            <div>
                                <h3>The KamGlobal AI Advantage</h3>
                                <p>How our approach compares with traditional enterprise IT delivery models.</p>
                            </div>
                            <div className="ab-vs-legend" aria-hidden="true">
                                <span className="is-old"><Minus size={14} /> Traditional IT vendors</span>
                                <span className="is-kam"><CheckCircle2 size={14} /> KamGlobal AI</span>
                            </div>
                        </div>
                        <motion.ul className="ab-vs-rows" {...gridMotion(0.07)}>
                            {comparisonRows.map((row) => (
                                <motion.li key={row.criteria} className="ab-vs-row" variants={fadeUpItem}>
                                    <span className="ab-vs-crit">{row.criteria}</span>
                                    <span className="ab-vs-old">
                                        <Minus size={14} aria-hidden="true" />
                                        <span><span className="sr-only">Traditional IT vendors: </span>{row.traditional}</span>
                                    </span>
                                    <span className="ab-vs-arrow" aria-hidden="true"><ArrowRight size={16} /></span>
                                    <span className="ab-vs-kam">
                                        <CheckCircle2 size={15} aria-hidden="true" />
                                        <span><span className="sr-only">KamGlobal AI: </span>{row.kam}</span>
                                    </span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </Reveal>
                </div>
            </section>

            {/* Approach + commitments */}
            <section id="approach" className="ab-section ab-section--tint">
                <div className="container ab-hw">
                    <div className="ab-hw-intro">
                        <SectionHead eyebrow="How We Work" title="Start with the Requirement —" accent="Not a Pre-Packaged Answer">
                            Every engagement begins with context: the business objective, current environment, constraints,
                            success criteria, and required timeline. From there, we discuss options and a realistic plan.
                        </SectionHead>
                        <Reveal className="ab-hw-commit" delay={0.15}>
                            <div className="ab-hw-commit-head">
                                <span className="ab-hw-commit-icon"><Compass size={20} aria-hidden="true" /></span>
                                <h3>Our commitments before mobilisation</h3>
                            </div>
                            <p>
                                We aim to agree on these up front. Specific certifications, SLAs, or guarantees are stated
                                only when formally verified.
                            </p>
                            <ul className="ab-hw-chips">
                                {commitments.map(({ icon: Icon, label }) => (
                                    <li key={label}><Icon size={14} aria-hidden="true" /> {label}</li>
                                ))}
                            </ul>
                            <div className="ab-hw-actions">
                                <Link to="/contact?subject=Discuss%20a%20Requirement#form" className="ab-btn ab-btn--primary">
                                    Discuss a Requirement <ArrowRight size={16} />
                                </Link>
                                <Link to="/engagement-models" className="ab-btn ab-btn--ghost">
                                    Engagement Models
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                    <HowSteps />
                </div>
            </section>

            {/* Leadership */}
            <section id="leadership" className="ab-section ab-lead">
                <div className="ab-lead-shapes" aria-hidden="true">
                    <span className="ab-lead-ring ab-lead-ring--a" />
                    <span className="ab-lead-ring ab-lead-ring--b" />
                    <span className="ab-lead-dots" />
                </div>
                <div className="container">
                    <SectionHead eyebrow="Leadership & Teams" title="Meet the People Behind" accent="KamGlobal AI" center>
                        Founder vision, executive leadership and the teams that deliver for clients across Kuwait, India
                        and the Philippines.
                    </SectionHead>

                    <div className="ab-fd">
                        <motion.div
                            className="ab-fd-media"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.25 }}
                        >
                            <motion.span
                                className="ab-fd-frame"
                                aria-hidden="true"
                                variants={{
                                    hidden: { opacity: 0, x: -18, y: -18 },
                                    show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] } },
                                }}
                            />
                            <motion.figure
                                className="ab-fd-photo"
                                variants={{
                                    hidden: { clipPath: 'inset(100% 0% 0% 0% round 28px)' },
                                    show: { clipPath: 'inset(0% 0% 0% 0% round 28px)', transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
                                }}
                            >
                                <img
                                    src="/images/president-founder.png"
                                    alt={`${founderProfile.name}, Founder and President — Building Vision. Creating Impact.`}
                                    loading="lazy"
                                    width="819"
                                    height="1024"
                                />
                            </motion.figure>
                        </motion.div>

                        <div className="ab-fd-body">
                            <Reveal y={14}>
                                <span className="ab-fd-eyebrow">
                                    <Quote size={16} aria-hidden="true" /> A message from our Founder
                                </span>
                            </Reveal>
                            <Reveal delay={0.1} y={18}>
                                <blockquote className="ab-fd-quote">{founderProfile.featuredQuote}</blockquote>
                            </Reveal>
                            <Reveal delay={0.2} y={18}>
                                <p className="ab-fd-lead">{founderProfile.messageLead}</p>
                            </Reveal>
                            <Reveal delay={0.3} y={18} className="ab-fd-foot">
                                <div className="ab-fd-sign">
                                    <span className="ab-fd-mono" aria-hidden="true">{getInitials(founderProfile.name)}</span>
                                    <span>
                                        <strong>{founderProfile.name}</strong>
                                        <small>Founder &amp; President · {founderProfile.signatureOrg}</small>
                                    </span>
                                </div>
                                <div className="ab-actions">
                                    <Link to="/contact" className="ab-btn ab-btn--primary">
                                        Book a Demo <ArrowRight size={16} />
                                    </Link>
                                    <Link to="/careers" className="ab-btn ab-btn--ghost">
                                        Join Our Team
                                    </Link>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    <div className="ab-bd">
                        <div className="ab-bd-head">
                            <Reveal y={14}>
                                <span className="ab-eyebrow">Executive Board</span>
                                <h3>Leaders guiding strategy, operations and growth</h3>
                            </Reveal>
                            <Reveal delay={0.1} y={14}>
                                <p>The people accountable for how KAM Global AI is run — from group relations to day-to-day delivery.</p>
                            </Reveal>
                        </div>
                        <motion.ul className="ab-bd-list" {...gridMotion(0.12)}>
                            {executiveBoard.map((person, i) => (
                                <motion.li
                                    key={person.name}
                                    className={`ab-bd-card rv-spot${person.featured ? ' is-featured' : ''}`}
                                    variants={fadeUpItem}
                                    onPointerMove={trackPointer}
                                >
                                    <span className="ab-bd-mono" aria-hidden="true">
                                        <span>{getInitials(person.name)}</span>
                                    </span>
                                    <div className="ab-bd-info">
                                        <span className="ab-bd-role">{person.title}</span>
                                        <strong>{person.name}</strong>
                                        {person.focus && <p>{person.focus}</p>}
                                    </div>
                                    <span className="ab-bd-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="ab-bd-line" aria-hidden="true" />
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>

                    <div className="ab-teams">
                        <div className="ab-teams-head">
                            <Reveal y={14}>
                                <span className="ab-eyebrow">Our Teams</span>
                                <h3>The departments that deliver for you</h3>
                            </Reveal>
                            <Reveal delay={0.1} y={14}>
                                <p>
                                    Six teams, one delivery standard. Bring a team forward, then use the arrow to flip
                                    the card and see what they handle.
                                </p>
                            </Reveal>
                        </div>
                        <TeamGallery />
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {showVideo && (
                    <motion.div
                        className="ab-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Global delivery model presentation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowVideo(false)}
                    >
                        <motion.div
                            className="ab-modal-inner"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button type="button" className="ab-modal-close" onClick={() => setShowVideo(false)} aria-label="Close video">
                                <X size={22} />
                            </button>
                            <video controls autoPlay playsInline poster="/images/wk-global-delivery-bridge.webp">
                                <source src="/hero-background.mp4" type="video/mp4" />
                            </video>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default About;
