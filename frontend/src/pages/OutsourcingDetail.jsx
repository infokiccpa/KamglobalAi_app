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
    RelatedLinks
} from '../components/page/PageKit';
import { serviceSchema } from '../lib/schema';
import { getOutsourcingService, outsourcingServices, HOW_WE_START } from '../data/outsourcingServices';
import { getDeliveryEngine } from '../data/deliveryEngines';
import { getIndustry } from '../data/industries';
import { getEngagementModel } from '../data/engagementModels';
import { contactLink, discoveryLink, talentLink } from '../data/links';
import NotFound from './NotFound';

const ServicePage = ({ service }) => {
    const engine = getDeliveryEngine(service.engine === 'india' ? 'india-engine' : 'philippines-engine');
    const crumbs = [
        { label: 'Home', to: '/' },
        { label: 'Global Outsourcing', to: '/outsourcing' },
        { label: service.short, to: `/outsourcing/${service.slug}` },
    ];
    const primaryLink = contactLink(service.subject, 'Global Outsourcing');
    const related = outsourcingServices.filter((s) => s.slug !== service.slug && s.engine === service.engine).slice(0, 4);

    return (
        <div className="pg-page">
            <Seo title={service.seo.title} description={service.seo.description} path={`/outsourcing/${service.slug}`} crumbs={crumbs} schema={serviceSchema({ name: service.name, description: service.seo.description, path: `/outsourcing/${service.slug}` })} />

            <PageHero
                crumbs={[crumbs[0], crumbs[1], { label: service.short }]}
                eyebrow={service.name}
                title={service.hero.title}
                sub={service.hero.sub}
                body={service.hero.body}
                primary={{ label: service.hero.cta, to: primaryLink }}
                secondary={{ label: 'Book a Discovery Call', to: discoveryLink(service.subject) }}
                image={service.hero.image}
                imageAlt={service.hero.alt}
                chips={[engine.label]}
            />

            <Section
                id="capabilities"
                tone="cream"
                eyebrow="Where We Can Support"
                title={`${service.short} Capabilities`}
                intro="Each area is scoped around your requirements, tools, and the way your team works."
                cta={{ label: service.hero.cta, to: primaryLink }}
            >
                <CardGrid cols={4} items={service.offerings} />
            </Section>

            <Split
                id="scope"
                tone="white"
                eyebrow="Scoping"
                title="What We Discuss Before Proposing a Plan"
                image={service.hero.image}
                imageAlt=""
                cta={{ label: 'Request Talent', to: talentLink(service.subject) }}
                secondaryCta={{ label: 'Compare Engagement Models', to: '/engagement-models' }}
            >
                <p>Clear inputs lead to a realistic plan. These are the topics we typically cover in the first conversations.</p>
                <CheckList items={service.discuss} cols={2} />
            </Split>

            <Section
                id="how-we-start"
                tone="cream"
                eyebrow="How We Start"
                title="Understand the Work Before Defining the Solution"
                intro="We review the business goal, current workflow, scope, tools, dependencies, quality expectations, and timeline. We then discuss feasibility and a proposed way forward."
                cta={{ label: 'Book a Discovery Call', to: discoveryLink(service.subject) }}
            >
                <Steps steps={HOW_WE_START} label="How we start" />
                {service.notice && <Notice>{service.notice}</Notice>}
            </Section>

            <Section
                id="related"
                tone="white"
                eyebrow="Related"
                title="Engagement Models, Industries and Delivery"
                intro={`${service.short} is typically delivered through the ${engine.name}. Explore the models and industry contexts that often fit.`}
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
                <RelatedLinks
                    title="Other services"
                    links={[
                        ...related.map((s) => ({ label: s.short, to: `/outsourcing/${s.slug}` })),
                        { label: engine.name, to: `/outsourcing/${engine.slug}` },
                    ]}
                />
            </Section>

            <CtaBand
                title="Let's Discuss Your Requirement"
                text={`Share your ${service.name.toLowerCase()} needs, priorities, and timing. We will review the information and confirm the most appropriate next step.`}
                primary={{ label: service.hero.cta, to: primaryLink }}
                secondary={{ label: 'Book a Discovery Call', to: discoveryLink(service.subject) }}
            />
        </div>
    );
};

