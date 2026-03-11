import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageSquare, LifeBuoy } from 'lucide-react';
import './Legal.css';

const Support = () => {
    return (
        <div className="legal-container">
            <header className="legal-header">
                <h1>Help & Support</h1>
                <p>We're here to help you navigate your AI journey.</p>
            </header>

            <div className="legal-content">
                <div className="support-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '30px',
                    marginBottom: '60px'
                }}>
                    <div className="support-card" style={{
                        padding: '30px',
                        background: '#f8fafc',
                        border: '1px solid #edf2f7',
                        borderRadius: '20px',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#f7941d', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                            <Mail size={40} />
                        </div>
                        <h3 style={{ color: '#0c213d', marginBottom: '10px' }}>Email Support</h3>
                        <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>Response within 24 hours</p>
                        <a href="mailto:info@kamglobalai.com" style={{ color: '#f7941d', fontWeight: '600', textDecoration: 'none' }}>info@kamglobalai.com</a>
                    </div>

                    <div className="support-card" style={{
                        padding: '30px',
                        background: '#f8fafc',
                        border: '1px solid #edf2f7',
                        borderRadius: '20px',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#f7941d', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                            <Phone size={40} />
                        </div>
                        <h3 style={{ color: '#0c213d', marginBottom: '10px' }}>Phone Support</h3>
                        <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>Mon-Fri, 9am - 6pm</p>
                        <a href="tel:+918050766363" style={{ color: '#f7941d', fontWeight: '600', textDecoration: 'none' }}>+91 80507 66363</a>
                    </div>

                    <div className="support-card" style={{
                        padding: '30px',
                        background: '#f8fafc',
                        border: '1px solid #edf2f7',
                        borderRadius: '20px',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#f7941d', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                            <MessageSquare size={40} />
                        </div>
                        <h3 style={{ color: '#0c213d', marginBottom: '10px' }}>Quick Inquiry</h3>
                        <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>Get in touch via our form</p>
                        <Link to="/contact" style={{ color: '#f7941d', fontWeight: '600', textDecoration: 'none' }}>Contact Us</Link>
                    </div>
                </div>

                <div className="legal-section">
                    <h2>Global Offices</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                        <div>
                            <strong>Kam Global (India)</strong>
                            <p>No 544, 3rd cross, 3rd main,<br />RT Nagar, Bangalore-560032</p>
                        </div>
                        <div>
                            <strong>Kam Groups (Kuwait)</strong>
                            <p>20408 Tunisia St, Hawally, Kuwait.</p>
                        </div>
                    </div>
                </div>

                <div className="legal-section">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-item" style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: '#0c213d', marginBottom: '10px' }}>How can I request a demo of your AI solutions?</h4>
                        <p>You can contact us via our website form or send an email to info@kamglobalai.com with the subject "Demo Request".</p>
                    </div>
                    <div className="faq-item" style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: '#0c213d', marginBottom: '10px' }}>Do you provide support for the BOT model?</h4>
                        <p>Yes, we provide full support and consultation for our Build-Operate-Transfer models across both India and Kuwait.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
