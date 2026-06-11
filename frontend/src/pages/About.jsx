import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
    Target,
    Eye,
    Sparkles,
    ShieldCheck,
    CheckCircle2,
    Users,
    ArrowRight,
    BookOpen,
    Compass,
    Award,
    Globe2
} from 'lucide-react';
import CountUp from 'react-countup';
import FounderMessageSection from '../components/leadership/FounderMessageSection';
import ExecutiveBoardSection from '../components/leadership/ExecutiveBoardSection';
import GlobalBridgeSection from '../components/leadership/GlobalBridgeSection';
import TeamLifeSection from '../components/leadership/TeamLifeSection';
import '../components/leadership/leadership.css';
import './About.css';

const coreValues = [
    { icon: Sparkles, title: 'Innovation with Purpose', desc: 'AI, automation, and cloud solutions that deliver measurable business impact.' },
    { icon: ShieldCheck, title: 'Integrity & Transparency', desc: 'Open communication and accountability in every client engagement.' },
    { icon: CheckCircle2, title: 'Excellence in Execution', desc: 'Precision, reliability, and continuous improvement at scale.' },
    { icon: Users, title: 'Customer-Centric Mindset', desc: 'Solutions aligned to sustainable value and client objectives.' }
];

const heroStats = [
    { value: 10, suffix: '+', label: 'Years Legacy' },
    { value: 100, suffix: '%', label: 'Delivery Rate' },
    { value: 2, suffix: '', label: 'Global Hubs' }
];

const jumpLinks = [
    { href: '#story', label: 'Our Story', icon: BookOpen },
    { href: '#purpose', label: 'Vision', icon: Compass },
    { href: '#values', label: 'Values', icon: Award },
    { href: '#leadership', label: 'Leadership', icon: Users },
    { href: '#global', label: 'Global', icon: Globe2 }
];

const SectionEyebrow = ({ label, center = false, lines = true }) => (
    <div className={`about-eyebrow${center ? ' about-eyebrow-center' : ''}`}>
        {lines && <span className="about-eyebrow-line" aria-hidden="true" />}
        <span>{label}</span>
        {lines && <span className="about-eyebrow-line" aria-hidden="true" />}
    </div>
);

