import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, MotionConfig, useInView } from 'framer-motion';
import {
    Linkedin,
    Instagram,
    Phone,
    Mail,
    MapPin,
    ArrowUpRight,
    ArrowRight,
    ShieldCheck,
    Clock,
    Navigation,
    MessageSquare,
} from 'lucide-react';
import { COMPANY, whatsappLink } from '../data/company';
import { OFFICE_LOCATIONS } from '../config/officeLocations';
import Flag from './Flag';
import { OFFICE_SCHEDULES, officeStatus, useNow } from '../lib/officeHours';
import './Footer.css';

const WORDMARK = 'KAM GLOBAL AI';

const trackWordmark = (event) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
};

const FooterWordmark = () => {
    const ref = useRef(null);
    const lit = useInView(ref, { once: true, amount: 0.6 });

    return (
        <div
            ref={ref}
            className={`footer-wordmark${lit ? ' is-lit' : ''}`}
            aria-hidden="true"
            onPointerMove={trackWordmark}
        >
            <span className="footer-wordmark-base">
                {[...WORDMARK].map((char, i) => (
                    <span key={i} className="footer-wordmark-char" style={{ '--i': i }}>
                        {char}
                    </span>
                ))}
            </span>
            <span className="footer-wordmark-layer footer-wordmark-shine">{WORDMARK}</span>
            <span className="footer-wordmark-layer footer-wordmark-spot">{WORDMARK}</span>
        </div>
    );
};

const OFFICE_CONTACT = {
    KW: {
        phone: '+965 22087764',
        email: 'info@kamgroups.com',
        label: 'Kuwait HQ',
        role: 'Strategy & client relations',
        hours: 'Sun–Thu · 9:00 AM – 6:00 PM',
        schedule: OFFICE_SCHEDULES.KW,
    },
    IN: {
        phone: '+91 80507 66363',
        email: 'info@kamglobalai.com',
        label: 'India Center',
        role: 'Technology delivery',
        hours: 'Mon–Sat · 9:00 AM – 7:00 PM',
        schedule: OFFICE_SCHEDULES.IN,
    },
};

const companyGroups = [
    {
        title: 'About us',
        links: [
            { label: 'Home', to: '/' },
            { label: 'About', to: '/about' },
            { label: 'Leadership', to: '/about#leadership' },
            { label: 'Why KAM Global AI', to: '/about#why-us' },
            { label: 'Careers', to: '/careers' },
            { label: 'Contact', to: '/contact' },
        ],
    },
    {
        title: 'Explore',
        links: [
            { label: 'Products', to: '/products' },
            { label: 'LearnX', to: '/products/learnx' },
            { label: 'Resources', to: '/resources' },
            { label: 'Case Studies', to: '/resources/case-studies' },
        ],
    },
];

const serviceGroups = [
    {
        title: 'Technology',
        links: [
            { label: 'All Services', to: '/services' },
            { label: 'IT & Development', to: '/services/custom-development' },
            { label: 'AI & Automation', to: '/services/ai-automation' },
            { label: 'Cloud & DevOps', to: '/services/cloud-devops' },
            { label: 'BOT Model', to: '/services/bot-model' },
        ],
    },
    {
        title: 'Outsourcing',
        links: [
            { label: 'Global Outsourcing', to: '/outsourcing' },
            { label: 'India Engine', to: '/outsourcing/india-engine' },
            { label: 'Philippines Engine', to: '/outsourcing/philippines-engine' },
        ],
    },
    {
        title: 'HR & Workforce',
        links: [
            { label: 'HR & Workforce', to: '/hr' },
            { label: 'Payroll Outsourcing', to: '/hr/services/payroll-outsourcing' },
            { label: 'HR Technology', to: '/hr/technology' },
            { label: 'Jobs', to: '/hr/jobs' },
        ],
    },
    {
        title: 'How we engage',
        links: [
            { label: 'Industries', to: '/industries' },
            { label: 'Engagement Models', to: '/engagement-models' },
        ],
    },
];

const socialLinks = [
    {
        icon: Linkedin,
        href: 'https://www.linkedin.com/company/kam-global-for-digital-ai-media-solutions-private-limited/posts/?feedView=all',
        label: 'LinkedIn',
    },
    {
        icon: Instagram,
        href: 'https://www.instagram.com/eduaitutors?igsh=MWZmOTIyOW9nOW5xdQ==',
        label: 'Instagram',
    },
];

const EASE_OUT = [0.16, 1, 0.3, 1];

