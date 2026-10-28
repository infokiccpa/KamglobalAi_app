import { useState } from 'react';
import { Loader, Upload } from 'lucide-react';
import { useAdminData } from './useAdminData';
import { adminRequest, can } from './session';
import { PageTitle, Spinner, ErrorNote, Badge, Field } from './AdminUi';
import { formatDate } from './format';

const CATEGORIES = ['Guide', 'Document', 'Case note'];
const BLANK = { title: '', summary: '', category: 'Document', published: true, file: null };

const ResourcesAdmin = ({ user }) => {
    const editable = can(user, 'resources', 'write');
    const { data, error, loading, reload } = useAdminData('/api/admin/resources');
    const [form, setForm] = useState(BLANK);
    const [busy, setBusy] = useState(false);
    const [formError, setFormError] = useState('');
    const [actionError, setActionError] = useState('');

    const items = data?.data || [];

    const create = async (e) => {
        e.preventDefault();
        if (!form.file) {
            setFormError('Choose a file to upload.');
            return;
        }
        setBusy(true);
        setFormError('');
        const body = new FormData();
        body.append('title', form.title);
        body.append('summary', form.summary);
        body.append('category', form.category);
        body.append('published', String(form.published));
        body.append('file', form.file);
        try {
            await adminRequest('/api/admin/resources', { body });
            setForm(BLANK);
            e.target.reset();
            reload();
        } catch (err) {
            setFormError(err.message);
        } finally {
            setBusy(false);
        }
    };

    const toggle = async (item) => {
        setActionError('');
        const body = new FormData();
        body.append('published', String(!item.published));
        try {
            await adminRequest(`/api/admin/resources/${item.id}`, { method: 'PATCH', body });
            reload();
        } catch (err) {
            setActionError(err.message);
        }
    };

    const remove = async (item) => {
        if (!window.confirm(`Remove “${item.title}” from the website?`)) return;
        setActionError('');
        try {
            await adminRequest(`/api/admin/resources/${item.id}`, { method: 'DELETE' });
            reload();
        } catch (err) {
            setActionError(err.message);
        }
    };

    return (
        <>
            <PageTitle title="Resources" sub="Upload a file and publish it. Published items appear on the public Resources page." />
            {editable && (
                <form className="adm-card adm-form" onSubmit={create}>
                    <h2>Add a resource</h2>
                    <div className="adm-grid">
                        <Field label="Title *"><input required maxLength={140} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} /></Field>
                        <Field label="Category">
                            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </Field>
                        <Field label="Summary *"><textarea required maxLength={400} rows={3} value={form.summary} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} /></Field>
                        <Field label="File *" hint="PDF, Word, PNG, JPG or WebP. 8 MB maximum.">
                            <input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp" onChange={(e) => setForm((f) => ({ ...f, file: e.target.files?.[0] || null }))} />
                        </Field>
                    </div>
                    <label className="adm-check">
                        <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />
                        Visible on the website
                    </label>
                    <ErrorNote>{formError}</ErrorNote>
                    <div className="adm-form-actions">
                        <button type="submit" className="adm-btn adm-btn--primary" disabled={busy}>
                            {busy ? <Loader size={16} className="adm-spin" aria-hidden="true" /> : <Upload size={16} aria-hidden="true" />} Publish resource
                        </button>
                    </div>
                </form>
            )}
            <ErrorNote>{error || actionError}</ErrorNote>
            {loading ? <Spinner /> : items.length === 0 ? (
                <p className="adm-empty">No resources yet.</p>
            ) : (
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th scope="col">Resource</th>
                                <th scope="col">Category</th>
                                <th scope="col">Status</th>
                                <th scope="col">Added</th>
                                {editable && <th scope="col"><span className="sr-only">Actions</span></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <span className="adm-strong">{item.title}</span>
                                        <span className="adm-sub">{item.summary}</span>
                                    </td>
                                    <td>{item.category}</td>
                                    <td><Badge value={item.published ? 'active' : 'inactive'} label={item.published ? 'Published' : 'Hidden'} /></td>
                                    <td>{formatDate(item.createdAt)}</td>
                                    {editable && (
                                        <td className="adm-actions">
                                            {item.fileUrl && <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">Open</a>}
                                            <button type="button" onClick={() => toggle(item)}>{item.published ? 'Hide' : 'Publish'}</button>
                                            <button type="button" className="adm-danger" onClick={() => remove(item)}>Delete</button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default ResourcesAdmin;
