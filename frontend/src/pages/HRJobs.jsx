import { useMemo, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, MapPin, Briefcase, Clock, Users, Wallet, ArrowLeft, CalendarClock, Loader } from 'lucide-react';
import { Seo, PageHero, CtaLink, CtaBand, Notice } from '../components/page/PageKit';
import { JobCard, JobsEmpty, CandidateBand } from '../components/hr/HRKit';
import { hrJobs, getHrJob, jobCategories, hrCountries, overseasSupport, SAMPLE_JOBS, candidateLink, HR_BRAND } from '../data/hrWorkforce';
import { useJobs, useJob } from '../lib/useJobs';
import { formatDeadline } from '../lib/deadline';
import NotFound from './NotFound';

const Loading = ({ label }) => (
    <p className="hr-loading" role="status"><Loader size={18} className="hr-spin" aria-hidden="true" /> {label}</p>
);

const PAGE_SIZE = 6;
const SAVED_KEY = 'kam-hr-saved-jobs';
const TYPES = ['Full-time', 'Contract'];

const readSaved = () => {
    try {
        return JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
    } catch {
        return [];
    }
};

const JobsList = () => {
    const [params, setParams] = useSearchParams();
    const [saved, setSaved] = useState(readSaved);
    const { status, jobs } = useJobs('hr', hrJobs);
    const showingSamples = status === 'offline' && SAMPLE_JOBS;
    const q = params.get('q') || '';
    const location = params.get('location') || '';
    const category = params.get('category') || '';
    const type = params.get('type') || '';
    const sort = params.get('sort') || 'newest';
    const onlySaved = params.get('saved') === '1';
    const page = Math.max(1, Number(params.get('page')) || 1);

    const update = (key, value) => {
        const next = new URLSearchParams(params);
        if (value) next.set(key, value);
        else next.delete(key);
        if (key !== 'page') next.delete('page');
        setParams(next, { replace: true });
    };

    const toggleSave = (id) => {
        setSaved((prev) => {
            const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
            localStorage.setItem(SAVED_KEY, JSON.stringify(next));
            return next;
        });
    };

    const results = useMemo(() => {
        const term = q.toLowerCase();
        const list = jobs.filter((j) =>
            (!term || `${j.title} ${j.experience || ''} ${j.category} ${j.summary || ''}`.toLowerCase().includes(term))
            && (!location || `${j.location} ${j.country || ''}`.toLowerCase().includes(location.toLowerCase()))
            && (!category || j.category === category)
            && (!type || j.type === type)
            && (!onlySaved || saved.includes(j.id)));
        return [...list].sort((a, b) => (sort === 'vacancies' ? (b.vacancies || 0) - (a.vacancies || 0) : String(b.posted).localeCompare(String(a.posted))));
    }, [jobs, q, location, category, type, sort, onlySaved, saved]);

    const categories = useMemo(
        () => [...new Set([...jobCategories, ...jobs.map((j) => j.category).filter(Boolean)])],
        [jobs]
    );
    const types = useMemo(() => [...new Set([...TYPES, ...jobs.map((j) => j.type).filter(Boolean)])], [jobs]);

    const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
    const current = Math.min(page, pages);
    const shown = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
    const hasFilters = q || location || category || type || onlySaved;

    return (
        <div className={`pg-page hr-page${import.meta.env.DEV ? ' hr-dev' : ''}`}>
            <Seo
                title={`Jobs in India, the GCC and USA | ${HR_BRAND}`}
                description="Browse technical, engineering, manufacturing, domestic and overseas job openings, and register your profile with KAM Global."
                path="/hr/jobs"
                crumbs={[{ label: 'Home', to: '/' }, { label: 'HR & Workforce', to: '/hr' }, { label: 'Jobs', to: '/hr/jobs' }]}
            />
            <PageHero
                compact
                crumbs={[{ label: 'Home', to: '/' }, { label: 'HR & Workforce', to: '/hr' }, { label: 'Jobs' }]}
                eyebrow="Jobs"
                title="Find Your Next Role"
                sub="Domestic and overseas openings across technical, engineering, manufacturing and more."
                primary={{ label: 'Register your profile', to: candidateLink() }}
            />

            <section className="hr-section hr-section--tight" aria-label="Job search">
                <div className="container">
                    <form className="hr-search" role="search" onSubmit={(e) => e.preventDefault()}>
                        <label>
                            <Search size={18} aria-hidden="true" />
                            <span className="sr-only">Role or skill</span>
                            <input value={q} onChange={(e) => update('q', e.target.value)} placeholder="Role or skill" />
                        </label>
                        <label>
                            <MapPin size={18} aria-hidden="true" />
                            <span className="sr-only">Location</span>
                            <select value={location} onChange={(e) => update('location', e.target.value)}>
                                <option value="">Any location</option>
                                {hrCountries.map((c) => <option key={c.code} value={c.name}>{c.name}</option>)}
                            </select>
                        </label>
                        <label>
                            <span className="sr-only">Sort by</span>
                            <select value={sort} onChange={(e) => update('sort', e.target.value === 'newest' ? '' : e.target.value)}>
                                <option value="newest">Newest first</option>
                                <option value="vacancies">Most vacancies</option>
                            </select>
                        </label>
                    </form>

                    <ul className="hr-chips" aria-label="Filters">
                        {categories.map((c) => (
                            <li key={c}>
                                <button type="button" aria-pressed={category === c} onClick={() => update('category', category === c ? '' : c)}>{c}</button>
                            </li>
                        ))}
                        {types.map((t) => (
                            <li key={t}>
                                <button type="button" aria-pressed={type === t} onClick={() => update('type', type === t ? '' : t)}>{t}</button>
                            </li>
                        ))}
                        <li>
                            <button type="button" aria-pressed={onlySaved} onClick={() => update('saved', onlySaved ? '' : '1')}>
                                Saved ({saved.length})
                            </button>
                        </li>
                    </ul>

                    {showingSamples && <p className="hr-sample-note">The jobs API is not running, so sample listings are shown (development only). Post real openings from the admin panel.</p>}

                    <p className="hr-results" aria-live="polite">
                        {status === 'loading' ? 'Loading openings…' : `${results.length} ${results.length === 1 ? 'opening' : 'openings'}`}
                        {hasFilters && (
                            <button type="button" onClick={() => setParams({}, { replace: true })}>Clear filters</button>
                        )}
                    </p>

                    {status === 'loading' ? (
                        <Loading label="Loading openings" />
                    ) : jobs.length === 0 ? (
                        <JobsEmpty />
                    ) : shown.length === 0 ? (
                        <div className="hr-jobs-empty">
                            <h3>No openings match these filters</h3>
                            <p>Try a different role or location, or register so we can contact you about future openings.</p>
                            <CtaLink to={candidateLink()} variant="navy">Register your profile</CtaLink>
                        </div>
                    ) : (
                        <div className="hr-jobs-grid" data-todo={showingSamples || undefined}>
                            {shown.map((job, i) => (
                                <JobCard key={job.id} job={job} index={i} saved={saved.includes(job.id)} onToggleSave={toggleSave} />
                            ))}
                        </div>
                    )}

                    {pages > 1 && (
                        <nav className="hr-pager" aria-label="Pagination">
                            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                                <button key={n} type="button" aria-current={n === current ? 'page' : undefined} onClick={() => update('page', n === 1 ? '' : String(n))}>
                                    {n}
                                </button>
                            ))}
                        </nav>
                    )}
                </div>
            </section>

            <section className="hr-section" aria-label="Candidate support">
                <div className="container">
                    <CandidateBand overseas={overseasSupport} />
                    <Notice title="Stay safe">
                        Apply only through official KAM Global channels. Contact our team if you are unsure whether a message is genuine.
                    </Notice>
                </div>
            </section>
        </div>
    );
};

