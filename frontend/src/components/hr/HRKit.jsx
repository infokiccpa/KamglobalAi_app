import { useId, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import {
    ArrowRight,
    Check,
    ChevronDown,
    Lock,
    MapPin,
    Briefcase,
    Clock,
    Users,
    Wallet,
    MessageCircle,
    Bookmark,
    BookmarkCheck,
    Sparkles,
} from 'lucide-react';
import { CtaLink } from '../page/PageKit';
import { formatDeadline } from '../../lib/deadline';
import {
    hrServices,
    hrTechnology,
    payrollSteps,
    hiringJourneys,
    hrIndustries,
    hrCountries,
    partnerTypes,
    partnerBenefits,
    trustClaims,
    hrFaqs,
    HR_WHATSAPP,
    candidateLink,
    hrDemoLink,
    hrPartnerLink,
    hrContactLink,
} from '../../data/hrWorkforce';
import './HRKit.css';

const EASE = [0.22, 1, 0.36, 1];
const VIEW = { once: true, amount: 0.2 };

const fadeUp = (i = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEW,
    transition: { duration: 0.6, ease: EASE, delay: Math.min(i, 8) * 0.07 },
});

const subscribeMedia = (query) => (callback) => {
    const media = window.matchMedia(query);
    media.addEventListener('change', callback);
    return () => media.removeEventListener('change', callback);
};

const useMedia = (query) => {
    const subscribe = useMemo(() => subscribeMedia(query), [query]);
    return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
};

const trackSpot = (event) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--sx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--sy', `${event.clientY - rect.top}px`);
};

const whatsappHref = (text) => (HR_WHATSAPP ? `https://wa.me/${HR_WHATSAPP}?text=${encodeURIComponent(text)}` : '');

export const HrHead = ({ eyebrow, title, intro, light = false, align = 'center', id }) => (
    <motion.header className={`hr-head hr-head--${align}${light ? ' hr-head--light' : ''}`} {...fadeUp()}>
        {eyebrow && <span className="hr-eyebrow">{eyebrow}</span>}
        <h2 id={id}>{title}</h2>
        {intro && <p>{intro}</p>}
    </motion.header>
);

/* ---------- Services bento ---------- */

export const ServicesBento = () => (
    <div className="hr-bento">
        {hrServices.map((s, i) => {
            const Icon = s.icon;
            return (
                <motion.div key={s.slug} className={`hr-bento-cell hr-bento-cell--${i + 1}`} {...fadeUp(i)}>
                    <Link
                        to={`/hr/services/${s.slug}`}
                        className={`hr-bento-card${s.confidential ? ' is-dark' : ''}`}
                        onPointerMove={trackSpot}
                    >
                        <span className="hr-spot" aria-hidden="true" />
                        {(i === 0 || s.confidential) && (
                            <span className="hr-bento-media" aria-hidden="true">
                                <img src={s.image} alt="" loading="lazy" width="1024" height="576" />
                            </span>
                        )}
                        <span className="hr-bento-top">
                            <span className="hr-icon"><Icon size={20} strokeWidth={1.75} aria-hidden="true" /></span>
                            {s.confidential && (
                                <span className="hr-badge hr-badge--lock"><Lock size={12} aria-hidden="true" /> Confidential</span>
                            )}
                        </span>
                        <h3>{s.name}</h3>
                        <p>{s.cardDesc}</p>
                        <ul>
                            {s.points.map((p) => (
                                <li key={p}><Check size={14} aria-hidden="true" />{p}</li>
                            ))}
                        </ul>
                        <span className="hr-more">Learn more <ArrowRight size={15} aria-hidden="true" /></span>
                    </Link>
                </motion.div>
            );
        })}
    </div>
);

/* ---------- Technology ecosystem ---------- */

const AtsMock = () => (
    <div className="hr-mock hr-mock--ats" aria-hidden="true">
        {[['Applied', 4], ['Screening', 3], ['Interview', 2], ['Offer', 1]].map(([col, n]) => (
            <div key={col} className="hr-mock-col">
                <span className="hr-mock-col-title">{col}<em>{n}</em></span>
                {Array.from({ length: n }, (_, k) => (
                    <span key={k} className="hr-mock-cand">
                        <i />
                        <b style={{ width: `${55 + ((k * 17) % 35)}%` }} />
                    </span>
                ))}
            </div>
        ))}
    </div>
);

