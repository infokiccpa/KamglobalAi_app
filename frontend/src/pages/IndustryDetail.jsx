import { useParams } from 'react-router-dom';
import {
    Seo,
    PageHero,
    Section,
    Split,
    CardGrid,
    Steps,
    CheckList,
    ChipList,
    CtaBand,
    Notice,
    RelatedLinks,
} from '../components/page/PageKit';
import { getIndustry, industries, INDUSTRY_APPROACH } from '../data/industries';
import { findService } from '../data/serviceLinks';
import { contactLink, discoveryLink } from '../data/links';
import NotFound from './NotFound';

const IndustryDetail = () => {
    const { slug } = useParams();
    const industry = getIndustry(slug);
    if (!industry) return <NotFound />;

    const subject = `Industry Solutions: ${industry.name}`;
    const crumbs = [
        { label: 'Home', to: '/' },
        { label: 'Industries', to: '/industries' },
        { label: industry.name, to: `/industries/${industry.slug}` },
    ];
    const others = industries.filter((i) => i.slug !== industry.slug);
    const cards = industry.cards.map((c) => ({
        ...c,
        to: c.to === '/contact' ? contactLink(subject) : c.to,
    }));

    return (
        <div className="pg-page" key={industry.slug}>
            <Seo title={industry.seo.title} description={industry.seo.description} path={`/industries/${industry.slug}`} crumbs={crumbs} />

            <PageHero
                crumbs={[crumbs[0], crumbs[1], { label: industry.name }]}
                eyebrow={industry.name}
                title={industry.hero.title}
                sub={industry.hero.sub}
                body={industry.context}
                primary={{ label: 'Discuss Your Industry Requirement', to: contactLink(subject) }}
                secondary={{ label: 'Book a Discovery Call', to: discoveryLink(subject) }}
                image={industry.image}
                imageAlt={industry.alt}
            />

            <Split
                id="context"
                tone="cream"
                eyebrow="Industry Context"
                title="Start with the Workflow and Its Constraints"
                image={industry.image}
                imageAlt=""
                cta={{ label: 'Discuss a Requirement', to: contactLink(subject) }}
            >
                <p>
                    Before discussing a team or service, we look at how the work flows today, who owns each step, and
                    which controls apply. Potential needs in {industry.name.toLowerCase()} include:
                </p>
                <CheckList items={industry.needs} cols={2} />
            </Split>

            <Section
                id="support"
                tone="white"
                eyebrow="How We Can Support"
                title={`Where ${industry.name} Teams Can Start`}
                intro="These are potential starting points. Each is scoped against your systems, controls, and service expectations."
            >
                <CardGrid cols={3} items={cards} />
                {industry.notice && <Notice title="Scope boundaries">{industry.notice}</Notice>}
                <div className="pg-stack-top pg-center">
                    <ChipList
                        label="Relevant services"
                        items={industry.services.map(findService).filter(Boolean).map((svc) => ({ label: svc.short, to: svc.to }))}
                    />
                </div>
            </Section>

            <Section
                id="approach"
                tone="cream"
                eyebrow="Our Approach"
                title="Scope the Work, Controls, and Expectations"
                intro="We review the business objective, users, systems, process owners, data sensitivity, service hours, and success criteria. A proposed engagement follows only once feasibility and responsibilities are clear."
                cta={{ label: 'Book a Discovery Call', to: discoveryLink(subject) }}
            >
                <Steps steps={INDUSTRY_APPROACH} label="Our approach" />
                <RelatedLinks
                    title="Other industries"
                    links={others.slice(0, 5).map((i) => ({ label: i.name, to: `/industries/${i.slug}` }))}
                />
            </Section>

            <CtaBand
                title="Let's Discuss Your Industry Requirement"
                text="Tell us about your workflow, current challenge, and the type of technology or operational support you are considering."
                primary={{ label: 'Contact Us', to: contactLink(subject) }}
                secondary={{ label: 'Compare Engagement Models', to: '/engagement-models' }}
            />
        </div>
    );
};

export default IndustryDetail;
