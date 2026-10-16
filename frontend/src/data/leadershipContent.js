export const founderProfile = {
    name: 'Dr. Abdul Wahab Al Atwan',
    messageLead:
        'The future of enterprise technology will no longer depend solely on legacy systems, but on connected, AI-powered, and future-ready digital ecosystems. From this vision, KamGlobal AI was created — a complete partner for organizations across Kuwait, India, and beyond.',
    featuredQuote:
        'KamGlobal AI is not just a technology provider. It is a long-term vision for smarter business, sustainable innovation, digital transformation, and future generations.',
    signatureOrg: 'KAM GLOBAL AI'
};

// TODO_VERIFY: `focus` lines for each executive.
export const executiveBoard = [
    { name: 'Dr. Abdul Wahab Al Atwan', title: 'President & C.E.O', focus: 'Vision, group relations and strategic partnerships', featured: true },
    { name: 'Dr. Daoud Chit', title: 'General Manager', focus: 'Operations, delivery governance and growth' }
];

// TODO_VERIFY: department scope and locations. Engineering and AI Media use real team photos (`wide` shows the
// full group photo under a KAM brand panel); the others are AI-generated placeholders — replace when available.
export const teamDepartments = [
    {
        key: 'leadership',
        name: 'Leadership & Partnerships',
        location: 'Kuwait',
        image: '/images/about/team-leadership.webp',
        alt: 'Leadership team reviewing partnership documents in a Kuwait City boardroom',
        summary: 'Strategy, governance and client trust, backed by KAM Group.',
        points: ['Regional partnerships & client relationships', 'Engagement governance', 'Group and investor relations'],
        link: { label: 'Partner with us', to: '/contact?subject=Partnership%20enquiry#form' }
    },
    {
        key: 'engineering',
        name: 'Technology & Engineering',
        location: 'Bengaluru, India',
        image: '/images/about/team-engineering-real.webp',
        wide: true,
        alt: 'KAM Global AI technology and engineering team in matching navy polos at our India office',
        summary: 'Software, cloud and DevOps teams that build and run enterprise platforms.',
        points: ['Web, mobile & enterprise applications', 'Cloud migration & DevOps', 'QA, support & managed IT'],
        link: { label: 'Technology services', to: '/services' }
    },
    {
        // TODO_VERIFY: AI Media team scope and service link.
        key: 'ai-media',
        name: 'AI Media',
        location: 'India',
        image: '/images/about/team-ai-media-real.webp',
        wide: true,
        alt: 'KAM Global AI media team in matching navy polos at our India office',
        summary: 'AI-assisted video, design and content that tells your story across every channel.',
        points: ['AI video & motion content', 'Brand design & social creatives', 'Product demos & marketing media'],
        link: { label: 'Marketing & creative', to: '/outsourcing/digital-marketing-creative' }
    },
    {
        key: 'ai-data',
        name: 'AI & Data',
        location: 'India',
        image: '/images/about/team-ai-data.webp',
        alt: 'AI and data team discussing analytics dashboards on a large display',
        summary: 'Applied AI, analytics and automation built into real business workflows.',
        points: ['AI assistants & process automation', 'Data engineering & dashboards', 'AI features across our products'],
        link: { label: 'AI, data & automation', to: '/services/ai-automation' }
    },
    {
        key: 'operations',
        name: 'Customer Experience & Operations',
        location: 'Philippines',
        image: '/images/about/team-operations.webp',
        alt: 'Customer experience team wearing headsets in a modern contact centre',
        summary: 'CX, sales support, BPO and back-office teams that extend your operations.',
        points: ['Customer support & CX', 'Sales & lead generation support', 'BPO, RPO & virtual assistance'],
        link: { label: 'Outsourcing services', to: '/outsourcing' }
    },
    {
        key: 'hr',
        name: 'HR & Talent',
        location: 'India · GCC',
        image: '/images/about/team-hr.webp',
        alt: 'HR and recruitment team reviewing candidate profiles on a tablet',
        summary: 'Recruitment, staffing, payroll and workforce advisory under one roof.',
        points: ['Permanent & contract hiring', 'Payroll & compliance support', 'Executive search & verification'],
        link: { label: 'HR & workforce', to: '/hr' }
    },
    {
        key: 'education',
        name: 'Education Products',
        location: 'India',
        image: '/images/about/team-education.webp',
        alt: 'Education product team testing a learning app on tablets and a laptop',
        summary: 'The product team behind LearnX, EduAiTutors and our AI-powered LMS.',
        points: ['School ERP & LMS', 'NEET & JEE coaching platform', 'AI academic tools'],
        link: { label: 'Our products', to: '/products' }
    }
];

export const kuwaitHighlights = [
    'Strategic investor relations & business hub',
    'Regional market access & partnerships',
    'Client relationship management'
];

export const indiaHighlights = [
    'Engineering & product teams',
    'Technical support & operations',
    'Cloud & AI delivery'
];

export const teamMoments = [
    { src: '/office_team_collab.webp', alt: 'KamGlobal AI team collaborating' },
    { src: '/2B.webp', alt: 'KamGlobal AI global team' }
];

export const getInitials = (name) =>
    name
        .replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s+/i, '')
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
