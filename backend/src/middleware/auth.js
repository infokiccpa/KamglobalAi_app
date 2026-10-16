const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

let devSecret;

const getSecret = () => {
    if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
    if (process.env.NODE_ENV === 'production') {
        throw new Error('JWT_SECRET must be set in production');
    }
    if (!devSecret) {
        devSecret = crypto.randomBytes(32).toString('hex');
        console.warn('JWT_SECRET not set: using a temporary secret. Admin sessions reset on restart.');
    }
    return devSecret;
};

const signToken = (user) =>
    jwt.sign({ sub: user._id.toString(), role: user.role }, getSecret(), {
        expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    });

const protect = async (req, res, next) => {
    try {
        const header = req.headers.authorization || '';
        const token = header.startsWith('Bearer ') ? header.slice(7) : null;
        if (!token) return res.status(401).json({ success: false, error: 'Please sign in' });

        const payload = jwt.verify(token, getSecret());
        const user = await User.findById(payload.sub);
        if (!user || !user.active) {
            return res.status(401).json({ success: false, error: 'Account is not active' });
        }
        if (user.passwordChangedAt && payload.iat * 1000 < user.passwordChangedAt.getTime() - 1000) {
            return res.status(401).json({ success: false, error: 'Session expired, please sign in again' });
        }
        req.user = user;
        next();
    } catch {
        res.status(401).json({ success: false, error: 'Session expired, please sign in again' });
    }
};

const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, error: 'You do not have permission for this action' });
    }
    next();
};

module.exports = { protect, authorize, signToken, getSecret };
