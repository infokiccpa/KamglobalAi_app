import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Globe, Laptop, Cloud, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import './Services.css';

const ServiceBlock = ({ id, icon: Icon, title, subtitle, challenge, solution, benefits, image, reverse }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <div id={id} className={`service-block ${reverse ? 'reverse' : ''}`} ref={ref}>
            <div className="container service-grid">
                <motion.div
                    className="service-content"
                    initial={{ opacity: 0, x: reverse ? 20 : -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="service-header">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Icon size={32} className="service-icon" />
                        </motion.div>
                        <div>
                            <h3 className="line-reveal">
                                {title.split(' ').map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.3 + (i * 0.05) }}
                                        style={{ display: 'inline-block', marginRight: '0.25em' }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h3>
                            <motion.p
                                className="subtitle"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                {subtitle}
                            </motion.p>
                        </div>
                    </div>

                    <div className="service-details">
                        <motion.div
                            className="detail-item"
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <h4 className="label-red">The Challenge</h4>
                            <p>{challenge}</p>
                        </motion.div>

                        <motion.div
                            className="detail-item"
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <h4 className="label-green">Our Solution</h4>
                            <p>{solution}</p>
                        </motion.div>

                        <div className="detail-item">
                            <motion.h4
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                Key Benefits
                            </motion.h4>
                            <motion.div
                                className="benefits-grid"
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={{
                                    visible: { transition: { staggerChildren: 0.12 } }
                                }}
                            >
                                {benefits.map((benefit, idx) => (
                                    <motion.span
                                        key={idx}
                                        className="benefit-item"
                                        variants={{
                                            hidden: { opacity: 0, x: -10 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <CheckCircle size={14} className="check-icon" /> {benefit}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    </div>


                </motion.div>

                <motion.div
                    className="service-image"
                    initial={{ opacity: 0, x: reverse ? -30 : 30, scale: 0.96 }}
                    animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                >
                    <img src={image} alt={title} className="lux-shadow" />
                </motion.div>
            </div>
        </div>
    );
};

const Services = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

    const services = [
        {
            id: 'bot-model',
            icon: Globe,
            title: 'BOT Model',
            subtitle: 'Build-Operate-Transfer',
            challenge: 'Deploying high-quality tech teams across borders without the operational overhead.',
            solution: 'A proven strategic partnership model where we build, operate, and eventually transfer your dedicated offshore development team.',
            benefits: ['Reduced operational costs', 'Zero recruitment hassle', 'High-quality technical talent', 'Complete ownership transfer'],
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
            reverse: false
        },
        {
            id: 'it-dev',
            icon: Laptop,
            title: 'IT Development',
            subtitle: 'Custom Software Solutions',
            challenge: 'Building scalable, secure, and user-centric software that meets complex business requirements.',
            solution: 'Custom end-to-end development services for web, mobile, and desktop applications using the latest tech stacks.',
            benefits: ['Modern tech stack', 'Agile development', 'UI/UX focused', 'Full-stack expertise'],
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
            reverse: true
        },
        {
            id: 'cloud',
            icon: Cloud,
            title: 'Cloud Development',
            subtitle: 'Modern Infrastructure',
            challenge: 'Managing complex cloud environments while ensuring security, scalability, and cost-efficiency.',
            solution: 'Comprehensive cloud strategy, migration, and development services across AWS, Azure, and Google Cloud.',
            benefits: ['High availability', 'Cost optimization', 'SecOps integration', '24/7 monitoring'],
            image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
            reverse: false
        },
        {
            id: 'staffing',
            icon: Users,
            title: 'IT Staffing & Recruitment',
            subtitle: 'Technical Talent Solutions',
            challenge: 'Finding and retaining high-caliber technical talent in a competitive recruitment landscape.',
            solution: 'Specialized tech recruitment services that match your project needs with the right expertise, from individual contributors to entire teams.',
            benefits: ['Access to global talent', 'Faster hiring cycle', 'Flexible engagement', 'Technical vetting'],
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
            reverse: true
        },
        {
            id: 'marketing',
            icon: TrendingUp,
            title: 'Digital Marketing',
            subtitle: 'Grow Your Online Presence',
            challenge: 'Navigating the complex digital landscape to reach and engage your target audience effectively.',
            solution: 'Data-driven marketing strategies including SEO, SEM, social media management, and content creation to drive growth.',
            benefits: ['Increased visibility', 'Targeted lead gen', 'ROI tracking', 'Brand authority'],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
            reverse: false
        },
        {
            id: 'managed-it',
            icon: CheckCircle,
            title: 'Managed IT Services',
            subtitle: 'Proactive Tech Management',
            challenge: 'Dealing with unpredictable IT costs and system downtime that disrupts business operations.',
            solution: 'End-to-end management of your IT infrastructure, providing 24/7 monitoring, support, and maintenance.',
            benefits: ['Predictable costs', 'Improved uptime', 'Expert support', 'Focus on core business'],
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
            reverse: true
        },
        {
            id: 'partnership',
            icon: Globe,
            title: 'Strategic Partnership with KAMGROUPS Kuwait',
            subtitle: 'Kuwait-India Business Bridge',
            challenge: 'Expanding business operations between Kuwait and India while maintaining high quality standards.',
            solution: 'Leveraging our deep roots in Kuwait through KAMGROUPS to provide seamless cross-border IT and business solutions.',
            benefits: ['Market local expertise', 'Simplified logistics', 'Strong local presence', 'Trusted partnership'],
            image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
            reverse: false
        }
    ];

    return (
        <div className="services-page">
            <motion.section
                className="services-hero"
                ref={heroRef}
                style={{ opacity: heroOpacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <div className="container">
                    <h1 className="hero-title-reveal">
                        {"Our Services".split('').map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.03, ease: "easeOut" }}
                                style={{ display: 'inline-block' }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </h1>
                    <div className="hero-underline-wrapper">
                        <motion.div
                            className="hero-underline"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                            style={{ originX: 0 }}
                        />
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        Comprehensive IT solutions designed to solve your business challenges
                    </motion.p>
                </div>
            </motion.section>

            {services.map((service, idx) => (
                <ServiceBlock key={idx} {...service} />
            ))}

            <motion.section
                className="section transform-cta"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className="container text-center">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        Ready to Transform Your Business?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Let's discuss how our services can help you achieve your goals.
                    </motion.p>
                    <motion.div
                        className="cta-buttons mt-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <motion.button
                            className="btn btn-primary"
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                        >
                            Contact Us <ArrowRight size={16} className="arrow-icon" style={{ marginLeft: '8px' }} />
                        </motion.button>
                        <button className="btn btn-outline ml-1">Learn More About Us</button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Services;
