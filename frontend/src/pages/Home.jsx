import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Laptop, Cloud, Shield, Globe, Users, CheckCircle, Handshake, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    // Content data for easy "backend-like" editing
    const homeData = {
        hero: {
            badge: "Advanced IT Solutions",
            title: "KamGlobalAI – Global IT Solutions",
            subtitle: "Empowering enterprises with AI-driven IT services, cloud solutions, digital transformation, and global talent — delivered from India to the world."
        },
        about: {
            badge: "ABOUT US",
            title: "Bridging Kuwait's Vision with India's Technical Power",
            desc1: "KamGlobalAI is a global IT services and solutions company based in India, strategically backed by KAM Group, Kuwait. We deliver reliable, scalable, and future-ready IT solutions that help businesses accelerate growth and digital transformation.",
            desc2: "From startups to large enterprises, we serve clients across industries with world-class technology and consulting expertise.",
            stats: [
                { num: "10+", label: "Years Exp" },
                { num: "50+", label: "Experts" },
                { num: "100%", label: "Success" }
            ]
        },
        whyChoose: {
            title: "Why Choose KAM Global AI?",
            subtitle: "Global Capability. Local Expertise. Proven Execution.",
            list: [
                { icon: Shield, text: "Backed by KAM Group (Kuwait) with strong regional presence" },
                { icon: Users, text: "Access to India's top-tier engineering and AI talent" },
                { icon: Shield, text: "Enterprise-grade security, governance, and compliance" },
                { icon: Globe, text: "Cost-efficient global delivery without quality compromise" },
                { icon: Laptop, text: "BOT-model expertise for scalable offshore expansion" },
                { icon: CheckCircle, text: "Transparent engagement and long-term partnership mindset" }
            ]
        },
        satisfaction: {
            title: "Client Satisfaction",
            rate: "98%",
            description: "retention rate with enterprise clients"
        },
        lms: {
            title: "AI-Powered LMS - Launching Soon!",
            subtitle: "Revolutionary learning management system for Pre-KG to Grade 12"
        },
        services: {
            title: "Our Services",
            items: [
                { icon: Globe, title: "BOT Model", desc: "Build, Operate, and Transfer dedicated teams." },
                { icon: Laptop, title: "Custom Solutions", desc: "Bespoke software for your business needs." },
                { icon: Cloud, title: "Cloud Native", desc: "Modern infrastructure for high scalability." },
                { icon: Shield, title: "Trusted Security", desc: "Enterprise-grade protection for assets." }
            ]
        },
        testimonials: {
            title: "What Our Clients Say",
            subtitle: "Trusted by industry leaders worldwide for digital excellence.",
            items: [
                {
                    quote: "KamGlobalAI transformed our legacy systems into a modern cloud-native architecture. Their expertise in AI is unparalleled.",
                    author: "David Chen",
                    role: "CTO, TechCorp Global",
                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
                },
                {
                    quote: "The BOT model they provided allowed us to scale our offshore engineering team in record time with top-tier talent.",
                    author: "Sarah Jenkins",
                    role: "VP Engineering, InnovateUK",
                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
                },
                {
                    quote: "Their commitment to security and compliance gave us the confidence to move our sensitive operations to the cloud.",
                    author: "Marcus Thorne",
                    role: "Director of IT, SecureFin",
                    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
                }
            ]
        },
        partnership: {
            title: "Strategic Partnership with KAM Group, Kuwait",
            desc: "A powerful synergy that integrates the industrial legacy and regional vision of KAM Group with our world-class engineering execution, creating a bridge of trust between Kuwait and the global technology market.",
            location: "Kuwait City, Kuwait",
            phone: "+965 2434 5650",
        },
        partners: [
            "TechFlow", "GlobalCloud", "SecureSystems", "AI-Corp", "DataDynamics"
        ],
        globalPresence: {
            title: "Global Presence",
            items: [
                {
                    title: "Kuwait – Parent Company",
                    desc: "Strategic headquarters backed by KAM Group's established business network",
                    icon: MapPin,
                    type: "pin"
                },
                {
                    title: "India – Technology & Delivery Center",
                    desc: "Hub of engineering excellence and innovation-driven development",
                    icon: MapPin,
                    type: "pin"
                },
                {
                    title: "Serving Clients Globally",
                    desc: "Enterprise clients across multiple continents and industries",
                    icon: Globe,
                    type: "globe"
                }
            ]
        }
    };

    return (
        <div className="home-page">
            {/* Hero Section - Redesigned to Split Screen */}
            {/* Hero Section - Framed Cinematic Style */}
            <section className="hero-framed-wrapper">
                <div className="hero-outer-frame">
                    <div className="hero-visual-card">
                        <img
                            src="/modern_tech_lounge_hero.png"
                            alt="Innovation Lab"
                            className="hero-bg-img"
                        />
                        <div className="hero-overlay-gradient"></div>

                        <div className="hero-text-content">
                            <motion.h1
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="hero-framed-title"
                            >
                                Bringing Intelligence <br />
                                To The <span className="text-highlight-ai">Global Market</span>
                            </motion.h1>

                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="hero-framed-desc"
                            >
                                Empowering enterprises with AI-driven IT solutions, cloud strategies,
                                and world-class consulting to accelerate digital transformation.
                            </motion.p>

                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                            >
                                <Link to="/services" className="hero-btn-white">
                                    Start Your Transformation
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="partners-bar">
                <div className="container">
                    <div className="partners-flex">
                        <span className="partners-label">TRUSTED BY</span>
                        <div className="partners-track">
                            {homeData.partners.map((partner, i) => (
                                <span key={i} className="partner-logo">{partner}</span>
                            ))}
                            {/* Duplicate for infinite animation */}
                            {homeData.partners.map((partner, i) => (
                                <span key={i + 'd'} className="partner-logo">{partner}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="section about-home">
                <div className="container about-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="about-visual-container"
                    >
                        <div className="about-image-wrapper">
                            <img src="/office_team_collab.png" alt="Our Team" className="about-custom-img" />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="about-text"
                    >
                        <span className="badge-small">{homeData.about.badge}</span>
                        <h2>{homeData.about.title}</h2>
                        <div className="title-underline"></div>
                        <p className="about-description-text">{homeData.about.desc1}</p>
                        <p className="about-description-text">{homeData.about.desc2}</p>
                        <Link to="/contact" className="btn btn-orange">
                            GET A QUOTE
                        </Link>

                    </motion.div>
                </div>
            </section>

            {/* Strategic Partnership Section - High Trust */}
            <section className="section partnership-trust">
                <div className="container centered-trust-content">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="partnership-icon-wrapper"
                    >
                        <Handshake size={48} strokeWidth={1.5} className="handshake-icon" />
                    </motion.div>

                    <div className="partnership-header">
                        {homeData.partnership.title.split(' ').map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="split-word"
                            >
                                {word}{' '}
                            </motion.span>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="partnership-description"
                    >
                        {homeData.partnership.desc}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        viewport={{ once: true }}
                        className="partnership-contact-inline"
                    >
                        <div className="contact-item">
                            <MapPin size={16} />
                            <span>{homeData.partnership.location}</span>
                        </div>
                        <div className="contact-divider"></div>
                        <div className="contact-item">
                            <Phone size={16} />
                            <span>{homeData.partnership.phone}</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Global Presence Section */}
            <section className="section global-presence">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header-centered"
                    >
                        <h2 className="section-title-premium">{homeData.globalPresence.title}</h2>
                        <div className="title-underline-center"></div>
                    </motion.div>

                    <div className="global-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="map-visual-container"
                        >
                            <div className="map-frame">
                                <img
                                    src="https://images.unsplash.com/photo-1589519160732-57fc498494f8?auto=format&fit=crop&q=80&w=1000"
                                    alt="Global Presence Map"
                                    className="world-map-img"
                                />
                                <div className="map-glow-overlay"></div>
                                {/* Animated Nodes on Map */}
                                <div className="map-node node-kuwait"></div>
                                <div className="map-node node-india"></div>
                            </div>
                        </motion.div>

                        <div className="presence-info-list">
                            {homeData.globalPresence.items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.2 }}
                                    viewport={{ once: true }}
                                    className="presence-card"
                                >
                                    <div className={`presence-icon-wrapper ${item.type}`}>
                                        <item.icon size={22} />
                                    </div>
                                    <div className="presence-content">
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="section why-choose">
                <div className="container">
                    <div className="why-header-centered">
                        <span className="badge-small">WHY US</span>
                        <h2>{homeData.whyChoose.title}</h2>
                        {homeData.whyChoose.subtitle && (
                            <p className="why-subtitle">{homeData.whyChoose.subtitle}</p>
                        )}
                    </div>

                    <div className="why-grid-modern">
                        <div className="why-features-grid">
                            {homeData.whyChoose.list.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="why-feature-card glass-card"
                                >
                                    <div className="feature-icon-box">
                                        <item.icon size={20} />
                                    </div>
                                    <p>{item.text}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="why-visual-highlight"
                        >
                            <div className="delivery-card dark-card">
                                <div className="card-content-wrap">
                                    <h3>Global Delivery</h3>
                                    <p className="delivery-p">Providing seamless IT solutions across borders with reliability and speed.</p>
                                </div>
                                <div className="satisfaction-badge glass">
                                    <div className="stars">★★★★★</div>
                                    <h4>{homeData.satisfaction.title}</h4>
                                    <p><strong>{homeData.satisfaction.rate}</strong> {homeData.satisfaction.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Compact Stylish Services Header */}
            <section className="section services-redesign">
                <div className="services-hero-slim">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="services-compact-glass"
                        >
                            <div className="services-title-wrap">
                                <motion.h2
                                    className="services-hero-title-slim"
                                >
                                    Our <span className="text-accent-glow-alt">Services</span>
                                </motion.h2>
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "60px" }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                    className="headline-bar-thin"
                                />

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                    className="services-hero-intro-slim"
                                >
                                    Empowering enterprises with cutting-edge IT solutions and global delivery excellence.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                >
                                    <Link to="/services" className="view-services-btn">
                                        View Services <ArrowRight size={18} className="arrow-hover" />
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="container services-stack-wrapper">
                    {homeData.services.items.map((service, i) => {
                        // Map images based on index
                        const images = [
                            "/service_bot_model.png",
                            "/service_custom_dev.png",
                            "/service_cloud_native.png",
                            "/service_cyber_security.png"
                        ];
                        const nums = ["01", "02", "03", "04"];

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ margin: "-100px" }}
                                className="service-stack-card"
                                style={{ top: `calc(130px + ${i * 40}px)` }} // Stacking effect
                            >
                                <div className="stack-card-content">
                                    <div className="stack-text-side">
                                        <div className="stack-number">{nums[i]}</div>
                                        <h3>{service.title}</h3>
                                        <p>{service.desc}</p>
                                        <Link to="/services" className="stack-learn-btn">
                                            Learn More <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                    <div className="stack-visual-side">
                                        <img src={images[i]} alt={service.title} className="stack-img" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Product Highlight */}
            <section className="section product-highlight">
                <div className="container">
                    <div className="product-card glass">
                        <div className="product-info">
                            <span className="badge-small">FEATURED PRODUCT</span>
                            <h2>AI-Powered LMS</h2>
                            <p>Revolutionizing education with intelligent, adaptive learning paths for students from Pre-KG to Grade 12. Our state-of-the-art platform empowers both schools and students.</p>
                            <Link to="/products" className="btn btn-primary">Explore LMS <ArrowRight size={18} className="ml-05" /></Link>
                        </div>
                        <div className="product-image">
                            <div className="glass-card lms-visual-card">
                                <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=600" alt="LMS Interface" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
