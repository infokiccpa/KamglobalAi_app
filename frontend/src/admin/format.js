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
    { value: 'hr', label: 'HR & Workforce jobs (shown on Careers)' },
    { value: 'careers', label: 'KAM Global AI careers (/careers)' },
];

export const SERVICE_LINES = [
    { value: 'it-technology', label: 'IT & Technology' },
    { value: 'ai-media-creative', label: 'AI Media & Creative' },
    { value: 'business-outsourcing', label: 'Business Outsourcing' },
    { value: 'hr-solutions', label: 'HR Solutions' },
    { value: 'edtech', label: 'EdTech' },
];

const LEGACY_SERVICE = {
    technology: 'it-technology',
    operations: 'business-outsourcing',
    hr: 'hr-solutions',
};

export const canonicalService = (value) => LEGACY_SERVICE[value] || value || '';

export const serviceLineLabel = (value) => SERVICE_LINES.find((s) => s.value === canonicalService(value))?.label || '';

export const INTERVIEW_ROUNDS = [
    { value: 'screening', label: 'Screening call' },
    { value: 'interview', label: 'Interview' },
    { value: 'final', label: 'Final discussion' },
];

export const INTERVIEW_MODES = [
    { value: 'phone', label: 'Phone' },
    { value: 'video', label: 'Video' },
    { value: 'in_person', label: 'In person' },
];

export const INTERVIEW_OUTCOMES = [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'completed', label: 'Completed' },
    { value: 'no_show', label: 'No show' },
    { value: 'selected', label: 'Selected' },
    { value: 'not_selected', label: 'Not selected' },
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