const columns = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const column = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const FooterNav = ({ title, groups, wide = false }) => (
    <motion.nav className={`footer-nav${wide ? ' footer-nav--wide' : ''}`} aria-label={title} variants={column}>
        <h3>{title}</h3>
        <div className="footer-nav-groups">
            {groups.map((group) => (
                <div key={group.title} className="footer-nav-group">
                    <h4>{group.title}</h4>
                    <ul>
                        {group.links.map(({ label, to }) => (
                            <li key={to}>
                                <Link to={to}>
                                    <span>{label}</span>
                                    <ArrowUpRight size={13} aria-hidden="true" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </motion.nav>
);

const OfficeCard = ({ office, now }) => {
    const contact = OFFICE_CONTACT[office.addressCountry];
    const { isOpen, time } = officeStatus(contact.schedule, now);
    return (
        <article className="footer-loc">
            <div className="footer-loc-head">
                <Flag code={office.addressCountry} className="footer-loc-flag" />
                <div className="footer-loc-title">
                    <strong>{contact.label}</strong>
                    <span>{office.shortName} · {contact.role}</span>
                </div>
                <span className={`footer-loc-status${isOpen ? ' is-open' : ''}`}>
                    <span className="footer-loc-status-dot" aria-hidden="true" />
                    {isOpen ? 'Open' : 'Closed'} · {time}
                </span>
            </div>

            <address className="footer-loc-address">
                <MapPin size={14} aria-hidden="true" />
                <span>{office.streetAddress}</span>
            </address>
            <p className="footer-loc-hours">
                <Clock size={14} aria-hidden="true" />
                <span>{contact.hours} <small>(local time)</small></span>
            </p>

            <div className="footer-loc-links">
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                    <Phone size={14} aria-hidden="true" />
                    {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`}>
                    <Mail size={14} aria-hidden="true" />
                    {contact.email}
                </a>
                {office.addressCountry === 'IN' && (
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                        <MessageSquare size={14} aria-hidden="true" />
                        WhatsApp
                    </a>
                )}
            </div>

            <a
                href={office.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-loc-directions"
                aria-label={`Get directions to ${contact.label} (opens Google Maps)`}
            >
                <Navigation size={13} aria-hidden="true" /> Get directions
                <ArrowUpRight size={13} aria-hidden="true" />
            </a>
        </article>
    );
};

const Footer = () => {
    const now = useNow();
    return (
        <MotionConfig reducedMotion="user">
        <footer className="footer">
            <div className="footer-body">
                <span className="footer-glow" aria-hidden="true" />
                <div className="container">
                    <motion.div
                        className="footer-layout"
                        variants={columns}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.05 }}
                    >
                        <motion.div className="footer-brand" variants={column}>
                            <Link to="/" className="footer-logo">
                                <img
                                    src="/logo-mark.png?v=7"
                                    alt=""
                                    className="footer-logo-mark"
                                    width={199}
                                    height={120}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <span className="footer-logo-text">
                                    <span className="footer-logo-title">Global for Digital AI</span>
                                    <span className="footer-logo-sub">Media Solutions Pvt. Ltd.</span>
                                </span>
                                <span className="sr-only">Kam Global for Digital AI Media Solutions Pvt. Ltd.</span>
                            </Link>
                            <p className="footer-tagline">
                                AI-powered digital transformation connecting Gulf business vision with
                                India&apos;s engineering excellence.
                            </p>
                            <span className="footer-backing">
                                <ShieldCheck size={14} aria-hidden="true" /> {COMPANY.backing}
                            </span>
                            <div className="footer-social">
                                {socialLinks.map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className="footer-social-link"
                                        target={href.startsWith('http') ? '_blank' : undefined}
                                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    >
                                        <Icon size={16} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        <FooterNav title="Company" groups={companyGroups} />
                        <FooterNav title="Services" groups={serviceGroups} wide />
                    </motion.div>

                    <motion.section
                        className="footer-locations"
                        aria-labelledby="footer-offices-title"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.7, ease: EASE_OUT }}
                    >
                        <div className="footer-loc-intro">
                            <h3 id="footer-offices-title">Offices</h3>
                            <p>Visit, call or email the team closest to you.</p>
                        </div>
                        <div className="footer-loc-list">
                            {OFFICE_LOCATIONS.map((office) => (
                                <OfficeCard key={office.shortName} office={office} now={now} />
                            ))}
                            <div className="footer-loc footer-loc--cta">
                                <span className="footer-loc-cta-icon" aria-hidden="true">
                                    <MessageSquare size={18} />
                                </span>
                                <strong>Not sure who to contact?</strong>
                                <p>Send one enquiry and we will route it to the right team.</p>
                                <Link to="/contact#form" className="footer-loc-cta-btn">
                                    Send an enquiry <ArrowRight size={14} aria-hidden="true" />
                                </Link>
                                <Link to="/hr/jobs" className="footer-loc-cta-link">
                                    Looking for a job? Browse open roles
                                </Link>
                            </div>
                        </div>
                    </motion.section>
                </div>
                <FooterWordmark />
            </div>

            <div className="footer-bar">
                <div className="container footer-bar-inner">
                    <p>
                        &copy; {new Date().getFullYear()} {COMPANY.legalName} All rights reserved.
                        <span className="footer-bar-note">{COMPANY.brand} · {COMPANY.backing}</span>
                    </p>
                    <div className="footer-bar-links">
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/terms">Terms</Link>
                        <Link to="/support">Support</Link>
                    </div>
                </div>
            </div>
        </footer>
        </MotionConfig>
    );
};

export default Footer;
