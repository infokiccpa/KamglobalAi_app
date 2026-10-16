import React from 'react';
import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppShell } from './App.jsx';

/** Renders one route to HTML (waiting for lazy pages) and returns the markup plus Helmet head tags. */
export function render(url) {
    const helmetContext = {};
    return new Promise((resolve, reject) => {
        let failed = null;
        const { pipe } = renderToPipeableStream(
            <React.StrictMode>
                <HelmetProvider context={helmetContext}>
                    <StaticRouter location={url}>
                        <AppShell />
                    </StaticRouter>
                </HelmetProvider>
            </React.StrictMode>,
            {
                onAllReady() {
                    const stream = new PassThrough();
                    let html = '';
                    stream.on('data', (chunk) => { html += chunk; });
                    stream.on('end', () => (failed ? reject(failed) : resolve({ html, helmet: helmetContext.helmet })));
                    pipe(stream);
                },
                onShellError: reject,
                onError(err) {
                    failed = err;
                },
            },
        );
    });
}
