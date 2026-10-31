import ServiceDivisionColumn from './ServiceDivisionColumn';

const ServicesMegaMenu = ({ divisions, onNavigate }) => (
    <div className="sh-container sh-drop sh-drop--services">
        <div className="sh-svc-grid">
            {divisions.map((division) => (
                <ServiceDivisionColumn key={division.id} division={division} onNavigate={onNavigate} />
            ))}
        </div>
    </div>
);

export default ServicesMegaMenu;