const HrmsMock = () => (
    <div className="hr-mock hr-mock--hrms" aria-hidden="true">
        <div className="hr-mock-kpis">
            <span><em>Present today</em><strong>—</strong></span>
            <span><em>On leave</em><strong>—</strong></span>
            <span><em>New joiners</em><strong>—</strong></span>
        </div>
        {Array.from({ length: 5 }, (_, k) => (
            <span key={k} className="hr-mock-row">
                <i />
                <b style={{ width: `${40 + ((k * 13) % 30)}%` }} />
                <span className={`hr-mock-dot${k === 2 ? ' is-amber' : ''}`} />
            </span>
        ))}
    </div>
);

const PayrollMock = () => (
    <div className="hr-mock hr-mock--payroll" aria-hidden="true">
        <div className="hr-mock-slip">
            <span className="hr-mock-slip-head"><strong>Payslip</strong><em>Monthly</em></span>
            {['Basic', 'Allowances', 'Deductions', 'Net pay'].map((row, k) => (
                <span key={row} className={`hr-mock-slip-row${k === 3 ? ' is-total' : ''}`}>
                    <em>{row}</em>
                    <b style={{ width: `${30 + k * 8}%` }} />
                </span>
            ))}
        </div>
        <div className="hr-mock-bars">
            {[40, 62, 55, 78, 70, 88].map((h, k) => <span key={k} style={{ height: `${h}%` }} />)}
        </div>
    </div>
);

const MOCKS = { ats: AtsMock, hrms: HrmsMock, payroll: PayrollMock };

const EcosystemDiagram = () => (
    <div className="hr-eco-diagram" aria-hidden="true">
        <svg viewBox="0 0 600 120" preserveAspectRatio="none">
            <path className="hr-eco-line" d="M100 60 H300" />
            <path className="hr-eco-line" d="M300 60 H500" />
            <path className="hr-eco-line hr-eco-line--flow" d="M100 60 H300" />
            <path className="hr-eco-line hr-eco-line--flow hr-eco-line--late" d="M300 60 H500" />
        </svg>
        {hrTechnology.map((t) => {
            const Icon = t.icon;
            return (
                <span key={t.slug} className="hr-eco-node">
                    <span className="hr-eco-node-ring"><Icon size={22} strokeWidth={1.75} /></span>
                    <strong>{t.name}</strong>
                    <em>{t.full}</em>
                </span>
            );
        })}
    </div>
);

