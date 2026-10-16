import { Loader, AlertCircle } from 'lucide-react';

export const PageTitle = ({ title, sub, actions }) => (
    <header className="adm-head">
        <div>
            <h1>{title}</h1>
            {sub && <p>{sub}</p>}
        </div>
        {actions && <div className="adm-head-actions">{actions}</div>}
    </header>
);

export const Spinner = ({ label = 'Loading' }) => (
    <p className="adm-loading" role="status"><Loader size={18} className="adm-spin" aria-hidden="true" /> {label}…</p>
);

export const ErrorNote = ({ children }) =>
    children ? (
        <p className="adm-error" role="alert"><AlertCircle size={16} aria-hidden="true" /> {children}</p>
    ) : null;

export const Badge = ({ value, label }) => <span className={`adm-badge adm-badge--${value}`}>{label || value}</span>;

export const Field = ({ label, hint, children, full }) => (
    <label className={`adm-field${full ? ' adm-field--full' : ''}`}>
        <span className="adm-field-label">{label}</span>
        {children}
        {hint && <span className="adm-field-hint">{hint}</span>}
    </label>
);

export const Pager = ({ page, pages, onChange }) =>
    pages > 1 ? (
        <nav className="adm-pager" aria-label="Pagination">
            <button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)}>Previous</button>
            <span>Page {page} of {pages}</span>
            <button type="button" disabled={page >= pages} onClick={() => onChange(page + 1)}>Next</button>
        </nav>
    ) : null;

export const Empty = ({ title, children }) => (
    <div className="adm-empty">
        <h2>{title}</h2>
        {children && <p>{children}</p>}
    </div>
);