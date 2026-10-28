export const COMPANY = {
    brand: 'KAM Global AI',
    legalName: 'Kam Global for Digital AI Media Solutions Pvt. Ltd.',
    backing: 'Backed by KAM Group, Kuwait',
    email: 'info@kamglobalai.com',
    phone: '+91 80507 66363',
    tel: '+918050766363',
    phones: [
        { phone: '+91 80507 66363', tel: '+918050766363' },
        { phone: '+91 99001 62342', tel: '+919900162342' },
    ],
    whatsapp: '96522289927',
};

export const whatsappLink = (message = 'Hello, I am contacting KAM Global AI from the website. Please let me know a suitable time to speak.') =>
    `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;

export const ISO_27001 = {
    standard: 'ISO/IEC 27001:2022',
    system: 'Information Security Management System',
    legalName: 'KAM Global for Digital & AI Media Solutions Private Limited',
    scope: 'Providing consultancy for web and software development services.',
    statement: 'Statement of Applicability version 1.0, dated 24 June 2026.',
    number: '26MEQXN76',
    registered: '15 October 2026',
    issued: '15 October 2026',
    expires: '14 October 2029',
    surveillance: '15 September 2027 and 15 September 2028',
    body: 'Magnitude Management Services LLC',
};
