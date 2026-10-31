import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { featuredServices } from '../../data/serviceCatalog';
import ServiceItem from './ServiceItem';

const MobileServicesMenu = ({ divisions, onNavigate }) => {
    const [openId, setOpenId] = useState(null);

    return (
        <div className="sh-svc-mobile">
            {divisions.map((division) => {
                const Icon = division.icon;
                const open = openId === division.id;

                return (
                    <div key={division.id} className={`sh-svc-acc${open ? ' is-open' : ''}`}>
                        <button
                            type="button"
                            className="sh-svc-acc-btn"
                            aria-expanded={open}
                            aria-controls={`svc-acc-${division.id}`}
                            onClick={() => setOpenId(open ? null : division.id)}
                        >
                            <Icon size={16} aria-hidden="true" />
                            <span>{division.title}</span>
                            <ChevronDown size={16} className="sh-caret" aria-hidden="true" />
                        </button>
                        <div id={`svc-acc-${division.id}`} className="sh-svc-acc-panel">
                            <div className="sh-svc-acc-inner">
                                <ul className="sh-svc-list">
                                    {featuredServices(division).map((service) => (
                                        <li key={service.id}>
                                            <ServiceItem service={service} onNavigate={onNavigate} />
                                        </li>
                                    ))}
                                </ul>
                                <Link to={division.viewAllRoute} className="sh-svc-all" onClick={onNavigate}>
                                    {division.viewAllLabel}
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MobileServicesMenu;
