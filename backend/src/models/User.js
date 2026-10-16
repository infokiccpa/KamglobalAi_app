const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ROLES = ['super_admin', 'recruiter', 'viewer'];

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 80 },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please add a valid email'],
        },
        passwordHash: { type: String, required: true, select: false },
        role: { type: String, enum: ROLES, default: 'viewer' },
        active: { type: Boolean, default: true },
        lastLoginAt: Date,
        passwordChangedAt: Date,
    },
    { timestamps: true }
);

userSchema.methods.setPassword = async function setPassword(password) {
    this.passwordHash = await bcrypt.hash(password, 12);
    this.passwordChangedAt = new Date();
};

userSchema.methods.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
};

userSchema.set('toJSON', {
    transform: (_doc, ret) => {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
    },
});

module.exports = mongoose.model('User', userSchema);
module.exports.ROLES = ROLES;
