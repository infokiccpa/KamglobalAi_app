import {
    Video,
    Brain,
    MessageCircle,
    Globe2,
    BarChart3,
    Users,
    GraduationCap,
    UserRound,
    School,
    HeartHandshake,
    BookOpen,
    Presentation,
} from 'lucide-react';

export const PRODUCT_GETTING_STARTED = [
    { title: 'Share your use case', desc: 'Tell us who will use the product and what you want to achieve.' },
    { title: 'Product walkthrough', desc: 'See the current release and the workflows relevant to you.' },
    { title: 'Review fit', desc: 'Discuss user groups, deployment, integrations, and data handling.' },
    { title: 'Agree next steps', desc: 'Plan a demonstration, evaluation, or onboarding conversation.' },
];

export const products = [
    {
        slug: 'learnx',
        name: 'LearnX',
        status: 'Live',
        to: '/products/learnx',
        image: '/images/learnx-hero.webp',
        alt: 'LearnX school management platform dashboard',
        cardDesc: 'School ERP, LMS and AI Academic Studio that bring school operations and digital learning together.',
        audience: ['School leadership', 'Administrators', 'Teachers', 'Parents', 'Students'],
    },
    {
        slug: 'eduaitutors',
        name: 'EduAiTutors',
        status: 'Live',
        to: '/products/eduaitutors',
        external: 'https://www.eduaitutors.com/',
        image: '/images/hm-eduaitutors.webp',
        alt: 'EduAiTutors online learning platform shown on laptop and tablet',
        cardDesc: 'Online NEET, JEE and foundation learning with live classes, mock analytics and mentoring.',
        seo: {
            title: 'EduAiTutors | KAM Global AI',
            description: 'EduAiTutors is an education and tutoring platform from KAM Global AI for NEET, JEE and foundation learners, with live classes, mock analytics, and mentoring.',
        },
        hero: {
            title: 'A Digital Learning Experience for Students and Tutors',
            sub: 'Digital learning and education technology, with product details aligned to the current release.',
            body: 'EduAiTutors is an education and tutoring platform for NEET, JEE, and foundation learners. Learning journeys, tutoring features, course access, and user roles are walked through with you in a product conversation.',
        },
        overview: {
            text: 'EduAiTutors brings structured learning, live teaching, and progress insight into one experience. The approach follows a simple cycle so each learner works on the right gaps.',
            method: ['Diagnose', 'Design', 'Deliver', 'Evaluate', 'Improve'],
        },
        capabilities: [
            { icon: Video, title: 'Live Interactive Classes', desc: 'Real-time sessions with digital whiteboards, polling, and doubt-solving for India and GCC batches.' },
            { icon: Brain, title: 'Mock Test Analytics', desc: 'Time-per-question tracking, gap reports, and repeat-error tagging to guide revision.' },
            { icon: MessageCircle, title: 'Doubt Support & Mentoring', desc: 'Text, photo, and voice doubts, with scheduled mentor calls.' },
            { icon: Globe2, title: 'GCC & NRI-Friendly Batches', desc: 'Class timings suited to learners in the GCC, following the same NCERT curriculum.' },
        ],
        programs: ['NEET full-time and crash courses', 'JEE Mains & Advanced', 'Foundation (Classes 6–10)', 'Dropper batches'],
        audience: [
            { icon: GraduationCap, title: 'Students', desc: 'NEET and JEE aspirants, foundation learners, and dropper students.' },
            { icon: HeartHandshake, title: 'Parents', desc: 'Visibility of progress through reports and reviews.' },
            { icon: Presentation, title: 'Tutors & Mentors', desc: 'Live teaching, doubt resolution, and mentoring workflows.' },
            { icon: School, title: 'Partners', desc: 'Schools and organisations exploring learning partnerships.' },
        ],
    },
    {
        slug: 'ai-powered-lms',
        name: 'AI-Powered LMS',
        status: 'Live',
        to: '/products/ai-powered-lms',
        image: '/images/hm-ai-lms.webp',
        alt: 'AI-Powered LMS interface with learning content cards shown on a laptop',
        cardDesc: 'A learning management platform for Pre-KG to Grade 12 with adaptive paths and multi-role access.',
        seo: {
            title: 'AI-Powered LMS | KAM Global AI',
            description: 'An AI-Powered LMS from KAM Global AI supporting learning from Pre-KG to Grade 12 with adaptive learning paths, multi-role access, and analytics.',
        },
        hero: {
            title: 'Support Learning with a More Connected Digital Platform',
            sub: 'Digital learning and education technology, with product details aligned to the current release.',
            body: 'Our AI-Powered LMS supports learning from Pre-KG to Grade 12 with adaptive learning paths, multi-role access, and analytics. Available features and roadmap items are confirmed during a product walkthrough, as not every AI capability is enabled for every deployment.',
        },
        overview: {
            text: 'The LMS connects learners, teachers, parents, and school leaders around one learning journey, from early foundations through to exam preparation.',
            grades: [
                { title: 'Pre-KG', desc: 'Early foundations and play-based learning' },
                { title: 'Elementary', desc: 'Core skills, Grades 1–5' },
                { title: 'Middle School', desc: 'Concept mastery, Grades 6–8' },
                { title: 'High School', desc: 'Exam preparation, Grades 9–12' },
            ],
        },
        capabilities: [
            { icon: Brain, title: 'Adaptive Learning Paths', desc: "Learning journeys that respond to each student's pace and strengths." },
            { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Progress insights for educators, parents, and administrators.' },
            { icon: Users, title: 'Multi-Role Access', desc: 'Separate experiences for students, teachers, parents, and school leadership.' },
            { icon: BookOpen, title: 'Pre-KG to Grade 12', desc: 'One platform covering the full school learning journey.' },
        ],
        audience: [
            { icon: GraduationCap, title: 'Students', desc: 'Access learning content and follow their learning path.' },
            { icon: Presentation, title: 'Teachers', desc: 'Organise content and review learner progress.' },
            { icon: HeartHandshake, title: 'Parents', desc: 'Follow progress and stay informed.' },
            { icon: UserRound, title: 'School Leadership', desc: 'See learning insights across classes and grades.' },
        ],
    },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);
