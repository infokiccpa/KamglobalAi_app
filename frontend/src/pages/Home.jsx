import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Laptop, Cloud, Shield, Globe, Users, CheckCircle, Handshake, MapPin, Phone, Brain, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './Home.css';

const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
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
                { num: 10, suffix: "+", label: "Years Exp" },
                { num: 50, suffix: "+", label: "Experts" },
                { num: 100, suffix: "%", label: "Success" }
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
            title: "Global Operations",
            rate: "24/7",
            description: "Active monitoring and support across timezones"
        },
        lms: {
            title: "AI-Powered LMS - Launching Soon!",
            subtitle: "Revolutionary learning management system for Pre-KG to Grade 12"
        },
        services: {
            title: "Our Specialized Services",
            items: [
                { icon: Globe, title: "BOT Model (Build-Operate-Transfer)", desc: "Build and scale your own dedicated offshore development center with our end-to-end expertise." },
                { icon: Laptop, title: "Custom Enterprise Solutions", desc: "Bespoke software architecture designed to solve complex business challenges through engineering excellence." },
                { icon: Cloud, title: "Cloud Native & DevOps", desc: "Modernize your infrastructure with scalable cloud-native architectures and automated delivery pipelines." },
                { icon: Shield, title: "Cybersecurity & Compliance", desc: "Enterprise-grade protection, risk management, and regulatory compliance for your digital assets." },
                { icon: Users, title: "Strategic IT Consulting", desc: "Expert guidance on digital transformation, fractional CTO services, and technology roadmap planning." },
                { icon: Brain, title: "AI & Data Engineering", desc: "Leverage the power of generative AI and machine learning to unlock actionable insights from your data." }
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
            location: "20408 Tunisia St, Hawally, Kuwait",
            phone: "+965 2434 5650",
        },
        partners: [
            "KAM Groups",
            "Innovative IT Services",
            "Next-Gen AI Products",
            "AI-Powered LMS",
            "Launching Soon!",
            "Global Solutions"
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
            <Helmet>
                <title>KamGlobal AI | Global IT Solutions & AI Transformation</title>
                <meta name="description" content="KamGlobal AI provides AI-driven IT services, cloud solutions, and digital transformation. We bridge Kuwait's strategic vision with India's engineering excellence." />
                <meta name="keywords" content="AI Solutions, IT Consulting, BOT Model, Cloud Migration, Digital Transformation, Kuwait India IT, KamGlobal AI" />
            </Helmet>
            {/* Hero Section - Framed Cinematic Style (Restored) */}
            <section className="hero-framed-wrapper">
                <div className="hero-outer-frame">
                    <div className="hero-visual-card">
                        <motion.img
                            src="1A.png"
                            alt="KamGlobalAI Innovation Lab"
                            className="hero-bg-img"
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
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
                                Empowering enterprises with AI-driven IT solutions, cloud strategies
                                and world-class consulting to accelerate digital transformation.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="partners-bar">
                <div className="container">
                    <div className="partners-flex">
                        <span className="partners-label">KAM GROUP</span>
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
                            <img src="2B.png" alt="Our Team" className="about-custom-img" />
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
                        <div className="stats-grid">
                            {homeData.about.stats.map((stat, i) => (
                                <motion.div key={i} className="stat-item glass-card" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                                    <span className="stat-number">
                                        <CountUp end={stat.num} duration={2.5} enableScrollSpy scrollSpyOnce />
                                        {stat.suffix}
                                    </span>
                                    <span className="stat-label">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
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
                            <span>+965 2434 5650</span>
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

            {/* Why Choose Us vs Traditional Agencies */}
            <section className="section why-compare-section">
                <div className="container">
                    <div className="why-header-centered">
                        <span className="badge-small">WHY US</span>
                        <h2>The KamGlobalAI Advantage</h2>
                        <p className="why-subtitle">How we stack up against traditional enterprise IT delivery models</p>
                    </div>

                    <motion.div
                        className="comparison-table-wrapper glass-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <table className="comparison-modern-table">
                            <thead>
                                <tr>
                                    <th>Criteria</th>
                                    <th>Traditional IT Vendors</th>
                                    <th className="highlight-col">KamGlobalAI Global Delivery</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Delivery Speed</td>
                                    <td>Slow, bureaucratic processes</td>
                                    <td className="highlight-col"><CheckCircle size={16} className="text-green inline mr-2" /> Agnostic & Agile (2x Faster)</td>
                                </tr>
                                <tr>
                                    <td>Cost Efficiency</td>
                                    <td>High domestic overhead limits ROI</td>
                                    <td className="highlight-col"><CheckCircle size={16} className="text-green inline mr-2" /> Up to 50% arbitrage via India hub</td>
                                </tr>
                                <tr>
                                    <td>Compliance & Security</td>
                                    <td>Fragmented security protocols</td>
                                    <td className="highlight-col"><CheckCircle size={16} className="text-green inline mr-2" /> ISO/SOC-aligned Kuwait-India Bridge</td>
                                </tr>
                                <tr>
                                    <td>Vested Interest</td>
                                    <td>Transactional hourly billing</td>
                                    <td className="highlight-col"><CheckCircle size={16} className="text-green inline mr-2" /> Long-term BOT Strategic Partnerships</td>
                                </tr>
                                <tr>
                                    <td>Talent Quality</td>
                                    <td>B-Tier generalized resources</td>
                                    <td className="highlight-col"><CheckCircle size={16} className="text-green inline mr-2" /> Silicon-Valley Caliber AI Experts</td>
                                </tr>
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </section>

            {/* Full-Width Slim Services Banner */}
            <section className="services-banner-row">
                <div className="organic-shape"></div>
                <div className="container-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="banner-flex"
                    >
                        <div className="banner-left">
                            <div className="title-group">
                                <h2 className="banner-title">
                                    <span className="text-white">Our</span> <span className="text-purple">Services</span>
                                </h2>
                                <div className="dashed-line"></div>
                            </div>
                            <p className="banner-desc">
                                Empowering enterprises with cutting-edge IT solutions and global delivery excellence.
                            </p>
                        </div>
                        <Link to="/services" className="banner-action-btn-new">
                            VIEW SERVICES <span className="chevron">→</span>
                        </Link>
                    </motion.div>
                </div>
            </section >

            <div className="container services-stack-wrapper">
                {homeData.services.items.map((service, i) => {
                    // Map images based on index
                    const images = [
                        "4C.png",
                        "5B.jpeg",
                        "6.png",
                        "7.png",
                        "8.png",
                        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
                    ];
                    const nums = ["01", "02", "03", "04", "05", "06"];

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ margin: "-100px" }}
                            className="service-stack-card"
                            style={{ top: `calc(85px + ${i * 42}px)` }} // Stacking effect
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


            {/* Case Studies */}
            <section className="section case-studies-home">
                <div className="container">
                    <div className="why-header-centered">
                        <span className="badge-small">PROVEN IMPACT</span>
                        <h2>Featured Case Studies</h2>
                        <div className="title-underline-center"></div>
                    </div>

                    <div className="case-studies-grid">
                        <motion.div className="case-study-glass" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="case-img"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Fintech" /></div>
                            <div className="case-content">
                                <span className="cat-pill">FinTech</span>
                                <h3>Cloud Migration for Kuwait Bank</h3>
                                <p>Migrated legacy systems to AWS with zero downtime, reducing operational costs by 40%.</p>
                                <a href="/services" className="discover-link">Read Story <ArrowRight size={14} /></a>
                            </div>
                        </motion.div>
                        <motion.div className="case-study-glass" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <div className="case-img"><img src="https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=800" alt="EdTech" /></div>
                            <div className="case-content">
                                <span className="cat-pill">EdTech</span>
                                <h3>AI-Powered LMS Engineering</h3>
                                <p>Architected full-stack cognitive learning platform for 100k+ concurrent users.</p>
                                <a href="/services" className="discover-link">Read Story <ArrowRight size={14} /></a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Product Highlight */}
            <section className="section product-highlight">
                <div className="container">
                    <div className="product-card glass">
                        <div className="product-info">
                            <span className="badge-small">FEATURED PRODUCT</span>
                            <h2>AI-Powered LMS <span className="launch-soon-badge">Launching Soon</span></h2>
                            <p>Revolutionizing education with intelligent, adaptive learning paths for students from Pre-KG to Grade 12. Our state-of-the-art platform empowers both schools and students.</p>
                            <Link to="/products" className="btn btn-primary">Explore LMS <ArrowRight size={18} className="ml-05" /></Link>
                        </div>
                        <div className="product-image">
                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} className="glass-card lms-visual-card">
                                <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=600" alt="LMS Interface" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Slider */}
            <section className="section testimonials-section">
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="section-header-centered">
                        <span className="badge-small">TESTIMONIALS</span>
                        <h2 className="section-title-premium">{homeData.testimonials.title}</h2>
                        <div className="title-underline-center"></div>
                    </motion.div>

                    <div className="testimonial-slider-container">
                        <button className="slider-btn prev" onClick={() => setActiveTestimonial((s) => (s === 0 ? homeData.testimonials.items.length - 1 : s - 1))}><ChevronLeft /></button>

                        <div className="testimonial-track-window">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTestimonial}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="testimonial-card glass-card"
                                >
                                    <div className="stars">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} fill="#f59e0b" color="#f59e0b" />)}
                                    </div>
                                    <p className="quote-text">"{homeData.testimonials.items[activeTestimonial].quote}"</p>
                                    <div className="client-info">
                                        <img src={homeData.testimonials.items[activeTestimonial].image} alt="Client" className="client-img" />
                                        <div>
                                            <h4>{homeData.testimonials.items[activeTestimonial].author}</h4>
                                            <span>{homeData.testimonials.items[activeTestimonial].role}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <button className="slider-btn next" onClick={() => setActiveTestimonial((s) => (s + 1) % homeData.testimonials.items.length)}><ChevronRight /></button>
                    </div>
                </div>
            </section>

            {/* Modern CTA Section Before Footer */}
            <section className="cta-modern">
                <div className="cta-glow-overlay"></div>
                <div className="container">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="cta-modern-box glass-card">
                        <h2>Ready to Accelerate Your Digital Transformation?</h2>
                        <p>Partner with KamGlobalAI to deploy scalable, future-ready enterprise solutions.</p>
                        <div className="cta-actions">
                            <Link to="/contact" className="btn btn-orange cta-main-btn">Start a Project</Link>
                            <Link to="/services" className="btn cta-outline-btn">Explore Services</Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div >
    );
};

export default Home;
