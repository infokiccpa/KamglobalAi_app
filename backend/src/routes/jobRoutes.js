const express = require('express');
const { listPublicJobs, getPublicJob } = require('../controllers/jobController');
const { asyncHandler } = require('../utils/http');

const router = express.Router();

router.get('/', asyncHandler(listPublicJobs));
router.get('/:id', asyncHandler(getPublicJob));

module.exports = router;
