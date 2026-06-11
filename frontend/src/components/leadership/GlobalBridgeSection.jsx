import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { MapPin, ExternalLink, Handshake, CheckCircle2, Building2, Cpu } from 'lucide-react';
import { OFFICE_LOCATIONS } from '../../config/officeLocations';
import { kuwaitHighlights, indiaHighlights } from '../../data/leadershipContent';

const GlobalBridgeSection = ({ id = 'global-bridge-heading', showHighlights = true }) => (
    <section className="leadership-section team-global-section" aria-labelledby={id}>
        <div className="container">
            <div className="team-section-header">
                <div className="executive-board-eyebrow">
                    <span className="founder-leadership-line" aria-hidden="true" />
                    <span>Global Bridge</span>
                    <span className="founder-leadership-line" aria-hidden="true" />
                </div>
                <h2 id={id}>Kuwait &amp; India, One Team</h2>
                <p>Strategic leadership from Kuwait and engineering excellence from India — backed by KAM Group.</p>
            </div>

            {showHighlights ? (
                <div className="global-bridge-highlights">
                    <motion.article
                        className="global-bridge-card"
                        initial={{ opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <div className="global-bridge-card-head">
                            <span aria-hidden="true">🇰🇼</span>
                            <Building2 size={18} aria-hidden="true" />
                            <h3>Kuwait Headquarters</h3>
                        </div>
                        <ul>
                            {kuwaitHighlights.map((item) => (
                                <li key={item}>
                                    <CheckCircle2 size={14} aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.article>

                    <motion.article
                        className="global-bridge-card"
                        initial={{ opacity: 0, x: 14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <div className="global-bridge-card-head">
                            <span aria-hidden="true">🇮🇳</span>
                            <Cpu size={18} aria-hidden="true" />
                            <h3>India Delivery Center</h3>
                        </div>
                        <ul>
                            {indiaHighlights.map((item) => (
                                <li key={item}>
                                    <CheckCircle2 size={14} aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.article>
                </div>
            ) : null}

            <div className="team-offices-grid">
                {OFFICE_LOCATIONS.map((office, idx) => (
                    <motion.article
                        key={office.shortName}
                        className="team-office-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: idx * 0.08 }}
                    >
                        <div className="team-office-flag" aria-hidden="true">
                            {office.addressCountry === 'KW' ? '🇰🇼' : '🇮🇳'}
                        </div>
                        <div className="team-office-pin">
                            <MapPin size={18} />
                        </div>
                        <h3>{office.shortName}</h3>
                        <p className="team-office-label">
                            {office.addressCountry === 'KW' ? 'Kuwait HQ' : 'India Development Center'}
                        </p>
                        <address className="team-office-address">{office.streetAddress}</address>
                        <a
                            href={office.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="team-office-map-link"
                        >
                            View on Maps <ExternalLink size={14} />
                        </a>
                    </motion.article>
                ))}
            </div>

            <div className="team-kam-backing">
                <Handshake size={20} aria-hidden="true" />
                <p>
                    KamGlobal AI is backed by <strong>KAM Group, Kuwait</strong> — combining regional business
                    leadership with world-class technology delivery.
                </p>
            </div>
        </div>
    </section>
);

export default GlobalBridgeSection;
