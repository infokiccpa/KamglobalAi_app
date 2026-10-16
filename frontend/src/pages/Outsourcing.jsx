import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';  
import { UserPlus, FileText, CalendarClock, Code2, Headset } from 'lucide-react';
import {
    Seo,
    PageHero,
    Section,
    Split,
    CardGrid,
    Steps,
    ChipList,
    ActionCards,
    CtaLink,
    CtaBand,
    Notice,
} from '../components/page/PageKit';
import { outsourcingServices } from '../data/outsourcingServices';
import { findService } from '../data/serviceLinks';
import { deliveryEngines } from '../data/deliveryEngines';
import { industries } from '../data/industries';
import { engagementModels } from '../data/engagementModels';
import { contactLink, talentLink, proposalLink, discoveryLink } from '../data/links';

const INDIA_IT = ['custom-development', 'ai-automation', 'data-analytics', 'cloud-devops', 'qa-testing', 'managed-it'];

const whySteps = [
    { title: 'Business need', desc: 'Start with what you are trying to achieve.' },
    { title: 'Service scope', desc: 'Define the work, boundaries, and dependencies.' },
    { title: 'Capability fit', desc: 'Confirm the right skills and delivery engine.' },
    { title: 'Communication plan', desc: 'Agree hours, reporting, and escalation.' },
    { title: 'Delivery expectations', desc: 'Set measures and responsibilities before mobilisation.' },
];

const actions = [
    {
        id: 'request-talent',
        icon: UserPlus,
        eyebrow: 'Request Talent',
        title: 'Tell Us the Skills You Need',
        desc: 'Share roles, skills, seniority, location or time-zone needs, start date, and expected engagement length. We will review the request and confirm whether we can support it.',
        points: ['Roles and skills', 'Seniority', 'Time zone', 'Start date', 'Duration'],
        cta: { label: 'Submit a Talent Request', to: talentLink('Global Outsourcing') },
    },
    {
        id: 'request-proposal',
        icon: FileText,
        eyebrow: 'Request a Proposal',
        title: 'Define the Scope Before the Estimate',
        desc: 'Tell us about the business objective, deliverables, expected timeline, dependencies, and budget parameters if available. We will use these details to prepare the next-step discussion.',
        points: ['Objective', 'Deliverables', 'Timeline', 'Dependencies', 'Budget range'],
        cta: { label: 'Request a Proposal', to: proposalLink('Global Outsourcing') },
    },
    {
        id: 'discovery-call',
        icon: CalendarClock,
        eyebrow: 'Discovery Call',
        title: "Let's Explore the Right Delivery Model",
        desc: 'Book an initial conversation to discuss the business context, potential fit, open questions, and what would be required to proceed.',
        points: ['Business context', 'Potential fit', 'Open questions'],
        cta: { label: 'Book a Discovery Call', to: discoveryLink('Global Outsourcing') },
    },
];

