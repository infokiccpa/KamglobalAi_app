import { Link } from 'react-router-dom';

const ServiceItem = ({ service, onNavigate }) => {
    const Icon = service.icon;

    return (
        <Link to={service.route} className="sh-svc-item" onClick={onNavigate}>
            {Icon && (
                <span className="sh-svc-icon" aria-hidden="true">
                    <Icon size={16} strokeWidth={1.75} />
                </span>
            )}
            <span>
                <strong>
                    {service.title}
                    {service.badge && <span className="sh-badge">{service.badge}</span>}
                </strong>
            </span>
        </Link>
    );
};

export default ServiceItem;
