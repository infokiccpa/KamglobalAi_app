import { Linkedin, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import './Team.css';

const ExecCard = ({ name, role, country, bio, image, tags, delay }) => (
    <motion.div
        className="exec-glass-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
    >
        <div className="exec-image-container">
            <img src={image} alt={name} loading="lazy" />
            <div className="exec-country-badge">
                <MapPin size={12} /> {country}
            </div>
        </div>
        <div className="exec-details">
            <div className="exec-header">
                <div>
                    <h3>{name}</h3>
                    <p className="exec-role">{role}</p>
                </div>
                <div className="exec-socials">
                    <motion.a whileHover={{ y: -2 }} href="#"><Linkedin size={18} /></motion.a>
                    <motion.a whileHover={{ y: -2 }} href="#"><Mail size={18} /></motion.a>
                </div>
            </div>
            <p className="exec-bio">{bio}</p>
            <div className="exec-tags">
                {tags.map(tag => <span key={tag} className="exec-tag">{tag}</span>)}
            </div>
        </div>
    </motion.div>
);

const HeadCard = ({ name, role, country, image, delay }) => (
    <motion.div
        className="head-glass-card"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        <div className="head-image">
            <img src={image} alt={name} loading="lazy" />
        </div>
        <div className="head-content">
            <div className="head-info">
                <h4>{name}</h4>
                <p className="head-role">{role}</p>
                <p className="head-country">{country}</p>
            </div>
            <div className="head-socials">
                <Linkedin size={16} className="social-icon" />
            </div>
        </div>
    </motion.div>
);

const Team = () => {
    const executives = [
        {
            name: 'Dr. Abdul Wahab Al Atwan',
            role: 'President & C.E.O',
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
            <section className="team-hero-glass">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="hero-content"
                    >
                        <span className="hero-badge">Global Leadership</span>
                        <h1>Our Leadership Team</h1>
                        <p>Bridging innovation and excellence between Kuwait and India, driven by a shared vision of digital transformation.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section executives-section">
                <div className="container">
                    <div className="section-header-left">
                        <h2>Executive Board</h2>
                        <p>The strategic minds guiding KamGlobal AI towards a future-ready enterprise landscape.</p>
                    </div>
                    <div className="exec-grid">
                        {executives.map((exec, idx) => (
                            <ExecCard key={idx} {...exec} delay={idx * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section heads-section">
                <div className="container">
                    <div className="section-header-center">
                        <h2>Departmental Excellence</h2>
                        <p>Specialized leaders driving growth and innovation across our global delivery centers.</p>
                    </div>
                    <div className="heads-grid">
                        {heads.map((head, idx) => (
                            <HeadCard key={idx} {...head} delay={idx * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="stats-banner-glass">
                <div className="container">
                    <div className="stats-grid">
                        {[
                            { val: "200+", label: "Experts" },
                            { val: "15+", label: "Countries" },
                            { val: "50+", label: "Industries" },
                            { val: "99%", label: "Satisfaction" }
                        ].map((stat, i) => (
                            <div key={i} className="stat-item">
                                <span className="stat-value">{stat.val}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section join-cta-glass">
                <div className="container text-center">
                    <div className="join-card glass">
                        <h2>Join the Innovation Hub</h2>
                        <p>We're always looking for bold thinkers and technical masters to join our growing global team.</p>
                        <button className="btn-primary-lux" onClick={() => window.location.href = '/careers'}>
                            Explore Careers
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Team;
