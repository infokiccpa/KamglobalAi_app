const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    submitApplication,
    getApplications,
    getApplication,
    updateApplicationStatus
} = require('../controllers/applicationController');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/resumes/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only PDF, DOC, and DOCX files
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype) ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only PDF, DOC, and DOCX files are allowed!'));
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

// Public routes
router.post('/', upload.single('resume'), submitApplication);

// Admin routes (should be protected with authentication middleware in production)
router.get('/', getApplications);
router.get('/:id', getApplication);
router.put('/:id', updateApplicationStatus);

module.exports = router;
