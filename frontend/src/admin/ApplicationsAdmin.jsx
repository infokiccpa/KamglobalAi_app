import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Download, Search } from 'lucide-react';
import { useAdminData } from './useAdminData';
import { canEdit, downloadFile } from './session';
import { PageTitle, Spinner, ErrorNote, Badge, Empty, Pager } from './AdminUi';
import { APP_STATUSES, appStatusLabel, boardLabel, formatDate, toQuery } from './format';

const ApplicationsAdmin = ({ user }) => {
    const [params, setParams] = useSearchParams();
    const filters = {
        status: params.get('status') || '',
        board: params.get('board') || '',
        job: params.get('job') || '',
        q: params.get('q') || '',
        page: params.get('page') || '',
    };
    const [term, setTerm] = useState(filters.q);
    const { data, error, loading } = useAdminData(`/api/admin/applications${toQuery(filters)}`);
    const jobs = useAdminData('/api/admin/jobs');
    const [exportError, setExportError] = useState('');

    const setFilter = (key, value) => {
        const next = new URLSearchParams(params);
        if (value) next.set(key, value);
        else next.delete(key);
        if (key !== 'page') next.delete('page');
        setParams(next, { replace: true });
    };

    useEffect(() => {
        const t = setTimeout(() => {
            if (term !== filters.q) setFilter('q', term.trim());
        }, 350);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term]);

    const exportCsv = async () => {
        setExportError('');
        try {
            const { page: _page, ...rest } = filters;
            await downloadFile(`/api/admin/applications/export${toQuery(rest)}`, 'applications.csv');
        } catch (err) {
            setExportError(err.message);
        }
    };

    const items = data?.data || [];

    return (
        <>
            <PageTitle
                title="Applications"
                sub="Every application submitted on the website, with the candidate's details and résumé."
                actions={canEdit(user) && (
                    <button type="button" className="adm-btn" onClick={exportCsv}><Download size={16} aria-hidden="true" /> Export CSV</button>
                )}
            />
            <div className="adm-filters">
                <label className="adm-search">
                    <Search size={16} aria-hidden="true" />
                    <span className="sr-only">Search applications</span>
                    <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Name, email, phone, role or application ID" />
                </label>
                <select aria-label="Status" value={filters.status} onChange={(e) => setFilter('status', e.target.value)}>
                    <option value="">All statuses</option>
                    {APP_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <select aria-label="Board" value={filters.board} onChange={(e) => setFilter('board', e.target.value)}>
                    <option value="">All boards</option>
                    <option value="hr">HR & Workforce</option>
                    <option value="careers">Careers</option>
                </select>
                <select aria-label="Job" value={filters.job} onChange={(e) => setFilter('job', e.target.value)}>
                    <option value="">All jobs and general applications</option>
                    {(jobs.data?.data || []).map((j) => <option key={j._id} value={j._id}>{j.title} ({j.location})</option>)}
                </select>
            </div>
            <ErrorNote>{error || exportError}</ErrorNote>
            {loading ? <Spinner /> : items.length === 0 ? (
                <Empty title="No applications found">
                    {Object.values(filters).some(Boolean) ? 'Try clearing the filters.' : 'Applications appear here as soon as candidates apply on the website.'}
                </Empty>
            ) : (
                <>
                    <p className="adm-muted">{data.total} {data.total === 1 ? 'application' : 'applications'}</p>
                    <div className="adm-table-wrap">
                        <table className="adm-table">
                            <thead>
                                <tr>
                                    <th scope="col">Candidate</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Experience</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Applied</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((a) => (
                                    <tr key={a._id}>
                                        <td>
                                            <Link to={`/admin/applications/${a._id}`} className="adm-strong">{[a.firstName, a.middleName, a.lastName].filter(Boolean).join(' ')}</Link>
                                            <span className="adm-sub">{a.applicationRef ? `${a.applicationRef} · ` : ''}{a.email}</span>
                                        </td>
                                        <td>
                                            {a.position}
                                            <span className="adm-sub">{boardLabel(a.board)}{a.location ? ` · ${a.location}` : ''}</span>
                                        </td>
                                        <td>{a.experience}</td>
                                        <td><Badge value={a.status} label={appStatusLabel(a.status)} /></td>
                                        <td>{formatDate(a.appliedAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pager page={data.page} pages={data.pages} onChange={(p) => setFilter('page', p > 1 ? String(p) : '')} />
                </>
            )}
        </>
    );
};

export default ApplicationsAdmin;
