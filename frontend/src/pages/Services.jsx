import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    ArrowRight, ArrowDownRight, Mail, MapPin, ShieldCheck, Plus,
    LayoutDashboard, Smartphone, Workflow, BarChart3, Plug, Users,
    Search, ClipboardList, Map as MapIcon, Code2, BadgeCheck, Rocket, LifeBuoy,
    Target, FileCheck2, Layers, Handshake, Building2, Globe2,
} from 'lucide-react';
import { itServices, itCategories } from '../data/itServices';
import { COMPANY } from '../data/company';
import { engagementModels } from '../data/engagementModels';
import { contactLink, discoveryLink } from '../data/links';
import ProjectInquiry from '../components/ProjectInquiry';
import './Services.css';

const groups = itCategories
    .map((c) => ({ ...c, services: itServices.filter((s) => s.category === c.key) }))
    .filter((g) => g.services.length > 0);

const buildIdeas = [
    { icon: Users, title: 'Customer & partner portals', outcome: 'Give customers self-service access to orders, bookings, documents or support.', to: '/services/custom-development' },
    { icon: LayoutDashboard, title: 'Internal business tools', outcome: 'Replace spreadsheets and email chains with one place to manage the work.', to: '/services/custom-development' },
    { icon: Smartphone, title: 'Mobile apps', outcome: 'Reach users on iOS and Android with apps built around real tasks.', to: '/services/mobile-app-development' },
    { icon: Workflow, title: 'Workflow automation', outcome: 'Cut repetitive steps such as data entry, approvals and document handling.', to: '/services/ai-automation' },
    { icon: BarChart3, title: 'Dashboards & reporting', outcome: 'See the numbers that matter without stitching reports together by hand.', to: '/services/data-analytics' },
    { icon: Plug, title: 'Integrations & ERP / CRM', outcome: 'Connect the systems you already use so data moves without re-keying.', to: '/services/erp-crm' },
];

const processSteps = [
    { icon: Search, title: 'Discover', text: 'Understand your goals, users, current systems and constraints.' },
    { icon: ClipboardList, title: 'Define', text: 'Agree requirements, priorities and acceptance criteria.' },
    { icon: MapIcon, title: 'Plan', text: 'Shape the approach, team, milestones and engagement model.' },
    { icon: Code2, title: 'Build', text: 'Deliver in short iterations with regular reviews and demos.' },
    { icon: BadgeCheck, title: 'Validate', text: 'Test functionality, usability and performance with your team.' },
    { icon: Rocket, title: 'Launch', text: 'Plan the release, deployment and handover together.' },
    { icon: LifeBuoy, title: 'Support & Improve', text: 'Monitor, fix and keep improving based on real use.' },
];

const reasons = [
    { icon: Target, title: 'Business-first discovery', text: 'We start from the problem you are solving, not from a technology we want to sell.' },
    { icon: FileCheck2, title: 'Clear scope and ownership', text: 'Deliverables, responsibilities and acceptance criteria are written down before work starts.' },
    { icon: Layers, title: 'Build, run and support', text: 'One partner across design, development, cloud, QA and ongoing support.' },
    { icon: Handshake, title: 'Flexible engagement', text: 'Projects, dedicated specialists, teams, managed services or BOT, matched to how you work.' },
    { icon: Globe2, title: 'Delivery team in India', text: 'Engineering capacity from our technology centre in India, coordinated with your team.' },
    { icon: Building2, title: 'Backed by KAM Group', text: 'Part of a wider group with operations, outsourcing and HR capabilities.' },
];

