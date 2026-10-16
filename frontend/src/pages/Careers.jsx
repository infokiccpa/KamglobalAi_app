import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';  
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
import { useJobs } from '../lib/useJobs';
import { formatDeadline } from '../lib/deadline';
import './Careers.css';

const benefits = [
    { icon: DollarSign, title: 'Global Compensation', desc: 'Competitive packages aligned with international standards.' },
    { icon: Shield, title: 'Wellness Support', desc: 'Health and wellness benefits for you and your dependents.' },
    { icon: Clock, title: 'Flexible Work', desc: 'Hybrid and remote-friendly options across time zones.' },
    { icon: BookOpen, title: 'Learning & Growth', desc: 'Access to certifications, training, and mentorship.' },
    { icon: Laptop, title: 'Modern Workspace', desc: 'State-of-the-art labs in Bengaluru and Kuwait.' },
    { icon: Award, title: 'KAM Group Legacy', desc: 'Join a team backed by KAM Group, Kuwait.' },
];

// Sample roles are for local development only; production shows the empty state if the jobs API is unreachable.
const fallbackJobs = import.meta.env.DEV
    ? [
        { title: 'AI Developer', team: 'Engineering', location: 'Bengaluru, India', id: '1', experience: '3+ Years', skills: ['Python', 'PyTorch', 'NLP'] },
        { title: 'Digital Marketing', team: 'Strategy', location: 'Bengaluru, India', id: '2', experience: '2+ Years', skills: ['SEO', 'SEM', 'Social Media'] },
        { title: 'Full Stack Developer', team: 'Engineering', location: 'Bengaluru, India', experience: '5+ Years', id: '3', skills: ['React', 'Node.js', 'AWS'] },
        { title: 'Technical Support', team: 'Support', location: 'Bengaluru, India', id: '4', experience: '1+ Year', skills: ['Troubleshooting', 'CRM', 'Communication'] },
    ]
    : [];

const toCareersJob = (job) => ({ ...job, team: job.department || job.category, skills: [] });

const jumpLinks = [
    { href: '#teams', label: 'Teams' },
    { href: '#what-to-expect', label: 'What to Expect' },
    { href: '#benefits', label: 'Benefits' },
    { href: '#culture', label: 'Culture' },
    { href: '#jobs', label: 'Open Roles' },
    { href: '#talent', label: 'Talent Network' },
];

const teamAreas = [
    { title: 'Software Engineering', desc: 'Build products, platforms, and client delivery work.' },
    { title: 'AI & Data', desc: 'Practical AI, analytics, and automation use cases.' },
    { title: 'Cloud & DevOps', desc: 'Environments, releases, and reliability support.' },
    { title: 'Customer Experience', desc: 'Service quality, support workflows, and operations.' },
    { title: 'Sales & Recruitment Support', desc: 'Pipeline, coordination, and hiring workflows.' },
    { title: 'Marketing & Operations', desc: 'Campaigns, content, and day-to-day coordination.' },
];

const expectSteps = [
    { title: 'Apply', desc: 'Share your profile for an open role or the talent network.' },
    { title: 'Screening', desc: 'We review fit against the published role requirements.' },
    { title: 'Interviews', desc: 'Conversations with hiring managers and relevant team members.' },
    { title: 'Assessment', desc: 'Role-appropriate exercises when the process requires them.' },
    { title: 'Decision & communication', desc: 'We share the outcome through our recruitment channel.' },
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

    const { status, jobs: apiJobs } = useJobs('careers', fallbackJobs);
    const jobs = useMemo(() => (status === 'ready' ? apiJobs.map(toCareersJob) : apiJobs), [status, apiJobs]);
    const categories = useMemo(() => ['All', ...new Set(jobs.map((j) => j.team).filter(Boolean))], [jobs]);

    const handleApply = (job) => {
        if (job.applyTo) navigate(job.applyTo);
        else navigate('/apply-now', { state: { job } });
    };

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || job.team === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [jobs, searchTerm, activeCategory]);

    return (
        <div className="careers-page">
            <Helmet>
                <title>Careers at KAM Global AI</title>
                <meta
                    name="description"
                    content="Explore opportunities to contribute to technology, digital delivery, and business operations at KAM Global AI."
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
                        <h1>Build Meaningful Work with KAM Global AI</h1>
                        <p>
                            Explore opportunities across technology, digital delivery, and business support. We are
                            interested in people who enjoy solving practical problems, collaborating across teams,
                            and delivering work with clear expectations.
                        </p>

                        <div className="car-hero-stats">
                            <div className="car-stat">
                                <strong>{status === 'loading' ? '–' : jobs.length}</strong>
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

            <section id="teams" className="car-benefits">
                <div className="container">
                    <div className="car-section-header">
                        <Eyebrow center>Teams</Eyebrow>
                        <h2>Different Skills. Shared Commitment to Delivery.</h2>
                        <p>
                            Depending on approved openings, opportunities may span software engineering, AI and data,
                            cloud and DevOps, QA, customer experience, sales support, recruitment, operations, and
                            marketing.
                        </p>
                    </div>
                    <div className="car-benefits-grid">
                        {teamAreas.map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="car-benefit-card"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
                        <a href="#jobs" className="car-btn car-btn-primary">
                            Explore Opportunities <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </section>

            <section id="what-to-expect" className="car-benefits">
                <div className="container">
                    <div className="car-section-header">
                        <Eyebrow center>What to Expect</Eyebrow>
                        <h2>A Clear and Respectful Recruitment Process</h2>
                        <p>
                            Our process typically includes application, screening, interviews, and — where needed —
                            a role-appropriate assessment. Timelines vary by role; we communicate through the approved
                            recruitment channel.
                        </p>
                    </div>
                    <div className="car-benefits-grid">
                        {expectSteps.map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="car-benefit-card"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <span className="car-benefit-icon" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
                        <a href="#jobs" className="car-btn car-btn-primary">
                            How to Apply <ArrowRight size={16} />
                        </a>
                    </div>
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
                                <span><Laptop size={14} /> Modern tech stack</span>
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
                                src="/images/car-culture-team.webp"
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
                                <p>
                                    {status === 'loading'
                                        ? 'Loading open positions…'
                                        : jobs.length === 0
                                            ? 'There are no open positions right now. Send a general application and we will contact you when a matching role opens.'
                                            : 'No positions match your search. Try a different keyword or category.'}
                                </p>
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
                                            {job.closesAt && (
                                                <span><Clock size={14} /> Applications close {formatDeadline(job.closesAt)}</span>
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
