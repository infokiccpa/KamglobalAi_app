const User = require('../models/User');
const { signToken } = require('../middleware/auth');

const MIN_PASSWORD = 10;

const validPassword = (password) =>
    typeof password === 'string' && password.length >= MIN_PASSWORD && /[A-Za-z]/.test(password) && /\d/.test(password);

const PASSWORD_RULE = `Password must be at least ${MIN_PASSWORD} characters and include letters and numbers`;

// @route   POST /api/auth/login
const login = async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email and password are required' });
    }
    const user = await User.findOne({ email: String(email).toLowerCase().trim() }).select('+passwordHash');
    const ok = user && user.active && (await user.checkPassword(String(password)));
    if (!ok) {
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }
    user.lastLoginAt = new Date();
    await user.save();
    res.json({ success: true, token: signToken(user), user });
};

// @route   GET /api/auth/me
const me = (req, res) => res.json({ success: true, user: req.user });

// @route   PUT /api/auth/password
const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body || {};
    const user = await User.findById(req.user._id).select('+passwordHash');
    if (!(await user.checkPassword(String(currentPassword || '')))) {
        return res.status(400).json({ success: false, error: 'Current password is incorrect' });
    }
    if (!validPassword(newPassword)) {
        return res.status(400).json({ success: false, error: PASSWORD_RULE });
    }
    await user.setPassword(newPassword);
    await user.save();
    res.json({ success: true, token: signToken(user), message: 'Password updated' });
};

module.exports = { login, me, changePassword, validPassword, PASSWORD_RULE };
