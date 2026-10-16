import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';  
import { Seo, PageHero, Section, CardGrid, Steps, CtaBand, FlowDiagram, Notice } from '../components/page/PageKit';
import { engagementModels, ENGAGEMENT_NEXT_STEPS } from '../data/engagementModels';
import { contactLink, discoveryLink } from '../data/links';
import { Target, Users, Settings2, ClipboardCheck } from 'lucide-react';

const chooser = [
    { need: 'A defined project with clear deliverables', model: 'project-outsourcing' },
    { need: 'One or more additional specialists', model: 'dedicated-resource' },
    { need: 'A dedicated multi-role team', model: 'dedicated-team' },
    { need: 'Ongoing technology management', model: 'managed-services' },
    { need: 'Repeatable business-process support', model: 'bpo' },
];

const EngagementModels = () => (
    <div className="pg-page">
        <Seo
            title="Engagement Models | KAM Global AI"
            description="Compare dedicated resources, dedicated teams, project-based outsourcing, managed services, BPO, BOT, staff augmentation, and offshore development centers."
            path="/engagement-models"
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Engagement Models', to: '/engagement-models' }]}
        />

        <PageHero
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Engagement Models' }]}
            eyebrow="Engagement Models"
            title="Flexible Ways to Work Together"
            sub="Choose an engagement structure around scope, ownership, and the way your team works."
            body="Options may include dedicated resources, dedicated teams, project-based outsourcing, managed services, BOT, staff augmentation, offshore development centers, and BPO. Availability and commercial terms are confirmed during scoping."
            primary={{ label: 'Discuss Your Requirement', to: contactLink('Engagement Models') }}
            secondary={{ label: 'Book a Discovery Call', to: discoveryLink('Engagement Models') }}
            visual={
                <FlowDiagram
                    dark={false}
                    nodes={[
                        { label: 'Your need', sub: 'Scope and ownership', side: 'client', icon: Target },
                        { label: 'Right model', sub: 'Team, project or service', side: 'kam', icon: Users },
                        { label: 'Agreed setup', sub: 'Roles and reporting', side: 'shared', icon: Settings2 },
                        { label: 'Delivery', sub: 'Reviewed together', side: 'shared', icon: ClipboardCheck },
                    ]}
                    caption="Every model starts from your delivery need, not a pre-packaged answer."
                />
            }
        />

        <Section
            id="choose"
            tone="cream"
            eyebrow="How to Choose"
            title="Start with the Work You Need Done"
            intro="Tell us whether you need a defined project, additional specialists, a dedicated team, ongoing technology management, or repeatable business-process support. We can then discuss a suitable engagement model."
        >
            <div className="pg-chooser">
                {chooser.map((c, i) => {
                    const m = engagementModels.find((x) => x.slug === c.model);
                    return (
                        <motion.div
                            key={c.need}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <Link to={`/engagement-models/${m.slug}`} className="pg-chooser-row">
                                <span className="pg-chooser-need">I need {c.need.charAt(0).toLowerCase() + c.need.slice(1)}</span>
                                <span className="pg-chooser-model">
                                    <m.icon size={16} aria-hidden="true" /> {m.name}
                                </span>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </Section>

        <Section
            id="models"
            tone="white"
            eyebrow="All Models"
            title="Eight Ways to Structure an Engagement"
            intro="Select a model to see when it may fit, what we define together, and how we move to a plan."
        >
            <CardGrid
                cols={4}
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
            id="compare"
            tone="cream"
            eyebrow="Compare"
            title="Models at a Glance"
            intro="A simple comparison to guide the first conversation. The final structure is agreed during scoping."
        >
            <div className="pg-table-wrap">
                <table className="pg-table pg-table--stack">
                    <caption className="sr-only">Comparison of engagement models</caption>
                    <thead>
                        <tr>
                            <th scope="col">Model</th>
                            <th scope="col">Best suited for</th>
                            <th scope="col">Scope &amp; priorities</th>
                            <th scope="col">Day-to-day coordination</th>
                            <th scope="col">Typical duration</th>
                            <th scope="col">Commercial arrangement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {engagementModels.map((m) => (
                            <tr key={m.slug}>
                                <th scope="row"><Link to={`/engagement-models/${m.slug}`}>{m.name}</Link></th>
                                <td data-label="Best suited for">{m.compare.bestFor}</td>
                                <td data-label="Scope & priorities">{m.compare.scope}</td>
                                <td data-label="Day-to-day coordination">{m.compare.direction}</td>
                                <td data-label="Typical duration">{m.compare.duration}</td>
                                <td data-label="Commercial arrangement">{m.compare.commercial}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Notice>Durations and commercial arrangements shown are typical starting points, not fixed terms. Availability and commercial terms for each model are confirmed during scoping.</Notice>
        </Section>

        <Section
            id="next-steps"
            tone="white"
            eyebrow="Next Steps"
            title="Move from Discussion to a Defined Plan"
            intro="We discuss the business context, identify open questions, confirm feasibility, and outline responsibilities and commercial assumptions before any mobilisation."
            cta={{ label: 'Book a Discovery Call', to: discoveryLink('Engagement Models') }}
        >
            <Steps steps={ENGAGEMENT_NEXT_STEPS} label="Next steps" />
        </Section>

        <CtaBand
            title="Not Sure Which Model Fits?"
            text="Share the work you need done and we will suggest a structure to discuss."
            primary={{ label: 'Request a Proposal', to: contactLink('Engagement Models', 'Request a Proposal') }}
            secondary={{ label: 'Global Outsourcing', to: '/outsourcing' }}
        />
    </div>
);

export default EngagementModels;