const EnginePage = ({ engine }) => {
    const crumbs = [
        { label: 'Home', to: '/' },
        { label: 'Global Outsourcing', to: '/outsourcing' },
        { label: engine.name, to: `/outsourcing/${engine.slug}` },
    ];
    const isIndia = engine.key === 'india';
    const primaryLink = contactLink(engine.subject, isIndia ? 'Technology Services' : 'Global Outsourcing');
    const other = getDeliveryEngine(isIndia ? 'philippines-engine' : 'india-engine');

    return (
        <div className="pg-page">
            <Seo title={engine.seo.title} description={engine.seo.description} path={`/outsourcing/${engine.slug}`} crumbs={crumbs} schema={serviceSchema({ name: engine.name, description: engine.seo.description, path: `/outsourcing/${engine.slug}` })} />

            <PageHero
                crumbs={[crumbs[0], crumbs[1], { label: engine.name }]}
                eyebrow={engine.label}
                title={engine.hero.title}
                sub={engine.hero.sub}
                body={engine.hero.body}
                primary={{ label: engine.hero.cta, to: primaryLink }}
                secondary={{ label: 'Request Talent', to: talentLink(engine.subject) }}
                image={engine.image}
                imageAlt={engine.alt}
            />

            <Section
                id="capabilities"
                tone="cream"
                eyebrow="Capability Areas"
                title={engine.capabilities.title}
                intro={engine.capabilities.intro}
                cta={{ label: 'Explore Services', to: '/outsourcing#services' }}
            >
                <CardGrid cols={4} variant="compact" items={engine.capabilities.items.map((c) => ({ ...c, cta: 'Explore' }))} />
            </Section>

            <Section
                id="talent"
                tone="white"
                eyebrow="Talent Areas"
                title={engine.talent.title}
                intro={engine.talent.intro}
                cta={{ label: 'Request Talent', to: talentLink(engine.subject) }}
            >
                <ChipList items={engine.talent.chips} label="Talent categories" />
                <RelatedLinks
                    title="Also explore"
                    links={[
                        { label: other.name, to: `/outsourcing/${other.slug}` },
                        { label: 'Engagement models', to: '/engagement-models' },
                        { label: 'Industries', to: '/industries' },
                        { label: 'Global outsourcing overview', to: '/outsourcing' },
                    ]}
                />
            </Section>

            {isIndia ? (
                <Section
                    id="mobilize"
                    tone="cream"
                    eyebrow="How We Mobilise"
                    title={engine.process.title}
                    intro={engine.process.intro}
                    cta={{ label: 'Book a Discovery Call', to: discoveryLink(engine.subject) }}
                >
                    <Steps steps={engine.process.steps} label="Role matching steps" />
                </Section>
            ) : (
                <Split
                    id="operating-model"
                    tone="cream"
                    eyebrow="Operating Model"
                    title={engine.operating.title}
                    image="/images/pages/pg-svc-cx.webp"
                    imageAlt="Customer support specialist handling chat and email conversations"
                    cta={{ label: 'Book a Discovery Call', to: discoveryLink(engine.subject) }}
                >
                    <p>{engine.operating.intro}</p>
                    <CheckList items={engine.operating.items} cols={2} />
                </Split>
            )}

            <CtaBand
                title={engine.cta.title}
                text={engine.cta.text}
                primary={{ label: 'Contact Us', to: primaryLink }}
                secondary={{ label: 'Request Talent', to: talentLink(engine.subject) }}
            />
        </div>
    );
};

const OutsourcingDetail = () => {
    const { slug } = useParams();
    const service = getOutsourcingService(slug);
    if (service) return <ServicePage key={slug} service={service} />;
    const engine = getDeliveryEngine(slug);
    if (engine) return <EnginePage key={slug} engine={engine} />;
    return <NotFound />;
};

export default OutsourcingDetail;
