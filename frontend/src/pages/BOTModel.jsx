import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Handshake, ShieldCheck, UserRound, Flag } from 'lucide-react';
import { Seo, Breadcrumbs, Section, CtaLink, CardGrid, Steps, CheckList, ChipList, CtaBand } from '../components/page/PageKit';
import { serviceSchema } from '../lib/schema';
import MoreITServices from '../components/it/MoreITServices';
import { staggerParent, fadeUpItem, VIEWPORT } from '../components/motion/motionPresets';
import { getItService, itCrossLinks } from '../data/itServices';
import { getEngagementModel } from '../data/engagementModels';
import { getIndustry } from '../data/industries';
import { contactLink, discoveryLink } from '../data/links';
import './BOTModel.css';

const service = getItService('bot-model');
const model = getEngagementModel('bot');
const protect = service.solution.find((s) => s.title === 'Protect');

const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'IT & Technology', to: '/services' },
    { label: service.short, to: `/services/${service.slug}` },
];

const primaryLink = contactLink(service.subject, 'Technology Services');
const callLink = discoveryLink(service.subject);

function OwnershipMeter({ own, label }) {
    return (
        <div className="bt-meter">
            <div className="bt-meter-legend" aria-hidden="true">
                <span><i className="bt-dot bt-dot--kam" />KAM Global AI</span>
                <span><i className="bt-dot bt-dot--you" />You</span>
            </div>
            <div className="bt-meter-bar" aria-hidden="true">
                <motion.span
                    className="bt-meter-you"
                    initial={false}
                    animate={{ width: `${own * 100}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
            <p className="bt-meter-label">
                <span className="sr-only">Ownership: </span>
                {label}
            </p>
        </div>
    );
}

function HeroVisual() {
    return (
        <div className="bt-visual">
            <div className="pg-hero-frame bt-visual-frame">
                <img src={service.hero.image} alt={service.hero.alt} width="1024" height="576" fetchpriority="high" />
            </div>
            <div className="bt-handover" role="img" aria-label="Build, Operate, Transfer: the team moves from KAM Global AI to your ownership">
                <span className="bt-handover-kicker">Your BOT journey</span>
                <ol className="bt-handover-track" aria-hidden="true">
                    {service.phases.map(({ key, icon: Icon, title }, i) => (
                        <li key={key} style={{ '--i': i }}>
                            <span className="bt-handover-node"><Icon size={16} /></span>
                            <b>{title}</b>
                        </li>
                    ))}
                </ol>
                <div className="bt-handover-own" aria-hidden="true">
                    <span>Run by KAM</span>
                    <span className="bt-handover-bar"><i /></span>
                    <span>Owned by you</span>
                </div>
            </div>
        </div>
    );
}

function PhaseExplorer() {
    const [active, setActive] = useState(0);
    const reduce = useReducedMotion();
    const phase = service.phases[active];
    const panelId = 'bt-phase-panel';

    const onKeyDown = (e) => {
        const last = service.phases.length - 1;
        let next = null;
        if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
        if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = last;
        if (next === null) return;
        e.preventDefault();
        setActive(next);
        document.getElementById(`bt-tab-${service.phases[next].key}`)?.focus();
    };

    return (
        <div className="bt-explorer">
            <div className="bt-tabs" role="tablist" aria-label="BOT phases" onKeyDown={onKeyDown}>
                {service.phases.map(({ key, icon: Icon, title }, i) => {
                    const selected = i === active;
                    return (
                        <button
                            key={key}
                            id={`bt-tab-${key}`}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            aria-controls={panelId}
                            tabIndex={selected ? 0 : -1}
                            className={`bt-tab${selected ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                            onClick={() => setActive(i)}
                        >
                            {selected && <motion.span layoutId="bt-tab-bg" className="bt-tab-bg" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                            <span className="bt-tab-num">Phase {i + 1}</span>
                            <span className="bt-tab-title">
                                <Icon size={18} aria-hidden="true" />
                                {title}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div id={panelId} role="tabpanel" aria-labelledby={`bt-tab-${phase.key}`} className="bt-panel">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={phase.key}
                        className="bt-panel-inner"
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.28 }}
                    >
                        <div className="bt-panel-head">
                            <h3>{phase.title}</h3>
                            <p>{phase.lead}</p>
                        </div>
                        <div className="bt-panel-cols">
                            <div className="bt-col">
                                <h4><Handshake size={17} aria-hidden="true" />What we do</h4>
                                <ul>
                                    {phase.we.map((t) => <li key={t}>{t}</li>)}
                                </ul>
                            </div>
                            <div className="bt-col bt-col--you">
                                <h4><UserRound size={17} aria-hidden="true" />What you do</h4>
                                <ul>
                                    {phase.you.map((t) => <li key={t}>{t}</li>)}
                                </ul>
                            </div>
                        </div>
                        <div className="bt-panel-foot">
                            <p className="bt-outcome">
                                <Flag size={17} aria-hidden="true" />
                                <span><b>End of this phase:</b> {phase.outcome}</span>
                            </p>
                            <OwnershipMeter own={phase.own} label={phase.ownership} />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function BOTModel() {
    return (
        <div className="pg-page bt-page">
            <Seo title={service.seo.title} description={service.seo.description} path={`/services/${service.slug}`} crumbs={crumbs} schema={serviceSchema({ name: service.name, description: service.seo.description, path: `/services/${service.slug}` })} />

            {/* Hero */}
            <section className="pg-hero bt-hero">
                <div className="container">
                    <Breadcrumbs crumbs={[crumbs[0], crumbs[1], { label: service.short }]} />
                    <div className="pg-hero-layout">
                        <motion.div
                            className="pg-hero-copy"
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, ease: 'easeOut' }}
                        >
                            <span className="pg-hero-eyebrow">{service.name}</span>
                            <h1>{service.hero.title}</h1>
                            <p className="pg-hero-sub">{service.hero.sub}</p>
                            <p className="pg-hero-body">{service.hero.body}</p>
                            <div className="pg-hero-actions">
                                <CtaLink to={primaryLink} variant="navy">{service.hero.cta}</CtaLink>
                                <CtaLink to={callLink} variant="outline">Book a Discovery Call</CtaLink>
                            </div>
                            <ul className="pg-hero-chips" aria-label="Highlights">
                                <li>IT & Technology</li>
                                <li>India technology team</li>
                            </ul>
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

            {/* Challenge */}
            <Section
                id="challenge"
                tone="white"
                eyebrow="The Challenge"
                title="Problems We Are Asked to Solve"
                intro="If any of these sound familiar, BOT is a good place to start."
            >
                <motion.ol className="bt-problems" variants={staggerParent(0.08)} initial="hidden" whileInView="show" viewport={VIEWPORT}>
                    {service.problems.map((p, i) => (
                        <motion.li key={p.title} className="bt-problem" variants={fadeUpItem}>
                            <span className="bt-problem-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                            <AlertTriangle size={20} aria-hidden="true" className="bt-problem-icon" />
                            <h3>{p.title}</h3>
                            <p>{p.desc}</p>
                        </motion.li>
                    ))}
                </motion.ol>
            </Section>

            {/* Phases */}
            <Section
                id="how-bot-works"
                tone="white"
                eyebrow="How BOT Works"
                title="Three Phases, One Clear Handover"
                intro="Select a phase to see who does what, and how ownership moves to you."
            >
                <PhaseExplorer />
            </Section>

            {/* Protected from day one */}
            <Section id="protect" tone="white" className="bt-protect-section">
                <div className="bt-protect">
                    <motion.div className="bt-protect-copy" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT}>
                        <span className="bt-protect-icon"><ShieldCheck size={26} aria-hidden="true" /></span>
                        <span className="pg-eyebrow">Protected From Day One</span>
                        <h2 id="protect-title">Everything Agreed Before the Team Is Built</h2>
                        <p>{protect?.desc} {model.meaning}</p>
                        <p className="bt-protect-note" role="note">
                            Transfer timing, ownership, employment arrangements and assets are agreed with each client in the contract.
                            Nothing transfers automatically, and the terms depend on your requirements and applicable law.
                        </p>
                        <CtaLink to={primaryLink} variant="navy">{service.hero.cta}</CtaLink>
                    </motion.div>
                    <motion.ul
                        className="bt-terms"
                        aria-label="Agreed up front"
                        variants={staggerParent(0.05)}
                        initial="hidden"
                        whileInView="show"
                        viewport={VIEWPORT}
                    >
                        {model.define.map((t) => (
                            <motion.li key={t} variants={fadeUpItem}>
                                <CheckCircle2 size={18} aria-hidden="true" />
                                {t}
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </Section>

            {/* Fit + discuss */}
            <Section
                id="fit"
                tone="white"
                eyebrow="Is BOT Right for You?"
                title="A Good Fit When…"
                intro="BOT works best when long-term ownership is the goal. These are the topics we cover before proposing a plan."
            >
                <div className="bt-fit">
                    <div className="bt-fit-card">
                        <h3>BOT may suit you if</h3>
                        <CheckList items={model.fit} cols={1} />
                    </div>
                    <div className="bt-fit-card bt-fit-card--alt">
                        <h3>What we discuss with you</h3>
                        <CheckList items={service.discuss} cols={1} />
                        <CtaLink to="/engagement-models" variant="outline">Compare Engagement Models</CtaLink>
                    </div>
                </div>
            </Section>

            {/* Steps */}
            <Section
                id="how-it-works"
                tone="white"
                eyebrow="Step by Step"
                title="From First Call to Transfer"
                intro="You know what happens at each stage and what we need from you."
                cta={{ label: 'Book a Discovery Call', to: callLink }}
            >
                <Steps steps={service.steps} label="BOT model steps" />
            </Section>

            {/* Related */}
            <Section
                id="related"
                tone="white"
                eyebrow="Ways to Work With Us"
                title="Engagement Models and Industries"
                intro="Choose how you want to work with us, and see where BOT is often used."
                align="left"
            >
                <CardGrid
                    cols={3}
                    variant="compact"
                    items={service.models.map((slug) => {
                        const m = getEngagementModel(slug);
                        return { icon: m.icon, title: m.name, desc: m.cardDesc, to: `/engagement-models/${m.slug}`, cta: 'How it works', tag: 'Model' };
                    })}
                />
                <div className="pg-stack-top">
                    <ChipList
                        label="Relevant industries"
                        items={service.industries.map((slug) => {
                            const ind = getIndustry(slug);
                            return { label: ind.name, to: `/industries/${ind.slug}` };
                        })}
                    />
                </div>
            </Section>

            <MoreITServices current={service.slug} extras={itCrossLinks(service)} />

            <CtaBand
                title="Ready to Build Your India Team?"
                text="Share your roles, timing and the transfer horizon you have in mind. We will review them and confirm the most suitable next step."
                primary={{ label: service.hero.cta, to: primaryLink }}
                secondary={{ label: 'Book a Discovery Call', to: callLink }}
                tertiary={{ label: 'Contact Our Team', to: '/contact' }}
            />
        </div>
    );
}