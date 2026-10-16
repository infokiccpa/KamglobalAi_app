import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader } from 'lucide-react';
import { useAdminData } from './useAdminData';
import { adminRequest, canEdit } from './session';
import { PageTitle, Spinner, ErrorNote, Field } from './AdminUi';
import { BOARDS, JOB_STATUSES } from './format';
import { jobCategories, hrCountries } from '../data/hrWorkforce';
import { JOB_DOCUMENTS } from '../data/jobDocuments';

const EMPTY = {
    board: 'hr',
    title: '',
    category: '',
    department: '',
    location: '',
    country: '',
    experience: '',
    employmentType: 'Full-time',
    vacancies: 1,
    package: '',
    summary: '',
    description: '',
    requirements: '',
    requiredDocuments: [],
    status: 'draft',
    publishAt: '',
    closesAt: '',
};

const toLocalInput = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const TYPES = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];

const fromJob = (job) => ({
    ...EMPTY,
    ...Object.fromEntries(Object.keys(EMPTY).map((k) => [k, job[k] ?? EMPTY[k]])),
    requirements: (job.requirements || []).join('\n'),
    requiredDocuments: Array.isArray(job.requiredDocuments) ? [...new Set(job.requiredDocuments)] : [],
    publishAt: toLocalInput(job.publishAt),
    closesAt: toLocalInput(job.closesAt),
});

