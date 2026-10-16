const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const { MongoMemoryServer } = require('mongodb-memory-server');

const PORT = 5099;
const BASE = `http://127.0.0.1:${PORT}`;
const ADMIN = { email: 'admin@test.local', password: 'SuperSecret123' };

let mongo;
let server;
let workdir;
const ctx = {};

const api = async (method, url, { token, body, form } = {}) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    let payload;
    if (form) payload = form;
    else if (body !== undefined) {
        headers['Content-Type'] = 'application/json';
        payload = JSON.stringify(body);
    }
    const res = await fetch(BASE + url, { method, headers, body: payload });
    const type = res.headers.get('content-type') || '';
    const data = type.includes('json') ? await res.json() : await res.text();
    return { status: res.status, data, headers: res.headers };
};

const waitForServer = async () => {
    for (let i = 0; i < 100; i += 1) {
        try {
            const res = await fetch(`${BASE}/api/health`);
            if (res.ok) {
                const login = await api('POST', '/api/auth/login', { body: ADMIN });
                if (login.status === 200) return;
            }
        } catch {
            // server not up yet
        }
        await new Promise((r) => setTimeout(r, 200));
    }
    throw new Error('Server did not start');
};

const resumeForm = (fields) => {
    const form = new FormData();
    Object.entries(fields).forEach(([k, v]) => form.append(k, v));
    form.append('resume', new Blob(['%PDF-1.4 test resume'], { type: 'application/pdf' }), 'cv.pdf');
    form.append('degreeCertificate', new Blob(['%PDF-1.4 degree'], { type: 'application/pdf' }), 'degree.pdf');
    return form;
};

const applicant = {
    firstName: 'Asha',
    middleName: 'K',
    lastName: 'Rao',
    email: 'asha@example.com',
    phone: '9876543210',
    countryCode: '+91',
    dateOfBirth: '1998-04-12',
    gender: 'Female',
    country: 'India',
    state: 'Tamil Nadu',
    city: 'Chennai',
    qualification: "Bachelor's Degree",
    fieldOfStudy: 'Computer Science / Information Technology',
    candidateType: 'Fresher',
    experience: 'Fresher (0 years)',
    position: 'General application',
    consent: 'true',
};

before(async () => {
    mongo = await MongoMemoryServer.create({ instance: { launchTimeout: 60000 } });
    workdir = fs.mkdtempSync(path.join(os.tmpdir(), 'kam-api-'));
    server = spawn(process.execPath, [path.resolve(__dirname, '../src/index.js')], {
        cwd: workdir,
        env: {
            ...process.env,
            PORT: String(PORT),
            NODE_ENV: 'test',
            MONGODB_URI: mongo.getUri('kamtest'),
            JWT_SECRET: 'test-secret-for-api-tests-only',
            ADMIN_EMAIL: ADMIN.email,
            ADMIN_PASSWORD: ADMIN.password,
            ADMIN_NAME: 'Test Admin',
            EMAIL_USER: '',
            EMAIL_PASS: '',
        },
        stdio: ['ignore', 'pipe', 'pipe'],
    });
    server.stderr.on('data', (d) => process.stderr.write(d));
    await waitForServer();
});

after(async () => {
    server?.kill();
    await mongo?.stop();
    if (workdir) fs.rmSync(workdir, { recursive: true, force: true });
});

test('admin routes require a token', async () => {
    const res = await api('GET', '/api/admin/applications');
    assert.equal(res.status, 401);
    const bad = await api('GET', '/api/admin/applications', { token: 'nope' });
    assert.equal(bad.status, 401);
});

test('login rejects wrong password and accepts the seeded super admin', async () => {
    const wrong = await api('POST', '/api/auth/login', { body: { email: ADMIN.email, password: 'wrong-password-1' } });
    assert.equal(wrong.status, 401);
    const ok = await api('POST', '/api/auth/login', { body: ADMIN });
    assert.equal(ok.status, 200);
    assert.ok(ok.data.token);
    assert.equal(ok.data.user.role, 'super_admin');
    assert.equal(ok.data.user.passwordHash, undefined);
    ctx.admin = ok.data.token;
    const me = await api('GET', '/api/auth/me', { token: ctx.admin });
    assert.equal(me.status, 200);
    assert.equal(me.data.user.email, ADMIN.email);
});

