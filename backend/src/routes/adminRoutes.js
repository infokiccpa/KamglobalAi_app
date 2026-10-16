const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { asyncHandler } = require('../utils/http');
const users = require('../controllers/userController');
const jobs = require('../controllers/jobController');
const apps = require('../controllers/applicationController');
const admin = require('../controllers/adminController');

const router = express.Router();

const ALL = ['super_admin', 'recruiter', 'viewer'];
const EDITORS = ['super_admin', 'recruiter'];

router.use(protect);

router.get('/stats', authorize(...ALL), asyncHandler(admin.getStats));

router.get('/jobs', authorize(...ALL), asyncHandler(jobs.listJobs));
router.get('/jobs/:id', authorize(...ALL), asyncHandler(jobs.getJob));
router.post('/jobs', authorize(...EDITORS), asyncHandler(jobs.createJob));
router.put('/jobs/:id', authorize(...EDITORS), asyncHandler(jobs.updateJob));
router.delete('/jobs/:id', authorize(...EDITORS), asyncHandler(jobs.deleteJob));

router.get('/applications', authorize(...ALL), asyncHandler(apps.getApplications));
router.get('/applications/export', authorize(...EDITORS), asyncHandler(apps.exportApplications));
router.get('/applications/:id', authorize(...ALL), asyncHandler(apps.getApplication));
router.get('/applications/:id/resume', authorize(...ALL), asyncHandler(apps.downloadResume));
router.get('/applications/:id/files/:kind', authorize(...ALL), asyncHandler(apps.downloadDocument));
router.patch('/applications/:id', authorize(...EDITORS), asyncHandler(apps.updateApplication));

router.get('/enquiries', authorize(...ALL), asyncHandler(admin.listEnquiries));
router.patch('/enquiries/:id', authorize(...EDITORS), asyncHandler(admin.updateEnquiry));

router.get('/users', authorize('super_admin'), asyncHandler(users.listUsers));
router.post('/users', authorize('super_admin'), asyncHandler(users.createUser));
router.patch('/users/:id', authorize('super_admin'), asyncHandler(users.updateUser));
router.delete('/users/:id', authorize('super_admin'), asyncHandler(users.deleteUser));

module.exports = router;
