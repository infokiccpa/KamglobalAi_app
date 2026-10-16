import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';  
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight, Info, FileCheck2, Plus } from 'lucide-react';
import './PageKit.css';

const SITE_URL = 'https://kamglobalai.com';

const reveal = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.45, ease: 'easeOut' },
};

const isExternal = (to = '') => /^(https?:|mailto:|tel:)/.test(to);

export const CtaLink = ({ to, children, variant = 'primary', className = '', arrow = true, ...rest }) => {
    const cls = `pg-btn pg-btn--${variant}${className ? ` ${className}` : ''}`;
    const content = (
        <>
            <span>{children}</span>
            {arrow && (isExternal(to) ? <ArrowUpRight size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />)}
        </>
    );
    if (isExternal(to)) {
        const newTab = to.startsWith('http');
        return (
            <a href={to} className={cls} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
                {content}
            </a>
        );
    }
    if (to?.startsWith('#')) {
        return <a href={to} className={cls} {...rest}>{content}</a>;
    }
    return <Link to={to} className={cls} {...rest}>{content}</Link>;
};

export const Seo = ({ title, description, path, crumbs, schema }) => (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {path && <link rel="canonical" href={`${SITE_URL}${path}`} />}
        {path && <meta property="og:url" content={`${SITE_URL}${path}`} />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
        {crumbs?.length > 1 && (
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: crumbs.map((c, i) => ({
                        '@type': 'ListItem',
                        position: i + 1,
                        name: c.label,
                        ...(c.to ? { item: `${SITE_URL}${c.to}` } : {}),
                    })),
                })}
            </script>
        )}
    </Helmet>
);

