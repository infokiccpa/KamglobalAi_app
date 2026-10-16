const mongoose = require('mongoose');

const BOARDS = ['hr', 'careers'];
const STATUSES = ['draft', 'published', 'closed'];
const DOCUMENT_KEYS = ['degree', 'masters', 'engineering', 'salary'];

const jobSchema = new mongoose.Schema(
    {
        board: { type: String, enum: BOARDS, required: true, default: 'hr' },
        title: { type: String, required: [true, 'Job title is required'], trim: true, maxlength: 120 },
        category: { type: String, trim: true, maxlength: 60 },
        department: { type: String, trim: true, maxlength: 60 },
        location: { type: String, required: [true, 'Location is required'], trim: true, maxlength: 120 },
        country: { type: String, trim: true, maxlength: 60 },
        experience: { type: String, trim: true, maxlength: 120 },
        employmentType: { type: String, trim: true, maxlength: 40, default: 'Full-time' },
        vacancies: { type: Number, min: 1, max: 10000, default: 1 },
        package: { type: String, trim: true, maxlength: 120 },
        summary: { type: String, trim: true, maxlength: 400 },
        description: { type: String, trim: true, maxlength: 8000 },
        requirements: [{ type: String, trim: true, maxlength: 300 }],
        requiredDocuments: [{ type: String, enum: DOCUMENT_KEYS }],
        status: { type: String, enum: STATUSES, default: 'draft' },
        publishedAt: Date,
        publishAt: Date,
        closesAt: Date,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

jobSchema.index({ board: 1, status: 1, publishedAt: -1 });

jobSchema.pre('save', function setPublishedAt(next) {
    if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});

jobSchema.set('toJSON', {
    transform: (_doc, ret) => {
        delete ret.__v;
        return ret;
    },
});

module.exports = mongoose.model('Job', jobSchema);
module.exports.BOARDS = BOARDS;
module.exports.STATUSES = STATUSES;
module.exports.DOCUMENT_KEYS = DOCUMENT_KEYS;
