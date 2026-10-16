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
    whatsapp: '918050766363',
};

export const whatsappLink = (message = 'Hello, I am contacting KAM Global AI from the website. Please let me know a suitable time to speak.') =>
    `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;
