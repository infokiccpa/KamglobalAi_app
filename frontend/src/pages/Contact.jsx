import { Fragment, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    ChevronDown,
    Briefcase,
    Headset,
    Target,
    ClipboardList,
    ArrowRight,
    CheckCircle,
    XCircle,
    ExternalLink,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { OFFICE_LOCATIONS, getOfficeLocationsJsonLd } from '../config/officeLocations';
import './Contact.css';

const OFFICE_CONTACT = {
    KW: { phone: '+965 22087764', tel: '+96522087764', email: 'info@kamgroups.com', hours: 'Sun–Thu: 9:00 AM – 6:00 PM' },
    IN: { phone: '+91 80507 66363', tel: '+918050766363', email: 'info@kamglobalai.com', hours: 'Mon–Sat: 9:00 AM – 7:00 PM IST' },
};

const helpChannels = [
    { icon: Briefcase, title: 'Business Inquiry', email: 'info@kamglobalai.com' },
    { icon: Headset, title: 'Technical Support', email: 'itsupport@kamglobalai.com' },
    { icon: Target, title: 'Partnership', email: 'info@kamglobalai.com' },
    { icon: ClipboardList, title: 'Careers', email: 'info@kamglobalai.com', link: '/careers' },
];

const jumpLinks = [
    { href: '#help', label: 'How We Help' },
    { href: '#form', label: 'Send Message' },
    { href: '#offices', label: 'Offices' },
    { href: '#faq', label: 'FAQ' },
];

const faqs = [
    {
        q: 'What is your typical response time?',
        a: 'We typically respond to all inquiries within 24 business hours. For urgent matters, contact our support email directly for expedited assistance.',
    },
    {
        q: 'Do you offer free consultations?',
        a: 'Yes — we offer initial consultations for all our services. We schedule a 30-minute discovery call to understand your requirements and provide a tailored proposal.',
    },
    {
        q: 'Can I visit your offices?',
        a: 'Absolutely. We welcome clients at our Kuwait HQ or Bengaluru delivery center. Please schedule an appointment in advance so the right team members are available.',
    },
];

const Eyebrow = ({ children, center, lines = true }) => (
    <div className={`con-eyebrow${center ? ' con-eyebrow-center' : ''}`}>
        {lines && <span className="con-eyebrow-line" aria-hidden="true" />}
        <span>{children}</span>
        {lines && <span className="con-eyebrow-line" aria-hidden="true" />}
    </div>
);

const FAQItem = ({ question, answer, isOpen, onClick }) => (
    <div className={`con-faq-item${isOpen ? ' con-faq-item--open' : ''}`}>
        <button type="button" className="con-faq-question" onClick={onClick} aria-expanded={isOpen}>
            <span>{question}</span>
            <ChevronDown size={18} className="con-faq-icon" aria-hidden="true" />
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="con-faq-answer"
                >
                    <p>{answer}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const Contact = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState({ type: 'idle', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Sending message...' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent! We will get back to you soon.' });
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' });
            }
        } catch {
            setStatus({ type: 'error', message: 'An error occurred. Please check your connection and try again.' });
        }
    };

    const kuwaitOffice = OFFICE_LOCATIONS.find((o) => o.addressCountry === 'KW');
    const indiaOffice = OFFICE_LOCATIONS.find((o) => o.addressCountry === 'IN');

    return (
        <div className="contact-page">
            <Helmet>
                <title>Contact Us | KamGlobal AI — Kuwait &amp; India</title>
                <meta
                    name="description"
                    content="Contact KamGlobal AI. Reach our Kuwait HQ or India delivery center for IT consulting, partnerships, and support."
                />
                <script type="application/ld+json">{JSON.stringify(getOfficeLocationsJsonLd())}</script>
            </Helmet>

            <section className="con-hero">
                <div className="container">
                    <motion.div
                        className="con-hero-inner"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Eyebrow center lines={false}>Contact Us</Eyebrow>
                        <h1>Let&apos;s Start a Conversation</h1>
                        <p>
                            Whether you need enterprise IT consulting, a BOT partnership, or technical
                            support — our teams in Kuwait and India are ready to help.
                        </p>

                        <div className="con-hero-stats">
                            <div className="con-stat">
                                <strong>24h</strong>
                                <span>Response Time</span>
                            </div>
                            <div className="con-stat">
                                <strong>2</strong>
                                <span>Global Offices</span>
                            </div>
                            <div className="con-stat">
                                <strong>Free</strong>
                                <span>Consultation</span>
                            </div>
                        </div>

                        <nav className="con-jump-nav" aria-label="Page sections">
                            {jumpLinks.map((link) => (
                                <a key={link.href} href={link.href} className="con-jump-link">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                </div>
            </section>

            <section id="help" className="con-help">
                <div className="container">
                    <div className="con-section-header">
                        <Eyebrow center>Get in Touch</Eyebrow>
                        <h2>How Can We Help?</h2>
                        <p>Choose the channel that best fits your inquiry.</p>
                    </div>

                    <div className="con-help-grid">
                        {helpChannels.map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="con-help-card"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                            >
                                <span className="con-help-icon" aria-hidden="true">
                                    <item.icon size={20} strokeWidth={1.75} />
                                </span>
                                <h3>{item.title}</h3>
                                {item.link ? (
                                    <Link to={item.link} className="con-help-link">
                                        View careers <ArrowRight size={14} />
                                    </Link>
                                ) : (
                                    <a href={`mailto:${item.email}`} className="con-help-link">
                                        {item.email} <ArrowRight size={14} />
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="form" className="con-main">
                <div className="container">
                    <div className="con-layout">
                        <motion.div
                            className="con-form-col"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                        >
                            <div className="con-form-card">
                                <Eyebrow lines={false}>Message Us</Eyebrow>
                                <h2>Send a Message</h2>

                                {status.type !== 'idle' && (
                                    <div className={`con-status con-status--${status.type}`}>
                                        {status.type === 'success' && <CheckCircle size={18} aria-hidden="true" />}
                                        {status.type === 'error' && <XCircle size={18} aria-hidden="true" />}
                                        {status.message}
                                    </div>
                                )}

                                <form className="con-form" onSubmit={handleSubmit}>
                                    <div className="con-form-row">
                                        <div className="con-field">
                                            <label htmlFor="name">Full Name</label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Your name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="con-field">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="you@company.com"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="con-form-row">
                                        <div className="con-field">
                                            <label htmlFor="phone">Phone</label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="+965 / +91 ..."
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="con-field">
                                            <label htmlFor="subject">Subject</label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                            >
                                                <option value="" disabled>Select a topic</option>
                                                <option value="BOT Model">BOT Model</option>
                                                <option value="IT Development">IT Development</option>
                                                <option value="Cloud Services">Cloud Services</option>
                                                <option value="IT Staffing">IT Staffing</option>
                                                <option value="Partnership">Partnership</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="con-field">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us about your project or inquiry..."
                                            rows="5"
                                            required
                                            value={formData.message}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="con-btn con-btn-primary con-btn-full"
                                        disabled={status.type === 'loading'}
                                    >
                                        {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                                        {status.type !== 'loading' && <ArrowRight size={16} />}
                                    </button>
                                </form>
                            </div>
                        </motion.div>

                        <motion.div
                            className="con-info-col"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.08 }}
                        >
                            <div className="con-info-header">
                                <Eyebrow lines={false}>Direct Contact</Eyebrow>
                                <h2>Our Offices</h2>
                                <p>Reach out to either of our global locations.</p>
                            </div>

                            {[
                                { office: kuwaitOffice, contact: OFFICE_CONTACT.KW, label: 'Kuwait HQ' },
                                { office: indiaOffice, contact: OFFICE_CONTACT.IN, label: 'India Center' },
                            ].map(({ office, contact, label }) => (
                                <div key={label} className="con-office-card">
                                    <div className="con-office-head">
                                        <span className="con-office-icon" aria-hidden="true">
                                            <MapPin size={18} />
                                        </span>
                                        <h3>{label}</h3>
                                    </div>
                                    <address className="con-office-address">{office?.streetAddress}</address>
                                    <a href={`tel:${contact.tel}`} className="con-office-link">
                                        <Phone size={14} /> {contact.phone}
                                    </a>
                                    <a href={`mailto:${contact.email}`} className="con-office-link">
                                        <Mail size={14} /> {contact.email}
                                    </a>
                                    <span className="con-office-hours">
                                        <Clock size={14} /> {contact.hours}
                                    </span>
                                    {office?.mapsUrl && (
                                        <a
                                            href={office.mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="con-maps-link"
                                        >
                                            View on Maps <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="offices" className="con-locations" aria-label="Office locations">
                <div className="container">
                    <div className="con-section-header">
                        <Eyebrow center>Global Presence</Eyebrow>
                        <h2>Where We Operate</h2>
                    </div>

                    <div className="con-locations-grid">
                        {OFFICE_LOCATIONS.map((office, i) => (
                            <motion.div
                                key={office.shortName}
                                className="con-location-card"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                            >
                                <span className="con-location-pin" aria-hidden="true">
                                    <MapPin size={18} />
                                </span>
                                <h3>{office.shortName}</h3>
                                <p className="con-location-name">{office.name}</p>
                                <address>{office.streetAddress}</address>
                                <a
                                    href={office.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="con-maps-link"
                                >
                                    Google Maps <ExternalLink size={13} />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="faq" className="con-faq">
                <div className="container">
                    <div className="con-section-header">
                        <Eyebrow center>FAQ</Eyebrow>
                        <h2>Common Questions</h2>
                    </div>

                    <div className="con-faq-list">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={faq.q}
                                question={faq.q}
                                answer={faq.a}
                                isOpen={openFaqIndex === index}
                                onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="con-cta">
                <div className="container">
                    <motion.div
                        className="con-cta-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <h2>Prefer to talk directly?</h2>
                        <p>Schedule a free consultation with our enterprise team.</p>
                        <div className="con-cta-actions">
                            <a href="mailto:info@kamglobalai.com" className="con-btn con-btn-primary">
                                <Mail size={16} /> info@kamglobalai.com
                            </a>
                            <a href="tel:+96522087764" className="con-btn con-btn-secondary">
                                <Phone size={16} /> Kuwait HQ
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
