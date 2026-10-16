import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Mail, Phone, Send, Loader } from 'lucide-react';
import { useAdminData } from './useAdminData';
import { adminRequest, canEdit, downloadFile } from './session';
import { PageTitle, Spinner, ErrorNote, Badge } from './AdminUi';
import { APP_STATUSES, appStatusLabel, boardLabel, formatDate } from './format';

const safeUrl = (url) => (/^https?:\/\//i.test(url || '') ? url : null);

const ApplicationDetail = ({ user }) => {
    const { id } = useParams();
    const { data, error, loading, reload } = useAdminData(`/api/admin/applications/${id}`);
    const [note, setNote] = useState('');
    const [busy, setBusy] = useState(false);
    const [actionError, setActionError] = useState('');
    const editable = canEdit(user);
    const a = data?.data;

    const update = async (body) => {
        setBusy(true);
        setActionError('');
        try {
            await adminRequest(`/api/admin/applications/${id}`, { method: 'PATCH', body });
            setNote('');
            reload();
        } catch (err) {
            setActionError(err.message);
        } finally {
            setBusy(false);
        }
    };

    const downloadDoc = async (kind, name) => {
        setActionError('');
        try {
            await downloadFile(`/api/admin/applications/${id}/files/${kind}`, name || kind);
        } catch (err) {
            setActionError(err.message);
        }
    };

    if (loading) return <Spinner />;
    if (!a) return <ErrorNote>{error || 'Application not found'}</ErrorNote>;

    const documents = [
        a.hasResume && ['resume', 'Résumé', a.resumeName],
        a.hasDegree && ['degree', 'Qualification certificate', a.degreeName],
        a.hasMasters && ['masters', "Master's certificate", a.mastersName],
        a.hasEngineering && ['engineering', 'Engineering certificate', a.engineeringName],
        a.hasSalarySlip && ['salary', 'Salary slip', a.salarySlipName],
    ].filter(Boolean);

    const details = [
        ['Application ID', a.applicationRef],
        ['Email', <a href={`mailto:${a.email}`}>{a.email}</a>],
        ['Phone', <a href={`tel:${(a.countryCode || '') + a.phone}`}>{a.countryCode} {a.phone}</a>],
        ['Location', [a.city, a.state, a.country].filter(Boolean).join(', ') || a.location],
        ['Gender', a.gender],
        ['Date of birth', a.dateOfBirth && formatDate(a.dateOfBirth)],
        ['Candidate type', a.candidateType],
        ['Qualification', a.qualification],
        ['Field of study', a.fieldOfStudy],
        ['Specialization', a.specialization],
        ['Experience', a.experience],
        ['Current or last company', a.currentCompany],
        ['Expected pay', a.expectedCtc],
        ['Notice period', a.noticePeriod],
        ['LinkedIn', safeUrl(a.linkedinUrl) && <a href={a.linkedinUrl} target="_blank" rel="noopener noreferrer">{a.linkedinUrl}</a>],
        ['GitHub', safeUrl(a.githubUrl) && <a href={a.githubUrl} target="_blank" rel="noopener noreferrer">{a.githubUrl}</a>],
        ['Portfolio', safeUrl(a.portfolioUrl) && <a href={a.portfolioUrl} target="_blank" rel="noopener noreferrer">{a.portfolioUrl}</a>],
        ['Board', boardLabel(a.board)],
        ['Job posting', a.job && <Link to={`/admin/jobs/${a.job._id}`}>{a.job.title} ({a.job.location})</Link>],
        ['Applied', formatDate(a.appliedAt, true)],
    ].filter(([, v]) => v);

    return (
        <>
            <p className="adm-back"><Link to="/admin/applications"><ArrowLeft size={16} aria-hidden="true" /> All applications</Link></p>
            <PageTitle
                title={[a.firstName, a.middleName, a.lastName].filter(Boolean).join(' ')}
                sub={[a.applicationRef, a.position].filter(Boolean).join(' · ')}
                actions={
                    <>
                        <a className="adm-btn adm-btn--ghost" href={`mailto:${a.email}`}><Mail size={16} aria-hidden="true" /> Email</a>
                        <a className="adm-btn adm-btn--ghost" href={`tel:${(a.countryCode || '') + a.phone}`}><Phone size={16} aria-hidden="true" /> Call</a>
                    </>
                }
            />
            <ErrorNote>{actionError}</ErrorNote>
            <div className="adm-split">
                <section className="adm-card">
                    <h2>Candidate details</h2>
                    <dl className="adm-dl">
                        {details.map(([k, v]) => (
                            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                        ))}
                    </dl>
                    {documents.length > 0 && (
                        <>
                            <h3>Documents</h3>
                            <div className="adm-status-btns">
                                {documents.map(([kind, label, name]) => (
                                    <button key={kind} type="button" onClick={() => downloadDoc(kind, name)}>
                                        <Download size={14} aria-hidden="true" /> {label}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                    {a.message && (
                        <>
                            <h3>Cover note</h3>
                            <p className="adm-pre">{a.message}</p>
                        </>
                    )}
                </section>
                <section className="adm-card">
                    <h2>Status</h2>
                    <p><Badge value={a.status} label={appStatusLabel(a.status)} /></p>
                    {editable && (
                        <div className="adm-status-btns" role="group" aria-label="Change status">
                            {APP_STATUSES.map((s) => (
                                <button
                                    key={s.value}
                                    type="button"
                                    aria-pressed={a.status === s.value}
                                    disabled={busy || a.status === s.value}
                                    onClick={() => update({ status: s.value })}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    )}
                    <h2>Notes &amp; history</h2>
                    {editable && (
                        <form className="adm-note-form" onSubmit={(e) => { e.preventDefault(); if (note.trim()) update({ note }); }}>
                            <label className="sr-only" htmlFor="adm-note">Add a note</label>
                            <textarea id="adm-note" rows={3} maxLength={2000} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Interview feedback, next steps…" />
                            <button type="submit" className="adm-btn" disabled={busy || !note.trim()}>
                                {busy ? <Loader size={16} className="adm-spin" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />} Add note
                            </button>
                        </form>
                    )}
                    {a.notes?.length ? (
                        <ol className="adm-notes">
                            {[...a.notes].reverse().map((n) => (
                                <li key={n._id}>
                                    <p>{n.text}</p>
                                    <small>{n.byName || 'Team'} · {formatDate(n.at, true)}</small>
                                </li>
                            ))}
                        </ol>
                    ) : <p className="adm-muted">No notes yet.</p>}
                </section>
            </div>
        </>
    );
};

export default ApplicationDetail;
