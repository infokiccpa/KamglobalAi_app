import { Seo, PageHero, Section, CardGrid, CtaBand, Notice } from '../components/page/PageKit';
import { contactLink } from '../data/links';
import { GraduationCap, Brain, Code2 } from 'lucide-react';

const stories = [
    {
        icon: GraduationCap,
        title: 'LearnX — School Operating System',
        tag: 'Internal product',
        desc: 'Building a modular school ERP, LMS, and AI Academic Studio for CBSE, ICSE, and State Board campuses.',
        points: [
            'Context: schools needed one system for academics, operations, and parents',
            'Contribution: product design, engineering, and AI teaching tools',
            'Approach: modular release with role-based workflows',
            'Outcome: a live education product available for demos and onboarding',
        ],
        to: '/products/learnx',
        cta: 'Explore LearnX',
        image: '/images/learnx-hero.webp',
        alt: 'LearnX school management platform dashboard',
    },
    {
        icon: Brain,
        title: 'EduAiTutors — Tutoring Platform',
        tag: 'Internal product',
        desc: 'An education and tutoring platform for NEET, JEE, and foundation learners with live classes and analytics.',
        points: [
            'Context: structured exam prep across India and GCC timings',
            'Contribution: learning journeys, live class support, and mock analytics',
            'Approach: diagnose → design → deliver → evaluate → improve',
            'Outcome: a live tutoring product with programme tracks',
        ],
        to: '/products/eduaitutors',
        cta: 'Explore EduAiTutors',
        image: '/images/hm-eduaitutors.webp',
        alt: 'EduAiTutors learning experience on laptop and tablet',
    },
    {
        icon: Code2,
        title: 'AI-Powered LMS',
        tag: 'Internal product',
        desc: 'A connected learning platform for Pre-KG to Grade 12 with adaptive paths and multi-role access.',
        points: [
            'Context: campuses needed one learning journey across grades',
            'Contribution: LMS workflows, adaptive paths, and analytics',
            'Approach: role-based access for students, teachers, parents, and leadership',
            'Outcome: a live LMS offering confirmed feature-by-feature in walkthroughs',
        ],
        to: '/products/ai-powered-lms',
        cta: 'Explore AI-Powered LMS',
        image: '/images/hm-ai-lms.webp',
        alt: 'AI-Powered LMS interface with learning content cards',
    },
];

const CaseStudies = () => (
    <div className="pg-page">
        <Seo
            title="Case Studies & Project Stories | KAM Global AI"
            description="Explore approved KAM Global AI project stories and learn about the challenges, approach, and outcomes of selected work."
            path="/resources/case-studies"
            crumbs={[
                { label: 'Home', to: '/' },
                { label: 'Resources', to: '/resources' },
                { label: 'Case Studies', to: '/resources/case-studies' },
            ]}
        />

        <PageHero
            crumbs={[
                { label: 'Home', to: '/' },
                { label: 'Resources', to: '/resources' },
                { label: 'Case Studies' },
            ]}
            eyebrow="Case Studies"
            title="Project Stories Built on Real Work"
            sub="Explore the context, decisions, and delivery approach behind approved projects."
            body="We begin with our own products: LearnX, EduAiTutors and AI-Powered LMS. Customer work is added only where we have permission. Internal products are labelled clearly and are not presented as client engagements."
            primary={{ label: 'Discuss a Similar Challenge', to: contactLink('Request a Proposal', 'Request a Proposal') }}
            secondary={{ label: 'Explore Products', to: '/products' }}
            image="/images/pages/pg-case-studies-hero.webp"
            imageAlt="Product team reviewing screens and project boards in an editorial retrospective scene"
        />

        <Section
            id="stories"
            tone="cream"
            eyebrow="Story Cards"
            title="Challenge. Approach. Contribution. Outcome."
            intro="Each story covers the context, business need, scope, KAM Global AI's contribution, key decisions, and verified outcomes. Where quantitative evidence is not available, we keep outcomes qualitative."
        >
            <CardGrid
                cols={3}
                items={stories.map((s) => ({
                    image: s.image,
                    alt: s.alt,
                    icon: s.icon,
                    title: s.title,
                    desc: s.desc,
                    points: s.points,
                    tag: s.tag,
                    to: s.to,
                    cta: s.cta,
                }))}
            />
            <Notice title="How we publish stories">
                Client names, logos, and metrics appear only when we have permission and verified evidence. Internal
                products are always labelled as such.
            </Notice>
        </Section>

        <CtaBand
            title="Have a Similar Challenge?"
            text="Tell us what you are trying to build, improve, or scale and we can discuss the appropriate next step."
            primary={{ label: 'Contact Us', to: contactLink('Request a Proposal', 'Request a Proposal') }}
            secondary={{ label: 'Explore IT Services', to: '/services' }}
        />
    </div>
);

export default CaseStudies;
