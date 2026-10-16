import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Compass, Gauge, Target, UserCog } from 'lucide-react';
import { Seo, PageHero, Section, Steps, CtaBand } from '../components/page/PageKit';
import { getEngagementModel, ENGAGEMENT_NEXT_STEPS } from '../data/engagementModels';
import { contactLink, discoveryLink, proposalLink } from '../data/links';
import NotFound from './NotFound';
import './EngagementModelDetail.css';

const SIDE_LABEL = { client: 'You', kam: 'KAM Global AI', shared: 'Together' };

const reveal = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.45, ease: 'easeOut' },
};

const AtAGlance = ({ model }) => {
    const Icon = model.icon;
    const rows = [
        { icon: Target, label: 'Best for', value: model.compare.bestFor },
        { icon: UserCog, label: 'Who directs the work', value: model.compare.direction },
        { icon: Gauge, label: 'Engagement shape', value: model.compare.shape },
    ];
    return (
        <div className="em-glance">
            <div className="em-glance-head">
                <span className="em-glance-icon" aria-hidden="true"><Icon size={20} /></span>
                <span>
                    <small>At a glance</small>
                    <strong>{model.name}</strong>
                </span>
            </div>
            <dl className="em-glance-rows">
                {rows.map((r) => (
                    <div key={r.label} className="em-glance-row">
                        <dt><r.icon size={15} aria-hidden="true" /> {r.label}</dt>
                        <dd>{r.value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};

const RoleFlow = ({ nodes }) => (
    <ol className="em-flow">
        {nodes.map((n, i) => (
            <Fragment key={n.label}>
                <motion.li
                    className={`em-flow-node em-flow-node--${n.side || 'shared'}`}
                    {...reveal}
                    transition={{ ...reveal.transition, delay: i * 0.08 }}
                >
                    <span className="em-flow-side">{SIDE_LABEL[n.side] || SIDE_LABEL.shared}</span>
                    <span className="em-flow-icon" aria-hidden="true"><n.icon size={20} strokeWidth={1.75} /></span>
                    <strong>{n.label}</strong>
                    <span className="em-flow-sub">{n.sub}</span>
                </motion.li>
                {i < nodes.length - 1 && (
                    <li className="em-flow-arrow" aria-hidden="true"><ArrowRight size={18} /></li>
                )}
            </Fragment>
        ))}
    </ol>
);

const EngagementModelDetail = () => {
    const { slug } = useParams();
    const model = getEngagementModel(slug);
    if (!model) return <NotFound />;

    const subject = `Engagement Model: ${model.name}`;
    const crumbs = [
        { label: 'Home', to: '/' },
        { label: 'Engagement Models', to: '/engagement-models' },
        { label: model.name, to: `/engagement-models/${model.slug}` },
    ];
    const alternatives = (model.related || []).map(getEngagementModel).filter(Boolean);

    return (
        <div className="pg-page em-page" key={model.slug}>
            <Seo title={model.seo.title} description={model.seo.description} path={`/engagement-models/${model.slug}`} crumbs={crumbs} />

            <PageHero
                crumbs={[crumbs[0], crumbs[1], { label: model.name }]}
                eyebrow={`Engagement Model · ${model.name}`}
                title={model.hero.title}
                body={model.meaning}
                primary={{ label: 'Discuss This Model', to: contactLink(subject, 'Global Outsourcing') }}
                secondary={{ label: 'Compare Models', to: '/engagement-models#compare' }}
                visual={<AtAGlance model={model} />}
            />

            <Section
                id="how-it-works"
                tone="cream"
                eyebrow="How It Works"
                title={`Who Does What in ${model.name}`}
                intro="Responsibilities, communication, and reporting are agreed up front so both teams know who owns each part of the work."
            >
                <RoleFlow nodes={model.diagram} />
            </Section>

            <Section
                id="when-to-consider"
                tone="white"
                eyebrow="Is It the Right Fit?"
                title="When This Model Works Best"
                intro="Suitability is confirmed during discovery — these signals help you decide whether to start here."
            >
                <div className="em-fit">
                    <motion.div className="em-fit-col" {...reveal}>
                        <h3>Good fit when</h3>
                        <ul className="em-fit-list">
                            {model.fit.map((f) => (
                                <li key={f}>
                                    <CheckCircle2 size={18} aria-hidden="true" />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    {alternatives.length > 0 && (
                        <motion.div className="em-fit-col em-fit-col--alt" {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
                            <h3><Compass size={18} aria-hidden="true" /> Consider instead</h3>
                            <ul className="em-alt-list">
                                {alternatives.map((alt) => (
                                    <li key={alt.slug}>
                                        <Link to={`/engagement-models/${alt.slug}`} className="em-alt">
                                            <span className="em-alt-icon" aria-hidden="true"><alt.icon size={18} /></span>
                                            <span className="em-alt-text">
                                                <strong>{alt.name}</strong>
                                                <small>Best for {alt.compare.bestFor.toLowerCase()}</small>
                                            </span>
                                            <ArrowRight size={16} className="em-alt-arrow" aria-hidden="true" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Link to="/engagement-models#compare" className="em-alt-all">
                                Compare all models <ArrowRight size={14} aria-hidden="true" />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </Section>

            <Section
                id="what-we-define"
                tone="cream"
                eyebrow="What We Define"
                title="Agreed Before Work Starts"
                intro="Before mobilisation, we clarify and document:"
            >
                <ol className="em-define">
                    {model.define.map((d, i) => (
                        <motion.li key={d} {...reveal} transition={{ ...reveal.transition, delay: Math.min(i, 7) * 0.04 }}>
                            <span className="em-define-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                            <span>{d}</span>
                        </motion.li>
                    ))}
                </ol>
            </Section>

            <Section
                id="next-steps"
                tone="white"
                eyebrow="Next Steps"
                title="From First Conversation to a Defined Plan"
            >
                <Steps steps={ENGAGEMENT_NEXT_STEPS} label="Next steps" />
            </Section>

            <CtaBand
                title={`Discuss ${model.name} with Our Team`}
                text="Share the work you need done, how your team operates, and your expected timeline."
                primary={{ label: 'Discuss This Model', to: contactLink(subject, 'Global Outsourcing') }}
                secondary={{ label: 'Request a Proposal', to: proposalLink(subject) }}
                tertiary={{ label: 'Book a Discovery Call', to: discoveryLink(subject) }}
            />
        </div>
    );
};

export default EngagementModelDetail;
