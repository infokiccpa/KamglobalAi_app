export const formatDate = (value, withTime) =>
    value
        ? new Date(value).toLocaleString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
        })
        : '–';

export const APP_STATUSES = [
    { value: 'pending', label: 'New' },
    { value: 'reviewed', label: 'Reviewed' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'interview', label: 'Interview' },
    { value: 'hired', label: 'Hired' },
    { value: 'rejected', label: 'Rejected' },
];

export const appStatusLabel = (value) => APP_STATUSES.find((s) => s.value === value)?.label || value;

export const JOB_STATUSES = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'closed', label: 'Closed' },
];

export const BOARDS = [
    { value: 'hr', label: 'HR & Workforce jobs (/hr/jobs)' },
    { value: 'careers', label: 'KAM Global AI careers (/careers)' },
];

export const boardLabel = (value) => (value === 'hr' ? 'HR & Workforce' : 'Careers');

export const isScheduled = (job) => Boolean(job?.status === 'published' && job.publishAt && new Date(job.publishAt) > new Date());

export const jobStatusLabel = (job) => (isScheduled(job) ? 'Scheduled' : JOB_STATUSES.find((s) => s.value === job?.status)?.label || job?.status);

export const ENQUIRY_STATUSES = [
    { value: 'new', label: 'New' },
    { value: 'read', label: 'Read' },
    { value: 'replied', label: 'Replied' },
];

export const toQuery = (params) => {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v !== '' && v !== undefined && v !== null) q.set(k, v);
    });
    const s = q.toString();
    return s ? `?${s}` : '';
};
