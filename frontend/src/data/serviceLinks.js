import { legacyServiceTarget } from './services/legacyPaths';

/** Names still used by industry pages. The href always opens the current catalogue. */
const KNOWN = {
    'custom-development': { name: 'Software and product engineering', short: 'Software', to: '/services/it-technology/software-engineering' },
    'ai-automation': { name: 'AI and automation', short: 'AI and automation', to: '/services/it-technology/ai-automation' },
    'cloud-devops': { name: 'Cloud and DevOps', short: 'Cloud and DevOps', to: '/services/it-technology/devops' },
    'customer-experience': { name: 'Customer support', short: 'Customer support', to: '/services/business-outsourcing/customer-support' },
    'business-process-outsourcing': { name: 'Business process outsourcing', short: 'BPO', to: '/services/business-outsourcing/bpo' },
    'sales-lead-generation': { name: 'Sales support', short: 'Sales support', to: '/services/business-outsourcing/sales-support' },
    'virtual-assistance': { name: 'Virtual assistance', short: 'Virtual assistance', to: '/services/business-outsourcing/virtual-assistance' },
    'digital-marketing-creative': { name: 'AI Media and Creative', short: 'AI media', to: '/services/ai-media-creative' },
    'industry-operations': { name: 'Business outsourcing', short: 'Operations', to: '/services/business-outsourcing' },
};

export const findService = (slug) => {
    const known = KNOWN[slug];
    if (known) return { slug, ...known };
    const to = legacyServiceTarget(`/services/${slug}`) || legacyServiceTarget(`/outsourcing/${slug}`);
    if (!to) return null;
    return { slug, name: slug, short: slug, to };
};
