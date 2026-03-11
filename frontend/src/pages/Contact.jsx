import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { MapPin, Phone, Mail, Clock, ChevronDown, Briefcase, Headset, Target, ClipboardList, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './Contact.css';

const FAQItem = ({ question, answer, isOpen, onClick }) => (
    <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={onClick}>
        <div className="faq-question">
            <h3>{question}</h3>
            <span className="faq-icon-wrapper">
                <ChevronDown className="faq-icon" size={20} />
            </span>
        </div>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="faq-answer"
                >
                    <div className="faq-answer-inner">
                        <p>{answer}</p>
                    </div>
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
        message: ''
    });
    const [status, setStatus] = useState({ type: 'idle', message: '' });

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? -1 : index);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Sending message...' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' });
            }
        } catch {
            setStatus({ type: 'error', message: 'An error occurred. Please check your connection and try again.' });
        }
    };

    const faqs = [
        {
            q: "What is your typical response time?",
            a: "We typically respond to all inquiries within 24 business hours. For urgent matters, please contact our support email directly for expedited assistance."
        },
        {
            q: "Do you offer free consultations?",
            a: "Yes, we offer initial consultations for all our services. Ideally, we schedule a 30-minute discovery call to understand your requirements and provide a tailored proposal."
        },
        {
            q: "Can I visit your offices?",
            a: "Absolutely! We welcome clients to visit our HQ in Kuwait or our development center in India. Please schedule an appointment in advance so we can ensure the right team members are available to meet you."
        }
    ];

    return (
        <div className="contact-page">
            <Helmet>
                <title>Contact Us | KamGlobal AI - Global Support</title>
                <meta name="description" content="Reach out to KamGlobal AI. Contact our Kuwait HQ or India Delivery Center for specialized IT consulting and support." />
            </Helmet>
            {/* 1. Hero / Intro Section */}
            <section className="contact-hero">
                <div className="hero-bg-glow"></div>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="hero-content"
                    >
                        <span className="hero-label">We're Here for You</span>
                        <h1>Get In Touch</h1>
                        <p>Let's discuss how we can help transform your business with our tailored IT solutions.</p>
                    </motion.div>
                </div>
            </section>

            {/* 2. How Can We Help? */}
            <section className="section help-section">
                <div className="container">
                    <div className="section-header">
                        <h2>How Can We Help?</h2>
                    </div>

                    <div className="help-grid">
                        {[
                            { icon: Briefcase, title: "Business Inquiry", email: "info@kamglobalai.com", color: "blue" },
                            { icon: Headset, title: "Technical Support", email: "itsupport@kamglobalai.com", color: "indigo" },
                            { icon: Target, title: "Partnership", email: "info@kamglobalai.com", color: "violet" },
                            { icon: ClipboardList, title: "Careers", email: "info@kamglobalai.com", color: "sky" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="help-card glass-tile"
                            >
                                <div className={`icon-box ${item.color}`}>
                                    <item.icon size={28} strokeWidth={1.5} />
                                </div>
                                <h3>{item.title}</h3>
                                <a href={`mailto:${item.email}`} className="help-link">
                                    {item.email} <ArrowRight size={14} />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Contact Form & Info */}
            <section className="section contact-main">
                <div className="container">
                    <div className="contact-layout">
                        {/* Left: Form */}
                        <motion.div
                            className="form-column"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="glass-panel form-panel">
                                <h2>Send Us a Message</h2>

                                <AnimatePresence mode="wait">
                                    {status.type !== 'idle' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className={`status-message ${status.type}`}
                                        >
                                            {status.type === 'success' && <CheckCircle size={18} />}
                                            {status.type === 'error' && <XCircle size={18} />}
                                            <span>{status.message}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form className="minimal-form" onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name</label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="John Doe"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="john@company.com"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="+1 (555) 000-0000"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="subject">Subject</label>
                                            <div className="select-wrapper">
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
                                                    <option value="Other">Other</option>
                                                </select>
                                                <ChevronDown size={16} className="select-arrow" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder="How can we help you?"
                                            rows="5"
                                            required
                                            value={formData.message}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn-submit-gradient"
                                        disabled={status.type === 'loading'}
                                    >
                                        {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Right: Info Cards */}
                        <motion.div
                            className="info-column"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="info-header">
                                <h2>Contact Information</h2>
                                <p>Reach out directly to our global offices.</p>
                            </div>

                            <div className="office-card glass-tile">
                                <div className="office-header">
                                    <div className="office-icon"><MapPin size={20} /></div>
                                    <h3>Kuwait HQ</h3>
                                </div>
                                <div className="office-details">
                                    <p>Floor 2&6, Al Barsha Complex, Tunis Street, Hawally, Kuwait.</p>
                                    <a href="tel:+96522087764" className="office-link"><Phone size={14} /> +965 22087764</a>
                                    <a href="mailto:info@kamgroups.com" className="office-link"><Mail size={14} /> info@kamgroups.com</a>
                                    <div className="office-hours"><Clock size={14} /> Sun-Thu: 9:00 AM - 6:00 PM</div>
                                </div>
                            </div>

                            <div className="office-card glass-tile">
                                <div className="office-header">
                                    <div className="office-icon"><MapPin size={20} /></div>
                                    <h3>India Office</h3>
                                </div>
                                <div className="office-details">
                                    <p>No 544, 3rd cross, 3rd main, Above TMC Bank, RT Nagar, Bangalore-560032</p>
                                    <a href="tel:+918050766363" className="office-link"><Phone size={14} /> +91 80507 66363</a>
                                    <a href="mailto:info@kamglobalai.com" className="office-link"><Mail size={14} /> info@kamglobalai.com</a>
                                    <div className="office-hours"><Clock size={14} /> Mon-Sat: 9:00 AM - 7:00 PM IST</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 5. Locations Map Link */}
            <section className="section locations-section">
                <div className="container text-center">
                    <h2 className="section-title-sm">Global Presence</h2>
                    <div className="locations-wrapper">
                        <div className="location-item">
                            <div className="pin-circle"><MapPin size={24} /></div>
                            <h3>Kuwait City</h3>
                            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="map-text-btn">View on Google Maps</a>
                        </div>
                        <div className="divider-line"></div>
                        <div className="location-item">
                            <div className="pin-circle"><MapPin size={24} /></div>
                            <h3>Bengaluru</h3>
                            <a href="https://maps.app.goo.gl/soHoBqfEFJ2d8fV69" target="_blank" rel="noopener noreferrer" className="map-text-btn">View on Google Maps</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. FAQ Section */}
            <section className="section faq-section">
                <div className="container max-w-3xl">
                    <div className="faq-header">
                        <h2>Frequently Asked Questions</h2>
                    </div>
                    <div className="faq-accordion">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.q}
                                answer={faq.a}
                                isOpen={openFaqIndex === index}
                                onClick={() => toggleFaq(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
