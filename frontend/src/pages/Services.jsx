import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Globe, Laptop, Cloud, Users, TrendingUp, CheckCircle, ArrowRight, ShieldCheck, Mail, MessageSquare } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './Services.css';

const TrustBadges = () => (
    <div className="trust-badges-marquee">
        <div className="marquee-track">
            {/* Double the logos to simulate infinite scroll */}
            {[...Array(2)].map((_, i) => (
                <div key={i} className="marquee-content">
                    <span className="trust-badge">ISO 27001 Certified</span>
                    <span className="trust-badge">AWS Advanced Partner</span>
                    <span className="trust-badge">Microsoft Gold Partner</span>
                    <span className="trust-badge">SOC 2 Type II Compliant</span>
                    <span className="trust-badge">GDPR Compliant</span>
                </div>
            ))}
        </div>
    </div>
);

const LeadCaptureCTA = ({ title, subtitle }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-lead-cta glass-card-premium"
    >
        <div className="lead-text">
            <h3>{title}</h3>
            <p>{subtitle}</p>
        </div>
        <div className="lead-form-quick">
            <input type="email" placeholder="Enter your business email" className="quick-input" />
            <button className="btn btn-orange btn-quick">Consult an Expert <ArrowRight size={16} /></button>
        </div>
    </motion.div>
);

const ServiceBlock = ({ id, icon: Icon, title, subtitle, challenge, solution, benefits, image, reverse, index }) => {
    const ref = useRef(null);

    return (
        <div id={id} className={`service-split-block ${reverse ? 'reverse' : ''}`} ref={ref}>
            <div className="container">
                <div className="service-split-grid">
                    <motion.div
                        className="service-split-content"
                        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <div className="service-header-modern">
                            <div className="icon-wrapper-glow">
                                <Icon size={24} strokeWidth={2} />
                            </div>
                            <span className="subtitle-modern">{subtitle}</span>
                        </div>

                        <h3 className="service-premium-title">{title}</h3>

                        <div className="challenge-solution-card glass-card-premium">
                            <div className="cs-row">
                                <span className="cs-label text-red">The Challenge</span>
                                <p>{challenge}</p>
                            </div>
                            <div className="cs-divider"></div>
                            <div className="cs-row">
                                <span className="cs-label text-green">Our Solution</span>
                                <p>{solution}</p>
                            </div>
                        </div>

                        <div className="benefits-list-modern">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="modern-benefit-item">
                                    <div className="check-glow"><CheckCircle size={14} /></div>
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="service-split-visual"
                        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <div className="image-wrapper-asymmetric">
                            <img src={image} alt={title} loading="lazy" />
                            <div className="image-glow-overlay"></div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Inject Lead CTA after every 2 services */}
            {(index + 1) % 2 === 0 && index !== 5 && (
                <div className="container" style={{ marginTop: '5rem' }}>
                    <LeadCaptureCTA
                        title="Looking to accelerate this process?"
                        subtitle="Our consultants can build a tailored roadmap for your specific enterprise needs."
                    />
                </div>
            )}
        </div>
    );
};