const faqs = [
    {
        q: 'How does a project start?',
        a: 'With a discovery conversation about your goals, users and constraints. We then share a proposed scope, approach and engagement model for you to review before any work begins.',
    },
    {
        q: 'Can you work on our existing system?',
        a: 'Yes. We can review, improve, integrate with or extend existing applications. We usually begin with a short technical review so the plan is based on what is actually there.',
    },
    {
        q: 'Do you only take fixed-scope projects?',
        a: 'No. Alongside defined projects we offer dedicated specialists, dedicated teams, managed services and Build-Operate-Transfer. Commercial terms depend on the model and are agreed during scoping.',
    },
    {
        q: 'Who owns the code and deliverables?',
        a: 'Ownership of code, documentation and other deliverables is set out in the contract and agreed with you before the engagement starts.',
    },
    {
        q: 'Do you provide support after launch?',
        a: 'Yes. Post-launch support, maintenance and improvements can be included in the project or arranged as a separate managed service.',
    },
    {
        q: 'Where is the delivery team based?',
        a: 'Our engineering team works from our technology centre in India and coordinates with your team in agreed working hours.',
    },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const reveal = (i = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.4, delay: i * 0.05 },
});

const Eyebrow = ({ children }) => (
    <div className="svc-eyebrow">
        <span className="svc-eyebrow-line" aria-hidden="true" />
        <span>{children}</span>
    </div>
);

const ServiceCard = ({ service }) => {
    const { slug, icon: Icon, name, cardDesc, solution, subject, hero } = service;
    return (
        <motion.li
            className="svc-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
        >
            <span className="svc-card-icon" aria-hidden="true">
                <Icon size={22} strokeWidth={1.75} />
            </span>
            <h3>
                <Link to={`/services/${slug}`} className="svc-card-title">{name}</Link>
            </h3>
            <p>{cardDesc}</p>
            <ul className="svc-card-tags" aria-label={`${name} includes`}>
                {solution.slice(0, 3).map((item) => (
                    <li key={item.title}>{item.title}</li>
                ))}
            </ul>
            <div className="svc-card-links">
                <Link to={`/services/${slug}`} className="svc-card-more">
                    Explore <ArrowRight size={15} aria-hidden="true" />
                    <span className="sr-only">{name}</span>
                </Link>
                <Link to={contactLink(subject, 'Technology Services')} className="svc-card-cta">
                    {hero.cta}
                </Link>
            </div>
        </motion.li>
    );
};

