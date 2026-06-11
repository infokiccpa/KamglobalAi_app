import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { teamMoments } from '../../data/leadershipContent';

const TeamLifeSection = ({ id = 'team-life-heading' }) => (
    <section className="leadership-section team-life-section" aria-labelledby={id}>
        <div className="container">
            <div className="team-section-header">
                <div className="executive-board-eyebrow">
                    <span className="founder-leadership-line" aria-hidden="true" />
                    <span>Life at KamGlobal</span>
                    <span className="founder-leadership-line" aria-hidden="true" />
                </div>
                <h2 id={id}>Our Team in Action</h2>
                <p>Collaboration across borders — building the future of AI and digital transformation together.</p>
            </div>

            <div className="team-life-grid">
                {teamMoments.map((photo, idx) => (
                    <motion.figure
                        key={photo.src}
                        className="team-life-photo"
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                        <img src={photo.src} alt={photo.alt} loading="lazy" />
                    </motion.figure>
                ))}
            </div>
        </div>
    </section>
);

export default TeamLifeSection;
