const mongoose = require('mongoose');

const STATUSES = ['pending', 'reviewed', 'shortlisted', 'interview', 'hired', 'rejected'];

const noteSchema = new mongoose.Schema(
    {
        text: { type: String, required: true, trim: true, maxlength: 2000 },
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        byName: String,
        at: { type: Date, default: Date.now },
    },
    { _id: true }
);

const applicationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: 60
    },
    middleName: {
        type: String,
        trim: true,
        maxlength: 60
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: 60
    },
    applicationRef: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 32
    },
    dateOfBirth: {
        type: Date
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        maxlength: 30
    },
    countryCode: {
        type: String,
        default: '+91',
        maxlength: 6
    },
    location: {
        type: String,
        trim: true,
        maxlength: 180
    },
    country: { type: String, trim: true, maxlength: 80 },
    state: { type: String, trim: true, maxlength: 80 },
    city: { type: String, trim: true, maxlength: 80 },
    fieldOfStudy: { type: String, trim: true, maxlength: 80 },
    specialization: { type: String, trim: true, maxlength: 120 },
    currentCompany: { type: String, trim: true, maxlength: 120 },
    qualification: {
        type: String,
        required: [true, 'Qualification is required'],
        trim: true,
        maxlength: 120
    },
    experience: {
        type: String,
        required: [true, 'Experience is required'],
        trim: true,
        maxlength: 60
    },
    position: {
        type: String,
        required: [true, 'Position is required'],
        trim: true,
        maxlength: 160
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    board: {
        type: String,
        enum: ['hr', 'careers'],
        default: 'careers'
    },
    gender: { type: String, trim: true, maxlength: 20 },
    candidateType: { type: String, trim: true, maxlength: 30 },
    expectedCtc: { type: String, trim: true, maxlength: 60 },
    noticePeriod: { type: String, trim: true, maxlength: 40 },
    linkedinUrl: {
        type: String,
        trim: true,
        maxlength: 300
    },
    githubUrl: { type: String, trim: true, maxlength: 300 },
    portfolioUrl: { type: String, trim: true, maxlength: 300 },
    message: {
        type: String,
        maxlength: 5000
    },
    resumePath: {
        type: String,
        required: [true, 'Resume is required']
    },
    resumeName: String,
    degreePath: String,
    degreeName: String,
    mastersPath: String,
    mastersName: String,
    engineeringPath: String,
    engineeringName: String,
    salarySlipPath: String,
    salarySlipName: String,
    consent: {
        type: Boolean,
        required: [true, 'Consent is required']
    },
    status: {
        type: String,
        enum: STATUSES,
        default: 'pending'
    },
    notes: [noteSchema],
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

applicationSchema.index({ appliedAt: -1 });
applicationSchema.index({ job: 1, status: 1 });

applicationSchema.set('toJSON', {
    transform: (_doc, ret) => {
        ret.hasResume = Boolean(ret.resumePath);
        ret.hasDegree = Boolean(ret.degreePath);
        ret.hasMasters = Boolean(ret.mastersPath);
        ret.hasEngineering = Boolean(ret.engineeringPath);
        ret.hasSalarySlip = Boolean(ret.salarySlipPath);
        delete ret.resumePath;
        delete ret.degreePath;
        delete ret.mastersPath;
        delete ret.engineeringPath;
        delete ret.salarySlipPath;
        delete ret.__v;
        return ret;
    },
});

module.exports = mongoose.model('Application', applicationSchema);
module.exports.STATUSES = STATUSES;
