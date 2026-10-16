const mongoose = require('mongoose');
const User = require('./models/User');

/*
 * Creates the first Super Admin when the database has no users.
 * Set ADMIN_EMAIL, ADMIN_PASSWORD and optionally ADMIN_NAME in .env, start the server once,
 * then remove ADMIN_PASSWORD from .env.
 */
const ensureSuperAdmin = async () => {
    if (mongoose.connection.readyState !== 1) return;
    const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return;
    if (await User.exists({})) return;

    const user = new User({ name: ADMIN_NAME || 'Super Admin', email: ADMIN_EMAIL, role: 'super_admin' });
    await user.setPassword(ADMIN_PASSWORD);
    await user.save();
    console.log(`Super Admin created for ${user.email}. Remove ADMIN_PASSWORD from .env now.`);
};

module.exports = { ensureSuperAdmin };
