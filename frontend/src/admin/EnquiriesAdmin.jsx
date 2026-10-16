import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Mail } from 'lucide-react';
import { useAdminData } from './useAdminData';
import { adminRequest, canEdit } from './session';
import { PageTitle, Spinner, ErrorNote, Badge, Empty, Pager } from './AdminUi';
import { ENQUIRY_STATUSES, formatDate, toQuery } from './format';

const EnquiriesAdmin = ({ user }) => {
    const [params, setParams] = useSearchParams();
    const status = params.get('status') || '';
    const page = params.get('page') || '';
    const { data, error, loading, reload } = useAdminData(`/api/admin/enquiries${toQuery({ status, page })}`);
    const [openId, setOpenId] = useState(null);
    const [actionError, setActionError] = useState('');
    const editable = canEdit(user);

    const setFilter = (key, value) => {
        const next = new URLSearchParams(params);
        if (value) next.set(key, value);
        else next.delete(key);
        if (key !== 'page') next.delete('page');
        setParams(next, { replace: true });
    };

    const setStatus = async (item, next) => {
        setActionError('');
        try {
            await adminRequest(`/api/admin/enquiries/${item._id}`, { method: 'PATCH', body: { status: next } });
            reload();
        } catch (err) {
            setActionError(err.message);
        }
    };

    const toggle = (item) => {
        const opening = openId !== item._id;
        setOpenId(opening ? item._id : null);
        if (opening && editable && item.status === 'new') setStatus(item, 'read');
    };

    const items = data?.data || [];

    return (
        <>
            <PageTitle title="Enquiries" sub="Messages from the contact, service and product forms on the website." />
            <div className="adm-filters">
                <select aria-label="Status" value={status} onChange={(e) => setFilter('status', e.target.value)}>
                    <option value="">All statuses</option>
                    {ENQUIRY_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
            </div>
            <ErrorNote>{error || actionError}</ErrorNote>
            {loading ? <Spinner /> : items.length === 0 ? (
                <Empty title="No enquiries found" />
            ) : (
                <>
                    <ul className="adm-enquiries">
                        {items.map((item) => {
                            const open = openId === item._id;
                            const details = item.details ? Object.entries(item.details) : [];
                            return (
                                <li key={item._id} className={open ? 'is-open' : ''}>
                                    <button type="button" className="adm-enq-head" aria-expanded={open} onClick={() => toggle(item)}>
                                        <span>
                                            <strong>{item.subject}</strong>
                                            <span className="adm-sub">{item.name}{item.company ? ` · ${item.company}` : ''} · {formatDate(item.createdAt, true)}</span>
                                        </span>
                                        <Badge value={item.status} label={ENQUIRY_STATUSES.find((s) => s.value === item.status)?.label} />
                                        <ChevronDown size={18} aria-hidden="true" />
                                    </button>
                                    {open && (
                                        <div className="adm-enq-body">
                                            <dl className="adm-dl">
                                                <div><dt>Email</dt><dd><a href={`mailto:${item.email}`}>{item.email}</a></dd></div>
                                                {item.phone && <div><dt>Phone</dt><dd>{item.phone}</dd></div>}
                                                {item.country && <div><dt>Country</dt><dd>{item.country}</dd></div>}
                                                {item.enquiryType && <div><dt>Type</dt><dd>{item.enquiryType}</dd></div>}
                                                {item.startDate && <div><dt>Start date</dt><dd>{item.startDate}</dd></div>}
                                                {item.reference && <div><dt>Reference</dt><dd>{item.reference}</dd></div>}
                                                {details.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                                            </dl>
                                            <p className="adm-pre">{item.message}</p>
                                            <div className="adm-form-actions">
                                                <a className="adm-btn adm-btn--primary" href={`mailto:${item.email}?subject=${encodeURIComponent(`Re: ${item.subject}`)}`}>
                                                    <Mail size={16} aria-hidden="true" /> Reply by email
                                                </a>
                                                {editable && item.status !== 'replied' && (
                                                    <button type="button" className="adm-btn" onClick={() => setStatus(item, 'replied')}>Mark as replied</button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                    <Pager page={data.page} pages={data.pages} onChange={(p) => setFilter('page', p > 1 ? String(p) : '')} />
                </>
            )}
        </>
    );
};

export default EnquiriesAdmin;
