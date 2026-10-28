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
import IsoBadge from '../components/IsoBadge';
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
    ClipboardCheck,
    UserSearch,
    HeartPulse,
    ShoppingCart,
    Landmark,
    Truck,
    FolderKanban,
    Search,
    FileText,
    Puzzle,
    Rocket,
    Code2,
    Briefcase,
    Clapperboard,
    RefreshCw,
    BarChart3,
    Clock,
    Megaphone,
    PenTool,
    Sparkles,
    Video,
} from 'lucide-react';
import HeroShowcase from '../components/HeroShowcase';
import Flag from '../components/Flag';
import { networkCountries } from '../data/countries';
import { deliveryEngines } from '../data/deliveryEngines';
import { OFFICE_SCHEDULES, localTime, useNow } from '../lib/officeHours';
import { Reveal } from '../components/motion/Reveal';
import {
    EASE_OUT,
    VIEWPORT,
    fadeUpItem,
    staggerParent,
} from '../components/motion/motionPresets';
import './Home.css';
import './HomeDepth.css';

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
        image: '/images/products/learnx-site.png',
        alt: 'LearnX homepage with the headline Your whole school. In sync. and a parent phone view of attendance, the school bus and fees',
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
        secondary: { label: 'Talk to us', to: contactLink('EduAiTutors') },
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
        secondary: { label: 'Talk to us', to: contactLink('AI-Powered LMS') },
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
    { icon: Briefcase, title: 'One accountable partner', desc: 'Technology, AI media, operations and HR & workforce coordinated through a single team and point of contact.' },
    { icon: Shield, title: 'KAM Group backing', desc: 'Enterprise stability, governance and Gulf regional trust from Kuwait.' },
    { icon: Code2, title: 'India engineering talent', desc: 'Software, cloud, AI and data delivery without quality compromise.' },
    { icon: Headset, title: 'Philippines operations', desc: 'Customer experience, sales support and back-office capacity.' },
    { icon: UserSearch, title: 'HR & workforce reach', desc: 'Recruitment, staffing and payroll across India, the GCC and the USA.' },
    { icon: Layers, title: 'Consult, build and run', desc: 'Consulting, build, cloud, staffing, operations and products — Kuwait strategy with multi-hub execution.' },
];

const whyLines = [
    { icon: Code2, label: 'Technology', to: '/services' },
    { icon: Clapperboard, label: 'AI media', to: '/outsourcing/digital-marketing-creative' },
    { icon: Headset, label: 'Operations', to: '/outsourcing' },
    { icon: UserSearch, label: 'HR & Workforce', to: '/hr' },
];

const whoFocus = [
    {
        n: '01',
        title: 'Technology',
        note: 'Software, AI, data, cloud and managed IT from India.',
        to: '/services',
    },
    {
        n: '02',
        title: 'Talent',
        note: 'Recruitment, staffing and payroll across India, the GCC and the USA.',
        to: '/hr',
    },
    {
        n: '03',
        title: 'Operations',
        note: 'Customer experience, sales support and back-office work from the Philippines.',
        to: '/outsourcing',
    },
    {
        n: '04',
        title: 'AI media',
        note: 'AI video, design and content.',
        to: '/outsourcing/digital-marketing-creative',
    },
];

const HELP_SLIDE_MS = 4200;

