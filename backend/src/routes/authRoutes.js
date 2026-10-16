const express = require('express');
const rateLimit = require('express-rate-limit');
const { login, me, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { asyncHandler } = require('../utils/http');

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: { success: false, error: 'Too many sign-in attempts. Please wait 15 minutes and try again.' },
});

router.post('/login', loginLimiter, asyncHandler(login));
router.get('/me', protect, me);
router.put('/password', protect, asyncHandler(changePassword));

module.exports = router;
