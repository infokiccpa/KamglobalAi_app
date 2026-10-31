import { useState } from 'react';
import { useAdminData } from './useAdminData';
import { adminRequest, can } from './session';
import { PageTitle, Spinner, ErrorNote, Badge, Field } from './AdminUi';

const BLANK = { id: '', title: '', text: '', href: '/', active: false };

const AdsAdmin = ({ user }) => {
    const editable = can(user, 'resources', 'write');
    const { data, error, loading, reload } = useAdminData('/api/admin/ads');
    const [form, setForm] = useState(BLANK);
    const [busy, setBusy] = useState(false);
    const [formError, setFormError] = useState('');

    const items = data?.data || [];
    const set = (key) => (e) => setForm((current) => ({ ...current, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

    const save = async (e) => {
        e.preventDefault();
        setBusy(true);
        setFormError('');
        try {
            await adminRequest(form.id ? `/api/admin/ads/${form.id}` : '/api/admin/ads', {
                method: form.id ? 'PUT' : 'POST',
                body: { title: form.title, text: form.text, href: form.href, placement: 'home', active: form.active },
            });
            setForm(BLANK);
            reload();
        } catch (err) {
            setFormError(err.message);
        } finally {
            setBusy(false);
        }
    };

    const remove = async (item) => {
        if (!window.confirm(`Remove the “${item.title}” ad?`)) return;
        try {
            await adminRequest(`/api/admin/ads/${item.id}`, { method: 'DELETE' });
            if (form.id === item.id) setForm(BLANK);
            reload();
        } catch (err) {
            setFormError(err.message);
        }
    };

    return (
        <>
            <PageTitle title="Ads" sub="Marketing can place a short notice on the homepage. Nothing appears until it is marked active." />
            <ErrorNote>{error || formError}</ErrorNote>
            {editable && (
                <form className="adm-card adm-form" onSubmit={save}>
                    <h2>{form.id ? 'Edit ad' : 'New homepage ad'}</h2>
                    <div className="adm-grid">
                        <Field label="Title *"><input required maxLength={80} value={form.title} onChange={set('title')} /></Field>
                        <Field label="Link *"><input required maxLength={300} value={form.href} onChange={set('href')} placeholder="/services or https://…" /></Field>
                    </div>
                    <Field label="Text *"><textarea required maxLength={240} rows={3} value={form.text} onChange={set('text')} /></Field>
                    <label className="adm-check"><input type="checkbox" checked={form.active} onChange={set('active')} /> Active on the homepage</label>
                    <div className="adm-form-actions">
                        <button className="adm-btn adm-btn--primary" type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save ad'}</button>
                        {form.id && <button className="adm-btn adm-btn--ghost" type="button" onClick={() => setForm(BLANK)}>Cancel edit</button>}
                    </div>
                </form>
            )}
            {loading ? <Spinner /> : (
                <div className="adm-card">
                    {items.length === 0 && <p>No ads yet. The homepage stays clear until you publish one.</p>}
                    <ul className="adm-list">
                        {items.map((item) => (
                            <li key={item.id}>
                                <div>
                                    <strong>{item.title}</strong>
                                    <Badge value={item.active ? 'active' : 'draft'} label={item.active ? 'Active' : 'Hidden'} />
                                    <p>{item.text}</p>
                                    <small>{item.href}</small>
                                </div>
                                {editable && (
                                    <div className="adm-row-actions">
                                        <button type="button" className="adm-btn adm-btn--ghost" onClick={() => setForm(item)}>Edit</button>
                                        <button type="button" className="adm-btn adm-btn--ghost" onClick={() => remove(item)}>Remove</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default AdsAdmin;
