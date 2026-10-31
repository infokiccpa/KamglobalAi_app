const crypto = require('crypto');
const Waitlist = require('../models/Waitlist');
const Contact = require('../models/Contact');
const { notifyEnquiry } = require('../utils/mailer');

// @desc    Join waitlist
// @route   POST /api/waitlist
// @access  Public
const joinWaitlist = async (req, res) => {
    try {
        const { name, email, phone, institution, role, gradeRange } = req.body;

        // Check if email already exists
        const exists = await Waitlist.findOne({ email });
        if (!exists) {
            await Waitlist.create({
                name,
                email,
                phone,
                institution,
                role,
                gradeRange
            });
            const interest = gradeRange || 'EdTech';
            const lines = [
                role ? `I am a ${role}.` : '',
                institution ? `Institution: ${institution}.` : '',
                `Interest: ${interest}.`,
            ].filter(Boolean);
            try {
                const contact = await Contact.create({
                    name,
                    email,
                    phone,
                    subject: `Product interest: ${interest}`.slice(0, 180),
                    message: lines.join(' '),
                    enquiryType: 'Product Demo',
                    reference: `KGA-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
                });
                notifyEnquiry(contact).catch((err) => console.error('Product enquiry email failed:', err.message));
            } catch (err) {
                console.error(`Product enquiry record failed: ${err.message}`);
            }
        }

        res.status(201).json({
            success: true,
            message: 'Successfully joined the waitlist'
        });
    } catch {
        res.status(400).json({
            success: false,
            error: 'Please check the form and try again.'
        });
    }
};

module.exports = {
    joinWaitlist
};
