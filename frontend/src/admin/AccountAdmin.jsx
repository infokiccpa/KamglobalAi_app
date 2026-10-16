import { useState } from 'react';
import { KeyRound, Loader } from 'lucide-react';
import { adminRequest, saveSession, useSession, ROLE_LABELS } from './session';
import { PageTitle, ErrorNote, Field } from './AdminUi';

const AccountAdmin = ({ user }) => {
    const session = useSession();
    const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [done, setDone] = useState(false);

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        setDone(false);
        if (form.newPassword !== form.confirm) {
            setError('The new passwords do not match.');
            return;
        }
        setBusy(true);
        try {
            const res = await adminRequest('/api/auth/password', {
                method: 'PUT',
                body: { currentPassword: form.currentPassword, newPassword: form.newPassword },
            });
            saveSession({ ...session, token: res.token });
            setForm({ currentPassword: '', newPassword: '', confirm: '' });
            setDone(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setBusy(false);
        }
    };

    return (
        <>
            <PageTitle title="My account" sub={`${user.name} · ${user.email} · ${ROLE_LABELS[user.role]}`} />
            <form className="adm-card adm-form adm-narrow" onSubmit={submit}>
                <h2>Change password</h2>
                <Field label="Current password">
                    <input type="password" required autoComplete="current-password" value={form.currentPassword} onChange={set('currentPassword')} />
                </Field>
                <Field label="New password" hint="At least 10 characters, with letters and numbers. Other devices are signed out.">
                    <input type="password" required minLength={10} autoComplete="new-password" value={form.newPassword} onChange={set('newPassword')} />
                </Field>
                <Field label="Confirm new password">
                    <input type="password" required minLength={10} autoComplete="new-password" value={form.confirm} onChange={set('confirm')} />
                </Field>
                <ErrorNote>{error}</ErrorNote>
                {done && <p className="adm-success" role="status">Password updated.</p>}
                <div className="adm-form-actions">
                    <button type="submit" className="adm-btn adm-btn--primary" disabled={busy}>
                        {busy ? <Loader size={16} className="adm-spin" aria-hidden="true" /> : <KeyRound size={16} aria-hidden="true" />} Update password
                    </button>
                </div>
            </form>
        </>
    );
};

export default AccountAdmin;
