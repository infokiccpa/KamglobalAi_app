const mongoose = require('mongoose');

const CATEGORIES = ['Guide', 'Document', 'Case note'];

const resourceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, maxlength: 140 },
        summary: { type: String, required: true, trim: true, maxlength: 400 },
        category: { type: String, enum: CATEGORIES, default: 'Document' },
        fileName: { type: String, default: '' },
        originalName: { type: String, default: '' },
        published: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Resource', resourceSchema);
module.exports.CATEGORIES = CATEGORIES;
