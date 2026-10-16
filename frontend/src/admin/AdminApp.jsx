import { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LayoutDashboard, Briefcase, Inbox, MessageSquare, Users, KeyRound, LogOut, Menu, X, ExternalLink } from 'lucide-react';
import { useSession, clearSession, saveSession, adminRequest, isSuperAdmin, ROLE_LABELS } from './session';
import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard';
import JobsAdmin from './JobsAdmin';
import JobEditor from './JobEditor';
import ApplicationsAdmin from './ApplicationsAdmin';
import ApplicationDetail from './ApplicationDetail';
import EnquiriesAdmin from './EnquiriesAdmin';
import UsersAdmin from './UsersAdmin';
import AccountAdmin from './AccountAdmin';
import './admin.css';

const NAV = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/jobs', label: 'Job openings', icon: Briefcase },
    { to: '/admin/applications', label: 'Applications', icon: Inbox },
    { to: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
    { to: '/admin/users', label: 'Users & access', icon: Users, superOnly: true },
    { to: '/admin/account', label: 'My account', icon: KeyRound },
];

const AdminShell = ({ session }) => {
    const { user } = session;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        adminRequest('/api/auth/me')
            .then((res) => saveSession({ ...session, user: res.user }))
            .catch(() => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`adm${open ? ' adm--nav-open' : ''}`}>
            <aside className="adm-side" aria-label="Admin navigation">
                <div className="adm-brand">
                    <img src="/images/home%20page/kam-logo.png" alt="" width="36" height="36" />
                    <span>KAM Global <small>Admin</small></span>
                    <button type="button" className="adm-nav-close" aria-label="Close menu" onClick={() => setOpen(false)}><X size={20} /></button>
                </div>
                <nav>
                    {NAV.filter((n) => !n.superOnly || isSuperAdmin(user)).map(({ to, label, icon: Icon, end }) => (
                        <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}>
                            <Icon size={18} aria-hidden="true" /> {label}
                        </NavLink>
                    ))}
                </nav>
                <div className="adm-side-foot">
                    <Link to="/" target="_blank" rel="noopener"><ExternalLink size={16} aria-hidden="true" /> View website</Link>
                </div>
            </aside>
            <div className="adm-main">
                <div className="adm-topbar">
                    <button type="button" className="adm-nav-open" aria-label="Open menu" onClick={() => setOpen(true)}><Menu size={20} /></button>
                    <div className="adm-user">
                        <span className="adm-avatar" aria-hidden="true">{user.name?.[0]?.toUpperCase() || 'A'}</span>
                        <span>
                            <strong>{user.name}</strong>
                            <small>{ROLE_LABELS[user.role]}</small>
                        </span>
                    </div>
                    <button type="button" className="adm-btn adm-btn--ghost" onClick={clearSession}>
                        <LogOut size={16} aria-hidden="true" /> Sign out
                    </button>
                </div>
                <div className="adm-content">
                    <Routes>
                        <Route index element={<Dashboard user={user} />} />
                        <Route path="jobs" element={<JobsAdmin user={user} />} />
                        <Route path="jobs/new" element={<JobEditor user={user} />} />
                        <Route path="jobs/:id" element={<JobEditor user={user} />} />
                        <Route path="applications" element={<ApplicationsAdmin user={user} />} />
                        <Route path="applications/:id" element={<ApplicationDetail user={user} />} />
                        <Route path="enquiries" element={<EnquiriesAdmin user={user} />} />
                        <Route path="users" element={isSuperAdmin(user) ? <UsersAdmin user={user} /> : <Navigate to="/admin" replace />} />
                        <Route path="account" element={<AccountAdmin user={user} />} />
                        <Route path="login" element={<Navigate to="/admin" replace />} />
                        <Route path="*" element={<Navigate to="/admin" replace />} />
                    </Routes>
                </div>
            </div>
            {open && <button type="button" className="adm-scrim" aria-label="Close menu" onClick={() => setOpen(false)} />}
        </div>
    );
};

const AdminApp = () => {
    const session = useSession();
    return (
        <>
            <Helmet>
                <title>Admin | KAM Global</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            {session?.token ? <AdminShell session={session} /> : <AdminLogin />}
        </>
    );
};

export default AdminApp;