const helpLines = [
    {
        id: 'it',
        step: '01',
        icon: Laptop,
        title: 'IT and Technology',
        tagline: 'Software, cloud, AI and data, delivered from India.',
        source: { label: 'India · Bengaluru', codes: ['IN'], to: '/outsourcing/india-engine' },
        exploreLabel: 'Explore all services',
        exploreTo: '/services',
        layout: 'list',
        client: { title: 'Client / Employer', text: 'Discuss a requirement', to: contactLink('India Technology Delivery') },
        seeker: { title: 'Job seeker', text: 'View careers', to: '/careers' },
        services: [
            { icon: Brain, label: 'AI and automation', to: '/services/ai-automation' },
            { icon: Laptop, label: 'Software and app development', to: '/services/custom-development' },
            { icon: Cloud, label: 'Cloud and data', to: '/services/cloud-devops' },
            { icon: Shield, label: 'Managed IT support', to: '/services/managed-it' },
        ],
        roles: ['Software engineering', 'AI / ML', 'Cloud', 'DevOps', 'Data', 'QA', 'UI / UX', 'Technical support'],
        slides: [
            { image: '/images/hero/hero-tech-india.webp', alt: 'Two software engineers reviewing code and a cloud diagram on dual monitors', title: 'Software and app development', sub: 'Web, mobile and product engineering' },
            { image: '/images/pages/pg-svc-ai-data.jpg', alt: 'Analysts reviewing data dashboards on a wide monitor', title: 'AI and automation', sub: 'Workflows shaped around a defined use case' },
            { image: '/images/pages/pg-svc-cloud.webp', alt: 'Engineer reviewing a cloud architecture diagram in a bright office', title: 'Cloud and DevOps', sub: 'Environments, releases and support' },
            { image: '/images/hm-path-enterprise.webp', alt: 'Project lead and operations manager reviewing a delivery dashboard', title: 'Dedicated technology teams', sub: 'Staffing, offshore teams and BOT' },
        ],
    },
    {
        id: 'media',
        step: '02',
        icon: Clapperboard,
        title: 'AI media',
        tagline: 'AI video, design and content from India.',
        source: { label: 'India', codes: ['IN'], to: '/outsourcing/india-engine' },
        exploreLabel: 'Explore AI media',
        exploreTo: '/outsourcing/digital-marketing-creative',
        layout: 'list',
        client: { title: 'Client / Employer', text: 'Discuss a requirement', to: contactLink('Digital Marketing & Creative') },
        seeker: { title: 'Job seeker', text: 'View careers', to: '/careers' },
        services: [
            { icon: PenTool, label: 'Content and creative', to: '/outsourcing/digital-marketing-creative' },
            { icon: Video, label: 'Video and motion', to: '/outsourcing/digital-marketing-creative' },
            { icon: Search, label: 'SEO and campaign support', to: '/outsourcing/digital-marketing-creative' },
            { icon: Megaphone, label: 'Marketing operations', to: '/outsourcing/digital-marketing-creative' },
        ],
        roles: ['Content', 'Brand design', 'Video editing', 'Motion', 'SEO support', 'Campaign coordination', 'Social creatives', 'Marketing operations'],
        slides: [
            {
                image: '/images/hero/ai-media-studio.webp',
                alt: 'Creative team reviewing a video storyboard, design prints and content layouts in a bright studio',
                title: 'AI video, design and content',
                sub: 'Storyboards, brand design and short-form content',
            },
        ],
    },
    {
        id: 'ops',
        step: '03',
        icon: Headset,
        title: 'Business Outsourcing',
        tagline: 'Customer experience, sales support and back-office work from the Philippines, with partnership reach in more countries.',
        places: [
            { code: 'PH', name: 'Philippines' },
            { code: 'IN', name: 'India' },
            { code: 'GH', name: 'Ghana' },
            { code: 'MA', name: 'Morocco' },
            { code: 'VN', name: 'Vietnam' },
            { code: 'ID', name: 'Indonesia' },
            { code: 'TN', name: 'Tunisia' },
            { code: 'KE', name: 'Kenya' },
        ],
        exploreLabel: 'Explore all services',
        exploreTo: '/outsourcing',
        layout: 'list',
        client: { title: 'Client / Employer', text: 'Discuss a requirement', to: contactLink('Philippines Operations') },
        seeker: { title: 'Job seeker', text: 'View careers', to: '/careers' },
        services: [
            { icon: Headset, label: 'Customer service and support', to: '/outsourcing/customer-experience' },
            { icon: BarChart3, label: 'Sales and lead generation', to: '/outsourcing/sales-lead-generation' },
            { icon: FolderKanban, label: 'Back office and BPO', to: '/outsourcing/business-process-outsourcing' },
            { icon: ClipboardCheck, label: 'Virtual assistance', to: '/outsourcing/virtual-assistance' },
        ],
        roles: ['Customer service', 'Telesales', 'Appointment setting', 'Customer success', 'Virtual assistance', 'Data entry', 'L1 helpdesk', 'Recruitment support'],
        slides: [
            { image: '/images/hero/hero-cx-philippines.webp', alt: 'Customer support specialist on a headset, assisted by a team lead', title: 'Customer service and support', sub: 'Service, success support and L1 helpdesk' },
            { image: '/images/slide-outsourcing-ph.webp', alt: 'Customer support team working on headsets in a bright operations office', title: 'Sales and lead generation', sub: 'Prospecting, qualification and appointments' },
            { image: '/images/pages/pg-svc-bpo.webp', alt: 'Operations team processing back-office work at their desks', title: 'Back office and BPO', sub: 'Defined, repeatable processing workflows' },
            { image: '/images/pages/pg-svc-va.webp', alt: 'Assistant coordinating schedules and documents on a laptop', title: 'Virtual assistance', sub: 'Administrative and executive support' },
        ],
    },
    {
        id: 'hr',
        step: '04',
        icon: UserSearch,
        title: 'HR and Recruitment',
        tagline: 'Hiring, contract staffing and payroll in the markets we already serve.',
        source: { label: 'India, the GCC and the USA', codes: ['IN', 'US'], to: '/hr' },
        exploreLabel: 'Explore all services',
        exploreTo: '/hr',
        layout: 'list',
        client: { title: 'Client / Employer', text: 'Request staff', to: contactLink('HR Partnership') },
        seeker: { title: 'Job seeker', text: 'View openings', to: '/careers' },
        services: [
            { icon: UserSearch, label: 'Recruitment', to: '/hr/services/recruitment' },
            { icon: Users, label: 'Contract staffing', to: '/hr/services/contract-staffing' },
            { icon: ClipboardCheck, label: 'Payroll outsourcing', to: '/hr/services/payroll-outsourcing' },
            { icon: Briefcase, label: 'Executive search', to: '/hr/services/executive-search' },
        ],
        roles: ['Recruitment', 'Contract staffing', 'Payroll', 'Executive search', 'HR advisory', 'Background verification', 'Permanent hiring', 'Workforce support'],
        slides: [
            { image: '/images/hr/hr-recruitment.jpg', alt: 'Recruiter interviewing a candidate while reviewing a shortlist', title: 'Recruitment', sub: 'Permanent hiring from requirement to joining' },
            { image: '/images/hr/hr-contract-staffing.jpg', alt: 'Supervisor briefing a contract workforce team at an industrial site', title: 'Contract staffing', sub: 'Project, peak and ongoing workforce support' },
            { image: '/images/hr/hr-payroll.jpg', alt: 'Payroll specialist reviewing salary dashboards and payslips', title: 'Payroll outsourcing', sub: 'Pay runs, payslips and compliance checks' },
            { image: '/images/hr/hr-hero.jpg', alt: 'Recruiter shaking hands with a candidate while the HR team reviews profiles', title: 'Workforce support', sub: 'Hiring, pay and people operations' },
        ],
    },
];

