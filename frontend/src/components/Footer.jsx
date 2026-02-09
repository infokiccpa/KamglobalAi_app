import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, Brain } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <div className="logo-content">
                                <div className="logo-text-group">
                                    <span className="logo-kam">KAM</span>
                                    <span className="logo-global">Global AI</span>
                                </div>
                            </div>
                        </Link>
                        <p className="footer-desc">
                            Connecting Kuwait's business vision with India's technical excellence through AI-powered digital transformation.
                        </p>
                        <div className="social-links">
                            <a href="#"><Facebook size={20} /></a>
                            <a href="#"><Twitter size={20} /></a>
                            <a href="#"><Linkedin size={20} /></a>
                            <a href="#"><Instagram size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/team">Our Team</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/kamglobal-ai">KamGlobalAI</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h3>Services</h3>
                        <ul>
                            <li><Link to="/services#bot-model">BOT Model</Link></li>
                            <li><Link to="/services#it-dev">IT Development</Link></li>
                            <li><Link to="/services#cloud">Cloud Services</Link></li>
                            <li><Link to="/services#staffing">IT Staffing</Link></li>
                            <li><Link to="/services#marketing">Digital Marketing</Link></li>
                            <li><Link to="/services#consulting">Consulting</Link></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h3>Contact Us</h3>

                        <div className="contact-item">
                            <MapPin size={20} className="icon" />
                            <div>
                                <strong>Kam Groups (Kuwait):</strong>
                                <p style={{ fontSize: '0.85rem' }}>Floor 2&6, Al Barsha Complex,<br />Tunis Street, Hawally, Kuwait.</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <Phone size={18} className="icon" />
                            <p>+965 22087764</p>
                        </div>
                        <div className="contact-item" style={{ marginBottom: '1.5rem' }}>
                            <Mail size={18} className="icon" />
                            <p>info@kamgroups.com</p>
                        </div>

                        <div className="contact-item">
                            <MapPin size={20} className="icon" />
                            <div>
                                <strong>Kam Global (India):</strong>
                                <p style={{ fontSize: '0.85rem' }}>No 544, 3rd cross, 3rd main,<br />Above TMC Bank, RT Nagar,<br />Bangalore-563125</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <Phone size={18} className="icon" />
                            <p>+91</p>
                        </div>
                        <div className="newsletter">
                            <h4>Newsletter</h4>
                            <div className="newsletter-form">
                                <input type="email" placeholder="Your email" />
                                <button className="btn btn-primary">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 KAM Global AI. All rights reserved.</p>
                    <div className="footer-legal">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/support">Support</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
