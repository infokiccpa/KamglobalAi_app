import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Building2, Search, MapPin, Handshake, Cpu, ShieldCheck, Globe2, Lock, Layers } from 'lucide-react';
import { Seo, CtaLink, CtaBand, Notice } from '../components/page/PageKit';
import {
    HrHead,
    ServicesBento,
    TechEcosystem,
    PayrollWorkflow,
    JourneyTabs,
    IndustryCards,
    CoverageSelector,
    JobCard,
    JobsEmpty,
    CandidateBand,
    PartnerProgram,
    TrustGrid,
    FaqTabs,
    PayrollReadiness,
} from '../components/hr/HRKit';
import {
    hrStats,
    hrCountries,
    hrJobs,
    jobCategories,
    overseasSupport,
    SAMPLE_JOBS,
    hrContactLink,
    hrDemoLink,
    candidateLink,
} from '../data/hrWorkforce';
import { useJobs } from '../lib/useJobs';

const EASE = [0.22, 1, 0.36, 1];
const HEADLINE = [['Hire', 'smarter.'], ['Pay', 'accurately.'], ['Grow', 'globally.']];
const KEYWORD = 'accurately.';

const tiltHero = (event) => {
    if (event.pointerType !== 'mouse') return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--ry', `${x * 6}deg`);
    el.style.setProperty('--rx', `${y * -6}deg`);
};

const resetHero = (event) => {
    event.currentTarget.style.setProperty('--ry', '0deg');
    event.currentTarget.style.setProperty('--rx', '0deg');
};

const differentiators = [
    { icon: Cpu, title: 'Tech-enabled hiring', desc: 'Requisitions, pipelines and interviews run on our ATS, so progress is visible at every stage.', image: '/images/hr/hr-technology.jpg', alt: 'Applicant tracking and payroll dashboards on a laptop and monitor' },
    { icon: ShieldCheck, title: 'Compliance-first payroll', desc: 'Compliance checks and approvals are built into every pay run, with records kept for audit.', image: '/images/hr/hr-payroll.jpg', alt: 'Payroll specialist reviewing salary reports' },
    { icon: Globe2, title: 'India, GCC and USA reach', desc: 'One team for hiring across India, Kuwait, Saudi Arabia, Qatar, Bahrain, UAE and the USA.', image: '/images/hr/hr-hero.jpg', alt: 'Recruiter welcoming a new candidate in a modern office' },
    { icon: Lock, title: 'Confidential executive search', desc: 'Discreet, research-led search for leadership roles, with confidentiality agreed up front.', image: '/images/hr/hr-executive-search.jpg', alt: 'Private executive search meeting in an evening office' },
    { icon: Layers, title: 'End to end, under one roof', desc: 'Recruitment, staffing, payroll, advisory and verification from one accountable partner.', image: '/images/hr/hr-advisory.jpg', alt: 'HR consultant presenting a workforce plan to leaders' },
];

