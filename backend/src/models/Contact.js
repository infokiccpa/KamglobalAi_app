const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String
    },
    subject: {
        type: String,
        required: [true, 'Please add a subject']
    },
    message: {
        type: String,
        required: [true, 'Please add a message']
    },
    company: {
        type: String,
        trim: true,
        maxlength: 200
    },
    country: {
        type: String,
        trim: true,
        maxlength: 120
    },
    enquiryType: {
        type: String,
        trim: true,
        maxlength: 80
    },
    startDate: {
        type: String,
        trim: true,
        maxlength: 40
    },
    details: {
        type: Map,
        of: String
    },
    consent: {
        type: Boolean,
        default: false
    },
    reference: {
        type: String,
        index: true
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied'],
        default: 'new'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);
