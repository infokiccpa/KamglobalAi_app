import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CountUp from 'react-countup';
import {
    ArrowRight,
    Globe,
    Laptop,
    Cloud,
    Users,
    TrendingUp,
    Wrench,
    Handshake,
    Shield,
    MapPin,
    GraduationCap,
    BookOpen,
    Brain,
    CheckCircle2,
    Building2,
    Layers,
} from 'lucide-react';
import './Home.css';

const highlights = [
    'BOT & Offshore Delivery',
    'Enterprise IT Solutions',
    'LearnX School Platform',
    'EduAiTutors Coaching',
    'Cloud & DevOps',
    'Kuwait · India Delivery',
];

const products = [
    {
        badge: 'Flagship',
        badgeClass: 'hm-badge--flagship',
        title: 'LearnX',
        desc: 'Modular school ERP + LMS + AI Academic Studio for CBSE, ICSE, and State Boards.',
        to: '/products/learnx',
        cta: 'Explore LearnX',
        icon: GraduationCap,
        image: '/images/learnx-hero.png',
    },
    {
        badge: 'Live',
        badgeClass: 'hm-badge--live',
        title: 'EduAiTutors',
        desc: 'Live NEET & JEE coaching with AI mocks, mentorship, and GCC-friendly batches.',
        to: '/products#eduaitutors',
        cta: 'Explore EduAiTutors',
        icon: BookOpen,
        image: '/images/hm-eduaitutors.png',
    },
    {
        badge: 'Live',
        badgeClass: 'hm-badge--live',
        title: 'AI-Powered LMS',
        desc: 'Adaptive learning platform for Pre-KG to Grade 12 — personalized mastery at scale.',
        to: '/products#ai-lms',
        cta: 'Explore AI LMS',
        icon: Brain,
        image: '/images/hm-ai-lms.png',
    },
];

const services = [
    { icon: Globe, title: 'BOT Model', desc: 'Build, operate, and transfer dedicated offshore teams.', to: '/services#bot-model' },
    { icon: Laptop, title: 'Custom Development', desc: 'Enterprise platforms built for your workflows.', to: '/services#it-dev' },
    { icon: Cloud, title: 'Cloud & DevOps', desc: 'Migration, CI/CD, and cloud-native operations.', to: '/services#cloud' },
    { icon: Users, title: 'IT Staffing', desc: 'Vetted engineers ready for agile delivery.', to: '/services#staffing' },
    { icon: TrendingUp, title: 'Digital Marketing', desc: 'AI-driven growth and B2B lead generation.', to: '/services#marketing' },
    { icon: Wrench, title: 'Managed IT', desc: 'Support, monitoring, and secure operations.', to: '/services#managed-it' },
    { icon: Handshake, title: 'KAM Partnership', desc: 'Kuwait–India bridge for trusted delivery.', to: '/services#partnership' },
];

const advantages = [
    { icon: Shield, title: 'KAM Group backing', desc: 'Enterprise stability and Gulf regional trust.' },
    { icon: Users, title: 'India engineering talent', desc: 'Top-tier delivery without quality compromise.' },
    { icon: Layers, title: 'End-to-end capability', desc: 'Consulting, build, cloud, staffing, and products.' },
    { icon: Building2, title: 'Multi-hub delivery', desc: 'Kuwait strategy with India execution at scale.' },
];

const Eyebrow = ({ children, center }) => (
    <div className={`hm-eyebrow${center ? ' hm-eyebrow-center' : ''}`}>
        <span className="hm-eyebrow-line" aria-hidden="true" />
        <span>{children}</span>
        <span className="hm-eyebrow-line" aria-hidden="true" />
    </div>
);