const LatestJobs = () => {
    const { status, jobs } = useJobs('hr', hrJobs);
    const showingSamples = status === 'offline' && SAMPLE_JOBS;
    if (status === 'loading') return <div className="hr-jobs-grid" aria-busy="true" />;
    return (
        <>
            {showingSamples && <p className="hr-sample-note">The jobs API is not running, so sample listings are shown (development only). Post real openings from the admin panel.</p>}
            {jobs.length > 0 ? (
                <div className="hr-jobs-grid" data-todo={showingSamples || undefined}>
                    {jobs.slice(0, 6).map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
                </div>
            ) : (
                <JobsEmpty />
            )}
        </>
    );
};

const HeroVisual = () => (
    <motion.div
        className="hr-hero-visual"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
    >
        <div className="hr-hero-photo" onPointerMove={tiltHero} onPointerLeave={resetHero}>
            <img
                src="/images/hr/hr-hero.jpg"
                alt="KAM Global recruiter shaking hands with a candidate while the HR team reviews profiles"
                width="1024"
                height="576"
                fetchpriority="high"
            />
        </div>
        <div className="hr-float hr-float--a" aria-hidden="true">
            <strong>Hiring pipeline</strong>
            <div className="hr-float-pipe">
                {['Applied', 'Screen', 'Interview', 'Offer'].map((s, k) => (
                    <span key={s}><i style={{ '--k': k }} />{s}</span>
                ))}
            </div>
        </div>
        <div className="hr-float hr-float--b" aria-hidden="true">
            <strong>Payslip</strong>
            <div className="hr-float-slip">
                <span>Earnings <b /></span>
                <span>Deductions <b /></span>
                <span className="is-total">Net pay <b /></span>
            </div>
        </div>
        <div className="hr-float hr-float--c" aria-hidden="true">
            <strong>Hiring funnel</strong>
            <div className="hr-float-funnel">
                {[100, 78, 54, 30].map((w) => <i key={w} style={{ width: `${w}%` }} />)}
            </div>
        </div>
    </motion.div>
);

const JobsSearch = () => {
    const navigate = useNavigate();
    const [q, setQ] = useState('');
    const [loc, setLoc] = useState('');

    const submit = (event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        if (q.trim()) params.set('q', q.trim());
        if (loc) params.set('location', loc);
        navigate(`/hr/jobs${params.toString() ? `?${params}` : ''}`);
    };

    return (
        <>
            <form className="hr-search" role="search" onSubmit={submit}>
                <label>
                    <Search size={18} aria-hidden="true" />
                    <span className="sr-only">Role or skill</span>
                    <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Role or skill" />
                </label>
                <label>
                    <MapPin size={18} aria-hidden="true" />
                    <span className="sr-only">Location</span>
                    <select value={loc} onChange={(e) => setLoc(e.target.value)}>
                        <option value="">Any location</option>
                        {hrCountries.map((c) => <option key={c.code} value={c.name}>{c.name}</option>)}
                    </select>
                </label>
                <button type="submit" className="pg-btn pg-btn--primary"><span>Search jobs</span></button>
            </form>
            <ul className="hr-chips" aria-label="Job categories">
                {jobCategories.map((c) => (
                    <li key={c}>
                        <button type="button" onClick={() => navigate(`/hr/jobs?category=${encodeURIComponent(c)}`)}>{c}</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

const HRWorkforce = () => {
    const stats = hrStats.filter((s) => s.value !== null);

    return (
        <div className={`pg-page hr-page${import.meta.env.DEV ? ' hr-dev' : ''}`}>
            <Seo
                title="HR & Workforce Services | Recruitment, Staffing & Payroll | KAM Global"
                description="Recruitment, contract staffing, payroll outsourcing, HR advisory, executive search and background verification, backed by ATS, HRMS and payroll technology across India, the GCC and the USA."
                path="/hr"
                crumbs={[{ label: 'Home', to: '/' }, { label: 'HR & Workforce', to: '/hr' }]}
            />

            <section className="hr-hero" aria-labelledby="hr-hero-title">
                <span className="hr-hero-dots" aria-hidden="true" />
                <div className="container">
                    <div className="hr-hero-grid">
                        <div>
                            <motion.span
                                className="hr-eyebrow"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: EASE }}
                            >
                                Workforce Services + HR Technology
                            </motion.span>
                            <h1 id="hr-hero-title">
                                {HEADLINE.map((line, li) => (
                                    <span key={line.join(' ')} className="hr-line">
                                        {line.map((w, wi) => (
                                            <Fragment key={w}>
                                            <motion.span
                                                className={`hr-word${w === KEYWORD ? ' hr-key' : ''}`}
                                                initial={{ opacity: 0, y: '0.5em' }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.1 + (li * 2 + wi) * 0.08, ease: EASE }}
                                            >
                                                {w}
                                            </motion.span>
                                            {' '}
                                            </Fragment>
                                        ))}
                                    </span>
                                ))}
                            </h1>
                            <motion.p
                                className="hr-hero-sub"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
                            >
                                KAM Global brings recruitment, contract staffing and payroll together with our own ATS, HRMS
                                and payroll platforms, so you can hire, pay and grow your workforce with one partner.
                            </motion.p>
                            <motion.div
                                className="hr-hero-actions"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
                            >
                                <CtaLink to={hrDemoLink('HR Technology')} variant="primary">Book a Demo</CtaLink>
                                <CtaLink to="/hr/jobs" variant="outline">Explore Jobs</CtaLink>
                            </motion.div>
                            <ul className="hr-hero-trust" aria-label="Countries we focus on">
                                {hrCountries.map((c) => <li key={c.code} title={c.name}>{c.code}</li>)}
                                <li className="hr-hero-trust-label">India · GCC · USA</li>
                            </ul>
                        </div>
                        <HeroVisual />
                    </div>

                    <nav className="hr-intent" aria-label="Choose your path">
                        <div className="hr-intent-inner">
                            <a href="#services"><Building2 size={17} aria-hidden="true" />I&apos;m hiring</a>
                            <a href="#jobs"><Search size={17} aria-hidden="true" />I&apos;m looking for a job</a>
                            <a href="#partners"><Handshake size={17} aria-hidden="true" />I want to partner</a>
                        </div>
                    </nav>

                    {stats.length > 0 && (
                        <div className="hr-stats" data-todo>
                            {stats.map((s) => (
                                <div key={s.key} className="hr-stat">
                                    <strong><CountUp end={s.value} duration={1.6} enableScrollSpy scrollSpyOnce />{s.suffix}</strong>
                                    <span>{s.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section id="services" className="hr-section" aria-labelledby="services-title">
                <div className="container">
                    <HrHead
                        id="services-title"
                        eyebrow="Workforce Services"
                        title="Six services. One accountable partner."
                        intro="From your first hire to monthly payroll, choose a single service or combine them."
                    />
                    <ServicesBento />
                </div>
            </section>

            <section id="technology" className="hr-section hr-section--tight" aria-label="HR technology">
                <div className="container">
                    <TechEcosystem />
                </div>
            </section>

            <section id="payroll-workflow" className="hr-section" aria-labelledby="payroll-title">
                <div className="container">
                    <HrHead
                        id="payroll-title"
                        eyebrow="Payroll Workflow"
                        title="Eight steps to an accurate pay run."
                        intro="Every month follows the same controlled sequence, from attendance to the employee's payslip."
                    />
                    <PayrollWorkflow />
                </div>
            </section>

            <section id="how-it-works" className="hr-section hr-section--tight" aria-labelledby="journey-title">
                <div className="container">
                    <HrHead
                        id="journey-title"
                        eyebrow="How It Works"
                        title="A clear journey for every service."
                        intro="See the end-to-end steps we follow, so you know what happens next."
                    />
                    <JourneyTabs />
                </div>
            </section>

            <section id="industries" className="hr-section" aria-labelledby="industries-title">
                <div className="container">
                    <HrHead
                        id="industries-title"
                        eyebrow="Industries"
                        title="Talent for the sectors that keep economies moving."
                        intro="Hover or tap an industry to see typical roles we place."
                    />
                    <IndustryCards />
                </div>
            </section>

            <section id="coverage" className="hr-section hr-section--tight" aria-labelledby="coverage-title">
                <div className="container">
                    <HrHead
                        id="coverage-title"
                        eyebrow="Global Coverage"
                        title="India, the GCC and the USA."
                        intro="Choose a country to see how we can support you there."
                    />
                    <CoverageSelector />
                    <Notice title="Availability">
                        Service availability varies by country and workforce type: confirm with our team.
                    </Notice>
                </div>
            </section>

            <section id="jobs" className="hr-section" aria-labelledby="jobs-title">
                <div className="container">
                    <HrHead
                        id="jobs-title"
                        eyebrow="For Job Seekers"
                        title="Find your next role, at home or overseas."
                        intro="Search by role, skill or location, or browse by category."
                    />
                    <JobsSearch />
                    <LatestJobs />
                    <div className="pg-section-cta pg-section-cta--center">
                        <CtaLink to="/hr/jobs" variant="navy">View all jobs</CtaLink>
                    </div>
                </div>
            </section>

            <section id="candidates" className="hr-section hr-section--tight" aria-label="Candidate support">
                <div className="container">
                    <CandidateBand overseas={overseasSupport} />
                </div>
            </section>

            <section id="why" className="hr-section" aria-labelledby="why-title">
                <div className="container">
                    <HrHead
                        id="why-title"
                        eyebrow="Why KAM Global"
                        title="People expertise, backed by our own technology."
                    />
                    <div className="hr-why">
                        {differentiators.map((d, i) => {
                            const Icon = d.icon;
                            return (
                                <motion.article
                                    key={d.title}
                                    className={`hr-why-row${i % 2 ? ' is-reverse' : ''}`}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, ease: EASE }}
                                >
                                    <div className="hr-why-media">
                                        <img src={d.image} alt={d.alt} loading="lazy" width="1024" height="576" />
                                    </div>
                                    <div className="hr-why-copy">
                                        <motion.span
                                            className="hr-why-icon"
                                            initial={{ scale: 0.6, rotate: -14, opacity: 0 }}
                                            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                                            viewport={{ once: true, amount: 0.6 }}
                                            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.25 }}
                                        >
                                            <Icon size={22} aria-hidden="true" />
                                        </motion.span>
                                        <span className="hr-why-num">{String(i + 1).padStart(2, '0')}</span>
                                        <h3>{d.title}</h3>
                                        <p>{d.desc}</p>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="tools" className="hr-section hr-section--tight" aria-labelledby="tools-title">
                <div className="container">
                    <HrHead
                        id="tools-title"
                        eyebrow="Free Tool"
                        title="How ready is your payroll?"
                        intro="Answer eight quick questions to get a readiness score and a tailored recommendation."
                    />
                    <PayrollReadiness />
                </div>
            </section>

            <section id="partners" className="hr-section" aria-labelledby="partners-title">
                <div className="container">
                    <PartnerProgram />
                </div>
            </section>

            <section id="trust" className="hr-section hr-section--tight" aria-labelledby="trust-title">
                <div className="container">
                    <HrHead
                        id="trust-title"
                        eyebrow="Trust & Security"
                        title="Built to protect people data."
                        intro="Controls designed into our platforms from the start."
                    />
                    <TrustGrid />
                    <div className="pg-section-cta pg-section-cta--center">
                        <CtaLink to="/hr/trust" variant="outline">Visit the Trust page</CtaLink>
                    </div>
                </div>
            </section>

            <section id="faq" className="hr-section" aria-labelledby="faq-title">
                <div className="container">
                    <HrHead id="faq-title" eyebrow="FAQ" title="Questions, answered." />
                    <FaqTabs />
                </div>
            </section>

            <CtaBand
                id="hr-cta"
                eyebrow="HR & Workforce"
                title="Ready to build your workforce?"
                text="Tell us about the roles, payroll or HR support you need. We will confirm the right next step."
                primary={{ label: 'Book a Demo', to: hrDemoLink('HR Technology') }}
                secondary={{ label: 'Talk to a Recruiter', to: hrContactLink('Recruitment') }}
                tertiary={{ label: 'Register as a candidate', to: candidateLink() }}
            />
        </div>
    );
};

export default HRWorkforce;
