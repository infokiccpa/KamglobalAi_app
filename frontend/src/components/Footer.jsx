import React from 'react';
import { Link } from 'react-router-dom';
import {
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Phone,
    Mail,
    MapPin,
    ArrowUpRight,
} from 'lucide-react';
import { OFFICE_LOCATIONS } from '../config/officeLocations';
import './Footer.css';

const OFFICE_CONTACT = {
    KW: { phone: '+965 22087764', email: 'info@kamgroups.com', label: 'Kuwait HQ' },
    IN: { phone: '+91 80507 66363', email: 'info@kamglobalai.com', label: 'India Center' },
};

const companyLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Leadership', to: '/about#leadership' },
    { label: 'Products', to: '/products' },
    { label: 'KamGlobalAI', to: '/kamglobal-ai' },
    { label: 'Careers', to: '/careers' },
];

const serviceLinks = [
    { label: 'All Services', to: '/services' },
    { label: 'BOT Model', to: '/services#bot-model' },
    { label: 'IT Development', to: '/services#it-dev' },
    { label: 'Cloud Services', to: '/services#cloud' },
    { label: 'IT Staffing', to: '/services#staffing' },
    { label: 'Digital Marketing', to: '/services#marketing' },
];

const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
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

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-strip">
                <div className="container footer-strip-inner">
                    <p className="footer-strip-text">
                        <span className="footer-strip-flags" aria-hidden="true">🇰🇼</span>
                        Strategy from Kuwait
                        <span className="footer-strip-dot" aria-hidden="true" />
                        Engineering from India
                        <span className="footer-strip-flags" aria-hidden="true">🇮🇳</span>
                    </p>
                    <Link to="/contact" className="footer-strip-cta">
                        Contact Us <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                </div>
            </div>

            <div className="footer-body">
                <div className="container">
                    <div className="footer-layout">
                        <div className="footer-brand">
                            <Link to="/" className="footer-logo">
                                <img src="/logo.png" alt="KAM Global AI" className="footer-logo-img" />
                            </Link>
                            <p className="footer-tagline">
                                AI-powered digital transformation connecting Gulf business vision with
                                India&apos;s engineering excellence.
                            </p>
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
                        </div>

                        <div className="footer-nav-block">
                            <nav className="footer-nav" aria-label="Company">
                                <h3>Company</h3>
                                <ul>
                                    {companyLinks.map(({ label, to }) => (
                                        <li key={to}>
                                            <Link to={to}>{label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <nav className="footer-nav" aria-label="Services">
                                <h3>Services</h3>
                                <ul>
                                    {serviceLinks.map(({ label, to }) => (
                                        <li key={to}>
                                            <Link to={to}>{label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        <div className="footer-locations">
                            <h3>Offices</h3>
                            <div className="footer-loc-card">
                                {OFFICE_LOCATIONS.map((office, idx) => {
                                    const contact = OFFICE_CONTACT[office.addressCountry];
                                    const isKuwait = office.addressCountry === 'KW';
                                    return (
                                        <React.Fragment key={office.shortName}>
                                            {idx > 0 && <div className="footer-loc-divider" aria-hidden="true" />}
                                            <div className="footer-loc">
                                                <div className="footer-loc-head">
                                                    <span aria-hidden="true">{isKuwait ? '🇰🇼' : '🇮🇳'}</span>
                                                    <div>
                                                        <strong>{contact.label}</strong>
                                                        <span>{office.shortName}</span>
                                                    </div>
                                                </div>
                                                <a
                                                    href={office.mapsUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="footer-loc-address"
                                                >
                                                    <MapPin size={13} aria-hidden="true" />
                                                    {office.streetAddress}
                                                </a>
                                                <div className="footer-loc-links">
                                                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                                                        <Phone size={13} aria-hidden="true" />
                                                        {contact.phone}
                                                    </a>
                                                    <a href={`mailto:${contact.email}`}>
                                                        <Mail size={13} aria-hidden="true" />
                                                        {contact.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bar">
                <div className="container footer-bar-inner">
                    <p>&copy; {new Date().getFullYear()} Kam Global AI · Backed by KAM Group</p>
                    <div className="footer-bar-links">
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/terms">Terms</Link>
                        <Link to="/support">Support</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
