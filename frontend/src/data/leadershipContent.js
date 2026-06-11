export const founderProfile = {
    name: 'Dr. Abdul Wahab Al Atwan',
    messageLead:
        'he future of enterprise technology will no longer depend solely on legacy systems, but on connected, AI-powered, and future-ready digital ecosystems. From this vision, KamGlobal AI was created — a complete partner for organizations across Kuwait, India, and beyond.',
    featuredQuote:
        'KamGlobal AI is not just a technology provider. It is a long-term vision for smarter business, sustainable innovation, digital transformation, and future generations.',
    signatureOrg: 'KAM GLOBAL AI'
};

export const executiveBoard = [
    { name: 'Dr. Abdul Wahab Al Atwan', title: 'President & C.E.O', featured: true },
    { name: 'Dr. Daoud Chit', title: 'General Manager' },
    { name: 'Yarramsetty Syam Kumar', title: 'Admin Manager' }
];

export const kuwaitHighlights = [
    'Strategic investor relations & business hub',
    'Regional market access & partnerships',
    'Client relationship management'
];

export const indiaHighlights = [
    'World-class engineering & product teams',
    '24/7 support & technical operations',
    'Cloud & AI innovation labs'
];

export const teamMoments = [
    { src: '/office_team_collab.png', alt: 'KamGlobal AI team collaborating' },
    { src: '/2B.png', alt: 'KamGlobal AI global team' }
];

export const getInitials = (name) =>
    name
        .replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s+/i, '')
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
