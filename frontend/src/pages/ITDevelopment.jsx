import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, ArrowUpRight, Bot, Lightbulb, MessageSquareText } from 'lucide-react';
import { Seo, Breadcrumbs, Section } from '../components/page/PageKit';
import { serviceSchema } from '../lib/schema';
import ProjectInquiry from '../components/ProjectInquiry';
import { staggerParent, fadeUpItem, VIEWPORT } from '../components/motion/motionPresets';
import { DEV_SEO, DEV_HERO, DEV_SERVICES, DEV_SERVICE_OPTIONS, DEV_PORTFOLIO } from '../data/itDevelopment';
import { contactLink } from '../data/links';
import './ITDevelopment.css';

const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'IT & Technology', to: '/services' },
    { label: 'IT & Development', to: DEV_SEO.path },
];

const gridMotion = { variants: staggerParent(0.07), initial: 'hidden', whileInView: 'show', viewport: VIEWPORT };

function HeroVisual() {
    return (
        <div className="dv-visual" role="img" aria-label="A website, an application dashboard and an AI assistant built for a business">
            <div className="dv-win dv-win--dash">
                <div className="dv-win-bar">
                    <i /><i /><i />
                    <span>app.yourbusiness.com</span>
                </div>
                <img src="/images/products/learnx-app.webp" alt="" width="1024" height="463" fetchpriority="high" />
                <span className="dv-tag">Application dashboard</span>
            </div>

            <div className="dv-win dv-win--site" aria-hidden="true">
                <div className="dv-win-bar">
                    <i /><i /><i />
                </div>
                <div className="dv-site">
                    <div className="dv-site-nav">
                        <b />
                        <span /><span /><span />
                    </div>
                    <div className="dv-site-hero">
                        <div>
                            <span className="dv-line dv-line--lg" />
                            <span className="dv-line dv-line--md" />
                            <span className="dv-line dv-line--sm" />
                            <span className="dv-site-btn" />
                        </div>
                        <span className="dv-site-img" />
                    </div>
                </div>
                <span className="dv-tag">Website</span>
            </div>

            <div className="dv-ai" aria-hidden="true">
                <div className="dv-ai-head">
                    <span className="dv-ai-icon"><Bot size={16} /></span>
                    <strong>AI Assistant</strong>
                    <i />
                </div>
                <p className="dv-ai-msg dv-ai-msg--user">Create a leave request for Friday</p>
                <p className="dv-ai-msg">Done. It has been sent to your manager for approval.</p>
                <span className="dv-ai-typing"><i /><i /><i /></span>
                <span className="dv-tag">AI interface</span>
            </div>
        </div>
    );
}

