const User = require('../models/User');
const { ROLES } = require('../models/User');
const { validPassword, PASSWORD_RULE } = require('./authController');

const activeSuperAdmins = (excludeId) =>
    User.countDocuments({ role: 'super_admin', active: true, _id: { $ne: excludeId } });

// @route   GET /api/admin/users
const listUsers = async (_req, res) => {
    const users = await User.find().sort({ createdAt: 1 });
    res.json({ success: true, data: users });
};

// @route   POST /api/admin/users
const createUser = async (req, res) => {
    const { name, email, role, password } = req.body || {};
    if (!ROLES.includes(role)) return res.status(400).json({ success: false, error: 'Choose a valid role' });
    if (!validPassword(password)) return res.status(400).json({ success: false, error: PASSWORD_RULE });
    const exists = await User.exists({ email: String(email || '').toLowerCase().trim() });
    if (exists) return res.status(409).json({ success: false, error: 'A user with this email already exists' });

    const user = new User({ name, email, role });
    await user.setPassword(password);
    await user.save();
    res.status(201).json({ success: true, data: user });
};

// @route   PATCH /api/admin/users/:id
const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    const { name, role, active, password } = req.body || {};
    const isSelf = user._id.equals(req.user._id);
    const losesSuperAdmin = user.role === 'super_admin' && ((role && role !== 'super_admin') || active === false);

    if (isSelf && (role || active === false)) {
        return res.status(400).json({ success: false, error: 'You cannot change your own role or deactivate yourself' });
    }
    if (losesSuperAdmin && (await activeSuperAdmins(user._id)) === 0) {
        return res.status(400).json({ success: false, error: 'At least one active Super Admin is required' });
    }

    if (name !== undefined) user.name = name;
    if (role !== undefined) {
        if (!ROLES.includes(role)) return res.status(400).json({ success: false, error: 'Choose a valid role' });
        user.role = role;
    }
    if (active !== undefined) user.active = Boolean(active);
    if (password) {
        if (!validPassword(password)) return res.status(400).json({ success: false, error: PASSWORD_RULE });
        await user.setPassword(password);
    }
    await user.save();
    res.json({ success: true, data: user });
};

// @route   DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    if (user._id.equals(req.user._id)) {
        return res.status(400).json({ success: false, error: 'You cannot delete your own account' });
    }
    if (user.role === 'super_admin' && (await activeSuperAdmins(user._id)) === 0) {
        return res.status(400).json({ success: false, error: 'At least one active Super Admin is required' });
    }
    await user.deleteOne();
    res.json({ success: true });
};

module.exports = { listUsers, createUser, updateUser, deleteUser };
