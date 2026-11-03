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
        { title: 'AI Developer', team: 'Engineering', location: 'Bengaluru, India', id: '1', experience: '3+ Years', skills: ['Python', 'PyTorch', 'NLP'], serviceLine: 'it-technology' },
        { title: 'Digital Marketing', team: 'Strategy', location: 'Bengaluru, India', id: '2', experience: '2+ Years', skills: ['SEO', 'SEM', 'Social Media'], serviceLine: 'ai-media-creative' },
        { title: 'Full Stack Developer', team: 'Engineering', location: 'Bengaluru, India', experience: '5+ Years', id: '3', skills: ['React', 'Node.js', 'AWS'], serviceLine: 'it-technology' },
        { title: 'Technical Support', team: 'Support', location: 'Bengaluru, India', id: '4', experience: '1+ Year', skills: ['Troubleshooting', 'CRM', 'Communication'], serviceLine: 'business-outsourcing' },
    ]
    : [];

const toCareersJob = (job) => ({ ...job, team: job.department || job.category, skills: [] });

const jumpLinks = [
    { href: '#jobs', label: 'Open Roles' },
    { href: '#what-to-expect', label: 'What to Expect' },
    { href: '#benefits', label: 'Benefits' },
    { href: '#culture', label: 'Culture' },
    { href: '#talent', label: 'Apply' },
];

const serviceFilters = [
    { id: 'All', label: 'All services' },
    { id: 'it-technology', label: 'IT & Technology' },
    { id: 'ai-media-creative', label: 'AI Media & Creative' },
    { id: 'business-outsourcing', label: 'Outsourcing Solutions' },
    { id: 'hr-solutions', label: 'HR Solutions' },
    { id: 'edtech', label: 'EdTech' },
];

const serviceOf = (job) => {
    const line = String(job.serviceLine || '').toLowerCase();
    const known = {
        technology: 'it-technology',
        'it-technology': 'it-technology',
        operations: 'business-outsourcing',
        'business-outsourcing': 'business-outsourcing',
        hr: 'hr-solutions',
        'hr-solutions': 'hr-solutions',
        'ai-media-creative': 'ai-media-creative',
        edtech: 'edtech',
    };
    if (known[line]) return known[line];
    const blob = `${job.title || ''} ${job.team || ''} ${job.category || ''} ${job.department || ''}`.toLowerCase();
    const rules = [
        ['edtech', ['edtech', 'education', 'learnx', 'tutor', 'school']],
        ['ai-media-creative', ['media', 'creative', 'video', 'design', 'content', 'marketing']],
        ['hr-solutions', ['recruit', 'staffing', 'payroll', 'workforce']],
        ['business-outsourcing', ['outsourc', 'bpo', 'customer', 'support', 'operations', 'virtual']],
        ['it-technology', ['software', 'developer', 'engineer', 'cloud', 'devops', 'data']],
    ];
    const hit = rules.find(([, words]) => words.some((word) => blob.includes(word)));
    return hit ? hit[0] : '';
};