export const Breadcrumbs = ({ crumbs }) => (
    <nav className="pg-crumbs" aria-label="Breadcrumb">
        <ol>
            {crumbs.map((c, i) => (
                <li key={c.label}>
                    {c.to && i < crumbs.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                    {i < crumbs.length - 1 && <ChevronRight size={13} aria-hidden="true" />}
                </li>
            ))}
        </ol>
    </nav>
);

export const PageHero = ({
    eyebrow,
    title,
    sub,
    body,
    primary,
    secondary,
    image,
    imageAlt = '',
    visual,
    crumbs,
    chips,
    note,
    compact = false,
}) => (
    <section className={`pg-hero${compact ? ' pg-hero--compact' : ''}${!image && !visual ? ' pg-hero--solo' : ''}`}>
        <div className="container">
            {crumbs && <Breadcrumbs crumbs={crumbs} />}
            <div className="pg-hero-layout">
                <motion.div
                    className="pg-hero-copy"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                >
                    {eyebrow && <span className="pg-hero-eyebrow">{eyebrow}</span>}
                    <h1>{title}</h1>
                    {sub && <p className="pg-hero-sub">{sub}</p>}
                    {body && <p className="pg-hero-body">{body}</p>}
                    {(primary || secondary) && (
                        <div className="pg-hero-actions">
                            {primary && <CtaLink to={primary.to} variant="navy">{primary.label}</CtaLink>}
                            {secondary && <CtaLink to={secondary.to} variant="outline">{secondary.label}</CtaLink>}
                        </div>
                    )}
                    {chips?.length > 0 && (
                        <ul className="pg-hero-chips" aria-label="Highlights">
                            {chips.map((c) => <li key={c}>{c}</li>)}
                        </ul>
                    )}
                    {note && <p className="pg-hero-note">{note}</p>}
                </motion.div>
                {(image || visual) && (
                    <motion.div
                        className="pg-hero-visual"
                        initial={{ opacity: 0, y: 22, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                    >
                        {image ? (
                            <div className="pg-hero-frame">
                                <img src={image} alt={imageAlt} loading="eager" fetchpriority="high" width="1024" height="576" />
                            </div>
                        ) : visual}
                    </motion.div>
                )}
            </div>
        </div>
    </section>
);

export const Section = ({
    id,
    tone = 'cream',
    eyebrow,
    title,
    intro,
    align = 'center',
    cta,
    secondaryCta,
    children,
    className = '',
    headingId,
}) => {
    const hId = headingId || (id ? `${id}-title` : undefined);
    return (
        <section id={id} className={`pg-section pg-section--${tone}${className ? ` ${className}` : ''}`} aria-labelledby={title ? hId : undefined}>
            <div className="container">
                {(eyebrow || title || intro) && (
                    <motion.header className={`pg-section-head pg-section-head--${align}`} {...reveal}>
                        {eyebrow && <span className="pg-eyebrow">{eyebrow}</span>}
                        {title && <h2 id={hId}>{title}</h2>}
                        {intro && <p>{intro}</p>}
                    </motion.header>
                )}
                {children}
                {(cta || secondaryCta) && (
                    <div className={`pg-section-cta pg-section-cta--${align}`}>
                        {cta && <CtaLink to={cta.to} variant={tone === 'navy' ? 'primary' : 'navy'}>{cta.label}</CtaLink>}
                        {secondaryCta && <CtaLink to={secondaryCta.to} variant={tone === 'navy' ? 'ghost' : 'outline'}>{secondaryCta.label}</CtaLink>}
                    </div>
                )}
            </div>
        </section>
    );
};

export const CardGrid = ({ items, cols = 3, variant = 'default', headingLevel = 3 }) => {
    const H = `h${headingLevel}`;
    return (
        <div className={`pg-cards pg-cards--${cols} pg-cards--${variant}`}>
            {items.map((item, i) => {
                const Icon = item.icon;
                const inner = (
                    <>
                        {item.image && (
                            <div className="pg-card-media">
                                <img src={item.image} alt={item.alt || ''} loading="lazy" width="1024" height="576" />
                            </div>
                        )}
                        <div className="pg-card-body">
                            {(Icon || item.tag) && (
                                <div className="pg-card-top">
                                    {Icon && (
                                        <span className="pg-card-icon" aria-hidden="true">
                                            <Icon size={20} strokeWidth={1.75} />
                                        </span>
                                    )}
                                    {item.tag && <span className="pg-card-tag">{item.tag}</span>}
                                </div>
                            )}
                            <H className="pg-card-title">{item.title}</H>
                            {item.desc && <p>{item.desc}</p>}
                            {item.points?.length > 0 && (
                                <ul className="pg-card-points">
                                    {item.points.map((p) => <li key={p}>{p}</li>)}
                                </ul>
                            )}
                            {item.to && (
                                <span className="pg-card-link">
                                    {item.cta || 'Learn more'} <ArrowRight size={15} aria-hidden="true" />
                                </span>
                            )}
                        </div>
                    </>
                );
                return (
                    <motion.div key={item.title} {...reveal} transition={{ ...reveal.transition, delay: Math.min(i, 6) * 0.05 }}>
                        {item.to ? (
                            isExternal(item.to) ? (
                                <a href={item.to} className="pg-card pg-card--link" target="_blank" rel="noopener noreferrer">{inner}</a>
                            ) : (
                                <Link to={item.to} className="pg-card pg-card--link">{inner}</Link>
                            )
                        ) : (
                            <div className="pg-card">{inner}</div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};

export const Steps = ({ steps, label = 'Process steps' }) => (
    <ol className={`pg-steps pg-steps--${steps.length}`} aria-label={label}>
        {steps.map((s, i) => (
            <motion.li key={s.title} className="pg-step" {...reveal} transition={{ ...reveal.transition, delay: i * 0.06 }}>
                <span className="pg-step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                {s.desc && <p>{s.desc}</p>}
            </motion.li>
        ))}
    </ol>
);

export const Split = ({ id, tone = 'white', eyebrow, title, children, image, imageAlt = '', visual, reverse = false, cta, secondaryCta }) => (
    <section id={id} className={`pg-section pg-section--${tone}`} aria-labelledby={id ? `${id}-title` : undefined}>
        <div className="container">
            <div className={`pg-split${reverse ? ' pg-split--reverse' : ''}`}>
                <motion.div className="pg-split-copy" {...reveal}>
                    {eyebrow && <span className="pg-eyebrow">{eyebrow}</span>}
                    <h2 id={id ? `${id}-title` : undefined}>{title}</h2>
                    <div className="pg-split-text">{children}</div>
                    {(cta || secondaryCta) && (
                        <div className="pg-split-actions">
                            {cta && <CtaLink to={cta.to} variant={tone === 'navy' ? 'primary' : 'navy'}>{cta.label}</CtaLink>}
                            {secondaryCta && <CtaLink to={secondaryCta.to} variant={tone === 'navy' ? 'ghost' : 'outline'}>{secondaryCta.label}</CtaLink>}
                        </div>
                    )}
                </motion.div>
                <motion.div className="pg-split-visual" {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
                    {image ? (
                        <div className="pg-frame">
                            <img src={image} alt={imageAlt} loading="lazy" width="1024" height="576" />
                        </div>
                    ) : visual}
                </motion.div>
            </div>
        </div>
    </section>
);

export const CheckList = ({ items, cols = 2 }) => (
    <ul className={`pg-checklist pg-checklist--${cols}`}>
        {items.map((item) => (
            <li key={item}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

export const ChipList = ({ items, label }) => (
    <ul className="pg-chips" aria-label={label}>
        {items.map((item) => {
            const key = typeof item === 'string' ? item : item.label;
            return (
                <li key={key}>
                    {typeof item === 'string' ? <span className="pg-chip">{item}</span> : (
                        <Link to={item.to} className="pg-chip pg-chip--link">
                            {item.label} <ArrowRight size={13} aria-hidden="true" />
                        </Link>
                    )}
                </li>
            );
        })}
    </ul>
);

export const Deliverables = ({ items, label = 'Typical deliverables' }) => (
    <ol className="pg-deliverables" aria-label={label}>
        {items.map((item, i) => (
            <motion.li key={item} {...reveal} transition={{ ...reveal.transition, delay: i * 0.04 }}>
                <span className="pg-deliverables-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span>{item}</span>
                <FileCheck2 size={18} aria-hidden="true" className="pg-deliverables-icon" />
            </motion.li>
        ))}
    </ol>
);

export const Faq = ({ items }) => (
    <>
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: items.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
                })}
            </script>
        </Helmet>
        <div className="pg-faq">
            {items.map(({ q, a }) => (
                <details key={q} className="pg-faq-item">
                    <summary>
                        <span>{q}</span>
                        <Plus size={18} aria-hidden="true" />
                    </summary>
                    <p>{a}</p>
                </details>
            ))}
        </div>
    </>
);

export const Notice = ({ children, title = 'Good to know' }) => (
    <aside className="pg-notice">
        <Info size={18} aria-hidden="true" />
        <div>
            <strong>{title}</strong>
            <p>{children}</p>
        </div>
    </aside>
);

export const CtaBand = ({ id, eyebrow, title, text, primary, secondary, tertiary }) => (
    <section id={id} className="pg-cta-section" aria-labelledby={id ? `${id}-title` : 'pg-cta-title'}>
        <div className="container">
            <motion.div className="pg-cta" {...reveal}>
                <span className="pg-cta-glow" aria-hidden="true" />
                <svg className="pg-cta-art" viewBox="0 0 400 200" aria-hidden="true" focusable="false">
                    <circle cx="320" cy="40" r="90" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="320" cy="40" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="320" cy="40" r="190" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
                <div className="pg-cta-copy">
                    {eyebrow && <span className="pg-eyebrow pg-eyebrow--light">{eyebrow}</span>}
                    <h2 id={id ? `${id}-title` : 'pg-cta-title'}>{title}</h2>
                    {text && <p>{text}</p>}
                </div>
                <div className="pg-cta-actions">
                    {primary && <CtaLink to={primary.to} variant="primary">{primary.label}</CtaLink>}
                    {secondary && <CtaLink to={secondary.to} variant="ghost">{secondary.label}</CtaLink>}
                    {tertiary && <CtaLink to={tertiary.to} variant="text-light">{tertiary.label}</CtaLink>}
                </div>
            </motion.div>
        </div>
    </section>
);

export const FlowDiagram = ({ nodes, caption, dark = true }) => (
    <figure className={`pg-flow${dark ? ' pg-flow--dark' : ''}`}>
        <div className="pg-flow-track">
            {nodes.map((n, i) => (
                <Fragment key={n.label}>
                    <div className={`pg-flow-node pg-flow-node--${n.side || 'shared'}`}>
                        {n.icon && <n.icon size={20} strokeWidth={1.75} aria-hidden="true" />}
                        <strong>{n.label}</strong>
                        {n.sub && <span>{n.sub}</span>}
                    </div>
                    {i < nodes.length - 1 && <span className="pg-flow-arrow" aria-hidden="true"><ArrowRight size={16} /></span>}
                </Fragment>
            ))}
        </div>
        {caption && <figcaption>{caption}</figcaption>}
    </figure>
);

export const ActionCards = ({ items }) => (
    <div className="pg-actions-grid">
        {items.map((a, i) => {
            const Icon = a.icon;
            return (
                <motion.article id={a.id} key={a.title} className="pg-action" {...reveal} transition={{ ...reveal.transition, delay: i * 0.06 }}>
                    {Icon && (
                        <span className="pg-action-icon" aria-hidden="true">
                            <Icon size={22} strokeWidth={1.75} />
                        </span>
                    )}
                    {a.eyebrow && <span className="pg-action-eyebrow">{a.eyebrow}</span>}
                    <h3>{a.title}</h3>
                    <p>{a.desc}</p>
                    {a.points?.length > 0 && (
                        <ul>
                            {a.points.map((p) => <li key={p}>{p}</li>)}
                        </ul>
                    )}
                    <CtaLink to={a.cta.to} variant={i === 0 ? 'primary' : 'navy'}>{a.cta.label}</CtaLink>
                </motion.article>
            );
        })}
    </div>
);

export const RelatedLinks = ({ title = 'Related pages', links }) => (
    <nav className="pg-related" aria-label={title}>
        <span className="pg-related-title">{title}</span>
        <ul>
            {links.map((l) => (
                <li key={l.to}>
                    <Link to={l.to}>
                        {l.label} <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
);