export const TechEcosystem = () => {
    const [active, setActive] = useState(0);
    const baseId = useId();
    const tech = hrTechnology[active];
    const Mock = MOCKS[tech.slug];

    const onKey = (event) => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        const next = (active + (event.key === 'ArrowRight' ? 1 : -1) + hrTechnology.length) % hrTechnology.length;
        setActive(next);
        document.getElementById(`${baseId}-tab-${next}`)?.focus();
    };

    return (
        <div className="hr-eco">
            <span className="hr-eco-glow" aria-hidden="true" />
            <HrHead
                light
                eyebrow="HR Technology"
                title="One connected stack: ATS to HRMS to Payroll."
                intro="Hiring data flows into employee records, and attendance flows into payroll, so information is entered once and used throughout."
            />
            <EcosystemDiagram />

            <div className="hr-tabs" role="tablist" aria-label="HR technology" onKeyDown={onKey}>
                {hrTechnology.map((t, i) => (
                    <button
                        key={t.slug}
                        id={`${baseId}-tab-${i}`}
                        type="button"
                        role="tab"
                        aria-selected={active === i}
                        aria-controls={`${baseId}-panel`}
                        tabIndex={active === i ? 0 : -1}
                        className={`hr-tab${active === i ? ' is-active' : ''}`}
                        onClick={() => setActive(i)}
                    >
                        {t.name}
                        {active === i && <motion.span layoutId={`${baseId}-underline`} className="hr-tab-line" />}
                    </button>
                ))}
            </div>

            <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`} className="hr-eco-panel">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tech.slug}
                        className="hr-eco-panel-inner"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: EASE }}
                    >
                        <div className="hr-eco-copy">
                            <h3>{tech.full}</h3>
                            <p>{tech.desc}</p>
                            <ul className="hr-eco-features">
                                {tech.features.map((f, i) => (
                                    <motion.li
                                        key={f.title}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.08 + i * 0.06, duration: 0.35, ease: EASE }}
                                    >
                                        <Check size={15} aria-hidden="true" />
                                        <span>{f.title}</span>
                                        {f.roadmap && <span className="hr-badge hr-badge--roadmap">Roadmap</span>}
                                    </motion.li>
                                ))}
                            </ul>
                            <div className="hr-eco-actions">
                                <CtaLink to={`/hr/technology/${tech.slug}`} variant="primary">Explore {tech.name}</CtaLink>
                                <CtaLink to={hrDemoLink(`HR ${tech.name}`)} variant="ghost">See it live: Book a demo</CtaLink>
                            </div>
                        </div>
                        <div className="hr-eco-visual">
                            <span className="hr-mock-chrome"><i /><i /><i /><em>{tech.name}</em></span>
                            <Mock />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ---------- Payroll workflow (pinned on desktop) ---------- */

const StepPanel = ({ index }) => {
    const step = payrollSteps[index];
    return (
        <div className="hr-pw-panel">
            <span className="hr-mock-chrome"><i /><i /><i /><em>Payroll run</em></span>
            <div className="hr-pw-panel-body">
                <span className="hr-pw-panel-step">Step {String(index + 1).padStart(2, '0')} of {payrollSteps.length}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <ul className="hr-pw-checks" aria-hidden="true">
                    {payrollSteps.map((s, i) => (
                        <li key={s.title} className={i < index ? 'is-done' : i === index ? 'is-now' : ''}>
                            <span>{i < index ? <Check size={12} /> : i + 1}</span>
                            <b />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export const PayrollWorkflow = () => {
    const ref = useRef(null);
    const [active, setActive] = useState(0);
    const reduce = useReducedMotion();
    const wide = useMedia('(min-width: 961px)');
    const pinned = wide && !reduce;
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (!pinned) return;
        const next = Math.min(payrollSteps.length - 1, Math.floor(v * payrollSteps.length));
        if (next !== active) setActive(next);
    });

    if (!pinned) {
        return (
            <ol className="hr-pw-timeline">
                {payrollSteps.map((s, i) => (
                    <motion.li key={s.title} {...fadeUp(i)}>
                        <span className="hr-pw-num">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </div>
                    </motion.li>
                ))}
            </ol>
        );
    }

    return (
        <div ref={ref} className="hr-pw" style={{ height: `${payrollSteps.length * 55 + 60}vh` }}>
            <div className="hr-pw-sticky">
                <ol className="hr-pw-steps">
                    <span className="hr-pw-rail" aria-hidden="true">
                        <motion.span className="hr-pw-fill" style={{ scaleY: scrollYProgress }} />
                    </span>
                    {payrollSteps.map((s, i) => (
                        <li key={s.title} className={`${i === active ? 'is-active' : ''}${i < active ? ' is-done' : ''}`}>
                            <span className="hr-pw-num">{i < active ? <Check size={14} aria-hidden="true" /> : String(i + 1).padStart(2, '0')}</span>
                            <span className="hr-pw-title">{s.title}</span>
                        </li>
                    ))}
                </ol>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: EASE }}
                    >
                        <StepPanel index={active} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ---------- Hiring journey tabs ---------- */

export const JourneyTabs = () => {
    const [active, setActive] = useState(0);
    const journey = hiringJourneys[active];
    return (
        <div className="hr-journey">
            <div className="hr-seg" role="group" aria-label="Choose a service">
                {hiringJourneys.map((j, i) => (
                    <button
                        key={j.key}
                        type="button"
                        aria-pressed={active === i}
                        className={`hr-seg-btn${active === i ? ' is-active' : ''}`}
                        onClick={() => setActive(i)}
                    >
                        {active === i && <motion.span layoutId="hr-seg-pill" className="hr-seg-pill" transition={{ duration: 0.4, ease: EASE }} />}
                        <span>{j.label}</span>
                    </button>
                ))}
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={journey.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <ol className="hr-chevrons" aria-label={`${journey.label} workflow`}>
                        <motion.span
                            className="hr-chevrons-line"
                            aria-hidden="true"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.9, ease: EASE }}
                        />
                        {journey.steps.map((s, i) => (
                            <motion.li
                                key={s}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: EASE }}
                            >
                                <span className="hr-chevron-num">{i + 1}</span>
                                <span className="hr-chevron-label">{s}</span>
                            </motion.li>
                        ))}
                    </ol>
                    <p className="hr-journey-time" data-todo>
                        <Clock size={15} aria-hidden="true" />
                        <span><strong>Estimated timeline:</strong> {journey.timeline}. <em>Illustrative only; confirmed per requirement.</em></span>
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

/* ---------- Industries ---------- */

export const IndustryCards = () => (
    <div className="hr-industries">
        {hrIndustries.map((ind, i) => {
            const Icon = ind.icon;
            return (
                <motion.article key={ind.key} className="hr-ind" tabIndex={0} {...fadeUp(i)}>
                    <img src={ind.image} alt="" loading="lazy" width="1024" height="576" />
                    <span className="hr-ind-shade" aria-hidden="true" />
                    <div className="hr-ind-body">
                        <span className="hr-ind-icon"><Icon size={18} aria-hidden="true" /></span>
                        <h3>{ind.name}</h3>
                        <div className="hr-ind-roles" data-todo>
                            <span>Typical roles we place</span>
                            <ul>{ind.roles.map((r) => <li key={r}>{r}</li>)}</ul>
                        </div>
                    </div>
                </motion.article>
            );
        })}
    </div>
);

/* ---------- Global coverage ---------- */

export const CoverageSelector = () => {
    const [code, setCode] = useState('IN');
    const country = hrCountries.find((c) => c.code === code);
    return (
        <div className="hr-cover">
            <div className="hr-cover-list" role="group" aria-label="Choose a country">
                {hrCountries.map((c) => (
                    <button
                        key={c.code}
                        type="button"
                        aria-pressed={code === c.code}
                        className={`hr-cover-btn${code === c.code ? ' is-active' : ''}`}
                        onClick={() => setCode(c.code)}
                        onPointerEnter={(e) => e.pointerType === 'mouse' && setCode(c.code)}
                    >
                        <span className="hr-cover-pulse" aria-hidden="true" />
                        <span className="hr-cover-code">{c.code}</span>
                        <span>{c.name}</span>
                    </button>
                ))}
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={country.code}
                    className="hr-cover-card"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                >
                    <span className="hr-cover-card-code" aria-hidden="true">{country.code}</span>
                    <h3><MapPin size={18} aria-hidden="true" /> {country.name}</h3>
                    <dl data-todo>
                        <div><dt>Services</dt><dd>{country.services}</dd></div>
                        <div><dt>Compliance</dt><dd>{country.note}</dd></div>
                        <div><dt>Contact</dt><dd>{country.contact ? <a href={`mailto:${country.contact}`}>{country.contact}</a> : 'Contact our team'}</dd></div>
                    </dl>
                    <CtaLink to={hrContactLink(`HR services in ${country.name}`)} variant="navy">Talk to our team</CtaLink>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

/* ---------- Jobs ---------- */

export const JobCard = ({ job, saved, onToggleSave, index = 0 }) => {
    const wa = whatsappHref(`Hi, I am interested in the ${job.title} role (${job.location}).`);
    return (
        <motion.article className="hr-job" {...fadeUp(index)}>
            <div className="hr-job-top">
                <span className="hr-job-cat">{job.category}</span>
                {onToggleSave && (
                    <button
                        type="button"
                        className={`hr-job-save${saved ? ' is-saved' : ''}`}
                        aria-pressed={saved}
                        aria-label={saved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
                        onClick={() => onToggleSave(job.id)}
                    >
                        {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
                    </button>
                )}
            </div>
            <h3><Link to={`/hr/jobs/${job.id}`}>{job.title}</Link></h3>
            <ul className="hr-job-meta">
                <li><MapPin size={14} aria-hidden="true" />{job.location}</li>
                {job.experience && <li><Briefcase size={14} aria-hidden="true" />{job.experience}</li>}
                {job.type && <li><Clock size={14} aria-hidden="true" />{job.type}</li>}
                {job.vacancies > 0 && <li><Users size={14} aria-hidden="true" />{job.vacancies} {job.vacancies === 1 ? 'vacancy' : 'vacancies'}</li>}
                {job.pkg && <li><Wallet size={14} aria-hidden="true" />{job.pkg}</li>}
                {job.closesAt && <li><Clock size={14} aria-hidden="true" />Applications close {formatDeadline(job.closesAt)}</li>}
            </ul>
            <div className="hr-job-actions">
                <CtaLink to={job.applyTo || candidateLink(`Apply: ${job.title} (${job.location})`)} variant="navy">Apply</CtaLink>
                {wa && (
                    <a href={wa} className="hr-wa" target="_blank" rel="noopener noreferrer">
                        <MessageCircle size={16} aria-hidden="true" /> WhatsApp
                    </a>
                )}
            </div>
        </motion.article>
    );
};

export const JobsEmpty = () => (
    <div className="hr-jobs-empty">
        <Sparkles size={22} aria-hidden="true" />
        <h3>New openings are on the way</h3>
        <p>Register your profile and our team will contact you when a matching role opens.</p>
        <CtaLink to={candidateLink()} variant="navy">Register your profile</CtaLink>
    </div>
);

/* ---------- Candidate band ---------- */

export const CandidateBand = ({ overseas }) => {
    const wa = whatsappHref('Hi, I need help with an overseas job application.');
    return (
        <div className="hr-cand">
            <motion.div className="hr-cand-card hr-cand-card--photo" {...fadeUp()}>
                <img src="/images/hr/hr-candidates.jpg" alt="Job seekers registering on tablets with help from a recruiter" loading="lazy" width="1024" height="576" />
                <div className="hr-cand-overlay">
                    <span className="hr-eyebrow hr-eyebrow--amber">For candidates</span>
                    <h3>Register your profile. Join the talent network.</h3>
                    <p>Share your skills and preferred roles once. We contact you when a matching opening is available.</p>
                    <CtaLink to={candidateLink()} variant="primary">Register now</CtaLink>
                </div>
            </motion.div>
            <motion.div className="hr-cand-card hr-cand-card--help" {...fadeUp(1)}>
                <span className="hr-eyebrow hr-eyebrow--amber">Overseas hiring help</span>
                <h3>Questions about an overseas role?</h3>
                <ul>
                    {overseas.map((o) => (
                        <li key={o}><Check size={15} aria-hidden="true" />{o}</li>
                    ))}
                </ul>
                <div className="hr-cand-actions">
                    {wa ? (
                        <a href={wa} className="hr-wa hr-wa--solid" target="_blank" rel="noopener noreferrer">
                            <MessageCircle size={17} aria-hidden="true" /> Chat on WhatsApp
                        </a>
                    ) : (
                        <CtaLink to={candidateLink('Overseas hiring help')} variant="navy">Ask our team</CtaLink>
                    )}
                    <CtaLink to="/hr/jobs?category=Overseas" variant="outline">Overseas jobs</CtaLink>
                </div>
            </motion.div>
        </div>
    );
};

/* ---------- Partners ---------- */

export const PartnerProgram = () => (
    <div className="hr-partner">
        <svg className="hr-partner-net" viewBox="0 0 400 240" aria-hidden="true" focusable="false">
            {[[40, 60, 140, 30], [140, 30, 250, 90], [250, 90, 360, 50], [140, 30, 120, 160], [120, 160, 250, 90], [250, 90, 300, 200], [120, 160, 300, 200]].map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
            ))}
            {[[40, 60], [140, 30], [250, 90], [360, 50], [120, 160], [300, 200]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="5" style={{ animationDelay: `${i * 0.5}s` }} />
            ))}
        </svg>
        <div className="hr-partner-copy">
            <span className="hr-eyebrow hr-eyebrow--light">Partner program</span>
            <h2 id="partners-title">Grow together across markets.</h2>
            <p>We work with organisations that share our focus on quality hiring and compliant workforce delivery.</p>
            <ul className="hr-partner-types">
                {partnerTypes.map((p) => {
                    const Icon = p.icon;
                    return <li key={p.title}><Icon size={16} aria-hidden="true" />{p.title}</li>;
                })}
            </ul>
            <div className="hr-eco-actions">
                <CtaLink to={hrPartnerLink()} variant="primary">Become a partner</CtaLink>
            </div>
        </div>
        <ul className="hr-partner-benefits">
            {partnerBenefits.map((b, i) => (
                <motion.li key={b.title} {...fadeUp(i)}>
                    <strong>{b.title}</strong>
                    <span>{b.desc}</span>
                </motion.li>
            ))}
        </ul>
    </div>
);

/* ---------- Trust teaser ---------- */

export const TrustGrid = () => (
    <div className="hr-trust">
        {trustClaims.map((t, i) => {
            const Icon = t.icon;
            return (
                <motion.div key={t.title} className="hr-trust-item" {...fadeUp(i)}>
                    <span className="hr-icon"><Icon size={20} aria-hidden="true" /></span>
                    <h3>{t.title}</h3>
                    <p>{t.desc}</p>
                </motion.div>
            );
        })}
    </div>
);

/* ---------- FAQ ---------- */

export const FaqTabs = () => {
    const groups = Object.keys(hrFaqs);
    const [group, setGroup] = useState(groups[0]);
    const [open, setOpen] = useState(0);
    const baseId = useId();
    const schema = useMemo(
        () => ({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: Object.values(hrFaqs).flat().map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
        }),
        [],
    );

    return (
        <div className="hr-faq">
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            </Helmet>
            <div className="hr-seg hr-seg--wrap" role="group" aria-label="FAQ topics">
                {groups.map((g) => (
                    <button
                        key={g}
                        type="button"
                        aria-pressed={group === g}
                        className={`hr-seg-btn${group === g ? ' is-active' : ''}`}
                        onClick={() => { setGroup(g); setOpen(0); }}
                    >
                        {group === g && <motion.span layoutId="hr-faq-pill" className="hr-seg-pill" transition={{ duration: 0.4, ease: EASE }} />}
                        <span>{g}</span>
                    </button>
                ))}
            </div>
            <div className="hr-faq-list">
                {hrFaqs[group].map((f, i) => {
                    const isOpen = open === i;
                    return (
                        <div key={f.q} className={`hr-faq-item${isOpen ? ' is-open' : ''}`}>
                            <h3>
                                <button
                                    type="button"
                                    id={`${baseId}-q-${i}`}
                                    aria-expanded={isOpen}
                                    aria-controls={`${baseId}-a-${i}`}
                                    onClick={() => setOpen(isOpen ? -1 : i)}
                                >
                                    {f.q}
                                    <ChevronDown size={18} aria-hidden="true" />
                                </button>
                            </h3>
                            <div id={`${baseId}-a-${i}`} role="region" aria-labelledby={`${baseId}-q-${i}`} className="hr-faq-a">
                                <div><p>{f.a}</p></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* ---------- Payroll readiness checklist ---------- */

const READINESS = [
    'Attendance is captured digitally for every employee',
    'Joiners and leavers are confirmed before each pay run',
    'Pay components and allowances are documented',
    'Statutory deductions are reviewed every cycle',
    'Payroll has a maker-checker approval step',
    'Employees can access payslips online',
    'Payroll reports are shared with management',
    'Payroll data access is limited by role',
];

const readinessAdvice = (score) => {
    if (score >= 7) return 'Strong foundations. A managed payroll platform can add automation, controls and reporting on top.';
    if (score >= 4) return 'Good start. Tightening attendance, approvals and compliance checks will reduce errors and rework.';
    return 'There is room to improve. An outsourced payroll set-up can bring structure, compliance checks and audit-ready records.';
};

export const PayrollReadiness = () => {
    const [answers, setAnswers] = useState(() => READINESS.map(() => null));
    const answered = answers.filter((a) => a !== null).length;
    const score = answers.filter(Boolean).length;
    const done = answered === READINESS.length;
    const pct = Math.round((score / READINESS.length) * 100);
    const set = (i, v) => setAnswers((prev) => prev.map((a, k) => (k === i ? v : a)));

    return (
        <div className="hr-ready">
            <ol className="hr-ready-list">
                {READINESS.map((q, i) => (
                    <li key={q}>
                        <span className="hr-ready-q">{q}</span>
                        <span className="hr-ready-yn" role="group" aria-label={q}>
                            {[['Yes', true], ['No', false]].map(([label, v]) => (
                                <button
                                    key={label}
                                    type="button"
                                    aria-pressed={answers[i] === v}
                                    className={answers[i] === v ? `is-${label.toLowerCase()}` : ''}
                                    onClick={() => set(i, v)}
                                >
                                    {label}
                                </button>
                            ))}
                        </span>
                    </li>
                ))}
            </ol>
            <aside className="hr-ready-result" aria-live="polite">
                <svg viewBox="0 0 120 120" className="hr-ring" aria-hidden="true">
                    <circle cx="60" cy="60" r="52" className="hr-ring-track" />
                    <circle
                        cx="60"
                        cy="60"
                        r="52"
                        className="hr-ring-fill"
                        style={{ strokeDashoffset: `${327 - (327 * pct) / 100}` }}
                    />
                </svg>
                <span className="hr-ring-value">{score}<em>/{READINESS.length}</em></span>
                <h3>{done ? 'Your payroll readiness' : `${answered} of ${READINESS.length} answered`}</h3>
                <p>{done ? readinessAdvice(score) : 'Answer all eight questions to see a tailored recommendation.'}</p>
                {done && (
                    <CtaLink to={hrContactLink(`Payroll readiness score ${score}/${READINESS.length}`)} variant="primary">
                        Discuss my result
                    </CtaLink>
                )}
                <small>A quick self-check, not an audit.</small>
            </aside>
        </div>
    );
};
