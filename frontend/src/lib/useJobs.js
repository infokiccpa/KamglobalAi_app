import { useEffect, useState } from 'react';
import { request, toJobCard } from './api';

/*
 * status: 'loading' | 'ready' (from the API, possibly empty) | 'offline' (API unreachable, fallback shown)
 */
export const useJobs = (board, fallback = []) => {
    const [state, setState] = useState({ status: 'loading', jobs: [] });

    useEffect(() => {
        const ctrl = new AbortController();
        request(`/api/jobs?board=${board}`, { signal: ctrl.signal })
            .then((res) => setState({ status: 'ready', jobs: res.data.map(toJobCard) }))
            .catch((err) => {
                if (err.name !== 'AbortError') setState({ status: 'offline', jobs: fallback });
            });
        return () => ctrl.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board]);

    return state;
};

/*
 * status: 'loading' | 'ready' | 'missing' (closed or unknown) | 'offline'
 */
export const useJob = (id, fallback) => {
    const [state, setState] = useState({ status: id ? 'loading' : 'missing', job: null, id });

    useEffect(() => {
        if (!id) return undefined;
        const ctrl = new AbortController();
        request(`/api/jobs/${encodeURIComponent(id)}`, { signal: ctrl.signal })
            .then((res) => setState({ status: 'ready', job: toJobCard(res.data), id }))
            .catch((err) => {
                if (err.name === 'AbortError') return;
                if (err.status === 404) setState({ status: 'missing', job: null, id });
                else {
                    const local = fallback?.(id) || null;
                    setState({ status: local ? 'offline' : 'missing', job: local, id });
                }
            });
        return () => ctrl.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return state.id === id ? state : { status: id ? 'loading' : 'missing', job: null, id };
};
