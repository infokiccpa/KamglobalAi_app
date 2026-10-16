const SITE_URL = 'https://kamglobalai.com';

const ORG_REF = { '@id': `${SITE_URL}/#organization` };

export const serviceSchema = ({ name, description, path, serviceType, areaServed }) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: serviceType || name,
    provider: ORG_REF,
    ...(areaServed ? { areaServed } : {}),
    ...(path ? { url: `${SITE_URL}${path}` } : {}),
});

export const softwareSchema = ({ name, description, path, category = 'BusinessApplication' }) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: category,
    operatingSystem: 'Web',
    publisher: ORG_REF,
    ...(path ? { url: `${SITE_URL}${path}` } : {}),
});
