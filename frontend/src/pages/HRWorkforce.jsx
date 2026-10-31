import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Building2, Handshake, Briefcase } from 'lucide-react';
import { Seo, CtaLink, CtaBand, Notice } from '../components/page/PageKit';
import {
    HrHead,
    IndustryCards,
    CoverageSelector,
    CandidateBand,
    PartnerProgram,
    TrustGrid,
    FaqTabs,
} from '../components/hr/HRKit';
import {
    hrStats,
    hrCountries,
    overseasSupport,
    hrContactLink,
    hrDemoLink,
    candidateLink,
} from '../data/hrWorkforce';

const EASE = [0.22, 1, 0.36, 1];
const HEADLINE = [['Hire', 'for'], ['the', 'roles'], ['you', 'need.']];
const KEYWORD = 'need.';

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

const HRWorkforce = () => {
    const stats = hrStats.filter((s) => s.value !== null);

    return (
        <div className={`pg-page hr-page${import.meta.env.DEV ? ' hr-dev' : ''}`}>
            <Seo
                title="HR & Workforce | Jobs, Hiring and Partnerships | KAM Global"
                description="Employers review HR Solutions. Job seekers use Careers for open roles. Partners read the partnership process on About. Recruitment, staffing and payroll administration are scoped for India and the GCC."
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
                                Jobs, hiring and partnerships
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
                                Employers can review HR Solutions for recruitment, staffing and payroll administration.
                                Open roles are listed on Careers, grouped by service.
                            </motion.p>
                            <motion.div
                                className="hr-hero-actions"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
                            >
                                <CtaLink to={hrDemoLink('HR Technology')} variant="primary">Book a Demo</CtaLink>
                                <CtaLink to="/careers#jobs" variant="outline">See open roles</CtaLink>
                            </motion.div>
                            <ul className="hr-hero-trust" aria-label="Countries we focus on">
                                {hrCountries.map((c) => <li key={c.code} title={c.name}>{c.code}</li>)}
                                <li className="hr-hero-trust-label">India · GCC</li>
                            </ul>
                        </div>
                        <HeroVisual />
                    </div>

                    <nav className="hr-intent" aria-label="Choose your path">
                        <div className="hr-intent-inner">
                            <a href="/services/hr-solutions"><Building2 size={17} aria-hidden="true" />I&apos;m hiring</a>
                            <Link to="/careers#jobs"><Briefcase size={17} aria-hidden="true" />I&apos;m looking for a job</Link>
                            <Link to="/about#for-partners"><Handshake size={17} aria-hidden="true" />I want to partner</Link>
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
                        eyebrow="For employers"
                        title="HR services are listed once."
                        intro="Recruitment, staffing, payroll administration and HR systems are described under HR Solutions, so this page can stay focused on jobs and workforce programmes."
                    />
                    <CtaLink to="/services/hr-solutions" variant="navy">View HR Solutions</CtaLink>
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
                        title="India and the GCC."
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
                        title="Open roles are on Careers."
                        intro="Every opening is listed once, on the Careers page, under the service it belongs to."
                    />
                    <CtaLink to="/careers#jobs" variant="navy">See open roles</CtaLink>
                </div>
            </section>

            <section id="candidates" className="hr-section hr-section--tight" aria-label="Candidate support">
                <div className="container">
                    <CandidateBand overseas={overseasSupport} />
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
                title="Choose the path that matches you"
                text="Employers enquire about HR Solutions. Job seekers apply on Careers. Partners use the partnership enquiry."
                primary={{ label: 'Book a Demo', to: hrDemoLink('HR Technology') }}
                secondary={{ label: 'Talk to a Recruiter', to: hrContactLink('Recruitment') }}
                tertiary={{ label: 'Register as a candidate', to: candidateLink() }}
                jobs
            />
        </div>
    );
};

export default HRWorkforce;
