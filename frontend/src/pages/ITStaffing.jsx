import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronDown, Minus, Sparkles, UserCheck } from 'lucide-react';
import { Seo, Breadcrumbs, Section, CtaLink, CheckList, ChipList, CtaBand } from '../components/page/PageKit';
import { serviceSchema } from '../lib/schema';
import MoreITServices from '../components/it/MoreITServices';
import { staggerParent, fadeUpItem, VIEWPORT } from '../components/motion/motionPresets';
import { getItService, itCrossLinks } from '../data/itServices';
import { getEngagementModel } from '../data/engagementModels';
import { getIndustry } from '../data/industries';
import { discoveryLink, talentLink } from '../data/links';
import './ITStaffing.css';

const service = getItService('it-staffing');
const augmentation = getEngagementModel('staff-augmentation');
const models = service.models.map(getEngagementModel).filter(Boolean);

const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'IT & Technology', to: '/services' },
    { label: service.short, to: `/services/${service.slug}` },
];

const primaryLink = talentLink(service.subject);
const callLink = discoveryLink(service.subject);

const SAMPLE = [
    { initials: 'AK', role: 'Frontend · React', skills: ['React', 'TypeScript'], status: 'Interview booked', tone: 'go' },
    { initials: 'RS', role: 'Full-stack · Node.js', skills: ['Node.js', 'React'], status: 'Shortlisted', tone: 'warm' },
    { initials: 'PM', role: 'Frontend · Angular', skills: ['Angular', 'RxJS'], status: 'Screening', tone: 'calm' },
];

function ShortlistVisual() {
    return (
        <div className="sf-visual" role="img" aria-label="Illustrative example of a candidate shortlist shared with a client for interview">
            <span className="sf-float sf-float--match" aria-hidden="true">
                <Sparkles size={14} /> Matched to your stack
            </span>
            <div className="sf-board" aria-hidden="true">
                <div className="sf-board-head">
                    <span className="sf-board-kicker">Example shortlist</span>
                    <b>Senior Frontend Engineer</b>
                    <span className="sf-board-meta">
                        <i>Remote</i>
                        <i>Overlap agreed</i>
                        <i>Starts in your sprint</i>
                    </span>
                </div>
                <ul className="sf-board-list">
                    {SAMPLE.map((c, i) => (
                        <li key={c.initials} style={{ '--i': i }}>
                            <span className="sf-avatar">{c.initials}</span>
                            <span className="sf-cand">
                                <b>{c.role}</b>
                                <span>{c.skills.map((s) => <em key={s}>{s}</em>)}</span>
                            </span>
                            <span className={`sf-status sf-status--${c.tone}`}>{c.status}</span>
                        </li>
                    ))}
                </ul>
                <div className="sf-board-foot">
                    <UserCheck size={16} />
                    <span><b>You interview.</b> You decide who joins.</span>
                </div>
            </div>
        </div>
    );
}

