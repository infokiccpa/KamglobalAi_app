/**
 * Mega-menu view of the service catalogue.
 * `route` is the live page. Featured items are the ones shown in the navbar.
 */
import { BookOpen, School } from 'lucide-react';
import { categoryCapabilities, serviceCatalogue } from './services/catalog';

const toService = (division, category) => ({
    id: category.id,
    title: category.title,
    description: category.summary,
    route: `/services/${division.id}/${category.id}`,
    icon: category.icon || division.icon,
    featured: Boolean(category.featured),
    capabilities: categoryCapabilities(category),
});

export const serviceDivisions = serviceCatalogue.map((division) => {
    const services = division.categories.map((category) => toService(division, category));
    if (division.id === 'edtech') {
        services.unshift(
            {
                id: 'eduaitutors',
                title: 'EduAiTutors',
                description: 'Tutoring product for NEET, JEE and foundation learners, with live classes, mock analytics and mentoring.',
                route: '/products/eduaitutors',
                icon: BookOpen,
                featured: true,
                badge: 'Product',
            },
            {
                id: 'learnx',
                title: 'LearnX.school',
                description: 'School LMS and ERP for school operations and digital learning.',
                route: '/products/learnx',
                icon: School,
                featured: true,
                badge: 'Product',
            },
        );
    }
    return {
        id: division.id,
        title: division.title,
        shortDescription: division.summary,
        icon: division.icon,
        route: `/services/${division.id}`,
        viewAllLabel: division.viewAllLabel,
        viewAllRoute: `/services/${division.id}`,
        services,
    };
});

export const featuredServices = (division) => division.services.filter((service) => service.featured).slice(0, 5);
