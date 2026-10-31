import { motion, useReducedMotion } from 'framer-motion';
import {
    ArrowRight,
    Briefcase,
    Building2,
    Code2,
    Handshake,
    Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './HeroShowcase.css';

const EASE = [0.16, 1, 0.3, 1];

const TILES = [
    {
        src: '/images/home/home-partner.jpg?v=3',
        label: 'One global partner',
        line: 'Kuwait, India and the Philippines',
        alt: 'Three colleagues seen from behind, facing a screen with three connected points',
        to: '/about',
        width: 1280,
        height: 720,
    },
    {
        src: '/images/home/home-it.jpg',
        label: 'IT services',
        line: 'Software and cloud',
        alt: 'Two software engineers looking at an abstract system diagram on monitors that face them',
        to: '/services/it-technology',
        width: 1280,
        height: 720,
    },
    {
        src: '/images/home/home-ops.jpg?v=2',
        label: 'Outsourcing',
        line: 'Support and back office',
        alt: 'A support specialist seen from behind, with the laptop screen facing her',
        to: '/services/business-outsourcing',
        width: 1280,
        height: 720,
    },
    {
        src: '/images/home/home-hr.jpg?v=2',
        label: 'HR',
        line: 'India and the GCC',
        alt: 'A recruiter seen from behind, with the laptop screen facing him and the candidate',
        to: '/services/hr-solutions',
        width: 1280,
        height: 720,
    },
    {
        src: '/images/home/home-media.jpg',
        label: 'AI media',
        line: 'Design and content',
        alt: 'A creative team reviewing color studies and a grid of stills on a studio monitor',
        to: '/services/ai-media-creative',
        width: 1280,
        height: 720,
    },
];

const AUDIENCE = [
    { title: 'For Clients', text: 'Build and scale', to: '/about#for-clients', icon: Building2 },
    { title: 'For Partners', text: 'Deliver together', to: '/about#for-partners', icon: Handshake },
    { title: 'For Careers', text: 'Grow with us', to: '/careers#jobs', icon: Briefcase },
];

const rise = (reduced, delay) => (
    reduced
        ? {}
        : {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay, ease: EASE },
        }
);

const HeroShowcase = () => {
    const reduced = useReducedMotion();

    return (
        <section className="hx" aria-labelledby="hx-title">
            <div className="container hx-top">
                <div className="hx-copy">
                    <motion.p className="hx-eyebrow" {...rise(reduced, 0.05)}>
                        <span className="hx-eyebrow-rule" aria-hidden="true" />
                        Software · IT services · Outsourcing · HR · AI media
                    </motion.p>
                    <h1 id="hx-title" className="hx-title">
                        <motion.span {...rise(reduced, 0.12)}>Technology That</motion.span>
                        <motion.span {...rise(reduced, 0.2)}>Moves Business</motion.span>
                        <motion.span className="hx-title-accent" {...rise(reduced, 0.28)}>Forward.</motion.span>
                    </h1>
                    <motion.p className="hx-partner" {...rise(reduced, 0.36)}>
                        One Global Partner. For your Business.
                    </motion.p>
                    <motion.p className="hx-lead hx-lead-title" {...rise(reduced, 0.44)}>
                        KAM Global – Your Global Partner in AI, IT & Business Outsourcing Solutions
                    </motion.p>
                    <motion.p className="hx-lead" {...rise(reduced, 0.5)}>
                        KAM Global provides comprehensive global outsourcing solutions, specializing in IT Outsourcing (ITO), AI & Automation Services, Business Process Outsourcing (BPO), AI-Powered Digital Media Solutions, and Human Resources Solutions (HRS). We empower businesses with skilled global talent, innovative technologies, and scalable, cost-effective services to streamline operations, enhance productivity, and accelerate business growth.
                    </motion.p>
                    <motion.div className="hx-actions" {...rise(reduced, 0.52)}>
                        <Link to="/services" className="hx-btn hx-btn--primary">
                            <Code2 size={18} aria-hidden="true" />
                            Explore Our Services
                            <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                        <Link to="/contact" className="hx-btn hx-btn--ghost">
                            <Users size={18} aria-hidden="true" />
                            Talk to Our Team
                            <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                    </motion.div>
                    <motion.ul className="hx-audience" {...rise(reduced, 0.6)}>
                        {AUDIENCE.map((item) => (
                            <li key={item.title}>
                                <Link to={item.to}>
                                    <span className="hx-audience-icon" aria-hidden="true">
                                        <item.icon size={18} />
                                    </span>
                                    <span>
                                        <strong>{item.title}</strong>
                                        <small>{item.text}</small>
                                    </span>
                                    <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                            </li>
                        ))}
                    </motion.ul>
                </div>

                <div className="hx-mosaic">
                    {TILES.map((tile, tileIndex) => (
                        <Link key={tile.label} to={tile.to} className="hx-tile">
                            <img
                                src={tile.src}
                                alt={tile.alt}
                                width={tile.width}
                                height={tile.height}
                                fetchpriority={tileIndex === 0 ? 'high' : 'auto'}
                                decoding="async"
                            />
                            <span>
                                <strong>{tile.label}</strong>
                                <small>{tile.line}</small>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroShowcase;
