import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Loader } from 'lucide-react';
import { request } from '../lib/api';
import { saveSession } from './session';
import { ErrorNote } from './AdminUi';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        setBusy(true);
        setError('');
        try {
            const res = await request('/api/auth/login', { body: { email, password } });
            saveSession({ token: res.token, user: res.user });
        } catch (err) {
            setError(err.message);
            setBusy(false);
        }
    };

    return (
        <main className="adm-login">
            <form className="adm-login-card" onSubmit={submit}>
                <img src="/images/home%20page/kam-logo.png" alt="KAM Global" width="56" height="56" />
                <h1>Admin sign in</h1>
                <p>Manage job openings, applications, enquiries and team access.</p>
                <label className="adm-field">
                    <span className="adm-field-label">Email</span>
                    <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="adm-field">
                    <span className="adm-field-label">Password</span>
                    <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <ErrorNote>{error}</ErrorNote>
                <button type="submit" className="adm-btn adm-btn--primary adm-btn--block" disabled={busy}>
                    {busy ? <Loader size={16} className="adm-spin" aria-hidden="true" /> : <LogIn size={16} aria-hidden="true" />} Sign in
                </button>
                <p className="adm-login-foot">Need access? Ask your Super Admin to create an account for you. <Link to="/">Back to website</Link></p>
            </form>
        </main>
    );
};

export default AdminLogin;
