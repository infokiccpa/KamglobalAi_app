import { Globe, AppWindow, Building2, Bot, Puzzle, CloudCog } from 'lucide-react';

// Editable content for the IT & Development page (/services/custom-development).

export const DEV_SEO = {
    title: 'IT & Development: Websites, Apps, Business Software & AI | KAM Global AI',
    description:
        'KAM Global AI builds websites, web and mobile applications, business software and AI-powered solutions for businesses, startups and growing companies.',
    path: '/services/custom-development',
};

export const DEV_HERO = {
    eyebrow: 'IT & Development',
    title: 'We Build Digital Solutions for Your Business.',
    body: 'From websites and applications to business software and AI-powered solutions, we help turn your ideas into practical digital products.',
};

export const DEV_SERVICES = [
    {
        key: 'website',
        icon: Globe,
        title: 'Website Development',
        desc: 'Business and corporate websites, e-commerce stores, landing pages and website redesign.',
    },
    {
        key: 'application',
        icon: AppWindow,
        title: 'Application Development',
        desc: 'Web and mobile apps, customer portals, booking platforms and custom applications.',
        more: { label: 'Mobile apps', to: '/services/mobile-app-development' },
    },
    {
        key: 'business-software',
        icon: Building2,
        title: 'Business Software',
        desc: 'HRMS, finance, recruitment, CRM, ERP, school management and SaaS products.',
        more: { label: 'ERP & CRM', to: '/services/erp-crm' },
    },
    {
        key: 'ai',
        icon: Bot,
        title: 'AI Solutions & Automation',
        desc: 'AI chatbots, assistants, document processing, workflow automation and AI integrations.',
        more: { label: 'AI & automation', to: '/services/ai-automation' },
    },
    {
        key: 'integration',
        icon: Puzzle,
        title: 'Customization & Integration',
        desc: 'Improve existing software, add features, connect apps and integrate payments or third-party services.',
    },
    {
        key: 'cloud',
        icon: CloudCog,
        title: 'Cloud & Technical Support',
        desc: 'Cloud deployment, hosting, migration, maintenance, performance and ongoing support.',
        more: { label: 'Cloud & DevOps', to: '/services/cloud-devops' },
    },
];

export const DEV_SERVICE_OPTIONS = [...DEV_SERVICES.map((s) => s.title), 'Not sure yet'];

// Portfolio: use `image` for approved real screenshots; items without one render a labelled product mockup.
// TODO_VERIFY: Finance Management product name/scope, and approved screenshots for HRMS, ATS and Payroll.
export const DEV_PORTFOLIO = [
    {
        key: 'learnx',
        name: 'LearnX',
        type: 'School ERP + LMS',
        desc: 'School operations, academics, fees and AI tools in one platform.',
        image: '/images/products/learnx-app.webp',
        alt: 'LearnX school dashboard showing enrolment, attendance and fee collection',
        link: { label: 'View Project', href: 'https://learnx.school' },
        more: { label: 'Product page', to: '/products/learnx' },
    },
    {
        key: 'eduaitutors',
        name: 'EduAiTutors',
        type: 'Online learning platform',
        desc: 'NEET, JEE and foundation courses with live classes and mock analytics.',
        image: '/images/products/eduaitutors-app.webp',
        alt: 'EduAiTutors website showing the foundation programme page',
        link: { label: 'View Project', href: 'https://www.eduaitutors.com/' },
        more: { label: 'Product page', to: '/products/eduaitutors' },
    },
    {
        key: 'ai-lms',
        name: 'AI-Powered LMS',
        type: 'Learning management',
        desc: 'Adaptive learning paths and multi-role access from Pre-KG to Grade 12.',
        image: '/images/products/ai-lms-app.webp',
        alt: 'AI-Powered LMS home page for students and educators',
        link: { label: 'View Project', href: 'https://kam.eduaitutors.online' },
        more: { label: 'Product page', to: '/products/ai-powered-lms' },
    },
    {
        key: 'hrms',
        name: 'HRMS',
        type: 'HR software',
        desc: 'Employee records, attendance and HR dashboards connected to payroll.',
        mockup: 'hrms',
        link: { label: 'View Project', to: '/hr/technology/hrms' },
        demo: 'HRMS',
    },
    {
        key: 'ats',
        name: 'ATS',
        type: 'Recruitment software',
        desc: 'Requisitions, candidate pipeline, interviews and hiring analytics.',
        mockup: 'ats',
        link: { label: 'View Project', to: '/hr/technology/ats' },
        demo: 'ATS',
    },
    {
        key: 'finance',
        name: 'Finance & Payroll',
        type: 'Finance software',
        desc: 'Pay runs, compensation, compliance checks and payslips with approvals.',
        mockup: 'finance',
        link: { label: 'View Project', to: '/hr/technology/payroll' },
        demo: 'Finance & Payroll',
    },
];