const Services = () => {
    const heroRef = useRef(null);
    const [showStickyCTA, setShowStickyCTA] = useState(false);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

    // Sticky CTA logic
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) setShowStickyCTA(true);
            else setShowStickyCTA(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

    const services = [
        {
            id: 'bot-model',
            icon: Globe,
            title: 'BOT Model (Build-Operate-Transfer)',
            subtitle: 'Strategic Offshoring',
            challenge: 'High cost of scaling tech talent locally without sacrificing quality or ownership.',
            solution: 'We build your dedicated team in India, run it to your exact standards, and transfer legal ownership when you are ready.',
            benefits: ['Up to 60% Cost Arbitrage', 'Zero Legal Liability Early On', 'IP Protection', 'Seamless Handover'],
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
            reverse: false
        },
        {
            id: 'it-dev',
            icon: Laptop,
            title: 'Custom Enterprise Development',
            subtitle: 'Digital Engineering',
            challenge: 'Off-the-shelf software fails to address deep, unique operational workflows.',
            solution: 'End-to-end full-stack development. We architect, code, and deploy custom enterprise-grade platforms.',
            benefits: ['Microservices Architecture', 'React / Node.js Stack', 'High Availability', 'Secure Development Lifecycle'],
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
            reverse: true
        },
        {
            id: 'cloud',
            icon: Cloud,
            title: 'Cloud Native & DevOps',
            subtitle: 'Infrastructure Modernization',
            challenge: 'Monolithic legacy systems causing slow deployments, downtime, and high server costs.',
            solution: 'Complete cloud migration (AWS/Azure) coupled with automated CI/CD pipelines to drastically reduce time-to-market.',
            benefits: ['Docker / Kubernetes', 'Zero-Downtime Deployments', 'Cost Optimization Audits', 'Auto-scaling'],
            image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
            reverse: false
        },
        {
            id: 'staffing',
            icon: Users,
            title: 'Global Technical Staffing',
            subtitle: 'Talent Acquisition',
            challenge: 'Months lost trying to source, interview, and onboard niche IT specialists.',
            solution: 'Tap into our pre-vetted pool of elite Indian engineers, ready to integrate into your agile cycles immediately.',
            benefits: ['Top 1% Vetted Talent', 'Immediate Availability', 'Flexible Contracts', 'Cultural Alignment Training'],
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
            reverse: true
        },
        {
            id: 'marketing',
            icon: TrendingUp,
            title: 'AI-Driven Digital Growth',
            subtitle: 'Marketing & SEO',
            challenge: 'Struggling to capture qualified B2B leads or rank organically in a saturated market.',
            solution: 'We leverage AI-analytics and programmatic SEO to drive high-intent commercial traffic to your funnels.',
            benefits: ['Predictive Analytics', 'Programmatic SEO', 'B2B Lead Generation', 'Conversion Rate Optimization'],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
            reverse: false
        },
        {
            id: 'managed-it',
            icon: CheckCircle,
            title: 'Managed IT Services',
            subtitle: '24/7 Enterprise Support',
            challenge: 'Internal IT teams bogged down by routine maintenance instead of strategic innovation.',
            solution: 'We take over your entire IT operations, offering L1-L3 support, active network monitoring, and security patching.',
            benefits: ['Predictable Monthly SLAs', 'Proactive Threat Hunting', '99.99% Uptime Guarantee', 'Dedicated NOC Team'],
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
            reverse: true
        }
    ];

    return (
        <div className="services-page premium-redesign">
            <Helmet>
                <title>Enterprise IT Services | KamGlobal AI - BOT, Cloud, AI</title>
                <meta name="description" content="Explore our specialized enterprise services: BOT Model offshoring, Custom Software, Cloud & DevOps, AI Engineering, and Global Staffing." />
            </Helmet>

            {/* Sticky Floating CTA */}
            <AnimatePresence>
                {showStickyCTA && (
                    <motion.a
                        href="/contact"
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        className="sticky-global-cta"
                    >
                        <MessageSquare size={20} />
                        <span>Let's Talk Scope</span>
                    </motion.a>
                )}
            </AnimatePresence>

            <motion.section
                className="services-hero-modern"
                ref={heroRef}
                style={{ opacity: heroOpacity, y: heroY }}
            >
                <div className="hero-grid-bg"></div>
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-800 mx-auto"
                    >
                        <span className="hero-badge-glow">Enterprise Solutions</span>
                        <h1 className="premium-hero-heading">
                            Transforming Ambition into <br />
                            <span className="highlight-gradient">Digital Reality</span>
                        </h1>
                        <p className="hero-modern-p">
                            Comprehensive, scalable, and secure technology services engineered for global enterprises demanding excellence.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Marquee Trust Badges */}
            <TrustBadges />

            <div className="services-list-wrapper">
                {services.map((service, idx) => (
                    <ServiceBlock key={idx} index={idx} {...service} />
                ))}
            </div>

            <section className="cta-modern footer-cta-service">
                <div className="cta-glow-overlay"></div>
                <div className="container">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="cta-modern-box glass-card-premium">
                        <h2>Ready to Evaluate Your Technology Stack?</h2>
                        <p>Book a free 30-minute discovery call with our enterprise solutions architect.</p>
                        <div className="cta-actions">
                            <a href="/contact" className="btn btn-orange cta-main-btn">Book Discovery Call</a>
                            <a href="mailto:info@kamglobalai.com" className="btn cta-outline-btn"><Mail size={18} className="mr-05" /> Email Us</a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;
