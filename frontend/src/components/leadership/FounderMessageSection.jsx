import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { founderProfile } from '../../data/leadershipContent';

const FounderMessageSection = ({
    id = 'founder-message-heading',
    primaryCta = { to: '/contact', label: 'Book a Demo' },
    secondaryCta = { to: '/careers', label: 'Join Our Team' }
}) => (
    <section className="leadership-section founder-leadership-section" aria-labelledby={id}>
        <div className="container leadership-container">
            <motion.div
                className="founder-leadership-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
            >
                <figure className="founder-profile-visual">
                    <div className="founder-image-frame">
                        <img
                            src="/images/president-founder.png"
                            alt={`${founderProfile.name} — Founder, Building Vision. Creating Impact.`}
                        />
                    </div>
                    <figcaption className="founder-image-caption">
                        <span className="founder-caption-eyebrow">Founder &amp; President</span>
                        <strong>{founderProfile.name}</strong>
                    </figcaption>
                </figure>

                <div className="founder-message-panel">
                    <div className="founder-message-header">
                        <span className="founder-leadership-line" aria-hidden="true" />
                        <span>Leadership</span>
                        <span className="founder-leadership-line" aria-hidden="true" />
                    </div>

                    <span className="founder-decorative-quote" aria-hidden="true">&ldquo;</span>

                    <h2 id={id} className="founder-message-title">
                        A message from our <span>Founder</span>
                    </h2>

                    <p className="founder-message-body">
                        <span className="founder-drop-cap" aria-hidden="true">T</span>
                        {founderProfile.messageLead}
                    </p>

                    <blockquote className="founder-featured-quote">
                        {founderProfile.featuredQuote}
                    </blockquote>

                    <div className="founder-signature">
                        <strong>{founderProfile.name}</strong>
                        <span className="founder-signature-line" aria-hidden="true" />
                        <span className="founder-signature-org">{founderProfile.signatureOrg}</span>
                    </div>

                    <div className="founder-cta-row">
                        <Link to={primaryCta.to} className="founder-btn founder-btn-primary">
                            {primaryCta.label} <ArrowRight size={16} />
                        </Link>
                        <Link to={secondaryCta.to} className="founder-btn founder-btn-secondary">
                            {secondaryCta.label}
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
);

export default FounderMessageSection;
