import { useParams } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
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
    Deliverables,
    Faq
} from '../components/page/PageKit';
import { serviceSchema } from '../lib/schema';
import MoreITServices from '../components/it/MoreITServices';
import { getItService, itCrossLinks, getItDeliverables, getItFaqs } from '../data/itServices';
import { getIndustry } from '../data/industries';
import { getEngagementModel } from '../data/engagementModels';
import { contactLink, discoveryLink, talentLink } from '../data/links';
import NotFound from './NotFound';

const ITServicePage = ({ service }) => {
    const crumbs = [
        { label: 'Home', to: '/' },
        { label: 'IT & Technology', to: '/services' },
        { label: service.short, to: `/services/${service.slug}` },
    ];
    const deliverables = getItDeliverables(service);
    const faqs = getItFaqs(service);
    const primaryLink = service.slug === 'it-staffing' ? talentLink(service.subject) : contactLink(service.subject, 'Technology Services');

    return (
        <div className="pg-page">
            <Seo title={service.seo.title} description={service.seo.description} path={`/services/${service.slug}`} crumbs={crumbs} schema={serviceSchema({ name: service.name, description: service.seo.description, path: `/services/${service.slug}` })} />

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
                chips={['IT & Technology', 'India technology team']}
            />

            <Section
                id="challenge"
                tone="white"
                eyebrow="The Challenge"
                title="Problems We Are Asked to Solve"
                intro="If any of these sound familiar, this service is a good place to start."
            >
                <CardGrid cols={3} variant="compact" items={service.problems.map((p) => ({ ...p, icon: AlertTriangle }))} />
            </Section>

            <Section
                id="how-we-solve"
                tone="cream"
                eyebrow="How We Solve It"
                title={service.solutionTitle || `What ${service.short} Covers`}
                intro={service.solutionIntro || 'Each area is scoped around your requirements, tools and the way your team works.'}
                cta={{ label: service.hero.cta, to: primaryLink }}
            >
                <CardGrid cols={service.solutionCols || 4} items={service.solution} />
            </Section>

            {deliverables.length > 0 && (
                <Section
                    id="deliverables"
                    tone="white"
                    eyebrow="Typical Deliverables"
                    title="What You Can Expect to Receive"
                    intro="Typical outputs for this service. The exact deliverables are agreed with you during scoping."
                >
                    <Deliverables items={deliverables} label={`${service.short} typical deliverables`} />
                </Section>
            )}

            {service.technologies?.length > 0 && (
                <Section
                    id="technologies"
                    tone="cream"
                    eyebrow="Technologies We Work With"
                    title="Proven Tools, Supported by Our Team"
                    intro="We only list the platforms and tools our team works with today."
                >
                    <ul className="pg-tech" aria-label="Technologies we work with">
                        {service.technologies.map(({ icon: Icon, name, note }) => (
                            <li key={name} className="pg-tech-item">
                                <span className="pg-tech-icon" aria-hidden="true">
                                    <Icon size={22} strokeWidth={1.75} />
                                </span>
                                <strong>{name}</strong>
                                {note && <small>{note}</small>}
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            <Section
                id="how-it-works"
                tone="white"
                eyebrow="How It Works"
                title="Step by Step, From First Call to Ongoing Support"
                intro="You know what happens at each stage and what we need from you."
                cta={{ label: 'Book a Discovery Call', to: discoveryLink(service.subject) }}
            >
                <Steps steps={service.steps} label={`${service.short} steps`} />
            </Section>

            {service.why?.length > 0 && (
                <Section
                    id="why-choose"
                    tone="cream"
                    eyebrow="Why Choose Us"
                    title={`Why Choose Our ${service.short} Services?`}
                    intro="What you can expect when our team looks after your deployment and infrastructure."
                >
                    <CardGrid cols={3} variant="compact" items={service.why} />
                </Section>
            )}

            <Split
                id="scope"
                tone="cream"
                eyebrow="Before We Propose a Plan"
                title="What We Discuss With You"
                image={service.hero.image}
                imageAlt=""
                cta={{ label: service.hero.cta, to: primaryLink }}
                secondaryCta={{ label: 'Compare Engagement Models', to: '/engagement-models' }}
            >
                <p>Clear inputs lead to a realistic plan. These are the topics we usually cover in the first conversations.</p>
                <CheckList items={service.discuss} cols={2} />
            </Split>

            <Section
                id="related"
                tone="white"
                eyebrow="Ways to Work With Us"
                title="Engagement Models and Industries"
                intro="Choose how you want to work with us, and see where this service is often used."
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
            </Section>

            <Section
                id="faq"
                tone="cream"
                eyebrow="FAQs"
                title={`${service.short}: Common Questions`}
                align="left"
            >
                <Faq items={faqs} />
            </Section>

            <MoreITServices current={service.slug} extras={itCrossLinks(service)} />

            <CtaBand
                title={service.cta?.title || "Let's Discuss Your Requirement"}
                text={service.cta?.text || `Share your ${service.short.toLowerCase()} needs, priorities and timing. We will review them and confirm the most suitable next step.`}
                primary={{ label: service.hero.cta, to: primaryLink }}
                secondary={service.cta?.secondary || { label: 'Book a Discovery Call', to: discoveryLink(service.subject) }}
                tertiary={service.cta?.secondary ? { label: 'Book a Discovery Call', to: discoveryLink(service.subject) } : undefined}
            />
        </div>
    );
};

const ITServiceDetail = () => {
    const { slug } = useParams();
    const service = getItService(slug);
    return service ? <ITServicePage key={slug} service={service} /> : <NotFound />;
};

export default ITServiceDetail;
