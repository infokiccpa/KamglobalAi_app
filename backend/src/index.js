require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { getSecret } = require('./middleware/auth');
const { ensureSuperAdmin } = require('./seed');

getSecret();
fs.mkdirSync('uploads/resumes', { recursive: true });
fs.mkdirSync('uploads/documents', { recursive: true });

const app = express();

connectDB()
    .then(ensureSuperAdmin)
    .catch((err) => console.error('Admin seed failed:', err.message));

app.set('trust proxy', Number(process.env.TRUST_PROXY || 0));
app.disable('x-powered-by');

const origins = (process.env.CORS_ORIGIN || '').split(',').map((o) => o.trim()).filter(Boolean);
app.use(cors({ ...(origins.length ? { origin: origins } : {}), exposedHeaders: ['Content-Disposition'] }));
app.use(express.json({ limit: '200kb' }));
app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Resumes are private and only downloadable through the authenticated admin API.

app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/waitlist', require('./routes/waitlistRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.get('/', (req, res) => {
    res.send('KamGlobal AI API is running...');
});

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Backend is healthy and reachable'
    });
});

app.use('/api', (_req, res) => {
    res.status(404).json({ success: false, error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    if (err?.name === 'MulterError' || /Only PDF|files are allowed/.test(err?.message)) {
        const message = err.code === 'LIMIT_FILE_SIZE' ? 'Each file must be 5 MB or smaller' : err.message;
        return res.status(400).json({ success: false, error: message });
    }
    if (err?.name === 'ValidationError' || err?.name === 'CastError') {
        return res.status(400).json({ success: false, error: err.message });
    }
    console.error(err);
    res.status(500).json({ success: false, error: 'Something went wrong. Please try again.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