const HelpCard = ({ line }) => {
    const reduceMotion = useReducedMotion();
    const rootRef = useRef(null);
    const inView = useInView(rootRef, { amount: 0.4 });
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const count = line.slides.length;
    const slide = line.slides[index];
    const moving = inView && !paused && !reduceMotion;

    useEffect(() => {
        if (!moving) return undefined;
        const id = setTimeout(() => setIndex((i) => (i + 1) % count), HELP_SLIDE_MS);
        return () => clearTimeout(id);
    }, [moving, index, count]);

    return (
        <article
            className="hm-help-row"
            ref={rootRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <div className="hm-help-stage">
                {line.slides.map((item, i) => (
                    <div className={'hm-help-slide' + (i === index ? ' is-on' : '')} key={item.image} aria-hidden={i !== index}>
                        <img src={item.image} alt={i === index ? item.alt : ''} />
                    </div>
                ))}
                <span className="hm-help-kicker">{line.step}</span>
                <p className="hm-help-caption" key={slide.title}>{slide.title}</p>
                {line.slides.length > 1 && (
                    <div className="hm-help-dots" role="tablist" aria-label={`${line.title} images`}>
                        {line.slides.map((item, i) => (
                            <button
                                key={item.image}
                                type="button"
                                role="tab"
                                aria-selected={i === index}
                                aria-label={item.title}
                                className={i === index ? 'is-on' : ''}
                                onClick={() => setIndex(i)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="hm-help-body">
                <div className="hm-help-title">
                    <span className="hm-help-title-icon" aria-hidden="true"><line.icon size={18} /></span>
                    <div>
                        <h3>{line.title}</h3>
                        <p>{line.tagline}</p>
                    </div>
                </div>

                {line.places ? (
                    <div className="hm-help-reach">
                        <small>Philippines delivery · partnership reach</small>
                        <ul>
                            {line.places.map((place) => (
                                <li key={place.code}>
                                    <Flag code={place.code} />
                                    <span>{place.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <Link to={line.source.to} className="hm-help-source">
                        <span className="hm-help-flags" aria-hidden="true">
                            {line.source.codes.map((code) => <Flag key={code} code={code} />)}
                        </span>
                        <span>
                            <small>Where</small>
                            <strong>{line.source.label}</strong>
                        </span>
                        <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                )}

                <div className="hm-help-covers">
                    <span>What this covers</span>
                    <ul className="hm-help-links">
                        {line.services.map((service) => (
                            <li key={service.label}>
                                <Link to={service.to}>
                                    <service.icon size={15} aria-hidden="true" />
                                    <span>{service.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hm-help-actions">
                    <Link to={line.exploreTo} className="hm-help-all">
                        {line.exploreLabel} <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                    <Link to={line.client.to} className="hm-help-action hm-help-action--client">
                        {line.client.text}
                    </Link>
                    <Link to={line.seeker.to} className="hm-help-action hm-help-action--seeker">
                        {line.seeker.text}
                    </Link>
                </div>
            </div>
        </article>
    );
};

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
                            <span key={c.code} className="hm-net-partner" style={orbitPoint(-90 + (i * 360) / partnerMarkets.length, 44)}>
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

const ProcessJourney = () => (
    <div className="hm-work">
        <ol className="hm-work-path">
            {processSteps.map((step, index) => (
                <motion.li
                    key={step.title}
                    className="hm-work-item"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.65, ease: EASE_OUT }}
                >
                    <span className="hm-work-num">{String(index + 1).padStart(2, '0')}</span>
                    <div className="hm-work-card">
                        <h3>
                            <step.icon size={18} aria-hidden="true" />
                            {step.title}
                        </h3>
                        <p>{step.desc}</p>
                        <p className="hm-work-outcome">
                            <small>Outcome</small>
                            {step.outcome}
                        </p>
                        <ul>
                            {step.covers.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </motion.li>
            ))}
        </ol>
        <ul className="hm-work-promises">
            {processPromises.map((item) => (
                <li key={item.text}>
                    <item.icon size={16} aria-hidden="true" />
                    {item.text}
                </li>
            ))}
        </ul>
    </div>
);

const CLIENTS = [
    { name: '9to6 Consultants', src: '/images/clients/9to6-consultants.png' },
    { name: 'CGrey', src: '/images/clients/cgrey.svg' },
    { name: 'G.P.P. Education Trust', src: '/images/clients/gpp-education-trust.jpg' },
];

const ClientTrust = () => (
    <div className="hm-clients">
        <div className="hm-clients-copy">
            <h3 className="hm-clients-title">Trusted by our valued clients</h3>
            <p className="hm-clients-note">Education trusts, consultancies and campus teams.</p>
        </div>
        <ul className="hm-clients-list">
            {CLIENTS.map((client) => (
                <li key={client.name}>
                    <span className="hm-clients-mark">
                        <img src={client.src} alt="" />
                    </span>
                    <strong>{client.name}</strong>
                </li>
            ))}
        </ul>
    </div>
);

const CountryRow = ({ hidden = false }) => (
    <ul className="hm-reach-list" aria-hidden={hidden || undefined}>
        {networkCountries.map((c) => (
            <li key={hidden ? `${c.code}-copy` : c.code} className="hm-reach-item" title={hidden ? undefined : c.role}>
                <Flag code={c.code} />
                <span>{c.name}</span>
            </li>
        ))}
    </ul>
);

const CountryMarquee = () => (
    <section className="hm-reach" aria-label="Countries in our network">
        <div className="container hm-reach-inner">
            <p className="hm-reach-label">
                <span className="hm-reach-live" aria-hidden="true" />
                Our network
                <span className="hm-reach-count">{networkCountries.length}</span>
            </p>
            <div className="hm-reach-viewport">
                <div className="hm-reach-track">
                    <CountryRow />
                    <CountryRow hidden />
                </div>
            </div>
        </div>
    </section>
);

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

const ProductShowcase = () => (
    <>
        <ul className="hm-prod">
            {products.map((product) => (
                <li key={product.title} className="hm-prod-card">
                    <Link to={product.to} className="hm-prod-shot">
                        <img src={product.image} alt={product.alt} width="1024" height="640" loading="lazy" />
                    </Link>
                    <div className="hm-prod-copy">
                        <p className="hm-prod-meta">
                            <span className={`hm-badge ${product.badgeClass}`}>
                                <span className="hm-badge-dot" aria-hidden="true" />
                                {product.badge}
                            </span>
                            <span>{product.audience}</span>
                            {product.title === 'LearnX' && (
                                <span className="hm-prod-flag">
                                    <Sparkles size={12} aria-hidden="true" /> Flagship
                                </span>
                            )}
                        </p>
                        <h3>{product.title}</h3>
                        <p>{product.desc}</p>
                        <ul>
                            {product.features.map((feature) => (
                                <li key={feature}><CheckCircle2 size={14} aria-hidden="true" /> {feature}</li>
                            ))}
                        </ul>
                        <div className="hm-prod-actions">
                            <Link to={product.to} className="hm-btn hm-btn-primary">
                                {product.cta} <ArrowRight size={15} />
                            </Link>
                            <Link to={product.secondary.to} className="hm-text-link">
                                {product.secondary.label} <ArrowRight size={15} />
                            </Link>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
        <Link to={contactLink('Products')} className="hm-prod-help">
            <span>
                <strong>Not sure which fits?</strong>
                <small>Talk to our product team</small>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
    </>
);

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
                <title>KAM Global AI | Software, IT Outsourcing &amp; HR Services</title>
                <meta
                    name="description"
                    content="KAM Global AI delivers software development and IT services from India, outsourcing and business operations from the Philippines, and HR, recruitment, staffing and payroll."
                />
                <meta
                    name="keywords"
                    content="KAM Global AI, software development, IT services, IT outsourcing, software outsourcing, business process outsourcing, BPO, HR services, recruitment, staffing, payroll, India, Philippines"
                />
                <link rel="canonical" href="https://kamglobalai.com/" />
                <meta property="og:url" content="https://kamglobalai.com/" />
                <meta property="og:title" content="KAM Global AI | Software, IT Outsourcing & HR Services" />
                <meta
                    property="og:description"
                    content="Software development and IT services from India, outsourcing from the Philippines, and HR, recruitment, staffing and payroll."
                />
            </Helmet>

            {/* 1. Hero */}
            <HeroShowcase />

            {/* 1b. Country network marquee */}
            <CountryMarquee />

            {/* 2. Intro */}
            <section className="hm-about hm-who" id="who-we-are" aria-labelledby="hm-who-title">
                <div className="container">
                    <header className="hm-who-head">
                        <p className="hm-who-kicker">Who We Are</p>
                        <h2 id="hm-who-title">
                            <span>Technology, Talent,</span>
                            <span>Operations and Media</span>
                        </h2>
                        <p className="hm-who-aim">Aligned to <span>your goals</span></p>
                    </header>

                    <p className="hm-who-lead">
                        KAM Global AI is a technology and workforce services company. It provides software
                        development, AI and automation, data and analytics, cloud and DevOps, managed IT, HR and
                        recruitment services, global outsourcing, and AI video, design and content, with technology
                        delivery from India and business operations support from the Philippines. Whether you are
                        building a platform, improving IT operations, expanding customer-facing capacity or hiring,
                        we can help you define the next step.
                    </p>

                    <div className="hm-who-grid">
                        <figure className="hm-who-photo">
                            <div className="hm-who-frame">
                                <img
                                    src="/images/hm-who-we-are.webp"
                                    alt="KAM Group executive shaking hands with the KAM Global AI technology and operations team in a bright office"
                                    loading="lazy"
                                    width="1024"
                                    height="768"
                                />
                                <figcaption className="hm-who-caption">
                                    <span>
                                        <Shield size={15} aria-hidden="true" />
                                        <span><strong>Backed by KAM Group</strong><small>Kuwait</small></span>
                                    </span>
                                    <span>
                                        <MapPin size={15} aria-hidden="true" />
                                        <span><strong>One partner, four service lines</strong><small>Kuwait · India · Philippines</small></span>
                                    </span>
                                </figcaption>
                            </div>
                        </figure>

                        <div className="hm-who-panel">
                            <ol className="hm-who-lines">
                                {whoFocus.map((item) => (
                                    <li key={item.n}>
                                        <Link to={item.to}>
                                            <span className="hm-who-num">{item.n}</span>
                                            <span>
                                                <strong className="hm-who-name">{item.title}</strong>
                                                <span className="hm-who-note">{item.note}</span>
                                            </span>
                                            <ArrowRight size={16} aria-hidden="true" />
                                        </Link>
                                    </li>
                                ))}
                            </ol>

                            <p className="hm-who-backing">
                                <Handshake size={18} aria-hidden="true" />
                                Strategically backed by KAM Group, Kuwait, we connect regional business trust with
                                reliable delivery, AI products, and long-term partnership.
                            </p>

                            <div className="hm-who-facts">
                                <div>
                                    <strong>
                                        <CountUp end={10} duration={2} enableScrollSpy scrollSpyOnce /><em>+</em>
                                    </strong>
                                    <span>Years group legacy</span>
                                </div>
                                <div>
                                    <strong>
                                        <CountUp end={4} duration={2} enableScrollSpy scrollSpyOnce />
                                    </strong>
                                    <span>Service lines</span>
                                </div>
                                <div>
                                    <strong>
                                        <CountUp end={networkCountries.length} duration={2} enableScrollSpy scrollSpyOnce />
                                    </strong>
                                    <span>Countries in our network</span>
                                </div>
                            </div>

                            <div className="hm-who-iso">
                                <IsoBadge />
                            </div>

                            <div className="hm-who-actions">
                                <Link to="/about" className="hm-btn hm-btn-primary">
                                    About KAM Global AI <ArrowRight size={15} />
                                </Link>
                                <a href="#global-presence" className="hm-text-link">
                                    See where we operate <ArrowRight size={15} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="hm-bm" id="delivery-engines" aria-labelledby="hm-model-title">
                <div className="container">
                    <header className="hm-bm-head">
                        <p className="hm-who-kicker">The Business Model</p>
                        <h2 id="hm-model-title">
                            <span>One partner.</span>
                            <span>Two talent engines.</span>
                        </h2>
                        <p>
                            Kuwait holds the relationship. Technology is delivered from India. Business operations are delivered from the Philippines. The engine depends on the scope, and not every service is offered from every location.
                        </p>
                    </header>
                    <div className="hm-bm-map">
                        <div>
                            <small>Relationship</small>
                            <strong>Kuwait</strong>
                            <p>Governance and the client partnership sit here. Delivery then comes from the engine that fits the work.</p>
                        </div>
                        <div>
                            <small>Technology</small>
                            <strong>India</strong>
                            <p>Software, AI, data, cloud and managed IT are delivered from the India engine.</p>
                        </div>
                        <div>
                            <small>Operations</small>
                            <strong>Philippines</strong>
                            <p>Customer experience, sales support and back-office work are delivered from the Philippines engine.</p>
                        </div>
                    </div>
                    <div className="hm-bm-pair">
                        {deliveryEngines.map((engine) => (
                            <article key={engine.key} className="hm-bm-card">
                                <img src={engine.image} alt={engine.alt} width="1024" height="576" />
                                <div>
                                    <p>{engine.key === 'india' ? 'India' : 'Philippines'}</p>
                                    <h3>{engine.short}</h3>
                                    <p className="hm-bm-desc">{engine.cardDesc}</p>
                                    <ul>
                                        {engine.capabilities.items.slice(0, 4).map((item) => (
                                            <li key={item.title}><Link to={item.to}>{item.title}</Link></li>
                                        ))}
                                    </ul>
                                    <Link to={`/outsourcing/${engine.slug}`} className="hm-bm-go">
                                        Explore the {engine.key === 'india' ? 'India' : 'Philippines'} engine <ArrowRight size={16} aria-hidden="true" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="hm-help" id="how-we-help" aria-labelledby="hm-help-title">
                <div className="container">
                    <header className="hm-band-head">
                        <p className="hm-who-kicker">How can we help you?</p>
                        <h2 id="hm-help-title">
                            <span>Pick the work</span>
                            <span>you need</span>
                        </h2>
                        <p className="hm-band-lead">Each line shows what the work includes, where it is delivered, and how to start.</p>
                    </header>
                    <div className="hm-help-list">
                        {helpLines.map((line) => <HelpCard key={line.id} line={line} />)}
                    </div>
                </div>
            </section>

            {/* 7. Industries */}
            <section className="hm-industries" id="industries" aria-labelledby="hm-industries-title">
                <div className="container">
                    <header className="hm-band-head">
                        <p className="hm-who-kicker">Industries</p>
                        <h2 id="hm-industries-title">
                            <span>Built for different</span>
                            <span>industries</span>
                        </h2>
                        <p className="hm-band-lead">
                            We work to understand the workflows, customers, and operating requirements that make each
                            industry different. Explore how our technology and support capabilities may apply to your
                            sector.
                        </p>
                    </header>
                    <IndustriesGallery />
                    <div className="hm-section-footer">
                        <Link to="/industries" className="hm-btn hm-btn-outline">
                            Explore Industries <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 9. Products */}
            <section className="hm-products hm-prod-section" id="products" aria-labelledby="hm-products-title">
                <div className="container">
                    <header className="hm-band-head">
                        <p className="hm-who-kicker">Products</p>
                        <h2 id="hm-products-title">
                            <span>Digital products</span>
                            <span>from KAM Global AI</span>
                        </h2>
                        <p className="hm-band-lead">
                            LearnX for schools, EduAiTutors for NEET and JEE, and an AI-powered LMS from Pre-KG to Grade 12.
                        </p>
                    </header>
                    <ProductShowcase />
                    <div className="hm-section-footer">
                        <Link to="/products" className="hm-btn hm-btn-outline">
                            Explore Our Products <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 10. How we work */}
            <section className="hm-process hm-work-section" id="how-we-work" aria-labelledby="hm-work-title">
                <div className="container">
                    <header className="hm-band-head">
                        <p className="hm-who-kicker">How We Work</p>
                        <h2 id="hm-work-title" className="hm-work-title">
                            <span>Clear scope.</span>
                            <span>Collaborative delivery.</span>
                        </h2>
                        <p className="hm-band-lead">
                            We begin by understanding your goals, defining requirements, confirming the appropriate
                            capabilities, and agreeing on delivery expectations before work begins.
                        </p>
                    </header>
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
                                        <small>Across four service lines</small>
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
                            <header className="hm-band-head">
                                <p className="hm-who-kicker">Why KAM Global AI</p>
                                <h2>
                                    <span>Global capability. Local trust.</span>
                                    <span>Proven execution.</span>
                                </h2>
                            </header>
                            <Reveal delay={0.2} y={16}>
                                <p className="hm-wy-lead">
                                    Clients choose us for one accountable partner across technology, AI media, operations and HR
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
                    <ClientTrust />
                </div>
            </section>

            {/* 12. Global presence */}
            <section className="hm-presence" id="global-presence">
                <div className="container">
                    <header className="hm-band-head">
                        <p className="hm-who-kicker">Global Presence</p>
                        <h2>
                            <span>Three hubs. Nine countries.</span>
                            <span>One delivery standard.</span>
                        </h2>
                        <p className="hm-band-lead">
                            Kuwait holds the group relationship. The same delivery reaches the countries in our network.
                        </p>
                    </header>
                    <PresenceNetwork />
                </div>
            </section>
        </div>
        </MotionConfig>
    );
};

export default Home;
