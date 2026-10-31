import { useState } from 'react';
import { useAdminData } from './useAdminData';
import { adminRequest, can } from './session';
import { PageTitle, Spinner, ErrorNote, Badge, Field } from './AdminUi';
import { formatDate } from './format';

const BLANK = { id: '', title: '', summary: '', body: '', published: false };

const PostsAdmin = ({ user }) => {
    const editable = can(user, 'resources', 'write');
    const { data, error, loading, reload } = useAdminData('/api/admin/posts');
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
            await adminRequest(form.id ? `/api/admin/posts/${form.id}` : '/api/admin/posts', {
                method: form.id ? 'PUT' : 'POST',
                body: { title: form.title, summary: form.summary, body: form.body, published: form.published },
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
        if (!window.confirm(`Remove “${item.title}” from articles?`)) return;
        try {
            await adminRequest(`/api/admin/posts/${item.id}`, { method: 'DELETE' });
            if (form.id === item.id) setForm(BLANK);
            reload();
        } catch (err) {
            setFormError(err.message);
        }
    };

    return (
        <>
            <PageTitle title="Articles" sub="Marketing writes articles here. Only published articles appear on the Resources page." />
            <ErrorNote>{error || formError}</ErrorNote>
            {editable && (
                <form className="adm-card adm-form" onSubmit={save}>
                    <h2>{form.id ? 'Edit article' : 'New article'}</h2>
                    <div className="adm-grid">
                        <Field label="Title *"><input required maxLength={140} value={form.title} onChange={set('title')} /></Field>
                        <Field label="Summary *"><textarea required maxLength={400} rows={3} value={form.summary} onChange={set('summary')} /></Field>
                    </div>
                    <Field label="Article text *"><textarea required maxLength={8000} rows={8} value={form.body} onChange={set('body')} /></Field>
                    <label className="adm-check"><input type="checkbox" checked={form.published} onChange={set('published')} /> Published on the website</label>
                    <div className="adm-form-actions">
                        <button className="adm-btn adm-btn--primary" type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save article'}</button>
                        {form.id && <button className="adm-btn adm-btn--ghost" type="button" onClick={() => setForm(BLANK)}>Cancel edit</button>}
                    </div>
                </form>
            )}
            {loading ? <Spinner /> : (
                <div className="adm-card">
                    {items.length === 0 && <p>No articles yet.</p>}
                    <ul className="adm-list">
                        {items.map((item) => (
                            <li key={item.id}>
                                <div>
                                    <strong>{item.title}</strong>
                                    <Badge value={item.published ? 'published' : 'draft'} label={item.published ? 'Published' : 'Draft'} />
                                    <p>{item.summary}</p>
                                    <small>{formatDate(item.createdAt)}</small>
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

export default PostsAdmin;