function ProductMockup({ kind }) {
    return (
        <div className={`dv-mock dv-mock--${kind}`} aria-hidden="true">
            <div className="dv-mock-side">
                <b />
                <span /><span className="is-on" /><span /><span />
            </div>
            <div className="dv-mock-main">
                <div className="dv-mock-top">
                    <span className="dv-line dv-line--md" />
                    <span className="dv-mock-pill" />
                </div>
                {kind === 'ats' ? (
                    <div className="dv-mock-board">
                        {['Applied', 'Interview', 'Offer'].map((col, i) => (
                            <div key={col} className="dv-mock-col">
                                <small>{col}</small>
                                {Array.from({ length: 3 - i }, (_, j) => (
                                    <span key={j} className="dv-mock-card"><i /><em /></span>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="dv-mock-stats">
                            <span /><span /><span />
                        </div>
                        <div className="dv-mock-rows">
                            {[0, 1, 2, 3].map((r) => (
                                <span key={r} className="dv-mock-row">
                                    <i />
                                    <em />
                                    <b className={kind === 'finance' ? 'is-amount' : r % 2 ? 'is-warn' : ''} />
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function PortfolioCard({ item, onDemo }) {
    const { link } = item;
    const linkProps = link.href ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' } : null;
    return (
        <motion.article className="dv-work" variants={fadeUpItem}>
            <div className="dv-work-media">
                {item.image ? (
                    <img src={item.image} alt={item.alt} loading="lazy" width="1024" height="463" />
                ) : (
                    <>
                        <ProductMockup kind={item.mockup} />
                        <span className="dv-work-flag">Product mockup</span>
                    </>
                )}
            </div>
            <div className="dv-work-body">
                <span className="dv-work-type">{item.type}</span>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <div className="dv-work-actions">
                    {linkProps ? (
                        <a className="dv-link" {...linkProps}>
                            {link.label} <ArrowUpRight size={15} aria-hidden="true" />
                            <span className="sr-only">(opens in a new tab)</span>
                        </a>
                    ) : (
                        <Link className="dv-link" to={link.to}>
                            {link.label} <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                    )}
                    {item.demo ? (
                        <button type="button" className="dv-link dv-link--muted" onClick={() => onDemo(item)}>
                            Request a Demo
                        </button>
                    ) : (
                        item.more && (
                            <Link className="dv-link dv-link--muted" to={item.more.to}>
                                {item.more.label}
                            </Link>
                        )
                    )}
                </div>
            </div>
        </motion.article>
    );
}

export default function ITDevelopment() {
    const [inquiry, setInquiry] = useState({ open: false, service: '', description: '', id: 0 });

    const openInquiry = (service = '', description = '') =>
        setInquiry((prev) => ({ open: true, service, description, id: prev.id + 1 }));

    return (
        <div className="pg-page dv-page">
            <Seo title={DEV_SEO.title} description={DEV_SEO.description} path={DEV_SEO.path} crumbs={crumbs} schema={serviceSchema({ name: 'Software Development', description: DEV_SEO.description, path: DEV_SEO.path })} />

            {/* Hero */}
            <section className="pg-hero dv-hero">
                <div className="container">
                    <Breadcrumbs crumbs={[crumbs[0], crumbs[1], { label: crumbs[2].label }]} />
                    <div className="pg-hero-layout">
                        <motion.div
                            className="pg-hero-copy"
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, ease: 'easeOut' }}
                        >
                            <span className="pg-hero-eyebrow">{DEV_HERO.eyebrow}</span>
                            <h1>{DEV_HERO.title}</h1>
                            <p className="pg-hero-body">{DEV_HERO.body}</p>
                            <div className="pg-hero-actions">
                                <button type="button" className="pg-btn pg-btn--navy" onClick={() => openInquiry()}>
                                    <span>Discuss Your Project</span>
                                    <ArrowRight size={16} aria-hidden="true" />
                                </button>
                                <a href="#what-we-build" className="pg-btn pg-btn--outline">
                                    <span>Explore Our Services</span>
                                    <ArrowDown size={16} aria-hidden="true" />
                                </a>
                            </div>
                        </motion.div>
                        <motion.div
                            className="pg-hero-visual"
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                        >
                            <HeroVisual />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What we can build */}
            <Section
                id="what-we-build"
                tone="white"
                eyebrow="What We Can Build"
                title="Solutions Built Around Your Business"
                intro="Choose what you need, or tell us the problem and we will suggest the right approach."
            >
                <motion.ul className="dv-services" {...gridMotion}>
                    {DEV_SERVICES.map(({ key, icon: Icon, title, desc, more }) => (
                        <motion.li key={key} className="dv-service" variants={fadeUpItem}>
                            <span className="dv-service-icon"><Icon size={24} strokeWidth={1.75} aria-hidden="true" /></span>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                            <div className="dv-service-actions">
                                <button type="button" className="dv-link" onClick={() => openInquiry(title)}>
                                    Discuss Your Project <ArrowRight size={15} aria-hidden="true" />
                                    <span className="sr-only">about {title}</span>
                                </button>
                                {more && (
                                    <Link className="dv-link dv-link--muted" to={more.to}>
                                        {more.label}
                                    </Link>
                                )}
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </Section>

            {/* Our work */}
            <Section
                id="our-work"
                tone="white"
                className="dv-work-section"
                eyebrow="Our Work"
                title="Products We Have Built"
                intro="A selection of platforms designed and developed by our team."
            >
                <motion.div className="dv-works" {...gridMotion}>
                    {DEV_PORTFOLIO.map((item) => (
                        <PortfolioCard
                            key={item.key}
                            item={item}
                            onDemo={(p) => openInquiry('Business Software', `I would like a demo of ${p.demo}.`)}
                        />
                    ))}
                </motion.div>
            </Section>

            {/* Have an idea? */}
            <section className="dv-idea" aria-labelledby="dv-idea-title">
                <div className="container">
                    <motion.div
                        className="dv-idea-card"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VIEWPORT}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <div className="dv-idea-copy">
                            <span className="dv-idea-icon"><Lightbulb size={26} aria-hidden="true" /></span>
                            <h2 id="dv-idea-title">
                                Have an Idea? <span>Let&apos;s Build It.</span>
                            </h2>
                            <p>
                                Tell us what your business needs. Whether you are starting from scratch or improving an existing
                                system, our team can help you find the right solution.
                            </p>
                            <div className="dv-idea-actions">
                                <button type="button" className="pg-btn pg-btn--primary" onClick={() => openInquiry()}>
                                    <span>Start Your Project</span>
                                    <ArrowRight size={16} aria-hidden="true" />
                                </button>
                                <Link to={contactLink('IT & Development', 'Technology Services')} className="pg-btn pg-btn--ghost">
                                    <span>Contact Our Team</span>
                                    <MessageSquareText size={16} aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                        <ol className="dv-idea-steps" aria-label="How we start">
                            <li><b>01</b><span>Share your idea</span></li>
                            <li><b>02</b><span>We plan it together</span></li>
                            <li><b>03</b><span>We build and support it</span></li>
                        </ol>
                    </motion.div>
                </div>
            </section>

            <ProjectInquiry
                key={inquiry.id}
                open={inquiry.open}
                onClose={() => setInquiry((prev) => ({ ...prev, open: false }))}
                services={DEV_SERVICE_OPTIONS}
                initialService={inquiry.service}
                initialDescription={inquiry.description}
                source="IT & Development page"
            />
        </div>
    );
}
