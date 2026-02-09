const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please add full name']
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    position: {
        type: String,
        required: [true, 'Please specify the position']
    },
    experience: {
        type: String,
        required: [true, 'Please add experience']
    },
    resumeUrl: {
        type: String,
        required: [true, 'Please add resume link or path']
    },
    message: {
        type: String
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
