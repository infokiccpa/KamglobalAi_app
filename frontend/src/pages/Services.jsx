import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    Globe,
    Laptop,
    Cloud,
    Users,
    TrendingUp,
    CheckCircle2,
    ArrowRight,
    Handshake,
    Mail,
    Wrench,
} from 'lucide-react';
import './Services.css';

const services = [
    {
        id: 'bot-model',
        icon: Globe,
        tag: 'Strategic Offshoring',
        title: 'BOT Model (Build-Operate-Transfer)',
        challenge: 'High cost of scaling tech talent locally without sacrificing quality or ownership.',
        solution: 'We build your dedicated team in India, operate it to your standards, and transfer ownership when you are ready.',
        benefits: ['Up to 60% cost efficiency', 'Zero early legal liability', 'IP protection', 'Seamless handover'],
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'it-dev',
        icon: Laptop,
        tag: 'Digital Engineering',
        title: 'Custom Enterprise Development',
        challenge: 'Off-the-shelf software fails to address unique operational workflows.',
        solution: 'End-to-end full-stack development — we architect, build, and deploy enterprise-grade platforms.',
        benefits: ['Microservices architecture', 'Modern React / Node stack', 'High availability', 'Secure SDLC'],
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'cloud',
        icon: Cloud,
        tag: 'Infrastructure',
        title: 'Cloud Native & DevOps',
        challenge: 'Legacy systems causing slow deployments, downtime, and high infrastructure costs.',
        solution: 'Cloud migration (AWS/Azure) with automated CI/CD pipelines to reduce time-to-market.',
        benefits: ['Docker / Kubernetes', 'Zero-downtime deploys', 'Cost optimization', 'Auto-scaling'],
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'staffing',
        icon: Users,
        tag: 'Talent',
        title: 'Global Technical Staffing',
        challenge: 'Months lost sourcing, interviewing, and onboarding niche IT specialists.',
        solution: 'Pre-vetted Indian engineers ready to integrate into your agile cycles immediately.',
        benefits: ['Top-tier vetted talent', 'Fast onboarding', 'Flexible contracts', 'Cultural alignment'],
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'marketing',
        icon: TrendingUp,
        tag: 'Growth',
        title: 'AI-Driven Digital Marketing',
        challenge: 'Difficulty capturing qualified B2B leads or ranking in a saturated market.',
        solution: 'AI analytics and programmatic SEO to drive high-intent traffic to your funnels.',
        benefits: ['Predictive analytics', 'Programmatic SEO', 'B2B lead generation', 'CRO optimization'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'managed-it',
        icon: Wrench,
        tag: 'Operations',
        title: 'Managed IT Services',
        challenge: 'Internal IT teams bogged down by maintenance instead of strategic work.',
        solution: 'Full IT operations takeover — L1–L3 support, monitoring, and security patching.',
        benefits: ['Predictable SLAs', 'Proactive security', '99.99% uptime focus', 'Dedicated NOC'],
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'partnership',
        icon: Handshake,
        tag: 'KAM Group',
        title: 'Strategic Partnership with KAM Group, Kuwait',
        challenge: 'Enterprises need a trusted bridge between Gulf business networks and global tech delivery.',
        solution: 'KAM Group\'s regional legacy combined with KamGlobal AI\'s India engineering excellence.',
        benefits: ['Kuwait HQ backing', 'Regional trust & network', 'End-to-end accountability', 'Global reach'],
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800',
    },
];

const jumpLinks = [
    { href: '#bot-model', label: 'BOT Model' },
    { href: '#it-dev', label: 'IT Development' },
    { href: '#cloud', label: 'Cloud' },
    { href: '#staffing', label: 'Staffing' },
    { href: '#marketing', label: 'Marketing' },
    { href: '#managed-it', label: 'Managed IT' },
    { href: '#partnership', label: 'Partnership' },
];

const Eyebrow = ({ children, center }) => (
    <div className={`svc-eyebrow${center ? ' svc-eyebrow-center' : ''}`}>
        <span className="svc-eyebrow-line" aria-hidden="true" />
        <span>{children}</span>
        <span className="svc-eyebrow-line" aria-hidden="true" />
    </div>
);

const ServiceSection = ({ service, index }) => {
    const { id, icon: Icon, tag, title, challenge, solution, benefits, image } = service;
    const reversed = index % 2 === 1;

    return (
        <section id={id} className={`svc-section${reversed ? ' svc-section--reverse' : ''}`}>
            <div className="container">
                <div className="svc-section-grid">
                    <motion.div
                        className="svc-section-content"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <div className="svc-section-head">
                            <span className="svc-icon" aria-hidden="true">
                                <Icon size={20} strokeWidth={1.75} />
                            </span>
                            <Eyebrow>{tag}</Eyebrow>
                        </div>

                        <h2>{title}</h2>

                        <div className="svc-cs-box">
                            <div className="svc-cs-row">
                                <span className="svc-cs-label">Challenge</span>
                                <p>{challenge}</p>
                            </div>
                            <div className="svc-cs-row">
                                <span className="svc-cs-label">Our approach</span>
                                <p>{solution}</p>
                            </div>
                        </div>

                        <ul className="svc-benefits">
                            {benefits.map((item) => (
                                <li key={item}>
                                    <CheckCircle2 size={15} aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link to="/contact" className="svc-section-link">
                            Discuss this service <ArrowRight size={15} />
                        </Link>
                    </motion.div>

                    <motion.div
                        className="svc-section-visual"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                    >
                        <img src={image} alt={title} loading="lazy" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Services = () => {
    return (
        <div className="services-page">
            <Helmet>
                <title>Enterprise IT Services | KamGlobal AI</title>
                <meta
                    name="description"
                    content="BOT Model offshoring, custom software, cloud & DevOps, staffing, digital marketing, and managed IT — delivered from India, backed by KAM Group Kuwait."
                />
            </Helmet>

            <section className="svc-hero">
                <div className="container">
                    <motion.div
                        className="svc-hero-inner"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Eyebrow center>Our Services</Eyebrow>
                        <h1>Enterprise Technology, Built for Scale</h1>
                        <p>
                            Secure, scalable IT services connecting Kuwait&apos;s strategic vision with
                            India&apos;s engineering excellence — from offshoring to cloud and AI.
                        </p>

                        <nav className="svc-jump-nav" aria-label="Service sections">
                            {jumpLinks.map(({ href, label }) => (
                                <a key={href} href={href} className="svc-jump-link">
                                    {label}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                </div>
            </section>

            <section className="svc-overview">
                <div className="container">
                    <div className="svc-overview-grid">
                        {services.slice(0, 4).map(({ id, icon: Icon, title }) => (
                            <a key={id} href={`#${id}`} className="svc-overview-card">
                                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                                <span>{title.split('(')[0].trim()}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <div className="svc-list">
                {services.map((service, index) => (
                    <ServiceSection key={service.id} service={service} index={index} />
                ))}
            </div>

            <section className="svc-cta">
                <div className="container">
                    <motion.div
                        className="svc-cta-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <h2>Ready to evaluate your technology stack?</h2>
                        <p>Book a discovery call with our enterprise solutions team.</p>
                        <div className="svc-cta-actions">
                            <Link to="/contact" className="svc-btn svc-btn-primary">
                                Book a Consultation <ArrowRight size={16} />
                            </Link>
                            <a href="mailto:info@kamglobalai.com" className="svc-btn svc-btn-secondary">
                                <Mail size={16} /> info@kamglobalai.com
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;