const About = () => {
    return (
        <div className="about-page">
            <Helmet>
                <title>About Us | KamGlobal AI - Kuwait-India Partnership</title>
                <meta
                    name="description"
                    content="Learn about KamGlobal AI — our story, vision, leadership, and Kuwait-India global delivery model backed by KAM Group."
                />
            </Helmet>

            <section className="about-hero">
                <div className="container">
                    <motion.div
                        className="about-hero-inner"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75 }}
                    >
                        <SectionEyebrow label="About KamGlobal AI" center lines={false} />
                        <h1>Bridging Vision &amp; Engineering Excellence</h1>
                        <p>
                            A premium technology partner connecting Kuwait&apos;s strategic leadership with
                            India&apos;s world-class engineering talent.
                        </p>

                        <div className="about-hero-stats">
                            {heroStats.map((stat) => (
                                <div key={stat.label} className="about-hero-stat">
                                    <span className="about-hero-stat-num">
                                        <CountUp end={stat.value} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
                                    </span>
                                    <span className="about-hero-stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>

                        <nav className="about-jump-nav" aria-label="About page sections">
                            {jumpLinks.map(({ href, label, icon: Icon }) => (
                                <a key={href} href={href} className="about-jump-link">
                                    <Icon size={15} aria-hidden="true" />
                                    {label}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                </div>
            </section>

            <section id="story" className="about-section about-story-section">
                <div className="container">
                    <div className="about-story-layout">
                        <motion.div
                            className="about-story-copy"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <SectionEyebrow label="Our Story" />
                            <h2>Architecting the <span>Future</span></h2>
                            <p className="about-story-lead">
                                Founded in 2026, KamGlobal AI is a premium IT solutions partner headquartered in India
                                and backed by KAM Group, Kuwait — built to connect strategic Gulf leadership with
                                India&apos;s world-class engineering talent.
                            </p>
                            <p>
                                We help enterprises design secure, scalable, and AI-ready digital foundations. From
                                cloud-native platforms to intelligent automation, our teams deliver with precision,
                                transparency, and a relentless focus on business outcomes.
                            </p>
                            <p>
                                Our Kuwait–India operating model brings together regional trust, global partnerships,
                                and round-the-clock execution — so clients get strategy and engineering in one
                                accountable partner.
                            </p>

                            <ul className="about-story-highlights">
                                <li>Backed by KAM Group, Kuwait</li>
                                <li>Delivery hub in Bengaluru, India</li>
                                <li>AI, cloud, and enterprise digital transformation</li>
                            </ul>
                        </motion.div>

                        <motion.figure
                            className="about-story-visual"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55 }}
                        >
                            <img
                                src="/images/about-story.png"
                                alt="KamGlobal AI team — Kuwait and India partnership"
                                loading="lazy"
                            />
                            <figcaption className="about-story-caption">
                                Strategy from Kuwait. Engineering from India.
                            </figcaption>
                        </motion.figure>
                    </div>
                </div>
            </section>

            <section id="purpose" className="about-section about-vision-section">
                <div className="container">
                    <div className="about-section-header">
                        <SectionEyebrow label="Purpose" center />
                        <h2>Vision &amp; Mission</h2>
                        <p>The direction behind every partnership, product, and delivery milestone.</p>
                    </div>

                    <div className="about-vision-grid">
                        <motion.article
                            className="about-vision-card about-vision-card-mission"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                        >
                            <span className="about-vision-icon"><Target size={22} /></span>
                            <span className="about-vision-tag">Mission</span>
                            <h3>Accelerating Business</h3>
                            <p>
                                Intelligent, secure, and scalable technology frameworks that help organizations
                                lead in the digital transformation era.
                            </p>
                        </motion.article>

                        <motion.article
                            className="about-vision-card about-vision-card-vision"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.07 }}
                        >
                            <span className="about-vision-icon"><Eye size={22} /></span>
                            <span className="about-vision-tag">Vision</span>
                            <h3>Globally Trusted</h3>
                            <p>
                                Enterprise benchmarks in innovation — anticipating change and engineering
                                future-ready solutions across markets.
                            </p>
                        </motion.article>
                    </div>
                </div>
            </section>

            <section id="values" className="about-section about-values-section">
                <div className="container">
                    <div className="about-section-header">
                        <SectionEyebrow label="Core Values" center />
                        <h2>Principles of Excellence</h2>
                        <p>Beliefs that guide how we lead, build, and deliver for clients worldwide.</p>
                    </div>

                    <div className="about-values-grid">
                        {coreValues.map(({ icon: Icon, title, desc }, idx) => (
                            <motion.div
                                key={title}
                                className="about-value-card"
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                            >
                                <span className="about-value-icon"><Icon size={22} strokeWidth={1.75} /></span>
                                <h3>{title}</h3>
                                <p>{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <div id="leadership" className="about-leadership-hub">
                <div className="container">
                    <div className="about-section-header about-section-header-light">
                        <SectionEyebrow label="Leadership" center />
                        <h2>Meet the People Behind KamGlobal AI</h2>
                        <p>Founder vision and executive leadership steering our Kuwait–India operations.</p>
                    </div>
                </div>

                <FounderMessageSection
                    id="about-founder-message"
                    primaryCta={{ to: '/contact', label: 'Book a Demo' }}
                    secondaryCta={{ to: '/careers', label: 'Join Our Team' }}
                />

                <ExecutiveBoardSection
                    id="about-executive-board"
                    subtitle="Executive leaders guiding strategy, operations, and growth."
                />
            </div>

            <div id="global">
                <GlobalBridgeSection id="about-global-bridge" showHighlights />
            </div>

            <TeamLifeSection id="about-team-life" />

            <section className="about-section about-cta-section">
                <div className="container">
                    <motion.div
                        className="about-cta-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2>Ready to transform your enterprise?</h2>
                        <p>Partner with KamGlobal AI for secure, scalable, and future-ready digital solutions.</p>
                        <div className="about-cta-actions">
                            <Link to="/contact" className="about-btn about-btn-primary">
                                Schedule a Consultation <ArrowRight size={16} />
                            </Link>
                            <Link to="/careers" className="about-btn about-btn-secondary">
                                Explore Careers
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
