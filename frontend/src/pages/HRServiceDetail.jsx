import { useParams } from 'react-router-dom';
import { Seo, PageHero, Section, Split, CardGrid, Steps, CheckList, CtaBand, Notice, RelatedLinks } from '../components/page/PageKit';
import { serviceSchema } from '../lib/schema';
import { getHrService, hrServices, hiringJourneys, hrContactLink, candidateLink } from '../data/hrWorkforce';
import NotFound from './NotFound';

const HRServiceDetail = () => {
    const { slug } = useParams();
    const service = getHrService(slug);
    if (!service) return <NotFound />;

    const crumbs = [
        { label: 'Home', to: '/' },
        { label: 'HR & Workforce', to: '/hr' },
        { label: service.name, to: `/hr/services/${service.slug}` },
    ];
    const journey = hiringJourneys.find((j) => j.key === slug) || (slug === 'payroll-outsourcing' ? hiringJourneys.find((j) => j.key === 'payroll') : null);
    const primary = hrContactLink(service.name);
    const Icon = service.icon;

    return (
        <div className={`pg-page hr-page${import.meta.env.DEV ? ' hr-dev' : ''}`}>
            <Seo
                title={`${service.name} | HR & Workforce | KAM Global`}
                description={`${service.cardDesc} ${service.hero.sub}`}
                path={`/hr/services/${service.slug}`}
                crumbs={crumbs}
                schema={serviceSchema({ name: service.name, description: service.cardDesc, path: `/hr/services/${service.slug}`, serviceType: 'HR services' })}
            />

            <PageHero
                crumbs={[crumbs[0], crumbs[1], { label: service.name }]}
                eyebrow={service.name}
                title={service.hero.title}
                sub={service.hero.sub}
                body={service.hero.body}
                primary={{ label: 'Discuss your requirement', to: primary }}
                secondary={{ label: 'All HR services', to: '/hr#services' }}
                image={service.image}
                imageAlt={service.alt}
                chips={service.confidential ? ['Confidential', 'India · GCC · USA'] : ['India · GCC · USA']}
            />

            <Section
                id="capabilities"
                tone="cream"
                eyebrow="What We Do"
                title={`${service.name} Capabilities`}
                intro="Each engagement is scoped around your roles, locations and timelines."
            >
                <CardGrid cols={3} variant="compact" items={service.capabilities.map((c) => ({ ...c, icon: Icon }))} />
            </Section>

            {journey && (
                <Section
                    id="process"
                    tone="white"
                    eyebrow="How It Works"
                    title={`The ${service.name} Journey`}
                    intro={`Estimated timeline: ${journey.timeline}. Illustrative only; confirmed per requirement.`}
                >
                    <Steps steps={journey.steps.map((s) => ({ title: s }))} label={`${service.name} steps`} />
                </Section>
            )}

            <Split
                id="scope"
                tone="cream"
                eyebrow="Scoping"
                title="What We Discuss First"
                image={service.image}
                imageAlt=""
                cta={{ label: 'Start the conversation', to: primary }}
                secondaryCta={slug === 'recruitment' || slug === 'contract-staffing' ? { label: 'Looking for a job?', to: candidateLink() } : undefined}
            >
                <p>Clear inputs lead to a realistic plan. These are the topics we usually cover in the first conversation.</p>
                <CheckList items={service.discuss} cols={2} />
            </Split>

            <Section id="related" tone="white" eyebrow="Related" title="Other HR Services" align="left">
                <RelatedLinks
                    title="Explore more"
                    links={[
                        ...hrServices.filter((s) => s.slug !== slug).map((s) => ({ label: s.name, to: `/hr/services/${s.slug}` })),
                        { label: 'HR technology', to: '/hr/technology' },
                    ]}
                />
                <Notice title="Availability">
                    Service availability varies by country and workforce type: confirm with our team.
                </Notice>
            </Section>

            <CtaBand
                title={`Let's discuss your ${service.name.toLowerCase()} needs`}
                text="Share your roles, locations and timing. We will review the requirement and confirm the next step."
                primary={{ label: 'Talk to our team', to: primary }}
                secondary={{ label: 'Book a demo', to: hrContactLink('HR Technology demo') }}
            />
        </div>
    );
};

export default HRServiceDetail;
