import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { serviceCatalogue } from '../data/services/catalog';
import { industries } from '../data/industries';
import { contactLink } from '../data/links';
import {
    CardGrid,
    CtaBand,
    Faq,
    PageHero,
    Section,
    Seo,
    Steps,
} from '../components/page/PageKit';
import './ServicePages.css';

const faqs = [
    {
        q: 'Who should use this page?',
        a: 'Organisations that want technology, creative production, outsourcing, HR support or education software. People looking for a job should open Careers. Partnership conversations start from the partnership option on the contact form.',
    },
    {
        q: 'How does a service engagement start?',
        a: 'With a conversation about the work, the users and the constraints. We then share a proposed scope and engagement model for you to review before work begins.',
    },
    {
        q: 'Do you publish response times or success rates?',
        a: 'No. Hours, reporting and any service levels are written into the agreement for that engagement. They are not standard promises on this website.',
    },
    {
        q: 'Where is the work delivered from?',
        a: 'Technology work is coordinated from our centre in India. Business operations support is coordinated from the Philippines. The agreement names the team, the hours and the locations that apply.',
    },
];

const approach = [
    { title: 'Discover', desc: 'Understand the goal, the users and the systems already in place.' },
    { title: 'Define', desc: 'Agree the scope, responsibilities and how the work will be accepted.' },
    { title: 'Deliver', desc: 'Do the work in the engagement model you chose, with reviews along the way.' },
    { title: 'Hand over', desc: 'Leave you with the deliverables, access and notes the agreement includes.' },
];

const reasons = [
    { title: 'One catalogue', desc: 'IT, creative, outsourcing, HR and EdTech are separate divisions, so the work you are buying is named clearly.' },
    { title: 'Scope before delivery', desc: 'Deliverables and responsibilities are written down before work starts.' },
    { title: 'India and the Philippines', desc: 'Technology is coordinated from India. Operations support is coordinated from the Philippines.' },
    { title: 'Engagement to fit the work', desc: 'A project, a dedicated team, managed support or build-operate-transfer, chosen for that scope.' },
];

