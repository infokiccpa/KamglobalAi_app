import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, ExternalLink } from 'lucide-react';
import { useAdminData } from './useAdminData';
import { adminRequest, canEdit } from './session';
import { PageTitle, Spinner, ErrorNote, Badge, Empty } from './AdminUi';
import { JOB_STATUSES, boardLabel, formatDate, isScheduled, jobStatusLabel, toQuery } from './format';

const publicPath = (job) => (job.board === 'hr' ? `/hr/jobs/${job._id}` : '/careers#jobs');

const JobsAdmin = ({ user }) => {
    const [params, setParams] = useSearchParams();
    const board = params.get('board') || '';
    const status = params.get('status') || '';
    const { data, error, loading, reload } = useAdminData(`/api/admin/jobs${toQuery({ board, status })}`);
    const [actionError, setActionError] = useState('');
    const editable = canEdit(user);

    const setFilter = (key, value) => {
        const next = new URLSearchParams(params);
        if (value) next.set(key, value);
        else next.delete(key);
        setParams(next, { replace: true });
    };

    const changeStatus = async (job, next) => {
        setActionError('');
        try {
            await adminRequest(`/api/admin/jobs/${job._id}`, { method: 'PUT', body: { status: next } });
            reload();
        } catch (err) {
            setActionError(err.message);
        }
    };

    const remove = async (job) => {
        if (!window.confirm(`Delete "${job.title}"? This cannot be undone.`)) return;
        setActionError('');
        try {
            await adminRequest(`/api/admin/jobs/${job._id}`, { method: 'DELETE' });
            reload();
        } catch (err) {
            setActionError(err.message);
        }
    };

    const jobs = data?.data || [];

    return (
        <>
            <PageTitle
                title="Job openings"
                sub="Published openings appear on the website straight away. Drafts stay private; closed jobs are hidden."
                actions={editable && <Link to="/admin/jobs/new" className="adm-btn adm-btn--primary"><Plus size={16} aria-hidden="true" /> Post a job</Link>}
            />
            <div className="adm-filters">
                <select aria-label="Job board" value={board} onChange={(e) => setFilter('board', e.target.value)}>
                    <option value="">All boards</option>
                    <option value="hr">HR & Workforce</option>
                    <option value="careers">Careers</option>
                </select>
                <select aria-label="Status" value={status} onChange={(e) => setFilter('status', e.target.value)}>
                    <option value="">All statuses</option>
                    {JOB_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
            </div>
            <ErrorNote>{error || actionError}</ErrorNote>
            {loading ? <Spinner /> : jobs.length === 0 ? (
                <Empty title="No job openings yet">
                    {editable ? 'Post your first opening and it will appear on the website once published.' : 'Openings created by your team will appear here.'}
                </Empty>
            ) : (
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th scope="col">Role</th>
                                <th scope="col">Board</th>
                                <th scope="col">Status</th>
                                <th scope="col">Applications</th>
                                <th scope="col">Updated</th>
                                <th scope="col"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job._id}>
                                    <td>
                                        <Link to={`/admin/jobs/${job._id}`} className="adm-strong">{job.title}</Link>
                                        <span className="adm-sub">{job.location}{job.category ? ` · ${job.category}` : ''}</span>
                                    </td>
                                    <td>{boardLabel(job.board)}</td>
                                    <td>
                                        <Badge value={isScheduled(job) ? 'scheduled' : job.status} label={jobStatusLabel(job)} />
                                        {isScheduled(job) && <span className="adm-sub">{formatDate(job.publishAt, true)}</span>}
                                    </td>
                                    <td>
                                        <Link to={`/admin/applications?job=${job._id}`}>{job.applications}</Link>
                                    </td>
                                    <td>{formatDate(job.updatedAt)}</td>
                                    <td className="adm-actions">
                                        {job.status === 'published' && !isScheduled(job) && (
                                            <a href={publicPath(job)} target="_blank" rel="noopener noreferrer" aria-label={`View ${job.title} on the website`}><ExternalLink size={16} /></a>
                                        )}
                                        {editable && (
                                            <>
                                                {job.status !== 'published' && <button type="button" onClick={() => changeStatus(job, 'published')}>Publish</button>}
                                                {job.status === 'published' && <button type="button" onClick={() => changeStatus(job, 'closed')}>Close</button>}
                                                <Link to={`/admin/jobs/${job._id}`}>Edit</Link>
                                                {job.applications === 0 && <button type="button" className="adm-danger" onClick={() => remove(job)}>Delete</button>}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default JobsAdmin;
