const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { protect, authorize } = require('../middleware/auth');
const { asyncHandler } = require('../utils/http');
const { rolesWith } = require('../permissions');
const users = require('../controllers/userController');
const jobs = require('../controllers/jobController');
const apps = require('../controllers/applicationController');
const admin = require('../controllers/adminController');
const resources = require('../controllers/resourceController');
const content = require('../controllers/contentController');

const router = express.Router();

const JOBS_READ = rolesWith('jobs');
const JOBS_WRITE = rolesWith('jobs', 'write');
const APPS_READ = rolesWith('applications');
const APPS_WRITE = rolesWith('applications', 'write');
const ENQ_READ = rolesWith('enquiries');
const ENQ_WRITE = rolesWith('enquiries', 'write');
const RES_READ = rolesWith('resources');
const RES_WRITE = rolesWith('resources', 'write');

const resourceUpload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, 'uploads/resources'),
        filename: (_req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            cb(null, `resource-${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
        },
    }),
    limits: { fileSize: 8 * 1024 * 1024, files: 1 },
    fileFilter: (_req, file, cb) => {
        const ok = ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg', '.webp'].includes(path.extname(file.originalname).toLowerCase());
        cb(ok ? null : new Error('Only PDF, Word, PNG, JPG, and WebP files are allowed'), ok);
    },
});

router.use(protect);

router.get('/stats', authorize(...JOBS_READ), asyncHandler(admin.getStats));

router.get('/jobs', authorize(...JOBS_READ), asyncHandler(jobs.listJobs));
router.get('/jobs/:id', authorize(...JOBS_READ), asyncHandler(jobs.getJob));
router.post('/jobs', authorize(...JOBS_WRITE), asyncHandler(jobs.createJob));
router.put('/jobs/:id', authorize(...JOBS_WRITE), asyncHandler(jobs.updateJob));
router.delete('/jobs/:id', authorize(...JOBS_WRITE), asyncHandler(jobs.deleteJob));

router.get('/applications', authorize(...APPS_READ), asyncHandler(apps.getApplications));
router.get('/applications/export', authorize(...APPS_WRITE), asyncHandler(apps.exportApplications));
router.get('/applications/:id', authorize(...APPS_READ), asyncHandler(apps.getApplication));
router.get('/applications/:id/resume', authorize(...APPS_READ), asyncHandler(apps.downloadResume));
router.get('/applications/:id/files/:kind', authorize(...APPS_READ), asyncHandler(apps.downloadDocument));
router.patch('/applications/:id', authorize(...APPS_WRITE), asyncHandler(apps.updateApplication));

router.get('/enquiries', authorize(...ENQ_READ), asyncHandler(admin.listEnquiries));
router.patch('/enquiries/:id', authorize(...ENQ_WRITE), asyncHandler(admin.updateEnquiry));

router.get('/resources', authorize(...RES_READ), asyncHandler(resources.listAdmin));
router.post('/resources', authorize(...RES_WRITE), resourceUpload.single('file'), asyncHandler(resources.createResource));
router.patch('/resources/:id', authorize(...RES_WRITE), resourceUpload.single('file'), asyncHandler(resources.updateResource));
router.delete('/resources/:id', authorize(...RES_WRITE), asyncHandler(resources.deleteResource));

router.get('/posts', authorize(...RES_READ), asyncHandler(content.listPosts));
router.post('/posts', authorize(...RES_WRITE), asyncHandler(content.savePost));
router.put('/posts/:id', authorize(...RES_WRITE), asyncHandler(content.savePost));
router.delete('/posts/:id', authorize(...RES_WRITE), asyncHandler(content.deletePost));

router.get('/ads', authorize(...RES_READ), asyncHandler(content.listAds));
router.post('/ads', authorize(...RES_WRITE), asyncHandler(content.saveAd));
router.put('/ads/:id', authorize(...RES_WRITE), asyncHandler(content.saveAd));
router.delete('/ads/:id', authorize(...RES_WRITE), asyncHandler(content.deleteAd));

router.get('/users', authorize('super_admin'), asyncHandler(users.listUsers));
router.post('/users', authorize('super_admin'), asyncHandler(users.createUser));
router.patch('/users/:id', authorize('super_admin'), asyncHandler(users.updateUser));
router.delete('/users/:id', authorize('super_admin'), asyncHandler(users.deleteUser));

module.exports = router;