const Home = () => {
    return (
        <div className="home-page">
            <Helmet>
                <title>KamGlobal AI | IT Services, LearnX School ERP & AI Solutions</title>
                <meta
                    name="description"
                    content="KamGlobal AI delivers enterprise IT services from Kuwait and India, plus education products including LearnX school ERP, EduAiTutors, and AI-powered LMS."
                />
                <meta
                    name="keywords"
                    content="KamGlobal AI, BOT Model, IT Consulting, LearnX, school ERP, EduAiTutors, Kuwait India IT, digital transformation"
                />
            </Helmet>

            {/* 1. Hero */}
            <section className="hm-hero">
                <div className="container">
                    <div className="hm-hero-grid">
                        <motion.div
                            className="hm-hero-copy"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Eyebrow>KamGlobal AI</Eyebrow>
                            <h1>Build smarter campuses. Deliver enterprise IT. One Kuwait–India partner.</h1>
                            <p>
                                From LearnX school ERP and EduAiTutors coaching to BOT, cloud, and custom development —
                                we connect KAM Group&apos;s regional trust with India&apos;s engineering excellence.
                            </p>
                            <div className="hm-hero-actions">
                                <Link to="/products" className="hm-btn hm-btn-primary">
                                    View Products <ArrowRight size={16} />
                                </Link>
                                <Link to="/services" className="hm-btn hm-btn-outline">
                                    Explore Services
                                </Link>
                            </div>
                            <div className="hm-hero-chips" aria-label="Trust signals">
                                <span>KAM Group</span>
                                <span>Kuwait · India</span>
                                <span>LearnX</span>
                                <span>EduAiTutors</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="hm-hero-visual"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <img
                                src="/images/hm-hero-showcase.png"
                                alt="KamGlobal AI enterprise IT and education technology platform"
                                loading="eager"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Trust strip */}
            <section className="hm-trust" aria-label="KamGlobal AI highlights">
                <div className="container hm-trust-inner">
                    <div className="hm-trust-badge">
                        <span className="hm-trust-eyebrow">Backed by</span>
                        <strong>KAM GROUP</strong>
                        <span className="hm-trust-dot" aria-hidden="true" />
                        <span className="hm-trust-loc">Kuwait</span>
                    </div>
                    <div className="hm-trust-viewport">
                        <div className="hm-trust-track" aria-hidden="true">
                            {[...highlights, ...highlights].map((label, i) => (
                                <span key={`${label}-${i}`} className="hm-trust-chip">{label}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Who we are */}
            <section className="hm-about">
                <div className="container">
                    <div className="hm-about-grid">
                        <motion.div
                            className="hm-about-visual"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                        >
                            <img src="/images/hm-who-we-are.png" alt="KamGlobal AI team collaborating across Kuwait and India" loading="lazy" />
                        </motion.div>
                        <div className="hm-about-copy">
                            <Eyebrow>Who We Are</Eyebrow>
                            <h2>Bridging Gulf business vision with India&apos;s engineering power</h2>
                            <p>
                                KamGlobal AI is a global IT and digital solutions company based in India, strategically
                                backed by KAM Group, Kuwait. We help enterprises and education groups accelerate
                                transformation with reliable delivery, AI products, and long-term partnership.
                            </p>
                            <div className="hm-stats">
                                <div className="hm-stat">
                                    <strong>
                                        <CountUp end={10} duration={2} enableScrollSpy scrollSpyOnce />+
                                    </strong>
                                    <span>Years Legacy</span>
                                </div>
                                <div className="hm-stat">
                                    <strong>
                                        <CountUp end={2} duration={2} enableScrollSpy scrollSpyOnce />
                                    </strong>
                                    <span>Global Hubs</span>
                                </div>
                                <div className="hm-stat">
                                    <strong>
                                        <CountUp end={100} duration={2} enableScrollSpy scrollSpyOnce />%
                                    </strong>
                                    <span>Delivery Focus</span>
                                </div>
                            </div>
                            <Link to="/about" className="hm-text-link">
                                About KamGlobal AI <ArrowRight size={15} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Dual pathways */}
            <section className="hm-pathways">
                <div className="container">
                    <div className="hm-section-header">
                        <Eyebrow center>What We Offer</Eyebrow>
                        <h2>Two clear paths for your organisation</h2>
                        <p>Whether you need enterprise delivery capacity or education technology — start here.</p>
                    </div>
                    <div className="hm-pathways-grid">
                        <Link to="/services" className="hm-pathway-card">
                            <span className="hm-pathway-icon" aria-hidden="true"><Laptop size={22} /></span>
                            <h3>Enterprise IT Services</h3>
                            <p>
                                BOT model, custom development, cloud, staffing, marketing, and managed IT —
                                built for scalable offshore and digital transformation.
                            </p>
                            <span className="hm-pathway-cta">
                                Explore Services <ArrowRight size={15} />
                            </span>
                        </Link>
                        <Link to="/products" className="hm-pathway-card hm-pathway-card--accent">
                            <span className="hm-pathway-icon" aria-hidden="true"><GraduationCap size={22} /></span>
                            <h3>Education Products</h3>
                            <p>
                                LearnX school operating system, EduAiTutors coaching, and AI-powered LMS —
                                designed for Indian boards and modern campuses.
                            </p>
                            <span className="hm-pathway-cta">
                                View Products <ArrowRight size={15} />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. Products */}
            <section className="hm-products">
                <div className="container">
                    <div className="hm-section-header">
                        <Eyebrow center>Products</Eyebrow>
                        <h2>Education platforms we build &amp; operate</h2>
                        <p>From school ERP to competitive exam coaching — products ready for real campuses.</p>
                    </div>
                    <div className="hm-products-grid">
                        {products.map((p, i) => (
                            <motion.article
                                key={p.title}
                                className="hm-product-card"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                            >
                                <div className="hm-product-media">
                                    <img src={p.image} alt={p.title} loading="lazy" />
                                </div>
                                <div className="hm-product-body">
                                    <span className={`hm-badge ${p.badgeClass}`}>{p.badge}</span>
                                    <h3>{p.title}</h3>
                                    <p>{p.desc}</p>
                                    <Link to={p.to} className="hm-text-link">
                                        {p.cta} <ArrowRight size={15} />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Services */}
            <section className="hm-services">
                <div className="container">
                    <div className="hm-section-header">
                        <Eyebrow center>Services</Eyebrow>
                        <h2>Specialized IT services for enterprise growth</h2>
                        <p>Modular engagements — from strategy and build to ongoing operations.</p>
                    </div>
                    <div className="hm-services-grid">
                        {services.map((s) => (
                            <Link key={s.title} to={s.to} className="hm-service-card">
                                <span className="hm-service-icon" aria-hidden="true">
                                    <s.icon size={18} strokeWidth={1.75} />
                                </span>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </Link>
                        ))}
                    </div>
                    <div className="hm-section-footer">
                        <Link to="/services" className="hm-btn hm-btn-outline">
                            All Services <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 7. Why */}
            <section className="hm-why">
                <div className="container">
                    <div className="hm-why-grid">
                        <div>
                            <Eyebrow>Why KamGlobal AI</Eyebrow>
                            <h2>Global capability. Local trust. Proven execution.</h2>
                            <p>
                                Clients choose us for the Kuwait–India bridge: regional relationships and governance
                                paired with cost-efficient, high-quality engineering delivery.
                            </p>
                            <Link to="/kamglobal-ai" className="hm-text-link">
                                Why KamGlobal AI <ArrowRight size={15} />
                            </Link>
                        </div>
                        <div className="hm-why-list">
                            {advantages.map((a) => (
                                <div key={a.title} className="hm-why-item">
                                    <span className="hm-why-icon" aria-hidden="true">
                                        <a.icon size={18} />
                                    </span>
                                    <div>
                                        <h3>{a.title}</h3>
                                        <p>{a.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Global presence */}
            <section className="hm-presence">
                <div className="container">
                    <div className="hm-section-header">
                        <Eyebrow center>Global Presence</Eyebrow>
                        <h2>Two hubs. One delivery standard.</h2>
                    </div>
                    <div className="hm-presence-grid">
                        <div className="hm-presence-card">
                            <span className="hm-presence-icon" aria-hidden="true"><MapPin size={18} /></span>
                            <span className="hm-presence-role">Strategic HQ</span>
                            <h3>Kuwait</h3>
                            <p>Parent company backing through KAM Group — regional trust, client relationships, and enterprise governance.</p>
                        </div>
                        <div className="hm-presence-card">
                            <span className="hm-presence-icon" aria-hidden="true"><MapPin size={18} /></span>
                            <span className="hm-presence-role">Delivery Hub</span>
                            <h3>India</h3>
                            <p>Technology and delivery center — engineering excellence, AI products, and scalable offshore operations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. CTA */}
            <section className="hm-cta">
                <div className="container">
                    <motion.div
                        className="hm-cta-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <h2>Ready to talk about your next project?</h2>
                        <p>
                            Discuss enterprise IT delivery, BOT partnerships, or book a LearnX demo for your school group.
                        </p>
                        <ul className="hm-cta-points">
                            <li><CheckCircle2 size={15} /> Free consultation for qualified enquiries</li>
                            <li><CheckCircle2 size={15} /> Modular product &amp; service engagement</li>
                            <li><CheckCircle2 size={15} /> Onboarding support included</li>
                        </ul>
                        <div className="hm-cta-actions">
                            <Link to="/contact" className="hm-btn hm-btn-primary">
                                Talk to an Expert <ArrowRight size={16} />
                            </Link>
                            <Link to="/products/learnx#demo" className="hm-btn hm-btn-secondary">
                                Book LearnX Demo
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
