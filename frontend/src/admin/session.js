import { useSyncExternalStore } from 'react';
import { request } from '../lib/api';

const KEY = 'kam-admin-session';
const listeners = new Set();

const read = () => {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || null;
    } catch {
        return null;
    }
};

let session = read();

const emit = () => listeners.forEach((fn) => fn());

export const saveSession = (next) => {
    session = next;
    if (next) localStorage.setItem(KEY, JSON.stringify(next));
    else localStorage.removeItem(KEY);
    emit();
};

export const clearSession = () => saveSession(null);

const subscribe = (fn) => {
    listeners.add(fn);
    const onStorage = (e) => {
        if (e.key === KEY) {
            session = read();
            fn();
        }
    };
    window.addEventListener('storage', onStorage);
    return () => {
        listeners.delete(fn);
        window.removeEventListener('storage', onStorage);
    };
};

export const useSession = () => useSyncExternalStore(subscribe, () => session, () => null);

export const ROLE_LABELS = {
    super_admin: 'Super Admin',
    admin: 'Admin',
    hr: 'HR',
    recruiter: 'Recruiter',
    department_manager: 'Department Manager',
    sales: 'Sales',
    marketing: 'Marketing',
    viewer: 'Viewer',
};

const ACCESS = {
    super_admin: { jobs: 'write', applications: 'write', enquiries: 'write', resources: 'write', users: true },
    admin: { jobs: 'write', applications: 'write', enquiries: 'write', resources: 'write', users: false },
    hr: { jobs: 'write', applications: 'write', enquiries: 'read', resources: 'none', users: false },
    recruiter: { jobs: 'write', applications: 'write', enquiries: 'write', resources: 'none', users: false },
    department_manager: { jobs: 'read', applications: 'read', enquiries: 'read', resources: 'read', users: false },
    sales: { jobs: 'read', applications: 'none', enquiries: 'write', resources: 'none', users: false },
    marketing: { jobs: 'read', applications: 'none', enquiries: 'read', resources: 'write', users: false },
    viewer: { jobs: 'read', applications: 'read', enquiries: 'read', resources: 'read', users: false },
};

export const can = (user, area, level = 'read') => {
    const value = ACCESS[user?.role]?.[area];
    if (!value || value === 'none' || value === false) return false;
    if (level === 'write') return value === 'write' || value === true;
    return true;
};

export const canEdit = (user) => can(user, 'jobs', 'write');
export const isSuperAdmin = (user) => user?.role === 'super_admin';

export const adminRequest = async (path, opts = {}) => {
    try {
        return await request(path, { ...opts, token: session?.token });
    } catch (err) {
        if (err.status === 401 && session) clearSession();
        throw err;
    }
};

export const downloadFile = async (path, fallbackName) => {
    const res = await adminRequest(path, { raw: true });
    const blob = await res.blob();
    const disposition = res.headers.get('content-disposition') || '';
    const match = disposition.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
    const name = match ? decodeURIComponent(match[1]) : fallbackName;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
};
