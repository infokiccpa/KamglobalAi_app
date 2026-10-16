// Pre-renders every route in public/sitemap.xml into dist/<route>/index.html so crawlers
// (search engines and AI assistants) receive full HTML. Run after `vite build` and the SSR build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'public', 'sitemap.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1] || '/');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const stripDefaults = (html) =>
    html
        .replace(/<title>[\s\S]*?<\/title>\s*/, '')
        .replace(/<meta name="description"[^>]*>\s*/, '');

let ok = 0;
const failures = [];
for (const route of routes) {
    try {
        const { html, helmet } = await render(route);
        const head = helmet
            ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((t) => t.toString()).join('\n    ')
            : '';
        const page = stripDefaults(template)
            .replace('</head>', `    ${head}\n  </head>`)
            .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
        const outDir = route === '/' ? dist : path.join(dist, route);
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), page);
        // Hosts differ in how they resolve "/services": as services/index.html or services.html. Write both.
        if (route !== '/') fs.writeFileSync(`${outDir}.html`, page);
        ok += 1;
    } catch (err) {
        failures.push(`${route}: ${err?.message || err}`);
    }
}

try {
    const { html, helmet } = await render('/__not-found__');
    const head = helmet ? [helmet.title, helmet.meta].map((t) => t.toString()).join('\n    ') : '';
    const page = stripDefaults(template)
        .replace('</head>', `    ${head}\n    <meta name="robots" content="noindex" />\n  </head>`)
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    fs.writeFileSync(path.join(dist, '404.html'), page);
} catch (err) {
    failures.push(`404 page: ${err?.message || err}`);
}

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Pre-rendered ${ok}/${routes.length} routes.`);
if (failures.length) {
    console.error(`Failed routes (served as client-rendered pages):\n  ${failures.join('\n  ')}`);
    process.exitCode = 1;
}
