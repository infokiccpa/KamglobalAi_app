const mongoose = require('mongoose');
const User = require('./models/User');

/*
 * Creates the first Super Admin when the database has no users.
 * Set ADMIN_EMAIL, ADMIN_PASSWORD and optionally ADMIN_NAME in .env, start the server once,
 * then remove ADMIN_PASSWORD from .env.
 */
const ensureSuperAdmin = async () => {
    if (mongoose.connection.readyState !== 1) return;
    const email = String(process.env.ADMIN_EMAIL || '').toLowerCase().trim();
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || 'Super Admin';
    if (!email || !password) return;

    let user = await User.findOne({ role: 'super_admin' });
    if (!user) user = await User.findOne({ email });
    const created = !user;
    if (!user) user = new User({ name, email, role: 'super_admin' });
    user.name = name;
    user.email = email;
    user.role = 'super_admin';
    user.active = true;
    await user.setPassword(password);
    await user.save();
    console.log(`Super Admin ${created ? 'created' : 'updated'} for ${user.email}.`);
};

module.exports = { ensureSuperAdmin };
