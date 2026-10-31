import { Link, useParams } from 'react-router-dom';
import { categoryCapabilities, findCategory } from '../data/services/catalog';
import { contactLink } from '../data/links';
import {
    CheckList,
    CtaBand,
    Faq,
    Notice,
    PageHero,
    RelatedLinks,
    Section,
    Seo,
    Steps,
} from '../components/page/PageKit';
import NotFound from './NotFound';
import AudiencePaths from '../components/page/AudiencePaths';
import './ServicePages.css';

const approach = [
    { title: 'Confirm the need', desc: 'We match the request to this service and say if it is a fit.' },
    { title: 'Write the scope', desc: 'Capabilities, deliverables and responsibilities are listed before work starts.' },
    { title: 'Deliver and review', desc: 'Work proceeds in the engagement model you agree, with reviews you can follow.' },
    { title: 'Hand over', desc: 'You receive the agreed outputs, access and notes.' },
];

const ServiceCategory = () => {
    const { divisionId, categoryId } = useParams();
    const match = findCategory(divisionId, categoryId);
    if (!match) return <NotFound />;
    const { division, category } = match;
    const capabilities = categoryCapabilities(category);
    const related = division.categories.filter((item) => item.id !== category.id).slice(0, 4);
    const path = `/services/${division.id}/${category.id}`;
    const enquire = contactLink(category.title, division.enquiryType);
    const crumbs = [
        { label: 'Home', to: '/' },
        { label: 'Services', to: '/services' },
        { label: division.title, to: `/services/${division.id}` },
        { label: category.title },
    ];

    const faqs = [
        {
            q: `What does ${category.title} include?`,
            a: `${category.summary} The capability list on this page is the menu of work we can scope. A proposal states which items are included.`,
        },
        {
            q: 'How do we engage?',
            a: 'As a defined project, a dedicated team, managed support, or build-operate-transfer when that model fits. The choice is made during scoping.',
        },
        {
            q: 'What do we receive?',
            a: 'The deliverables named in the agreement. Typical outputs are a written scope, the work itself, and notes or access needed to run it.',
        },
    ];

    return (
        <div className="pg-page">
            <Seo
                title={`${category.title} | ${division.title} | KAM Global AI`}
                description={category.summary}
                path={path}
                crumbs={crumbs}
            />
            <PageHero
                crumbs={crumbs}
                eyebrow={division.title}
                title={category.title}
                sub={category.summary}
                primary={{ label: 'Enquire about this service', to: enquire }}
                secondary={{ label: division.title, to: `/services/${division.id}` }}
            />
            <AudiencePaths subject={category.title} enquiryType={division.enquiryType} work={category.title} />
            <Section id="capabilities" tone="white" eyebrow="Capabilities" title="What can be scoped" align="left">
                {category.groups?.length ? (
                    <div className="sv-groups">
                        {category.groups.map((group) => (
                            <section key={group.title}>
                                <h3>{group.title}</h3>
                                <CheckList items={group.items} />
                            </section>
                        ))}
                    </div>
                ) : (
                    <CheckList items={capabilities} />
                )}
                {category.note && <Notice title="Before you rely on this">{category.note}</Notice>}
            </Section>
            <Section id="approach" tone="soft" eyebrow="Approach" title="How this service is delivered" align="left">
                <Steps steps={approach} />
            </Section>
            <Section id="deliverables" tone="white" eyebrow="Deliverables" title="What a typical engagement produces" align="left">
                <CheckList
                    items={[
                        'A written scope that names the capabilities included',
                        `The ${category.title.toLowerCase()} work described in that scope`,
                        'Notes, access or handover material the agreement includes',
                    ]}
                />
            </Section>
            <Section id="related" tone="soft" eyebrow="Related" title="Other services in this division" align="left">
                <RelatedLinks
                    links={[
                        ...related.map((item) => ({ label: item.title, to: `/services/${division.id}/${item.id}` })),
                        { label: `All ${division.title}`, to: `/services/${division.id}` },
                    ]}
                />
            </Section>
            <Section id="faq" tone="white" eyebrow="Questions" title="About this service" align="left">
                <Faq items={faqs} />
            </Section>
            <CtaBand
                title="Enquire about this service"
                text="The button opens the contact form with this service named. The enquiry is received only after the form is submitted successfully."
                primary={{ label: 'Discuss your project', to: enquire }}
                secondary={{ label: 'Explore engagement options', to: '/engagement-models' }}
            />
            {division.id === 'hr-solutions' && (
                <p className="sv-job-note">
                    This page is for employers. Job applications go through <Link to="/careers">Careers</Link>.
                </p>
            )}
        </div>
    );
};

export default ServiceCategory;
