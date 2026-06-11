import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { executiveBoard, getInitials } from '../../data/leadershipContent';

const ExecutiveCard = ({ name, title, featured = false, delay = 0 }) => (
    <motion.article
        className={`executive-card${featured ? ' executive-card-featured' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        <div className="executive-card-accent" aria-hidden="true" />
        <div className="executive-avatar" aria-hidden="true">{getInitials(name)}</div>
        <h3 className="executive-name">{name}</h3>
        <p className="executive-title">{title}</p>
    </motion.article>
);

const ExecutiveBoardSection = ({
    id = 'executive-board-heading',
    subtitle = 'The leaders guiding KamGlobal AI\'s vision across Kuwait and India.'
}) => (
    <section className="leadership-section executives-section" aria-labelledby={id}>
        <div className="container">
            <div className="executive-board-header">
                <div className="executive-board-eyebrow">
                    <span className="founder-leadership-line" aria-hidden="true" />
                    <span>Leadership</span>
                    <span className="founder-leadership-line" aria-hidden="true" />
                </div>
                <h2 id={id}>Executive Board</h2>
                <p>{subtitle}</p>
            </div>

            <div className="executive-board-grid">
                {executiveBoard.map((executive, idx) => (
                    <ExecutiveCard
                        key={executive.name}
                        name={executive.name}
                        title={executive.title}
                        featured={executive.featured}
                        delay={0.05 + idx * 0.07}
                    />
                ))}
            </div>
        </div>
    </section>
);

export default ExecutiveBoardSection;
