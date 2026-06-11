import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useNavigate, Link } from 'react-router-dom';
import {
    DollarSign,
    Shield,
    BookOpen,
    Clock,
    ArrowRight,
    Laptop,
    Award,
    Search,
    Mail,
    Briefcase,
    MapPin,
    CheckCircle,
    Users,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './Careers.css';

const benefits = [
    { icon: DollarSign, title: 'Global Compensation', desc: 'Competitive packages aligned with international standards.' },
    { icon: Shield, title: 'Wellness Support', desc: 'Health and wellness benefits for you and your dependents.' },
    { icon: Clock, title: 'Flexible Work', desc: 'Hybrid and remote-friendly options across time zones.' },
    { icon: BookOpen, title: 'Learning & Growth', desc: 'Access to certifications, training, and mentorship.' },
    { icon: Laptop, title: 'Modern Workspace', desc: 'State-of-the-art labs in Bengaluru and Kuwait.' },
    { icon: Award, title: 'KAM Group Legacy', desc: 'Join a team backed by KAM Group, Kuwait.' },
];

const jobs = [
    { title: 'AI Developer', team: 'Engineering', location: 'Bengaluru, India', id: '1', experience: '3+ Years', skills: ['Python', 'PyTorch', 'NLP'] },
    { title: 'Digital Marketing', team: 'Strategy', location: 'Bengaluru, India', id: '2', experience: '2+ Years', skills: ['SEO', 'SEM', 'Social Media'] },
    { title: 'Full Stack Developer', team: 'Engineering', location: 'Bengaluru, India', experience: '5+ Years', id: '3', skills: ['React', 'Node.js', 'AWS'] },
    { title: 'Technical Support', team: 'Support', location: 'Bengaluru, India', id: '4', experience: '1+ Year', skills: ['Troubleshooting', 'CRM', 'Communication'] },
];

const categories = ['All', 'Engineering', 'Strategy', 'Support'];

const jumpLinks = [
    { href: '#benefits', label: 'Benefits' },
    { href: '#culture', label: 'Culture' },
    { href: '#jobs', label: 'Open Roles' },
    { href: '#talent', label: 'Talent Network' },
];

const Eyebrow = ({ children, center, lines = true }) => (
    <div className={`car-eyebrow${center ? ' car-eyebrow-center' : ''}`}>
        {lines && <span className="car-eyebrow-line" aria-hidden="true" />}
        <span>{children}</span>
        {lines && <span className="car-eyebrow-line" aria-hidden="true" />}
    </div>
);

const Careers = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleApply = (job) => {
        navigate('/apply-now', { state: { job } });
    };

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || job.team === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    return (
        <div className="careers-page">
            <Helmet>
                <title>Careers at KamGlobal AI | Join Our Global Team</title>
                <meta
                    name="description"
                    content="Explore careers in AI development, digital marketing, and engineering. Join a global team bridging Kuwait and India."
                />
            </Helmet>

            <section className="car-hero">
                <div className="container">
                    <motion.div
                        className="car-hero-inner"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Eyebrow center lines={false}>Careers</Eyebrow>
                        <h1>Build the Future of AI With Us</h1>
                        <p>
                            Join KamGlobal AI — where Kuwait&apos;s strategic vision meets India&apos;s
                            engineering excellence. Work on meaningful AI and digital transformation projects.
                        </p>

                        <div className="car-hero-stats">
                            <div className="car-stat">
                                <strong>{jobs.length}</strong>
                                <span>Open Roles</span>
                            </div>
                            <div className="car-stat">
                                <strong>2</strong>
                                <span>Global Hubs</span>
                            </div>
                            <div className="car-stat">
                                <strong>Hybrid</strong>
                                <span>Work Model</span>
                            </div>
                        </div>

                        <nav className="car-jump-nav" aria-label="Page sections">
                            {jumpLinks.map((link) => (
                                <a key={link.href} href={link.href} className="car-jump-link">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                </div>
            </section>

            <section id="benefits" className="car-benefits">
                <div className="container">
                    <div className="car-section-header">
                        <Eyebrow center>Why Join Us</Eyebrow>
                        <h2>Benefits &amp; Perks</h2>
                        <p>We invest in our people with competitive rewards and a culture of continuous growth.</p>
                    </div>

                    <div className="car-benefits-grid">
                        {benefits.map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="car-benefit-card"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <span className="car-benefit-icon" aria-hidden="true">
                                    <item.icon size={20} strokeWidth={1.75} />
                                </span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="culture" className="car-culture">
                <div className="container">
                    <div className="car-culture-grid">
                        <motion.div
                            className="car-culture-content"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                        >
                            <Eyebrow>Our Culture</Eyebrow>
                            <h2>Where Innovation Meets Impact</h2>
                            <p className="car-lead">
                                We blend breakthrough research with real-world delivery — from AI assistants
                                and enterprise platforms to the intelligent systems that power modern businesses.
                            </p>
                            <p>
                                Our teams work across customer-facing products and internal operations,
                                building at every layer of the AI stack. If you thrive in a collaborative,
                                fast-moving environment with global reach, you&apos;ll fit right in.
                            </p>
                            <div className="car-culture-tags">
                                <span><Users size={14} /> Collaborative teams</span>
                                <span><Laptop size={14} /> Cutting-edge tech</span>
                                <span><Award size={14} /> KAM Group backed</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="car-culture-visual"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.08 }}
                        >
                            <img
                                src="/images/car-culture-team.png"
                                alt="KamGlobal AI team collaborating on AI and enterprise technology"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="jobs" className="car-jobs">
                <div className="container">
                    <div className="car-section-header">
                        <Eyebrow center>Open Positions</Eyebrow>
                        <h2>Current Opportunities</h2>
                        <p>Find your next role and apply directly through our application portal.</p>
                    </div>

                    <div className="car-jobs-toolbar">
                        <div className="car-search">
                            <Search size={18} aria-hidden="true" />
                            <input
                                type="text"
                                placeholder="Search by job title or keyword..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                aria-label="Search jobs"
                            />
                        </div>
                        <div className="car-filters" role="group" aria-label="Filter by category">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    className={`car-filter-btn${activeCategory === cat ? ' car-filter-btn--active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="car-results-count">
                        {filteredJobs.length} {filteredJobs.length === 1 ? 'position' : 'positions'} found
                    </p>

                    <AnimatePresence mode="popLayout">
                        {filteredJobs.length === 0 ? (
                            <motion.div
                                key="empty"
                                className="car-jobs-empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <p>No positions match your search. Try a different keyword or category.</p>
                            </motion.div>
                        ) : (
                            filteredJobs.map((job) => (
                                <motion.article
                                    layout
                                    key={job.id}
                                    className="car-job-card"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <div className="car-job-main">
                                        <button
                                            type="button"
                                            className="car-job-title"
                                            onClick={() => handleApply(job)}
                                        >
                                            {job.title}
                                        </button>
                                        <div className="car-job-meta">
                                            <span><Briefcase size={14} /> {job.team}</span>
                                            <span><MapPin size={14} /> {job.location}</span>
                                            {job.experience && (
                                                <span className="car-job-exp">{job.experience}</span>
                                            )}
                                        </div>
                                        <div className="car-skill-tags">
                                            {job.skills?.map((skill) => (
                                                <span key={skill} className="car-skill-tag">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="car-btn car-btn-outline"
                                        onClick={() => handleApply(job)}
                                    >
                                        Apply <ArrowRight size={15} />
                                    </button>
                                </motion.article>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <section id="talent" className="car-talent">
                <div className="container">
                    <motion.div
                        className="car-talent-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <Eyebrow center>Talent Network</Eyebrow>
                        <h2>Stay Connected</h2>
                        <p>
                            Join our talent network to hear about new roles, AI news, and career
                            opportunities at KamGlobal AI.
                        </p>
                        <button
                            type="button"
                            className={`car-btn car-btn-primary${isSubscribed ? ' car-btn-success' : ''}`}
                            onClick={() => setIsSubscribed(true)}
                            disabled={isSubscribed}
                        >
                            {isSubscribed ? (
                                <><CheckCircle size={16} /> Subscribed</>
                            ) : (
                                <><Mail size={16} /> Join Talent Network</>
                            )}
                        </button>
                        <p className="car-talent-note">
                            You can unsubscribe at any time. See our{' '}
                            <Link to="/privacy">Privacy Policy</Link> for details.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="car-cta">
                <div className="container">
                    <motion.div
                        className="car-cta-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <h2>Don&apos;t see the right role?</h2>
                        <p>Send us your resume — we&apos;re always looking for exceptional talent.</p>
                        <div className="car-cta-actions">
                            <Link to="/apply-now" className="car-btn car-btn-primary">
                                General Application <ArrowRight size={16} />
                            </Link>
                            <a href="mailto:careers@kamglobalai.com" className="car-btn car-btn-secondary">
                                <Mail size={16} /> careers@kamglobalai.com
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Careers;