const Outsourcing = () => {
    const [india, philippines] = deliveryEngines;

    return (
        <div className="pg-page">
            <Seo
                title="Global Outsourcing Services | KAM Global AI"
                description="Explore technology delivery from India and business operations support from the Philippines through flexible outsourcing models."
                path="/outsourcing"
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Global Outsourcing', to: '/outsourcing' }]}
            />

            <PageHero
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Global Outsourcing' }]}
                eyebrow="Global Outsourcing"
                title="One Global Partner. Two Powerful Talent Engines."
                sub="AI-enabled technology delivery from India and business operations support from the Philippines."
                body="KAM Global AI is developing a coordinated outsourcing proposition for organisations that need technology capability, digital delivery, customer-facing support, or operational capacity. We begin with your requirement and discuss the appropriate team, service model, and delivery plan."
                primary={{ label: 'Request Talent', to: '#request-talent' }}
                secondary={{ label: 'Book a Discovery Call', to: '#discovery-call' }}
                image="/images/hm-hero-two-engines.webp"
                imageAlt="Technology delivery and business operations teams connected across two talent engines"
            />

            <Split
                id="who-we-are"
                tone="cream"
                eyebrow="Who We Are"
                title="A Coordinated Approach to Technology and Business Support"
                image="/images/pages/pg-about-hero.webp"
                imageAlt="Business team collaborating around a workshop table with sticky notes and a whiteboard"
                cta={{ label: 'Request a Proposal', to: '#request-proposal' }}
            >
                <p>
                    We help organisations explore flexible access to technology professionals and operational talent,
                    with engagement options shaped around scope, service needs, and readiness.
                </p>
                <p>
                    Whether you need engineers for a product roadmap or a team to support customers and back-office
                    workflows, the conversation starts in one place.
                </p>
            </Split>

            <Section
                id="delivery-engines"
                tone="white"
                eyebrow="Two Delivery Engines"
                title="Different Strengths. One Coordinated Conversation."
                intro="India focuses on technology and digital delivery. The Philippines focuses on business operations and workforce support."
            >
                <div className="pg-engines">
                    {[india, philippines].map((engine, i) => {
                        const EngineIcon = i === 0 ? Code2 : Headset;
                        return (
                            <motion.article
                                key={engine.slug}
                                className="pg-engine"
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: i * 0.08 }}
                            >
                                <div className="pg-engine-media">
                                    <img src={engine.image} alt={engine.alt} loading="lazy" width="1024" height="576" />
                                    <span className="pg-engine-label">
                                        <EngineIcon size={14} aria-hidden="true" /> {engine.label}
                                    </span>
                                </div>
                                <div className="pg-engine-body">
                                    <h3>{engine.short}</h3>
                                    <p>{engine.cardDesc}</p>
                                    <ChipList items={engine.chips} label={`${engine.name} focus areas`} />
                                    <CtaLink to={`/outsourcing/${engine.slug}`} variant="navy">
                                        {i === 0 ? 'Explore India Engine' : 'Explore Philippines Engine'}
                                    </CtaLink>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </Section>

            <Section
                id="services"
                tone="cream"
                eyebrow="Services"
                title="Choose the Capability You Need"
                intro="Explore technology outsourcing, AI and data, cloud and managed IT, sales and lead generation, customer experience, BPO, RPO, virtual assistance, digital marketing, and industry operations support."
            >
                <CardGrid
                    cols={5}
                    variant="compact"
                    items={outsourcingServices.map((s) => ({
                        icon: s.icon,
                        title: s.short,
                        desc: s.cardDesc,
                        to: `/outsourcing/${s.slug}`,
                        cta: 'Explore',
                        tag: s.engine === 'india' ? 'India' : 'Philippines',
                    }))}
                />
            </Section>

            <Section
                id="engagement-models"
                tone="white"
                eyebrow="Engagement Models"
                title="Flexible Ways to Work Together"
                intro="Options may include dedicated resources, dedicated teams, project-based outsourcing, managed services, BOT, staff augmentation, offshore development centers, and BPO. Availability and commercial terms are confirmed during scoping."
                cta={{ label: 'Compare Models', to: '/engagement-models' }}
            >
                <CardGrid
                    cols={4}
                    variant="compact"
                    items={engagementModels.map((m) => ({
                        icon: m.icon,
                        title: m.name,
                        desc: m.cardDesc,
                        to: `/engagement-models/${m.slug}`,
                        cta: 'How it works',
                    }))}
                />
            </Section>

            <Section
                id="why-kam"
                tone="cream"
                eyebrow="Why KAM"
                title="A Clearer Path from Requirement to Delivery"
                intro="We aim to align the business need, service scope, capability fit, communication plan, and delivery expectations before mobilisation. We do not recommend scaling delivery capacity ahead of validated demand."
                cta={{ label: 'Talk to Our Team', to: contactLink('Global Outsourcing', 'Global Outsourcing') }}
            >
                <Steps steps={whySteps} label="Requirement to delivery" />
            </Section>

            <Split
                id="india-engine"
                tone="white"
                eyebrow="India Engine"
                title="Technology and Digital Delivery"
                image={india.image}
                imageAlt={india.alt}
                cta={{ label: 'Explore India Capabilities', to: '/outsourcing/india-engine' }}
            >
                <p>
                    Explore software engineering, AI and automation, data, cloud, DevOps, infrastructure, QA, technical
                    support, and digital services, subject to confirmed delivery availability.
                </p>
                <ChipList
                    label="India engine services"
                    items={[
                        ...INDIA_IT.map(findService).filter(Boolean).map((s) => ({ label: s.short, to: s.to })),
                        ...outsourcingServices.filter((s) => s.engine === 'india').map((s) => ({ label: s.short, to: `/outsourcing/${s.slug}` })),
                    ]}
                />
            </Split>

            <Split
                id="philippines-engine"
                tone="cream"
                reverse
                eyebrow="Philippines Engine"
                title="Business Operations and Workforce Support"
                image={philippines.image}
                imageAlt={philippines.alt}
                cta={{ label: 'Explore Philippines Capabilities', to: '/outsourcing/philippines-engine' }}
            >
                <p>
                    Explore sales development, appointment setting, customer service, customer success support, BPO,
                    recruitment support, virtual assistance, and back-office operations, subject to confirmed operating
                    capacity.
                </p>
                <ChipList
                    label="Philippines engine services"
                    items={outsourcingServices.filter((s) => s.engine === 'philippines').map((s) => ({ label: s.short, to: `/outsourcing/${s.slug}` }))}
                />
            </Split>

            <Section
                id="industries"
                tone="white"
                eyebrow="Industries"
                title="Capabilities for Different Business Contexts"
                intro="We are focusing on technology, SaaS, education, healthcare, finance, retail, real estate, hospitality, recruitment, professional services, and other sectors where the relevant service fit is confirmed."
                cta={{ label: 'Explore Industries', to: '/industries' }}
            >
                <CardGrid
                    cols={5}
                    variant="compact"
                    items={industries.map((ind) => ({
                        icon: ind.icon,
                        title: ind.name,
                        desc: ind.cardDesc,
                        to: `/industries/${ind.slug}`,
                        cta: 'Explore',
                    }))}
                />
            </Section>

            <Split
                id="case-studies"
                tone="cream"
                eyebrow="Case Studies"
                title="Show the Work. Explain the Approach."
                image="/images/learnx-hero.webp"
                imageAlt="LearnX school management platform interface, an internal KAM Global AI product"
                cta={{ label: 'Explore Approved Work', to: '/resources/case-studies' }}
            >
                <p>
                    We share internal projects such as LearnX alongside selected software, digital, and AI-related work.
                    Each story sets out the context, our contribution, the process, and the outcome, and is clearly
                    labelled as an internal product or a client engagement.
                </p>
                <p>
                    <Link to="/products/learnx" className="pg-inline-link">See LearnX</Link>
                </p>
            </Split>

            <Section
                id="get-started"
                tone="white"
                eyebrow="Get Started"
                title="Choose How You Want to Begin"
                intro="Pick the starting point that matches where you are. Each option routes your request to the right team."
            >
                <ActionCards items={actions} />
                <Notice title="How we confirm availability">
                    Specific delivery availability, operating coverage, and commercial terms are confirmed during discovery
                    for each requirement.
                </Notice>
            </Section>

            <CtaBand
                eyebrow="Global Outsourcing"
                title="Ready to Talk Through Your Requirement?"
                text="Share what you need and we will confirm the most appropriate next step."
                primary={{ label: 'Request Talent', to: talentLink('Global Outsourcing') }}
                secondary={{ label: 'Book a Discovery Call', to: discoveryLink('Global Outsourcing') }}
                tertiary={{ label: 'Compare engagement models', to: '/engagement-models' }}
            />
        </div>
    );
};

export default Outsourcing;
