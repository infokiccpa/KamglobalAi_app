export const contactLink = (subject, type) => {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (subject) params.set('subject', subject);
    const query = params.toString();
    return `/contact${query ? `?${query}` : ''}#form`;
};

export const ENQUIRY_TYPES = [
    'Technology Services',
    'Global Outsourcing',
    'HR & Workforce',
    'Candidate Registration',
    'Request Talent',
    'Request a Proposal',
    'Discovery Call',
    'Product Demo',
    'Partnership',
    'Careers',
    'General Enquiry',
];

export const discoveryLink = (subject) => contactLink(subject, 'Discovery Call');
export const proposalLink = (subject) => contactLink(subject, 'Request a Proposal');
export const talentLink = (subject) => contactLink(subject, 'Request Talent');
export const demoLink = (product) => contactLink(product, 'Product Demo');
