const crypto = require('crypto');
const Contact = require('../models/Contact');

const MAX_DETAIL_FIELDS = 20;
const MAX_DETAIL_LENGTH = 1000;

const cleanDetails = (details) => {
    if (!details || typeof details !== 'object' || Array.isArray(details)) return undefined;
    const entries = Object.entries(details)
        .filter(([key, value]) => typeof key === 'string' && key.length <= 60 && value !== undefined && value !== null && String(value).trim() !== '')
        .slice(0, MAX_DETAIL_FIELDS)
        .map(([key, value]) => [key.replace(/[.$]/g, '_'), String(value).slice(0, MAX_DETAIL_LENGTH)]);
    return entries.length ? Object.fromEntries(entries) : undefined;
};

const makeReference = () => `KGA-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            subject,
            message,
            company,
            country,
            enquiryType,
            startDate,
            details,
            consent,
            website,
        } = req.body;

        // Honeypot: real users never see or fill this field.
        if (website) {
            return res.status(201).json({ success: true, message: 'Message sent successfully' });
        }

        const reference = makeReference();

        const contact = await Contact.create({
            name,
            email,
            phone,
            subject,
            message,
            company,
            country,
            enquiryType,
            startDate,
            details: cleanDetails(details),
            consent: consent === true,
            reference,
        });

        res.status(201).json({
            success: true,
            data: contact,
            reference,
            message: 'Message sent successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    submitContact
};
