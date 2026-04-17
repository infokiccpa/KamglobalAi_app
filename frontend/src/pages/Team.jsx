import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Helmet } from 'react-helmet-async';
import './Team.css';

const OrgNode = ({ name, title, meta, delay = 0 }) => (
    <motion.div
        className="org-node"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        <div className="org-node-name">{name}</div>
        <div className="org-node-title">{title}</div>
        {meta ? <div className="org-node-meta">{meta}</div> : null}
    </motion.div>
);

const Team = () => {
    const executiveBoard = [
        { name: 'Dr. Abdul Wahab Al Atwan', title: 'President & C.E.O' },
        { name: 'Dr. Daoud Chit', title: 'General Manager' },
        { name: 'Yarramsetty Syam Kumar', title: 'Admin Manager' }
    ];

    const departments = [
        { dept: 'Technology / Engineering', head: 'To be added' },
        { dept: 'Product', head: 'To be added' },
        { dept: 'Operations', head: 'To be added' },
        { dept: 'Finance', head: 'To be added' },
        { dept: 'Human Resources', head: 'To be added' },
        { dept: 'Marketing', head: 'To be added' },
        { dept: 'Sales / Business Development', head: 'To be added' },
        { dept: 'Customer Success / Support', head: 'To be added' }
    ];

    return (
        <div className="team-page">
            <Helmet>
                <title>Our Leadership | KamGlobal AI - Kuwait & India Team</title>
                <meta name="description" content="Meet the leaders of KamGlobal AI. Our executive team bridges strategic vision from Kuwait with technical mastery from India." />
            </Helmet>
            <section className="team-hero-glass">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="hero-content"
                    >
                        <span className="hero-badge">Global Leadership</span>
                        <h1>Our Leadership Team</h1>
                        <p>Bridging innovation and excellence between Kuwait and India, driven by a shared vision of digital transformation.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section executives-section">
                <div className="container">
                    <div className="section-header-left">
                        <h2>Executive Board</h2>
                        <p>Organization structure overview. Department heads will be added later.</p>
                    </div>

                    <div className="org-structure">
                        <div className="org-tier org-tier-top">
                            <OrgNode
                                name={executiveBoard[0].name}
                                title={executiveBoard[0].title}
                                delay={0.05}
                            />
                        </div>

                        <div className="org-links" aria-hidden="true" />

                        <div className="org-tier org-tier-exec">
                            {executiveBoard.slice(1).map((p, idx) => (
                                <OrgNode
                                    key={p.name}
                                    name={p.name}
                                    title={p.title}
                                    delay={0.1 + idx * 0.05}
                                />
                            ))}
                        </div>

                        <div className="org-divider" />

                        <div className="org-dept-header">
                            <h3>Departments</h3>
                            <p>Standard MNC structure. Department heads will be added later.</p>
                        </div>

                        <div className="org-departments">
                            {departments.map((d, idx) => (
                                <motion.div
                                    key={d.dept}
                                    className="org-dept"
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, delay: 0.05 + idx * 0.03 }}
                                >
                                    <div className="org-dept-name">{d.dept}</div>
                                    <div className="org-dept-head">
                                        <span className="org-dept-label">Head</span>
                                        <span className="org-dept-value">{d.head}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="stats-banner-glass">
                <div className="container">
                    <div className="stats-grid">
                        {[
                            { val: "200+", label: "Experts" },
                            { val: "15+", label: "Countries" },
                            { val: "50+", label: "Industries" },
                            { val: "99%", label: "Satisfaction" }
                        ].map((stat, i) => (
                            <div key={i} className="stat-item">
                                <span className="stat-value">{stat.val}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section join-cta-glass">
                <div className="container text-center">
                    <div className="join-card glass">
                        <h2>Join the Innovation Hub</h2>
                        <p>We're always looking for bold thinkers and technical masters to join our growing global team.</p>
                        <button className="btn-primary-lux" onClick={() => window.location.href = '/careers'}>
                            Explore Careers
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Team;
