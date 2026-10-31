const mongoose = require('mongoose');

const PLACEMENTS = ['home'];

const adSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, maxlength: 80 },
        text: { type: String, required: true, trim: true, maxlength: 240 },
        href: { type: String, required: true, trim: true, maxlength: 300 },
        placement: { type: String, enum: PLACEMENTS, default: 'home' },
        active: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Ad', adSchema);
module.exports.PLACEMENTS = PLACEMENTS;
