const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const { submitApplication } = require('../controllers/applicationController');
const { asyncHandler } = require('../utils/http');

const router = express.Router();

const PDF_DOC = {
    '.pdf': ['application/pdf'],
    '.doc': ['application/msword'],
    '.docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

const WITH_IMAGES = {
    ...PDF_DOC,
    '.jpg': ['image/jpeg'],
    '.jpeg': ['image/jpeg'],
    '.png': ['image/png'],
};

const FIELDS = {
    resume: { dir: 'uploads/resumes', types: PDF_DOC },
    degreeCertificate: { dir: 'uploads/documents', types: WITH_IMAGES },
    mastersCertificate: { dir: 'uploads/documents', types: WITH_IMAGES },
    engineeringCertificate: { dir: 'uploads/documents', types: WITH_IMAGES },
    salarySlip: { dir: 'uploads/documents', types: WITH_IMAGES },
};

const storage = multer.diskStorage({
    destination: (_req, file, cb) => cb(null, FIELDS[file.fieldname]?.dir || 'uploads/documents'),
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${file.fieldname}-${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
    },
});

const fileFilter = (_req, file, cb) => {
    const spec = FIELDS[file.fieldname];
    const ext = path.extname(file.originalname).toLowerCase();
    if (spec?.types[ext]?.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Only PDF, DOC, DOCX, JPG, and PNG files are allowed'));
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024, files: 5 },
    fileFilter,
});

const submitLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 15,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, error: 'Too many applications from this connection. Please try again later.' },
});

router.post(
    '/',
    submitLimiter,
    upload.fields([
        { name: 'resume', maxCount: 1 },
        { name: 'degreeCertificate', maxCount: 1 },
        { name: 'mastersCertificate', maxCount: 1 },
        { name: 'engineeringCertificate', maxCount: 1 },
        { name: 'salarySlip', maxCount: 1 },
    ]),
    asyncHandler(submitApplication)
);

module.exports = router;
