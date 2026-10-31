import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Building2, Clapperboard, Code2, Globe, Users, Briefcase, FileDown } from 'lucide-react';
import { Seo, PageHero, Section, CardGrid, CtaBand } from '../components/page/PageKit';
import { contactLink } from '../data/links';
import { apiUrl, request } from '../lib/api';

const caseStudies = [
    {
        image: '/images/products/learnx-app.webp',
        alt: 'LearnX school dashboard showing students, attendance and fee collection',
        title: 'LearnX',
        desc: 'School ERP, LMS and AI Academic Studio for CBSE, ICSE and State Boards.',
        tag: 'Internal product',
        to: '/resources/case-studies',
        cta: 'Read the story',
    },
    {
        image: '/images/products/eduaitutors-app.webp',
        alt: 'EduAiTutors website showing the Foundation Program for Classes 6 to 10',
        title: 'EduAiTutors',
        desc: 'Live NEET and JEE coaching with AI mock tests and mentorship.',
        tag: 'Internal product',
        to: '/resources/case-studies',
        cta: 'Read the story',
    },
    {
        image: '/images/products/ai-lms-app.webp',
        alt: 'AI-Powered LMS home page with a personalised study plan',
        title: 'AI-Powered LMS',
        desc: 'Adaptive learning for Pre-KG to Grade 12 with personalised study plans.',
        tag: 'Internal product',
        to: '/resources/case-studies',
        cta: 'Read the story',
    },
];

const profile = [
    { icon: Building2, title: 'About us', desc: 'Who we are, how we work and our leadership.', to: '/about', cta: 'Read more' },
    { icon: Code2, title: 'IT & Technology', desc: 'Software, cloud, quality, security and support.', to: '/services/it-technology', cta: 'Explore IT services' },
    { icon: Clapperboard, title: 'AI Media & Creative', desc: 'Brand, video, design and content from an agreed brief.', to: '/services/ai-media-creative', cta: 'Explore creative services' },
    { icon: Globe, title: 'Business Outsourcing', desc: 'Customer experience, sales support, BPO and virtual assistance.', to: '/services/business-outsourcing', cta: 'Explore outsourcing' },
    { icon: Users, title: 'HR Solutions', desc: 'Recruitment, staffing, payroll administration and HR systems for employers.', to: '/services/hr-solutions', cta: 'Explore HR services' },
    { icon: BookOpen, title: 'Products', desc: 'LearnX, EduAiTutors and AI-Powered LMS.', to: '/products', cta: 'View products' },
    { icon: BookOpen, title: 'Glossary', desc: 'Plain-English definitions of BPO, RPO, BOT, ATS, HRMS and other terms.', to: '/resources/glossary', cta: 'Read the glossary' },
    { icon: Briefcase, title: 'Careers', desc: 'Open roles and life at KAM Global AI.', to: '/careers', cta: 'See careers' },
];

const PublishedFiles = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        let live = true;
        request('/api/resources')
            .then((res) => { if (live) setItems(res.data || []); })
            .catch(() => {});
        return () => { live = false; };
    }, []);

    if (!items.length) return null;

    return (
        <Section
            id="downloads"
            tone="white"
            eyebrow="From the team"
            title="Files You Can Download"
            intro="Guides and documents published by our team."
        >
            <ul className="res-files">
                {items.map((item) => (
                    <li key={item.id}>
                        <FileDown size={20} aria-hidden="true" />
                        <div>
                            <strong>{item.title}</strong>
                            <span>{item.category}</span>
                            <p>{item.summary}</p>
                        </div>
                        {item.fileUrl && (
                            <a className="pg-btn pg-btn--navy" href={apiUrl(item.fileUrl)} target="_blank" rel="noopener noreferrer">
                                Open file
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </Section>
    );
};

const PublishedArticles = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        let live = true;
        request('/api/posts')
            .then((res) => { if (live) setItems(res.data || []); })
            .catch(() => {});
        return () => { live = false; };
    }, []);

    if (!items.length) return null;

    return (
        <Section id="articles" tone="soft" eyebrow="From marketing" title="Articles" intro="Notes published by the marketing team.">
            <ul className="res-files">
                {items.map((item) => (
                    <li key={item.id}>
                        <div>
                            <strong>{item.title}</strong>
                            <p>{item.summary}</p>
                        </div>
                        <Link className="pg-btn pg-btn--navy" to={`/resources/articles/${item.slug}`}>Read article</Link>
                    </li>
                ))}
            </ul>
        </Section>
    );
};

const Resources = () => (
    <div className="pg-page">
        <Seo
            title="Resources & Case Studies | KAM Global AI"
            description="Explore KAM Global AI case studies, company information and an overview of our services and products."
            path="/resources"
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Resources', to: '/resources' }]}
        />

        <PageHero
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Resources' }]}
            eyebrow="Resources"
            title="Ideas and Resources for Better Delivery Decisions"
            sub="Project stories and company information to help you understand how we work."
            body="Every case study reflects actual work and verified details. Internal products are labelled clearly and are not presented as client engagements."
            primary={{ label: 'View Case Studies', to: '/resources/case-studies' }}
            secondary={{ label: 'Contact Our Team', to: contactLink('General Enquiry') }}
            image="/images/pages/pg-resources-hero.webp"
            imageAlt="Editorial-style professional workspace with notebook, laptop, and architecture sketches"
        />

        <Section
            id="case-studies"
            tone="white"
            eyebrow="Case Studies"
            title="Work, Context and Lessons"
            intro="We start with our own products and add customer work only where permission exists. Each story explains the challenge, approach and verified outcomes."
            cta={{ label: 'View All Case Studies', to: '/resources/case-studies' }}
        >
            <CardGrid cols={3} items={caseStudies} />
        </Section>

        <PublishedFiles />
        <PublishedArticles />

        <Section
            id="company-profile"
            tone="cream"
            eyebrow="Company Profile"
            title="Understand Our Capabilities"
            intro="Start with the area you need. Each page explains what we offer and how to begin."
        >
            <CardGrid cols={3} variant="compact" items={profile} />
        </Section>

        <CtaBand
            title="Looking for Something Specific?"
            text="Tell us what you need — a capability overview, a product demo, or a project discussion."
            primary={{ label: 'Contact Our Team', to: contactLink('General Enquiry') }}
            secondary={{ label: 'Explore IT Services', to: '/services' }}
        />
    </div>
);

export default Resources;
