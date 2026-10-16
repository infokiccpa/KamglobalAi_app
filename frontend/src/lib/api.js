const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const apiUrl = (path) => `${BASE}${path}`;

export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

export const request = async (path, { token, body, method, signal, raw } = {}) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    let payload = body;
    if (body && !(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
        payload = JSON.stringify(body);
    }
    let res;
    try {
        res = await fetch(apiUrl(path), { method: method || (body ? 'POST' : 'GET'), headers, body: payload, signal });
    } catch (err) {
        if (err.name === 'AbortError') throw err;
        throw new ApiError('Cannot reach the server. Check your connection and try again.', 0);
    }
    if (raw && res.ok) return res;
    const isJson = (res.headers.get('content-type') || '').includes('application/json');
    const data = isJson ? await res.json().catch(() => null) : null;
    if (!res.ok || !isJson) {
        throw new ApiError(data?.error || (isJson ? 'Something went wrong. Please try again.' : 'The server is not available right now.'), res.status);
    }
    return data;
};

export const applyPath = (job) => `/apply-now?job=${encodeURIComponent(job.id)}`;

export const toJobCard = (j) => ({
    id: j._id,
    board: j.board,
    title: j.title,
    category: j.category || j.department || 'General',
    department: j.department,
    location: j.location,
    country: j.country,
    experience: j.experience,
    type: j.employmentType,
    vacancies: j.vacancies,
    pkg: j.package,
    posted: j.publishedAt || '',
    closesAt: j.closesAt,
    summary: j.summary,
    description: j.description,
    requirements: j.requirements || [],
    requiredDocuments: Array.isArray(j.requiredDocuments) ? j.requiredDocuments : null,
    applyTo: applyPath({ id: j._id }),
});