const JobForm = ({ initial, id, user }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState(initial);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const readOnly = !canEdit(user);

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const toggleDocument = (key) => {
        setForm((current) => ({
            ...current,
            requiredDocuments: current.requiredDocuments.includes(key)
                ? current.requiredDocuments.filter((item) => item !== key)
                : [...current.requiredDocuments, key],
        }));
    };

    const save = async (e, statusOverride) => {
        e.preventDefault();
        setBusy(true);
        setError('');
        const body = {
            ...form,
            vacancies: Number(form.vacancies) || 1,
            status: statusOverride || form.status,
            publishAt: form.publishAt ? new Date(form.publishAt).toISOString() : '',
            closesAt: form.closesAt ? new Date(form.closesAt).toISOString() : '',
        };
        try {
            await adminRequest(id ? `/api/admin/jobs/${id}` : '/api/admin/jobs', { method: id ? 'PUT' : 'POST', body });
            navigate('/admin/jobs');
        } catch (err) {
            setError(err.message);
            setBusy(false);
        }
    };

    const categories = form.board === 'hr' ? jobCategories : ['Engineering', 'AI & Data', 'Cloud & DevOps', 'Customer Experience', 'Sales', 'Marketing', 'Operations'];
    const scheduledForLater = Boolean(form.publishAt && new Date(form.publishAt) > new Date());

    return (
        <form className="adm-card adm-form" onSubmit={save}>
            <fieldset disabled={readOnly || busy}>
                <div className="adm-grid">
                    <Field label="Show on" full>
                        <select value={form.board} onChange={set('board')}>
                            {BOARDS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                        </select>
                    </Field>
                    <Field label="Job title *">
                        <input required maxLength={120} value={form.title} onChange={set('title')} placeholder="Ex: Site Engineer (Civil)" />
                    </Field>
                    <Field label="Category">
                        <input list="adm-job-categories" maxLength={60} value={form.category} onChange={set('category')} placeholder="Choose or type" />
                        <datalist id="adm-job-categories">
                            {categories.map((c) => <option key={c} value={c} />)}
                        </datalist>
                    </Field>
                    <Field label="Location *" hint="City and country, as candidates should see it.">
                        <input required maxLength={120} value={form.location} onChange={set('location')} placeholder="Ex: Bengaluru, India" />
                    </Field>
                    <Field label="Country">
                        <input list="adm-job-countries" maxLength={60} value={form.country} onChange={set('country')} placeholder="Choose or type" />
                        <datalist id="adm-job-countries">
                            {hrCountries.map((c) => <option key={c.code} value={c.name} />)}
                        </datalist>
                    </Field>
                    <Field label="Department / client team">
                        <input maxLength={60} value={form.department} onChange={set('department')} />
                    </Field>
                    <Field label="Experience / eligibility">
                        <input maxLength={120} value={form.experience} onChange={set('experience')} placeholder="Ex: 3 to 6 years, B.E. Civil" />
                    </Field>
                    <Field label="Employment type">
                        <select value={form.employmentType} onChange={set('employmentType')}>
                            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </Field>
                    <Field label="Vacancies">
                        <input type="number" min="1" max="10000" value={form.vacancies} onChange={set('vacancies')} />
                    </Field>
                    <Field label="Package / salary" hint="Leave empty to hide it.">
                        <input maxLength={120} value={form.package} onChange={set('package')} placeholder="Ex: Competitive" />
                    </Field>
                    <Field label="Schedule publish" hint="Optional. Pick a future date and time, then save as published. The job stays hidden until then.">
                        <input type="datetime-local" value={form.publishAt} onChange={set('publishAt')} />
                    </Field>
                    <Field label="Applications close" hint="Optional. Leave this empty when there is no closing time. Applicants see this date and time, and the job hides after it.">
                        <input type="datetime-local" value={form.closesAt} onChange={set('closesAt')} />
                    </Field>
                    <Field label="Short summary" full hint="One or two sentences shown on the job card and in search results.">
                        <input maxLength={400} value={form.summary} onChange={set('summary')} />
                    </Field>
                    <Field label="Description" full hint="Leave a blank line between paragraphs.">
                        <textarea rows={7} maxLength={8000} value={form.description} onChange={set('description')} />
                    </Field>
                    <Field label="Documents from applicants" full hint="The résumé is always required. Tick only the extra documents this role needs. Applicants are asked for these and nothing further.">
                        <ul className="adm-checks">
                            <li>
                                <label>
                                    <input type="checkbox" checked disabled />
                                    <span>CV / Résumé <small>Always required</small></span>
                                </label>
                            </li>
                            {JOB_DOCUMENTS.map((doc) => (
                                <li key={doc.key}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={form.requiredDocuments.includes(doc.key)}
                                            onChange={() => toggleDocument(doc.key)}
                                        />
                                        <span>{doc.label}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </Field>
                    <Field label="Requirements" full hint="One requirement per line.">
                        <textarea rows={5} value={form.requirements} onChange={set('requirements')} />
                    </Field>
                    <Field label="Status">
                        <select value={form.status} onChange={set('status')}>
                            {JOB_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                    </Field>
                </div>
            </fieldset>
            <ErrorNote>{error}</ErrorNote>
            {!readOnly && (
                <div className="adm-form-actions">
                    <button type="submit" className="adm-btn adm-btn--primary" disabled={busy}>
                        {busy ? <Loader size={16} className="adm-spin" aria-hidden="true" /> : <Save size={16} aria-hidden="true" />} Save
                    </button>
                    {form.status !== 'published' && (
                        <button type="button" className="adm-btn" disabled={busy} onClick={(e) => save(e, 'published')}>{scheduledForLater ? 'Schedule post' : 'Save and publish'}</button>
                    )}
                    <Link to="/admin/jobs" className="adm-btn adm-btn--ghost">Cancel</Link>
                </div>
            )}
        </form>
    );
};

const JobEditor = ({ user }) => {
    const { id } = useParams();
    const { data, error, loading } = useAdminData(id ? `/api/admin/jobs/${id}` : null);

    return (
        <>
            <p className="adm-back"><Link to="/admin/jobs"><ArrowLeft size={16} aria-hidden="true" /> All job openings</Link></p>
            <PageTitle title={id ? 'Edit job opening' : 'Post a job opening'} sub="Fields marked * are required." />
            {id ? (
                <>
                    <ErrorNote>{error}</ErrorNote>
                    {loading ? <Spinner /> : data && <JobForm key={id} id={id} user={user} initial={fromJob(data.data)} />}
                </>
            ) : (
                <JobForm user={user} initial={EMPTY} />
            )}
        </>
    );
};

export default JobEditor;
