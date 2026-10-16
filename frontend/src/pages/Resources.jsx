import { BookOpen, Building2, Code2, Globe, Users, Briefcase } from 'lucide-react';
import { Seo, PageHero, Section, CardGrid, CtaBand } from '../components/page/PageKit';
import { contactLink } from '../data/links';

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
    { icon: Code2, title: 'IT & Technology', desc: 'Software, AI, cloud, managed IT, IT staffing and BOT.', to: '/services', cta: 'Explore IT services' },
    { icon: Globe, title: 'Global Outsourcing', desc: 'Customer experience, sales support, BPO and more.', to: '/outsourcing', cta: 'Explore outsourcing' },
    { icon: Users, title: 'HR & Workforce', desc: 'Recruitment, staffing, payroll and HR technology.', to: '/hr', cta: 'Explore HR services' },
    { icon: BookOpen, title: 'Products', desc: 'LearnX, EduAiTutors and AI-Powered LMS.', to: '/products', cta: 'View products' },
    { icon: BookOpen, title: 'Glossary', desc: 'Plain-English definitions of BPO, RPO, BOT, ATS, HRMS and other terms.', to: '/resources/glossary', cta: 'Read the glossary' },
    { icon: Briefcase, title: 'Careers', desc: 'Open roles and life at KAM Global AI.', to: '/careers', cta: 'See careers' },
];

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
