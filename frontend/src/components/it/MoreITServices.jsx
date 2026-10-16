import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { itServices, itCategories } from '../../data/itServices';
import { staggerParent, fadeUpItem, VIEWPORT } from '../motion/motionPresets';
import './MoreITServices.css';

const PRIORITY = [
    'custom-development',
    'ai-automation',
    'cloud-devops',
    'it-staffing',
    'bot-model',
    'managed-it',
    'mobile-app-development',
    'data-analytics',
    'erp-crm',
    'ui-ux-design',
    'qa-testing',
    'it-consulting',
];

const rank = (slug) => {
    const i = PRIORITY.indexOf(slug);
    return i === -1 ? PRIORITY.length : i;
};

/** Three related IT services (same category first), category shortcuts and optional cross-links. */
export default function MoreITServices({ current, extras = [] }) {
    const self = itServices.find((s) => s.slug === current);
    const picks = itServices
        .filter((s) => s.slug !== current)
        .sort((a, b) => {
            const sameA = a.category === self?.category ? 0 : 1;
            const sameB = b.category === self?.category ? 0 : 1;
            return sameA - sameB || rank(a.slug) - rank(b.slug);
        })
        .slice(0, 3);
    const categoryOf = (key) => itCategories.find((c) => c.key === key);

    return (
        <section className="mis" aria-labelledby="mis-title">
            <div className="container">
                <div className="mis-head">
                    <div>
                        <span className="pg-eyebrow">Explore More</span>
                        <h2 id="mis-title">More From IT &amp; Technology</h2>
                        <p>Services that are often combined with this one.</p>
                    </div>
                    <Link to="/services" className="mis-all">
                        View all {itServices.length} IT services <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                </div>

                <motion.ul className="mis-cards" variants={staggerParent(0.08)} initial="hidden" whileInView="show" viewport={VIEWPORT}>
                    {picks.map((s) => {
                        const Icon = s.icon;
                        return (
                            <motion.li key={s.slug} variants={fadeUpItem}>
                                <Link to={`/services/${s.slug}`} className="mis-card">
                                    <span className="mis-card-top">
                                        <span className="mis-card-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.75} /></span>
                                        <span className="mis-card-cat">{categoryOf(s.category)?.title}</span>
                                    </span>
                                    <h3>{s.short}</h3>
                                    <p>{s.cardDesc}</p>
                                    <span className="mis-card-go">
                                        Explore <ArrowUpRight size={15} aria-hidden="true" />
                                    </span>
                                </Link>
                            </motion.li>
                        );
                    })}
                </motion.ul>

                <nav className="mis-cats" aria-label="Browse IT services by category">
                    <span className="mis-cats-label">Browse by category</span>
                    <ul>
                        {itCategories.map(({ key, title, icon: Icon }) => (
                            <li key={key}>
                                <Link to={`/services#${key}`} className={`mis-cat${key === self?.category ? ' is-current' : ''}`}>
                                    <Icon size={15} aria-hidden="true" />
                                    {title}
                                    <b>{itServices.filter((s) => s.category === key).length}</b>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {extras.length > 0 && (
                    <ul className="mis-extras">
                        {extras.map(({ icon: Icon, lead, label, to }) => (
                            <li key={to}>
                                <Link to={to} className="mis-extra">
                                    {Icon && <span className="mis-extra-icon" aria-hidden="true"><Icon size={18} /></span>}
                                    <span>
                                        <small>{lead}</small>
                                        <strong>{label}</strong>
                                    </span>
                                    <ArrowRight size={16} aria-hidden="true" className="mis-extra-arrow" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