const serviceLabel = (job) => serviceFilters.find((item) => item.id === serviceOf(job))?.label || job.team;

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
    const [activeService, setActiveService] = useState('All');

    const { status, jobs: apiJobs } = useJobs('', fallbackJobs);
    const jobs = useMemo(() => (status === 'ready' ? apiJobs.map(toCareersJob) : apiJobs), [status, apiJobs]);

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const haystack = `${job.title} ${job.team || ''} ${job.location || ''}`.toLowerCase();
            const matchesSearch = haystack.includes(searchTerm.toLowerCase());
            const matchesService = activeService === 'All' || serviceOf(job) === activeService;
            return matchesSearch && matchesService;
        });
    }, [jobs, searchTerm, activeService]);

    const handleApply = (job) => {
        if (job.applyTo) navigate(job.applyTo);
        else navigate('/apply-now', { state: { job } });
    };

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
                <div className="container car-hero-layout">
                    <motion.div
                        className="car-hero-copy"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Eyebrow lines={false}>Careers</Eyebrow>
                        <h1>Build Meaningful Work with KAM Global AI</h1>
                        <p>
                            Explore opportunities across technology, digital delivery, and business support. We are
                            interested in people who enjoy solving practical problems, collaborating across teams,
                            and delivering work with clear expectations.
                        </p>
                        <div className="car-hero-actions">
                            <a href="#jobs" className="car-btn car-btn-primary">
                                See open roles <ArrowRight size={16} aria-hidden="true" />
                            </a>
                            <Link to="/apply-now" className="car-btn car-btn-ghost">
                                General application
                            </Link>
                        </div>
                    </motion.div>
                    <motion.aside
                        className="car-hero-panel"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.08 }}
                    >
                        <p className="car-hero-count">
                            <strong>{status === 'loading' ? '–' : jobs.length}</strong>
                            <span>{jobs.length === 1 ? 'Open role' : 'Open roles'}</span>
                        </p>
                        <ul>
                            <li><MapPin size={16} aria-hidden="true" /> Bengaluru and Kuwait</li>
                            <li><Laptop size={16} aria-hidden="true" /> Hybrid and remote-friendly options</li>
                            <li><Mail size={16} aria-hidden="true" /> No matching role? Send a general application</li>
                        </ul>
                    </motion.aside>
                </div>
                <div className="container">
                    <nav className="car-jump-nav" aria-label="Page sections">
                        {jumpLinks.map((link) => (
                            <a key={link.href} href={link.href} className="car-jump-link">
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </section>

            <section id="jobs" className="car-jobs">
                <div className="container">
                    <div className="car-section-header car-section-header--left">
                        <Eyebrow>Open Positions</Eyebrow>
                        <h2>Current Opportunities</h2>
                        <p>Every open role is listed here, under the service it belongs to. Service pages do not repeat these openings.</p>
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
                        <div className="car-filters" role="group" aria-label="Filter by service">
                            {serviceFilters.map((service) => (
                                <button
                                    key={service.id}
                                    type="button"
                                    className={`car-filter-btn${activeService === service.id ? ' car-filter-btn--active' : ''}`}
                                    onClick={() => setActiveService(service.id)}
                                >
                                    {service.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {jobs.length > 0 && (
                        <p className="car-results-count">
                            {filteredJobs.length} {filteredJobs.length === 1 ? 'position' : 'positions'} found
                        </p>
                    )}

                    <AnimatePresence mode="popLayout">
                        {filteredJobs.length === 0 ? (
                            <motion.div
                                key="empty"
                                className="car-jobs-empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {status === 'loading' ? (
                                    <p>Loading open positions…</p>
                                ) : jobs.length === 0 ? (
                                    <>
                                        <Briefcase size={22} aria-hidden="true" />
                                        <h3>No open positions right now</h3>
                                        <p>Openings are published on this page only. Send a general application and we will contact you when a matching role opens.</p>
                                        <Link to="/apply-now" className="car-btn car-btn-primary">
                                            General application <ArrowRight size={16} aria-hidden="true" />
                                        </Link>
                                    </>
                                ) : (
                                    <p>No open roles in this service right now. Try another service, or send a general application.</p>
                                )}
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
                                            <span><Briefcase size={14} /> {serviceLabel(job)}</span>
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

            <section id="what-to-expect" className="car-process">
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
                    <ol className="car-path">
                        {expectSteps.map((item, i) => (
                            <li key={item.title}>
                                <span>{String(i + 1).padStart(2, '0')}</span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </li>
                        ))}
                    </ol>
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

            <section id="talent" className="car-cta">
                <div className="container">
                    <motion.div
                        className="car-cta-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <h2>Don&apos;t see the right role?</h2>
                        <p>Send a general application and we will contact you when a matching role opens.</p>
                        <div className="car-cta-actions">
                            <Link to="/apply-now" className="car-btn car-btn-primary">
                                General application <ArrowRight size={16} aria-hidden="true" />
                            </Link>
                            <a href="mailto:careers@kamglobalai.com" className="car-btn car-btn-secondary">
                                <Mail size={16} aria-hidden="true" /> careers@kamglobalai.com
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Careers;
