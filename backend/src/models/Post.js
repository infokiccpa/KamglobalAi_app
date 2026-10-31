const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, maxlength: 140 },
        slug: { type: String, required: true, unique: true, trim: true, maxlength: 80 },
        summary: { type: String, required: true, trim: true, maxlength: 400 },
        body: { type: String, required: true, trim: true, maxlength: 8000 },
        published: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
