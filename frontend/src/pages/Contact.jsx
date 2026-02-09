import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, Briefcase, Headset, Target, ClipboardList } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <section className="contact-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="hero-content"
                    >
                        <h1>Get In Touch</h1>
                        <p>Let's discuss how we can help transform your business with our IT solutions</p>
                    </motion.div>
                </div>
            </section>

            <section className="section help-channels">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="help-title"
                    >
                        How Can We Help?
                    </motion.h2>

                    <div className="channels-grid">
                        {[
                            { icon: Briefcase, title: "Business Inquiry", email: "sales@kamglobalai.com", color: "brown" },
                            { icon: Headset, title: "Technical Support", email: "info@kamglobalai.com", color: "purple" },
                            { icon: Target, title: "Partnership", email: "sales@kamglobalai.com", color: "pink" },
                            { icon: ClipboardList, title: "Careers", email: "careers@kamglobalai.com", color: "orange" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="channel-card"
                            >
                                <div className={`channel-icon ${item.color}`}>
                                    <item.icon size={32} />
                                </div>
                                <h3>{item.title}</h3>
                                <a href={`mailto:${item.email}`} className="channel-email">{item.email}</a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section contact-main">
                <div className="container contact-grid">
                    {/* Form */}
                    <div className="contact-form-container">
                        <h2>Send Us a Message</h2>
                        <form className="contact-form">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input type="text" placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label>Email Address *</label>
                                <input type="email" placeholder="john@example.com" required />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" placeholder="+965 XXXX XXXX" />
                            </div>
                            <div className="form-group">
                                <label>Service Interested In *</label>
                                <div className="select-wrapper">
                                    <select required>
                                        <option value="">Select a service</option>
                                        <option value="bot">BOT Model</option>
                                        <option value="dev">IT Development</option>
                                        <option value="cloud">Cloud Services</option>
                                        <option value="staffing">IT Staffing</option>
                                    </select>
                                    <ChevronDown className="select-icon" size={18} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Message *</label>
                                <textarea placeholder="Tell us about your project or inquiry..." rows="5" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary w-full">
                                Send Message <Send size={18} style={{ marginLeft: '10px' }} />
                            </button>
                        </form>
                    </div>

                    {/* Info */}
                    <div className="contact-info-container">
                        <h2>Contact Information</h2>
                        <p className="contact-sub">Reach out to us through any of the following channels. Our team is ready to assist you.</p>

                        <div className="info-card">
                            <h3>Kam Groups (Kuwait HQ)</h3>
                            <div className="info-item">
                                <MapPin size={20} className="icon" />
                                <span>Floor 2&6, Al Barsha Complex, Tunis Street, Hawally, Kuwait.</span>
                            </div>
                            <div className="info-item">
                                <Phone size={20} className="icon" />
                                <span>+965 22087764</span>
                            </div>
                            <div className="info-item">
                                <Mail size={20} className="icon" />
                                <span>info@kamgroups.com</span>
                            </div>
                            <div className="info-item">
                                <Clock size={20} className="icon" />
                                <span>Sun-Thu: 9:00 AM - 6:00 PM</span>
                            </div>
                        </div>

                        <div className="info-card">
                            <h3>Kam Global (India)</h3>
                            <div className="info-item">
                                <MapPin size={20} className="icon" />
                                <span>No 544, 3rd cross, 3rd main, Above TMC Bank, RT Nagar, Bangalore-563125</span>
                            </div>
                            <div className="info-item">
                                <Phone size={20} className="icon" />
                                <span>+91</span>
                            </div>
                            <div className="info-item">
                                <Mail size={20} className="icon" />
                                <span>info@kamglobalai.com</span>
                            </div>
                            <div className="info-item">
                                <Clock size={20} className="icon" />
                                <span>Mon-Sat: 9:00 AM - 7:00 PM IST</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section our-locations">
                <div className="container text-center">
                    <h2>Our Locations</h2>
                    <div className="locations-grid">
                        <div className="location-box">
                            <MapPin size={40} className="loc-icon" />
                            <h3>Kuwait Office</h3>
                            <p>Kuwait City, Kuwait</p>
                            <a href="#" className="map-link">View on Google Maps</a>
                        </div>
                        <div className="location-box">
                            <MapPin size={40} className="loc-icon" />
                            <h3>India Office</h3>
                            <p>Bengaluru, Karnataka, India</p>
                            <a href="#" className="map-link">View on Google Maps</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section faq-section">
                <div className="container max-w-800">
                    <h2 className="text-center mb-4">Frequently Asked Questions</h2>
                    <div className="faq-list">
                        <details className="faq-item">
                            <summary>What is your typical response time? <ChevronDown className="faq-chevron" size={18} /></summary>
                            <div className="faq-content">
                                <p>We typically respond to all inquiries within 24 business hours. For urgent matters, please contact our support email directly.</p>
                            </div>
                        </details>
                        <details className="faq-item">
                            <summary>Do you offer free consultations? <ChevronDown className="faq-chevron" size={18} /></summary>
                            <div className="faq-content">
                                <p>Yes, we offer initial consultations for all our services to understand your requirements and provide a tailored proposal.</p>
                            </div>
                        </details>
                        <details className="faq-item">
                            <summary>Can I visit your offices? <ChevronDown className="faq-chevron" size={18} /></summary>
                            <div className="faq-content">
                                <p>Absolutely! We welcome clients to visit our HQ in Kuwait or our dev center in India. Please schedule an appointment in advance.</p>
                            </div>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
