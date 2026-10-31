import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { featuredServices } from '../../data/serviceCatalog';
import ServiceItem from './ServiceItem';

const ServiceDivisionColumn = ({ division, onNavigate }) => {
    const Icon = division.icon;

    return (
        <section className="sh-svc-col" aria-labelledby={`svc-${division.id}`}>
            <Link to={division.route} id={`svc-${division.id}`} className="sh-svc-head" onClick={onNavigate}>
                <span className="sh-svc-icon" aria-hidden="true">
                    <Icon size={16} strokeWidth={1.75} />
                </span>
                <span>{division.title}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            <ul className="sh-svc-list">
                {featuredServices(division).map((service) => (
                    <li key={service.id}>
                        <ServiceItem service={service} onNavigate={onNavigate} />
                    </li>
                ))}
            </ul>
            <Link to={division.viewAllRoute} className="sh-svc-all" onClick={onNavigate}>
                {division.viewAllLabel}
                <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
        </section>
    );
};

export default ServiceDivisionColumn;
