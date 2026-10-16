import { useState } from 'react';
import { UserPlus, Loader } from 'lucide-react';
import { useAdminData } from './useAdminData';
import { adminRequest, ROLE_LABELS } from './session';
import { PageTitle, Spinner, ErrorNote, Badge, Field } from './AdminUi';
import { formatDate } from './format';

const ROLE_HELP = {
    super_admin: 'Everything, including creating users and changing access.',
    recruiter: 'Post and edit jobs, review applications, add notes, export, handle enquiries.',
    viewer: 'Read-only: see jobs, applications, résumés and enquiries.',
};

const BLANK = { name: '', email: '', role: 'recruiter', password: '' };

const UsersAdmin = ({ user: me }) => {
    const { data, error, loading, reload } = useAdminData('/api/admin/users');
    const [form, setForm] = useState(BLANK);
    const [busy, setBusy] = useState(false);
    const [formError, setFormError] = useState('');
    const [actionError, setActionError] = useState('');
    const [created, setCreated] = useState('');

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const create = async (e) => {
        e.preventDefault();
        setBusy(true);
        setFormError('');
        setCreated('');
        try {
            await adminRequest('/api/admin/users', { body: form });
            setCreated(`${form.name} can now sign in at /admin with ${form.email}. Share the password with them securely.`);
            setForm(BLANK);
            reload();
        } catch (err) {
            setFormError(err.message);
        } finally {
            setBusy(false);
        }
    };

    const patch = async (u, body, confirmText) => {
        if (confirmText && !window.confirm(confirmText)) return;
        setActionError('');
        try {
            await adminRequest(`/api/admin/users/${u._id}`, { method: 'PATCH', body });
            reload();
        } catch (err) {
            setActionError(err.message);
        }
    };

    const resetPassword = (u) => {
        const password = window.prompt(`New password for ${u.name} (at least 10 characters, with letters and numbers):`);
        if (password) patch(u, { password });
    };

    const remove = async (u) => {
        if (!window.confirm(`Delete ${u.name}'s account? Their notes stay on applications.`)) return;
        setActionError('');
        try {
            await adminRequest(`/api/admin/users/${u._id}`, { method: 'DELETE' });
            reload();
        } catch (err) {
            setActionError(err.message);
        }
    };

    const users = data?.data || [];

    return (
        <>
            <PageTitle title="Users & access" sub="Create accounts for your team and choose what each person can do." />
            <ul className="adm-roles">
                {Object.entries(ROLE_HELP).map(([role, help]) => (
                    <li key={role}><Badge value={role} label={ROLE_LABELS[role]} /> {help}</li>
                ))}
            </ul>

            <form className="adm-card adm-form" onSubmit={create}>
                <h2>Add a user</h2>
                <div className="adm-grid">
                    <Field label="Full name *"><input required maxLength={80} value={form.name} onChange={set('name')} /></Field>
                    <Field label="Work email *"><input type="email" required value={form.email} onChange={set('email')} autoComplete="off" /></Field>
                    <Field label="Role">
                        <select value={form.role} onChange={set('role')}>
                            {Object.entries(ROLE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                        </select>
                    </Field>
                    <Field label="Temporary password *" hint="At least 10 characters, with letters and numbers.">
                        <input type="text" required minLength={10} value={form.password} onChange={set('password')} autoComplete="new-password" />
                    </Field>
                </div>
                <ErrorNote>{formError}</ErrorNote>
                {created && <p className="adm-success" role="status">{created}</p>}
                <div className="adm-form-actions">
                    <button type="submit" className="adm-btn adm-btn--primary" disabled={busy}>
                        {busy ? <Loader size={16} className="adm-spin" aria-hidden="true" /> : <UserPlus size={16} aria-hidden="true" />} Create user
                    </button>
                </div>
            </form>

            <ErrorNote>{error || actionError}</ErrorNote>
            {loading ? <Spinner /> : (
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th scope="col">User</th>
                                <th scope="col">Role</th>
                                <th scope="col">Status</th>
                                <th scope="col">Last sign-in</th>
                                <th scope="col"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => {
                                const self = u._id === me._id;
                                return (
                                    <tr key={u._id}>
                                        <td>
                                            <span className="adm-strong">{u.name}{self ? ' (you)' : ''}</span>
                                            <span className="adm-sub">{u.email}</span>
                                        </td>
                                        <td>
                                            {self ? ROLE_LABELS[u.role] : (
                                                <select aria-label={`Role for ${u.name}`} value={u.role} onChange={(e) => patch(u, { role: e.target.value })}>
                                                    {Object.entries(ROLE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                                                </select>
                                            )}
                                        </td>
                                        <td><Badge value={u.active ? 'active' : 'inactive'} label={u.active ? 'Active' : 'Disabled'} /></td>
                                        <td>{formatDate(u.lastLoginAt, true)}</td>
                                        <td className="adm-actions">
                                            {!self && (
                                                <>
                                                    <button type="button" onClick={() => resetPassword(u)}>Reset password</button>
                                                    {u.active
                                                        ? <button type="button" onClick={() => patch(u, { active: false }, `Disable ${u.name}? They will be signed out immediately.`)}>Disable</button>
                                                        : <button type="button" onClick={() => patch(u, { active: true })}>Enable</button>}
                                                    <button type="button" className="adm-danger" onClick={() => remove(u)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default UsersAdmin;