const EMPLOYMENT_SCHEMA = { Contract: 'CONTRACTOR', 'Part-time': 'PART_TIME', Internship: 'INTERN', Temporary: 'TEMPORARY' };

const JobDetail = ({ job, sample }) => {
    const applyTo = job.applyTo || candidateLink(`Apply: ${job.title} (${job.location})`);
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        datePosted: job.posted,
        ...(job.closesAt ? { validThrough: job.closesAt } : {}),
        employmentType: EMPLOYMENT_SCHEMA[job.type] || 'FULL_TIME',
        hiringOrganization: { '@type': 'Organization', name: HR_BRAND, sameAs: 'https://kamglobalai.com' },
        jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: job.location, ...(job.country ? { addressCountry: job.country } : {}) } },
        description: job.description || job.summary || `${job.title} in ${job.location}.`,
    };
    const meta = [
        [MapPin, 'Location', job.location],
        [Briefcase, 'Experience / eligibility', job.experience],
        [Clock, 'Employment type', job.type],
        [Users, 'Vacancies', job.vacancies],
        [Wallet, 'Package', job.pkg],
        [CalendarClock, 'Applications close', formatDeadline(job.closesAt)],
    ].filter(([, , value]) => value);

    return (
        <div className={`pg-page hr-page${import.meta.env.DEV ? ' hr-dev' : ''}`}>
            <Seo
                title={`${job.title}, ${job.location} | ${HR_BRAND} Jobs`}
                description={job.summary || `${job.title} opening in ${job.location}.${job.experience ? ` ${job.experience}.` : ''}`}
                path={`/hr/jobs/${job.id}`}
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Jobs', to: '/hr/jobs' }, { label: job.title, to: `/hr/jobs/${job.id}` }]}
            />
            {!sample && (
                <Helmet>
                    <script type="application/ld+json">{JSON.stringify(schema)}</script>
                </Helmet>
            )}
            <PageHero
                compact
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Jobs', to: '/hr/jobs' }, { label: job.title }]}
                eyebrow={job.category}
                title={job.title}
                sub={job.summary || [job.location, job.type].filter(Boolean).join(' · ')}
                primary={{ label: 'Apply now', to: applyTo }}
            />
            <section className="hr-section hr-section--tight">
                <div className="container">
                    <dl className="hr-job-facts" data-todo={sample || undefined}>
                        {meta.map(([Icon, label, value]) => (
                            <div key={label}>
                                <dt><Icon size={16} aria-hidden="true" />{label}</dt>
                                <dd>{value}</dd>
                            </div>
                        ))}
                    </dl>
                    {(job.description || job.requirements?.length > 0) && (
                        <div className="hr-job-body">
                            {job.description && (
                                <>
                                    <h2>About the role</h2>
                                    {job.description.split(/\n{2,}/).map((para) => <p key={para.slice(0, 40)}>{para}</p>)}
                                </>
                            )}
                            {job.requirements?.length > 0 && (
                                <>
                                    <h2>Requirements</h2>
                                    <ul>
                                        {job.requirements.map((r) => <li key={r}>{r}</li>)}
                                    </ul>
                                </>
                            )}
                            <CtaLink to={applyTo} variant="navy">Apply for this role</CtaLink>
                        </div>
                    )}
                    <p className="hr-back">
                        <Link to="/hr/jobs"><ArrowLeft size={16} aria-hidden="true" /> All jobs</Link>
                    </p>
                </div>
            </section>
            <CtaBand
                title="Interested in this role?"
                text="Apply with your details and our recruitment team will contact you about the next steps."
                primary={{ label: 'Apply now', to: applyTo }}
                secondary={{ label: 'Browse more jobs', to: '/hr/jobs' }}
            />
        </div>
    );
};

const JobDetailRoute = ({ id }) => {
    const { status, job } = useJob(id, getHrJob);
    if (status === 'loading') {
        return (
            <div className="pg-page hr-page">
                <section className="hr-section"><div className="container"><Loading label="Loading job details" /></div></section>
            </div>
        );
    }
    return job ? <JobDetail job={job} sample={status === 'offline'} /> : <NotFound />;
};

const HRJobs = () => {
    const { id } = useParams();
    return id ? <JobDetailRoute key={id} id={id} /> : <JobsList />;
};

export default HRJobs;
