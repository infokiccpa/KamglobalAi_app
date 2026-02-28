const Waitlist = require('../models/Waitlist');

// @desc    Join waitlist
// @route   POST /api/waitlist
// @access  Public
const joinWaitlist = async (req, res) => {
    try {
        const { name, email, phone, institution, role, gradeRange } = req.body;

        // Check if email already exists
        const exists = await Waitlist.findOne({ email });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'You are already on the waitlist'
            });
        }

        const entry = await Waitlist.create({
            name,
            email,
            phone,
            institution,
            role,
            gradeRange
        });

        res.status(201).json({
            success: true,
            data: entry,
            message: 'Successfully joined the waitlist'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    joinWaitlist
};
