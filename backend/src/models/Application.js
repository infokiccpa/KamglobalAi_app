const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    dateOfBirth: {
        type: Date
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    countryCode: {
        type: String,
        default: '+91'
    },
    location: {
        type: String
    },
    qualification: {
        type: String,
        required: [true, 'Qualification is required']
    },
    experience: {
        type: String,
        required: [true, 'Experience is required']
    },
    position: {
        type: String,
        required: [true, 'Position is required']
    },
    linkedinUrl: {
        type: String
    },
    message: {
        type: String
    },
    resumePath: {
        type: String,
        required: [true, 'Resume is required']
    },
    consent: {
        type: Boolean,
        required: [true, 'Consent is required']
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
        default: 'pending'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Application', applicationSchema);