const Services = () => {
    const [inquiry, setInquiry] = useState({ open: false, id: 0 });
    const openInquiry = () => setInquiry((prev) => ({ open: true, id: prev.id + 1 }));

    return (
        <div className="services-page">
            <Helmet>
                <title>IT &amp; Technology Services | KAM Global AI</title>
                <meta
                    name="description"
                    content="IT services from KAM Global AI: web, software and mobile app development, UI/UX design, QA and testing, AI and automation, data and analytics, ERP and CRM, IT consulting, cloud and DevOps, managed IT, IT staffing and BOT teams."
                />
                <link rel="canonical" href="https://kamglobalai.com/services" />
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <section className="svc-hero">
                <div className="container svc-hero-grid">
                    <motion.div
                        className="svc-hero-inner"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="svc-hero-pill">
                            <i aria-hidden="true" />
                            IT &amp; Technology
                        </span>
                        <h1>
                            IT Services Built Around <span>Your Business</span>
                        </h1>
                        <p>
                            From websites, apps and AI to cloud, managed IT and dedicated engineering teams: everything
                            you need to build and run your technology, delivered by our team in India and scoped around
                            your requirements.
                        </p>
                        <div className="svc-hero-actions">
                            <button type="button" onClick={openInquiry} className="svc-btn svc-btn-primary">
                                Discuss Your Project <ArrowRight size={16} aria-hidden="true" />
                            </button>
                            <Link to={discoveryLink('Technology Services')} className="svc-btn svc-btn-secondary">
                                Book a Discovery Call
                            </Link>
                        </div>
                        <ul className="svc-hero-facts" aria-label="About our delivery">
                            <li><MapPin size={15} aria-hidden="true" />Delivered from India</li>
                            <li><ShieldCheck size={15} aria-hidden="true" />{COMPANY.backing}</li>
                        </ul>
                    </motion.div>

                    <motion.nav
                        className="svc-index"
                        aria-label="IT service categories on this page"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.12 }}
                    >
                        <div className="svc-index-head">
                            <strong>Our IT services</strong>
                            <span>{itServices.length} services</span>
                        </div>
                        <ol className="svc-index-list">
                            {groups.map(({ key, title, icon: Icon, services }, i) => (
                                <li key={key}>
                                    <a href={`#${key}`} className="svc-index-row">
                                        <span className="svc-index-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                                        <span className="svc-index-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.75} /></span>
                                        <span className="svc-index-text">
                                            <b>{title}</b>
                                            <small>{services.map((s) => s.short).join(' · ')}</small>
                                        </span>
                                        <ArrowDownRight size={17} className="svc-index-arrow" aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </ol>
                        <Link to={discoveryLink('Technology Services')} className="svc-index-foot">
                            Not sure which fits? <span>Talk to us <ArrowRight size={14} aria-hidden="true" /></span>
                        </Link>
                    </motion.nav>
                </div>
            </section>

            <div className="svc-groups">
                {groups.map(({ key, title, intro, icon: Icon, services }, i) => (
                    <section key={key} id={key} className="svc-group" aria-labelledby={`${key}-title`}>
                        <div className="container">
                            <div className="svc-group-head">
                                <span className="svc-group-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                                <div>
                                    <Eyebrow>
                                        <Icon size={14} aria-hidden="true" className="svc-group-icon" />
                                        {services.length} {services.length === 1 ? 'service' : 'services'}
                                    </Eyebrow>
                                    <h2 id={`${key}-title`}>{title}</h2>
                                    <p>{intro}</p>
                                </div>
                            </div>
                            <ul className={`svc-cards svc-cards--${Math.min(services.length, 4)}`}>
                                {services.map((service) => (
                                    <ServiceCard key={service.slug} service={service} />
                                ))}
                            </ul>
                        </div>
                    </section>
                ))}
            </div>

            <section className="svc-band svc-band--soft" aria-labelledby="ideas-title">
                <div className="container">
                    <div className="svc-head svc-head--split">
                        <div>
                            <Eyebrow>What We Can Build</Eyebrow>
                            <h2 id="ideas-title">From Business Ideas to Working Digital Products</h2>
                        </div>
                        <p>
                            Most projects start with a practical problem: a manual process, a disconnected system or a
                            service customers can&apos;t reach easily. These are the kinds of solutions we design, build
                            and support.
                        </p>
                    </div>
                    <ul className="svc-build">
                        {buildIdeas.map(({ icon: Icon, title, outcome, to }, i) => (
                            <motion.li key={title} {...reveal(i)}>
                                <Link to={to} className="svc-build-card">
                                    <span className="svc-build-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.8} /></span>
                                    <span className="svc-build-text">
                                        <b>{title}</b>
                                        <span>{outcome}</span>
                                    </span>
                                    <ArrowRight size={16} className="svc-build-arrow" aria-hidden="true" />
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="svc-band" id="process" aria-labelledby="process-title">
                <div className="container">
                    <div className="svc-head svc-head--center">
                        <Eyebrow>How We Work</Eyebrow>
                        <h2 id="process-title">A Clear Path From First Conversation to Ongoing Support</h2>
                        <p>Seven steps, each with a clear output, so you always know what has been agreed and what comes next.</p>
                    </div>
                    <ol className="svc-process">
                        <motion.span
                            className="svc-process-line"
                            aria-hidden="true"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.9, ease: 'easeOut' }}
                        />
                        {processSteps.map(({ icon: Icon, title, text }, i) => (
                            <motion.li key={title} className="svc-process-step" {...reveal(i)}>
                                <span className="svc-process-dot" aria-hidden="true"><Icon size={18} strokeWidth={1.9} /></span>
                                <span className="svc-process-num">Step {i + 1}</span>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="svc-band svc-band--soft" id="engagement" aria-labelledby="engagement-title">
                <div className="container">
                    <div className="svc-head svc-head--split">
                        <div>
                            <Eyebrow>Engagement Models</Eyebrow>
                            <h2 id="engagement-title">Choose How We Work Together</h2>
                        </div>
                        <p>
                            The same capability can be delivered as a project, a dedicated team or an ongoing service.
                            We recommend a model during scoping; the final structure is agreed with you.
                        </p>
                    </div>
                    <ul className="svc-models">
                        {engagementModels.map(({ slug, icon: Icon, name, compare }, i) => (
                            <motion.li key={slug} {...reveal(i % 4)}>
                                <Link to={slug === 'bot' ? '/services/bot-model' : `/engagement-models/${slug}`} className="svc-model">
                                    <span className="svc-model-top">
                                        <span className="svc-model-icon" aria-hidden="true"><Icon size={18} /></span>
                                        <b>{name}</b>
                                    </span>
                                    <span className="svc-model-desc">{compare.summary}</span>
                                    <span className="svc-model-fit"><small>Best for</small>{compare.bestFor}</span>
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                    <div className="svc-models-foot">
                        <Link to="/engagement-models#compare" className="svc-text-link">
                            Compare all models side by side <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="svc-band" aria-labelledby="why-title">
                <div className="container">
                    <div className="svc-why">
                        <div className="svc-why-intro">
                            <Eyebrow>Why KAM Global AI</Eyebrow>
                            <h2 id="why-title">A Technology Partner That Plans Before It Builds</h2>
                            <p>
                                We keep the process transparent: what will be delivered, who is responsible and how
                                progress is reviewed are agreed up front.
                            </p>
                            <button type="button" onClick={openInquiry} className="svc-btn svc-btn-navy">
                                Discuss Your Project <ArrowRight size={16} aria-hidden="true" />
                            </button>
                        </div>
                        <ul className="svc-why-grid">
                            {reasons.map(({ icon: Icon, title, text }, i) => (
                                <motion.li key={title} {...reveal(i)}>
                                    <span className="svc-why-icon" aria-hidden="true"><Icon size={18} /></span>
                                    <h3>{title}</h3>
                                    <p>{text}</p>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="svc-band svc-band--soft" id="faq" aria-labelledby="faq-title">
                <div className="container svc-faq-wrap">
                    <div className="svc-head svc-head--center">
                        <Eyebrow>FAQs</Eyebrow>
                        <h2 id="faq-title">Common Questions About Working With Us</h2>
                    </div>
                    <div className="svc-faq">
                        {faqs.map(({ q, a }) => (
                            <details key={q} className="svc-faq-item">
                                <summary>
                                    <span>{q}</span>
                                    <Plus size={18} aria-hidden="true" />
                                </summary>
                                <p>{a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="svc-cta">
                <div className="container">
                    <motion.div
                        className="svc-cta-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <h2>Let&apos;s Turn Your Requirements Into a Working Solution.</h2>
                        <p>Share the challenge, desired timeline and the kind of support you need. We will use it to plan a focused first conversation.</p>
                        <div className="svc-cta-actions">
                            <button type="button" onClick={openInquiry} className="svc-btn svc-btn-primary">
                                Discuss Your Project <ArrowRight size={16} aria-hidden="true" />
                            </button>
                            <Link to={discoveryLink('Technology Services')} className="svc-btn svc-btn-secondary">
                                Book a Discovery Call
                            </Link>
                        </div>
                        <a href={`mailto:${COMPANY.email}`} className="svc-cta-mail">
                            <Mail size={15} aria-hidden="true" /> Or email {COMPANY.email}
                        </a>
                    </motion.div>
                </div>
            </section>

            <ProjectInquiry
                key={inquiry.id}
                open={inquiry.open}
                onClose={() => setInquiry((prev) => ({ ...prev, open: false }))}
                source="IT Services page"
            />
        </div>
    );
};

export default Services;