test('super admin creates recruiter and viewer users', async () => {
    const weak = await api('POST', '/api/admin/users', {
        token: ctx.admin,
        body: { name: 'Weak', email: 'weak@test.local', password: 'short', role: 'viewer' },
    });
    assert.equal(weak.status, 400);

    for (const role of ['recruiter', 'viewer']) {
        const created = await api('POST', '/api/admin/users', {
            token: ctx.admin,
            body: { name: `Test ${role}`, email: `${role}@test.local`, password: 'Password12345', role },
        });
        assert.equal(created.status, 201, JSON.stringify(created.data));
        const login = await api('POST', '/api/auth/login', { body: { email: `${role}@test.local`, password: 'Password12345' } });
        assert.equal(login.status, 200);
        ctx[role] = login.data.token;
    }
    const list = await api('GET', '/api/admin/users', { token: ctx.admin });
    assert.equal(list.data.data.length, 3);
    const forbidden = await api('GET', '/api/admin/users', { token: ctx.recruiter });
    assert.equal(forbidden.status, 403);
});

test('recruiter posts jobs; only published ones are public', async () => {
    const published = await api('POST', '/api/admin/jobs', {
        token: ctx.recruiter,
        body: {
            board: 'hr',
            title: 'Payroll Executive',
            category: 'Finance',
            location: 'Dubai',
            experience: '2-4 years',
            employmentType: 'Full-time',
            summary: 'Run monthly payroll.',
            requirements: 'Payroll experience\nExcel',
            status: 'published',
        },
    });
    assert.equal(published.status, 201, JSON.stringify(published.data));
    assert.deepEqual(published.data.data.requirements, ['Payroll experience', 'Excel']);
    assert.ok(published.data.data.publishedAt);
    ctx.jobId = published.data.data._id;

    const draft = await api('POST', '/api/admin/jobs', {
        token: ctx.recruiter,
        body: { board: 'careers', title: 'React Developer', location: 'Remote', status: 'draft' },
    });
    assert.equal(draft.status, 201, JSON.stringify(draft.data));
    ctx.draftId = draft.data.data._id;

    const viewerPost = await api('POST', '/api/admin/jobs', { token: ctx.viewer, body: { title: 'X', location: 'Y' } });
    assert.equal(viewerPost.status, 403);

    const hr = await api('GET', '/api/jobs?board=hr');
    assert.equal(hr.data.data.length, 1);
    assert.equal(hr.data.data[0].createdBy, undefined);
    const later = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const scheduled = await api('POST', '/api/admin/jobs', {
        token: ctx.recruiter,
        body: { board: 'careers', title: 'Scheduled Analyst', location: 'Hyderabad', status: 'published', publishAt: later },
    });
    assert.equal(scheduled.status, 201, JSON.stringify(scheduled.data));
    const hidden = await api('GET', `/api/jobs/${scheduled.data.data._id}`);
    assert.equal(hidden.status, 404);

    const withDocs = await api('POST', '/api/admin/jobs', {
        token: ctx.recruiter,
        body: {
            board: 'hr',
            title: 'Document Controlled Role',
            location: 'Chennai',
            status: 'published',
            requiredDocuments: ['salary', 'salary', 'passport'],
        },
    });
    assert.equal(withDocs.status, 201, JSON.stringify(withDocs.data));
    assert.deepEqual(withDocs.data.data.requiredDocuments, ['salary']);
    ctx.docJobId = withDocs.data.data._id;

    const careers = await api('GET', '/api/jobs?board=careers');
    assert.equal(careers.data.data.length, 0);
    const draftPublic = await api('GET', `/api/jobs/${ctx.draftId}`);
    assert.equal(draftPublic.status, 404);
    const one = await api('GET', `/api/jobs/${ctx.jobId}`);
    assert.equal(one.status, 200);
});

test('candidate applies to a job with a resume', async () => {
    const noResume = await api('POST', '/api/applications', { form: (() => { const f = new FormData(); f.append('firstName', 'A'); return f; })() });
    assert.equal(noResume.status, 400);

    const toDraft = await api('POST', '/api/applications', { form: resumeForm({ ...applicant, jobId: ctx.draftId }) });
    assert.equal(toDraft.status, 400);

    const missingSlip = await api('POST', '/api/applications', { form: resumeForm({ ...applicant, email: 'docs@example.com', jobId: ctx.docJobId }) });
    assert.equal(missingSlip.status, 400);

    const ok = await api('POST', '/api/applications', { form: resumeForm({ ...applicant, jobId: ctx.jobId }) });
    assert.equal(ok.status, 201, JSON.stringify(ok.data));
    assert.match(ok.data.reference, /^KGA-\d{8}-[A-F0-9]{6}$/);

    const general = await api('POST', '/api/applications', {
        form: resumeForm({ ...applicant, email: 'second@example.com', firstName: '<script>x</script>' }),
    });
    assert.equal(general.status, 201, JSON.stringify(general.data));

    const bot = await api('POST', '/api/applications', { form: resumeForm({ ...applicant, website: 'spam.example' }) });
    assert.equal(bot.status, 201);

    const exe = new FormData();
    Object.entries(applicant).forEach(([k, v]) => exe.append(k, v));
    exe.append('resume', new Blob(['MZ'], { type: 'application/octet-stream' }), 'cv.exe');
    const badFile = await api('POST', '/api/applications', { form: exe });
    assert.equal(badFile.status, 400);
});

