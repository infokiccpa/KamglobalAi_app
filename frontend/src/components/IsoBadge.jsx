import { Link } from 'react-router-dom';
import { ISO_27001 } from '../data/company';
import './IsoBadge.css';

const Seal = () => (
    <svg className="iso-seal" viewBox="0 0 88 88" aria-hidden="true">
        <circle cx="44" cy="44" r="42" fill="#0c213d" />
        <circle cx="44" cy="44" r="36.5" fill="none" stroke="#f7941d" strokeWidth="1.6" />
        <circle cx="44" cy="44" r="33.5" fill="none" stroke="rgba(247,148,29,0.45)" strokeWidth="0.6" />
        <path d="M44 14.5l1.15 2.35 2.6.38-1.88 1.83.44 2.58L44 20.4l-2.31 1.24.44-2.58-1.88-1.83 2.6-.38L44 14.5z" fill="#f7941d" />
        <text x="44" y="36" textAnchor="middle" fill="#fff" fontFamily="Outfit, Segoe UI, sans-serif" fontSize="8" fontWeight="700" letterSpacing="1.4">ISO/IEC</text>
        <text x="44" y="50" textAnchor="middle" fill="#fff" fontFamily="Outfit, Segoe UI, sans-serif" fontSize="13" fontWeight="700">27001</text>
        <text x="44" y="62" textAnchor="middle" fill="#f7941d" fontFamily="Outfit, Segoe UI, sans-serif" fontSize="8" fontWeight="700" letterSpacing="0.8">:2022</text>
    </svg>
);

const IsoBadge = ({ tone = 'light', size = 'regular' }) => (
    <Link
        to="/hr/trust#certification"
        className={`iso-badge iso-badge--${tone} iso-badge--${size}`}
    >
        <Seal />
        <span>
            <em>ISO certified</em>
            <strong>{ISO_27001.standard}</strong>
            <small>Certificate {ISO_27001.number}</small>
        </span>
    </Link>
);

export default IsoBadge;