export default function ITStaffing() {
    return (
        <div className="pg-page sf-page">
            <Seo title={service.seo.title} description={service.seo.description} path={`/services/${service.slug}`} crumbs={crumbs} schema={serviceSchema({ name: service.name, description: service.seo.description, path: `/services/${service.slug}` })} />

            {/* Hero */}
            <section className="pg-hero sf-hero">
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
                                <CtaLink to="#roles" variant="outline">See Roles We Staff</CtaLink>
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
                            <ShortlistVisual />
                        </motion.div>
                    </div>

                    <motion.ul
                        className="sf-promise"
                        aria-label="What is included"
                        variants={staggerParent(0.07, 0.3)}
                        initial="hidden"
                        animate="show"
                    >
                        {service.solution.map(({ icon: Icon, title, desc }) => (
                            <motion.li key={title} variants={fadeUpItem}>
                                <span className="sf-promise-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.75} /></span>
                                <span>
                                    <b>{title}</b>
                                    <small>{desc}</small>
                                </span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </section>

            {/* Challenge */}
            <Section
                id="challenge"
                tone="white"
                eyebrow="The Challenge"
                title="From Hiring Problem to a Working Plan"
                intro="If any of these sound familiar, IT staffing is a good place to start."
            >
                <motion.ol className="sf-problems" variants={staggerParent(0.08)} initial="hidden" whileInView="show" viewport={VIEWPORT}>
                    {service.problems.map((p, i) => (
                        <motion.li key={p.title} className="sf-problem" variants={fadeUpItem}>
                            <div className="sf-problem-pain">
                                <span className="sf-problem-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                                <AlertTriangle size={18} aria-hidden="true" />
                                <h3>{p.title}</h3>
                                <p>{p.desc}</p>
                            </div>
                            <div className="sf-problem-fix">
                                <CheckCircle2 size={18} aria-hidden="true" />
                                <p><span className="sr-only">How we help: </span>{p.fix}</p>
                            </div>
                        </motion.li>
                    ))}
                </motion.ol>
            </Section>

            {/* Roles */}
            <Section
                id="roles"
                tone="white"
                className="sf-roles-section"
                eyebrow="Roles We Staff"
                title="Specialists Who Can Join Your Team"
                intro="Tell us the stack and seniority. We match profiles to the way your team already works."
                cta={{ label: service.hero.cta, to: primaryLink }}
            >
                <motion.ul className="sf-roles" variants={staggerParent(0.05)} initial="hidden" whileInView="show" viewport={VIEWPORT}>
                    {service.roles.map(({ icon: Icon, title, skills }) => (
                        <motion.li key={title} className="sf-role" variants={fadeUpItem}>
                            <span className="sf-role-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.75} /></span>
                            <h3>{title}</h3>
                            <ul className="sf-role-skills" aria-label={`${title} skills`}>
                                {skills.map((s) => <li key={s}>{s}</li>)}
                            </ul>
                        </motion.li>
                    ))}
                </motion.ul>
                <p className="sf-roles-note">Need a role that is not listed? <Link to={primaryLink}>Share the requirement</Link> and we will confirm whether we can support it.</p>
            </Section>

            {/* Process */}
            <Section
                id="how-it-works"
                tone="white"
                eyebrow="How It Works"
                title="Five Steps, With You in Control"
                intro="Each step shows who leads it, so you always know what happens next."
                cta={{ label: 'Book a Discovery Call', to: callLink }}
            >
                <ol className="sf-flow" aria-label="IT staffing steps">
                    {service.steps.map((s, i) => (
                        <motion.li
                            key={s.title}
                            className={`sf-flow-step sf-flow-step--${s.owner === 'You' ? 'you' : s.owner === 'Together' ? 'both' : 'kam'}`}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={VIEWPORT}
                            transition={{ duration: 0.45, delay: i * 0.08 }}
                        >
                            <span className="sf-flow-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                            <span className="sf-flow-owner">{s.owner === 'Together' ? 'Together' : s.owner === 'You' ? 'You lead' : 'We lead'}</span>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </motion.li>
                    ))}
                </ol>
            </Section>

            {/* Engagement models */}
            <Section
                id="models"
                tone="white"
                eyebrow="Engagement Options"
                title="Choose How Specialists Join You"
                intro="Three common ways to structure IT staffing. We help you pick the one that fits the work."
            >
                <motion.ul className="sf-models" variants={staggerParent(0.08)} initial="hidden" whileInView="show" viewport={VIEWPORT}>
                    {models.map((m) => {
                        const Icon = m.icon;
                        return (
                            <motion.li key={m.slug} className="sf-model" variants={fadeUpItem}>
                                <span className="sf-model-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.75} /></span>
                                <h3>{m.name}</h3>
                                <p>{m.cardDesc}</p>
                                <dl>
                                    <div><dt>Best for</dt><dd>{m.compare.bestFor}</dd></div>
                                    <div><dt>Day-to-day direction</dt><dd>{m.compare.direction}</dd></div>
                                    <div><dt>Shape</dt><dd>{m.compare.shape}</dd></div>
                                </dl>
                                <Link to={`/engagement-models/${m.slug}`} className="sf-model-link">
                                    How it works <ArrowRight size={15} aria-hidden="true" />
                                </Link>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </Section>

            {/* Comparison */}
            <Section
                id="compare"
                tone="white"
                eyebrow="Why Use a Staffing Partner"
                title="Hiring Alone vs. With KAM Global AI"
                intro="You keep the final decision either way. The difference is who carries the sourcing and screening load."
            >
                <motion.div className="sf-compare" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT}>
                    <table>
                        <caption className="sr-only">Comparison of hiring alone and hiring with KAM Global AI</caption>
                        <thead>
                            <tr>
                                <th scope="col"><span className="sr-only">Topic</span></th>
                                <th scope="col">Hiring alone</th>
                                <th scope="col" className="sf-compare-us">With KAM Global AI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {service.compare.map((r) => (
                                <tr key={r.topic}>
                                    <th scope="row">{r.topic}</th>
                                    <td><Minus size={16} aria-hidden="true" />{r.alone}</td>
                                    <td className="sf-compare-us"><CheckCircle2 size={16} aria-hidden="true" />{r.withUs}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </Section>

            {/* Fit + discuss */}
            <Section
                id="fit"
                tone="white"
                eyebrow="Is It Right for You?"
                title="A Good Fit When…"
                intro="These are the signs IT staffing will work well, and the topics we cover before sharing profiles."
            >
                <div className="sf-fit">
                    <div className="sf-fit-card">
                        <h3>IT staffing may suit you if</h3>
                        <CheckList items={augmentation.fit} cols={1} />
                    </div>
                    <div className="sf-fit-card sf-fit-card--alt">
                        <h3>What we discuss with you</h3>
                        <CheckList items={service.discuss} cols={2} />
                        <div className="sf-fit-industries">
                            <span>Often used in</span>
                            <ChipList
                                label="Relevant industries"
                                items={service.industries.map((slug) => {
                                    const ind = getIndustry(slug);
                                    return { label: ind.name, to: `/industries/${ind.slug}` };
                                })}
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* FAQ */}
            <Section id="faq" tone="white" eyebrow="FAQ" title="Questions, Answered">
                <div className="sf-faq">
                    {service.faqs.map((f, i) => (
                        <details key={f.q} className="sf-faq-item" open={i === 0}>
                            <summary>
                                {f.q}
                                <ChevronDown size={18} aria-hidden="true" />
                            </summary>
                            <p>{f.a}</p>
                        </details>
                    ))}
                </div>
            </Section>

            <MoreITServices current={service.slug} extras={itCrossLinks(service)} />

            <CtaBand
                title="Tell Us the Role. We'll Find the Fit."
                text="Share the skills, seniority, overlap hours and start date you need. We will review them and confirm the most suitable next step."
                primary={{ label: service.hero.cta, to: primaryLink }}
                secondary={{ label: 'Book a Discovery Call', to: callLink }}
                tertiary={{ label: 'Compare Engagement Models', to: '/engagement-models' }}
            />
        </div>
    );
}