test('resumes are not publicly served', async () => {
    const res = await api('GET', '/uploads/resumes/');
    assert.notEqual(res.status, 200);
});

test('admin reviews applications: list, filter, status, notes, resume, CSV', async () => {
    const list = await api('GET', '/api/admin/applications', { token: ctx.viewer });
    assert.equal(list.status, 200);
    assert.equal(list.data.total, 2);
    assert.equal(list.data.data[0].resumePath, undefined);

    const forJob = await api('GET', `/api/admin/applications?job=${ctx.jobId}`, { token: ctx.viewer });
    assert.equal(forJob.data.total, 1);
    const app = forJob.data.data[0];
    assert.equal(app.position, 'Payroll Executive (Dubai)');
    assert.equal(app.board, 'hr');

    const viewerEdit = await api('PATCH', `/api/admin/applications/${app._id}`, { token: ctx.viewer, body: { status: 'reviewed' } });
    assert.equal(viewerEdit.status, 403);

    const updated = await api('PATCH', `/api/admin/applications/${app._id}`, {
        token: ctx.recruiter,
        body: { status: 'shortlisted', note: 'Strong payroll background' },
    });
    assert.equal(updated.status, 200);
    assert.equal(updated.data.data.status, 'shortlisted');
    assert.equal(updated.data.data.notes.length, 2);

    const resume = await fetch(`${BASE}/api/admin/applications/${app._id}/resume`, {
        headers: { Authorization: `Bearer ${ctx.viewer}` },
    });
    assert.equal(resume.status, 200);
    assert.match(await resume.text(), /%PDF/);

    const csv = await api('GET', '/api/admin/applications/export', { token: ctx.recruiter });
    assert.equal(csv.status, 200);
    assert.match(csv.data, /Payroll Executive \(Dubai\)/);

    const jobs = await api('GET', '/api/admin/jobs', { token: ctx.viewer });
    const job = jobs.data.data.find((j) => j._id === ctx.jobId);
    assert.equal(job.applications, 1);

    const del = await api('DELETE', `/api/admin/jobs/${ctx.jobId}`, { token: ctx.recruiter });
    assert.equal(del.status, 400);

    const stats = await api('GET', '/api/admin/stats', { token: ctx.viewer });
    assert.equal(stats.status, 200);
});

test('closing a job removes it from the public site', async () => {
    const closed = await api('PUT', `/api/admin/jobs/${ctx.jobId}`, { token: ctx.recruiter, body: { status: 'closed' } });
    assert.equal(closed.status, 200);
    const hr = await api('GET', '/api/jobs?board=hr');
    assert.equal(hr.data.data.some((job) => job._id === ctx.jobId), false);
    assert.equal(hr.data.data.some((job) => job._id === ctx.docJobId), true);
});

test('super admin can deactivate a user, which blocks their token', async () => {
    const users = await api('GET', '/api/admin/users', { token: ctx.admin });
    const viewer = users.data.data.find((u) => u.role === 'viewer');
    const off = await api('PATCH', `/api/admin/users/${viewer._id}`, { token: ctx.admin, body: { active: false } });
    assert.equal(off.status, 200);
    const blocked = await api('GET', '/api/admin/stats', { token: ctx.viewer });
    assert.equal(blocked.status, 401);

    const admin = users.data.data.find((u) => u.role === 'super_admin');
    const selfDemote = await api('PATCH', `/api/admin/users/${admin._id}`, { token: ctx.admin, body: { role: 'viewer' } });
    assert.equal(selfDemote.status, 400);
});

test('enquiries are listed for admins', async () => {
    const res = await api('GET', '/api/admin/enquiries', { token: ctx.admin });
    assert.equal(res.status, 200);
});
