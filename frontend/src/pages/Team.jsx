import React from 'react';
import { Linkedin, Mail, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import './Team.css';

const Team = () => {
    const executives = [
        {
            name: 'Ahmed Al Rashid',
            role: 'CEO & Founder',
            country: 'Kuwait',
            bio: 'Visionary leader with 15+ years in tech development. Led multiple successful IT implementations across the Middle East.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
            tags: ['Strategic Planning', 'Business Development', 'BOT Model']
        },
        {
            name: 'Priya Sharma',
            role: 'CTO',
            country: 'India',
            bio: 'Technology enthusiast with a passion for architecture and AI/ML. Spearheading our R&D development in India.',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
            tags: ['Software Architecture', 'AI/ML', 'Cloud Infrastructure']
        },
        {
            name: 'Mohammed Al-Sabah',
            role: 'COO',
            country: 'Kuwait',
            bio: 'Operations expert managing and optimizing across Kuwait-India operations. Former consultant at Big 4 firm.',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
            tags: ['Operations Management', 'Process Optimization', 'Quality Assurance']
        },
        {
            name: 'Rajesh Kumar',
            role: 'VP of Engineering',
            country: 'India',
            bio: 'Engineering leader managing 100+ developers. Expert in agile methodologies and software delivery scale.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
            tags: ['Team Leadership', 'Agile Development', 'System Design']
        }
    ];

    const heads = [
        { name: 'Sarah Johnson', role: 'Head of IT Development', country: 'Kuwait', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300' },
        { name: 'Anil Verma', role: 'Head of Cloud Services', country: 'India', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300' },
        { name: 'Fatima Al-Najjar', role: 'Head of Tech Marketing', country: 'Kuwait', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300' },
        { name: 'Vikram Patel', role: 'Head of IT Staffing', country: 'India', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300' },
        { name: 'Layla Hassan', role: 'Head of Consulting', country: 'Kuwait', image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&q=80&w=300' },
        { name: 'Amit Singh', role: 'Head of Product (LMS)', country: 'India', image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=300' }
    ];

    return (
        <div className="team-page">
            <section className="team-hero">
                <div className="container">
                    <h1>Our Leadership Team</h1>
                    <p>Experienced professionals driving innovation across Kuwait and India</p>
                </div>
            </section>

            <section className="section executive-section">
                <div className="container text-center">
                    <h2>Executive Leadership</h2>
                    <p className="section-subtitle">Guiding our vision and strategic direction</p>
                    <div className="exec-grid">
                        {executives.map((exec, idx) => (
                            <div key={idx} className="exec-card glass">
                                <div className="exec-image">
                                    <img src={exec.image} alt={exec.name} />
                                </div>
                                <div className="exec-info">
                                    <div className="exec-meta">
                                        <h3>{exec.name}</h3>
                                        <div className="social-icons">
                                            <Linkedin size={16} />
                                            <Mail size={16} />
                                        </div>
                                    </div>
                                    <p className="role">{exec.role}</p>
                                    <p className="country">{exec.country}</p>
                                    <p className="bio">{exec.bio}</p>
                                    <div className="tags">
                                        {exec.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section heads-section">
                <div className="container text-center">
                    <h2>Department Heads</h2>
                    <p className="section-subtitle">Leading experts in their respective domains</p>
                    <div className="heads-grid">
                        {heads.map((head, idx) => (
                            <div key={idx} className="head-card">
                                <div className="head-image">
                                    <img src={head.image} alt={head.name} />
                                </div>
                                <div className="head-info">
                                    <h3>{head.name}</h3>
                                    <p className="role">{head.role}</p>
                                    <p className="country">{head.country}</p>
                                    <div className="head-icons">
                                        <Linkedin size={14} />
                                        <Twitter size={14} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="stats-banner">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-number">200+</span>
                            <span className="stat-label">Team Members</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">15+</span>
                            <span className="stat-label">Countries Represented</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Certifications</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">98%</span>
                            <span className="stat-label">Employee Satisfaction</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section join-us">
                <div className="container text-center">
                    <h2>Join Our Team</h2>
                    <p>We're always looking for talented individuals to join our growing team.</p>
                    <button className="btn btn-primary mt-2">View Open Positions</button>
                </div>
            </section>
        </div>
    );
};

export default Team;
