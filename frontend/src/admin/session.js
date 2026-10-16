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

export const ROLE_LABELS = { super_admin: 'Super Admin', recruiter: 'Recruiter / HR', viewer: 'Viewer' };

export const canEdit = (user) => user?.role === 'super_admin' || user?.role === 'recruiter';
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
