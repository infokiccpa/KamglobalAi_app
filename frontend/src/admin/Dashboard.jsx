import { Link } from 'react-router-dom';
import { Briefcase, FilePen, Inbox, Sparkles, CalendarDays, MessageSquare, Plus } from 'lucide-react';
import { useAdminData } from './useAdminData';
import { canEdit } from './session';
import { PageTitle, Spinner, ErrorNote, Badge } from './AdminUi';
import { APP_STATUSES, formatDate } from './format';

const Dashboard = ({ user }) => {
    const stats = useAdminData('/api/admin/stats');
    const recent = useAdminData('/api/admin/applications?limit=6');
    const s = stats.data?.data;

    const cards = s
        ? [
            { icon: Briefcase, label: 'Open jobs', value: s.openJobs, to: '/admin/jobs?status=published' },
            { icon: FilePen, label: 'Draft jobs', value: s.draftJobs, to: '/admin/jobs?status=draft' },
            { icon: Sparkles, label: 'New applications', value: s.newApps, to: '/admin/applications?status=pending' },
            { icon: CalendarDays, label: 'Applications this week', value: s.weekApps, to: '/admin/applications' },
            { icon: Inbox, label: 'All applications', value: s.totalApps, to: '/admin/applications' },
            { icon: MessageSquare, label: 'New enquiries', value: s.newEnquiries, to: '/admin/enquiries?status=new' },
        ]
        : [];

    return (
        <>
            <PageTitle
                title={`Welcome, ${user.name.split(' ')[0]}`}
                sub="What is happening across job openings, applications and enquiries."
                actions={canEdit(user) && (
                    <Link to="/admin/jobs/new" className="adm-btn adm-btn--primary"><Plus size={16} aria-hidden="true" /> Post a job</Link>
                )}
            />
            <ErrorNote>{stats.error}</ErrorNote>
            {stats.loading ? <Spinner /> : (
                <div className="adm-stats">
                    {cards.map(({ icon: Icon, label, value, to }) => (
                        <Link key={label} to={to} className="adm-stat">
                            <Icon size={20} aria-hidden="true" />
                            <strong>{value}</strong>
                            <span>{label}</span>
                        </Link>
                    ))}
                </div>
            )}

            {s && (
                <section className="adm-card">
                    <h2>Pipeline</h2>
                    <div className="adm-pipeline">
                        {APP_STATUSES.map((st) => (
                            <Link key={st.value} to={`/admin/applications?status=${st.value}`}>
                                <Badge value={st.value} label={st.label} />
                                <strong>{s.byStatus[st.value] || 0}</strong>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            <section className="adm-card">
                <div className="adm-card-head">
                    <h2>Latest applications</h2>
                    <Link to="/admin/applications">View all</Link>
                </div>
                <ErrorNote>{recent.error}</ErrorNote>
                {recent.loading ? <Spinner /> : recent.data?.data.length ? (
                    <ul className="adm-list">
                        {recent.data.data.map((a) => (
                            <li key={a._id}>
                                <Link to={`/admin/applications/${a._id}`}>
                                    <strong>{a.firstName} {a.lastName}</strong>
                                    <span>{a.position}</span>
                                </Link>
                                <Badge value={a.status} label={APP_STATUSES.find((x) => x.value === a.status)?.label} />
                                <time dateTime={a.appliedAt}>{formatDate(a.appliedAt)}</time>
                            </li>
                        ))}
                    </ul>
                ) : !recent.error && <p className="adm-muted">No applications yet. They appear here as soon as candidates apply on the website.</p>}
            </section>
        </>
    );
};

export default Dashboard;