const Services = () => {
    const [params, setParams] = useSearchParams();
    const query = params.get('q') || '';
    const divisionFilter = params.get('division') || 'all';
    const [draft, setDraft] = useState(query);

    const results = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return serviceCatalogue.flatMap((division) => {
            if (divisionFilter !== 'all' && division.id !== divisionFilter) return [];
            return division.categories
                .filter((category) => {
                    if (!needle) return true;
                    const haystack = `${division.title} ${category.title} ${category.summary} ${(category.capabilities || []).join(' ')} ${(category.groups || []).flatMap((g) => g.items).join(' ')}`.toLowerCase();
                    return haystack.includes(needle);
                })
                .map((category) => ({
                    title: category.title,
                    desc: category.summary,
                    icon: category.icon || division.icon,
                    tag: division.title,
                    to: `/services/${division.id}/${category.id}`,
                    cta: 'View service',
                    points: (category.groups?.flatMap((g) => g.items) || category.capabilities).slice(0, 3),
                }));
        });
    }, [query, divisionFilter]);

    const applySearch = (event) => {
        event.preventDefault();
        const next = new URLSearchParams(params);
        if (draft.trim()) next.set('q', draft.trim());
        else next.delete('q');
        setParams(next, { replace: true });
    };

    const setDivision = (id) => {
        const next = new URLSearchParams(params);
        if (id === 'all') next.delete('division');
        else next.set('division', id);
        setParams(next, { replace: true });
    };

    return (
        <div className="pg-page">
            <Seo
                title="Enterprise Technology & Business Solutions | KAM Global AI"
                description="Technology engineering, creative services, business outsourcing, workforce solutions and education technology from KAM Global AI. Scope and commercial terms are agreed before work starts."
                path="/services"
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
            />
            <PageHero
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
                eyebrow="Services"
                title="Enterprise Technology & Business Solutions"
                sub="We help organizations build, modernize, operate, and scale their digital capabilities through technology engineering, creative services, business outsourcing, workforce solutions, and education technology."
                primary={{ label: 'Discuss your project', to: contactLink('Enterprise Technology & Business Solutions', 'Technology Services') }}
                secondary={{ label: 'Browse the catalogue', to: '#catalogue' }}
            />

            <Section id="audiences" tone="white" eyebrow="Who this is for" title="Three paths, kept separate" align="left">
                <div className="sv-paths">
                    <article>
                        <h3>Clients</h3>
                        <p>You need a service delivered. Choose a division below, then send an enquiry about that work.</p>
                        <Link to="#divisions">Choose a division</Link>
                    </article>
                    <article>
                        <h3>Partners</h3>
                        <p>You want a delivery or commercial partnership. Use the partnership enquiry. It is not a job application.</p>
                        <Link to={contactLink('Partnership', 'Partnership')}>Partnership enquiry</Link>
                    </article>
                    <article>
                        <h3>Job seekers</h3>
                        <p>You want to work here. Open roles and applications live on Careers, not on these service pages.</p>
                        <Link to="/careers">View careers</Link>
                    </article>
                </div>
            </Section>

            <Section
                id="divisions"
                tone="soft"
                eyebrow="Five divisions"
                title="Choose the work, not a mixed menu"
                intro="Each division has its own page. IT delivery, creative production, operations outsourcing, employer HR and education software are not the same offer."
            >
                <CardGrid
                    cols={3}
                    items={serviceCatalogue.map((division) => ({
                        title: division.title,
                        desc: division.summary,
                        icon: division.icon,
                        to: `/services/${division.id}`,
                        cta: 'Explore services',
                        points: division.categories.filter((c) => c.featured).slice(0, 4).map((c) => c.title),
                    }))}
                />
            </Section>

            <Section id="catalogue" tone="white" eyebrow="Catalogue" title="Find a service" align="left">
                <form className="sv-search" onSubmit={applySearch}>
                    <label htmlFor="service-search">Search services</label>
                    <div>
                        <Search size={18} aria-hidden="true" />
                        <input
                            id="service-search"
                            value={draft}
                            onChange={(event) => setDraft(event.target.value)}
                            placeholder="Try QA, payroll, LearnX, video"
                        />
                        <button type="submit">Search</button>
                    </div>
                </form>
                <div className="sv-filters" role="group" aria-label="Filter by division">
                    <button type="button" className={divisionFilter === 'all' ? 'is-on' : ''} onClick={() => setDivision('all')}>All</button>
                    {serviceCatalogue.map((division) => (
                        <button
                            key={division.id}
                            type="button"
                            className={divisionFilter === division.id ? 'is-on' : ''}
                            onClick={() => setDivision(division.id)}
                        >
                            {division.title}
                        </button>
                    ))}
                </div>
                {results.length ? (
                    <CardGrid cols={3} items={results} />
                ) : (
                    <p className="sv-empty" role="status">No services match that search. Clear the words or choose another division.</p>
                )}
            </Section>

            <Section id="approach" tone="soft" eyebrow="Delivery" title="How an engagement runs" align="left">
                <Steps steps={approach} />
            </Section>

            <Section id="industries" tone="white" eyebrow="Industries" title="Industries we support" intro="The same five divisions are shaped around the sector you work in.">
                <CardGrid
                    cols={3}
                    items={industries.slice(0, 6).map((industry) => ({
                        title: industry.name,
                        desc: industry.cardDesc,
                        icon: industry.icon,
                        to: `/industries/${industry.slug}`,
                        cta: 'View industry',
                    }))}
                />
            </Section>

            <Section id="why" tone="soft" eyebrow="Why KAM" title="What you can expect" align="left">
                <CardGrid cols={2} items={reasons} />
            </Section>

            <Section
                id="engagement"
                tone="white"
                eyebrow="Engagement"
                title="Ways to buy the work"
                intro="The model is chosen for the scope. A comparison of the models sits on its own page."
            >
                <CardGrid
                    cols={3}
                    items={[
                        { title: 'Project', desc: 'A defined outcome, timeline and acceptance criteria.', to: '/engagement-models', cta: 'Compare models' },
                        { title: 'Dedicated team', desc: 'Named people working to your backlog for an agreed period.', to: '/engagement-models', cta: 'Compare models' },
                        { title: 'Managed service or BOT', desc: 'We run a process, or build a team and later transfer it, as the contract describes.', to: '/services/it-technology/bot', cta: 'See BOT' },
                    ]}
                />
            </Section>

            <Section id="faq" tone="soft" eyebrow="Questions" title="Before you enquire" align="left">
                <Faq items={faqs} />
            </Section>

            <CtaBand
                eyebrow="Next step"
                title="Tell us which service you need"
                text="The enquiry goes to the contact form. We reply after a person reviews it. Sending the form is the submission. Nothing is confirmed until we write back."
                primary={{ label: 'Request a consultation', to: contactLink('Enterprise Technology & Business Solutions', 'Technology Services') }}
                secondary={{ label: 'Careers', to: '/careers' }}
            />
        </div>
    );
};

export default Services;
