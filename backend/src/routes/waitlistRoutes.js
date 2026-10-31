const express = require('express');
const rateLimit = require('express-rate-limit');
const { joinWaitlist } = require('../controllers/waitlistController');

const router = express.Router();

const waitlistLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 8,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, error: 'Too many requests from this connection. Please try again later.' },
});

router.post('/', waitlistLimiter, joinWaitlist);

module.exports = router;
