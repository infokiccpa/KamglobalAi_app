import { useCallback, useEffect, useState } from 'react';
import { adminRequest } from './session';

export const useAdminData = (path) => {
    const [state, setState] = useState({ path: null, data: null, error: '' });
    const [version, setVersion] = useState(0);

    useEffect(() => {
        if (!path) return undefined;
        const ctrl = new AbortController();
        adminRequest(path, { signal: ctrl.signal })
            .then((res) => setState({ path, data: res, error: '' }))
            .catch((err) => {
                if (err.name !== 'AbortError') setState({ path, data: null, error: err.message });
            });
        return () => ctrl.abort();
    }, [path, version]);

    const reload = useCallback(() => setVersion((v) => v + 1), []);
    const fresh = state.path === path;

    return {
        data: fresh ? state.data : null,
        error: fresh ? state.error : '',
        loading: !fresh,
        stale: state.data,
        reload,
    };
};
