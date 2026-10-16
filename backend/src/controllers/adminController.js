const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const Application = require('../models/Application');
const Job = require('../models/Job');
const { escapeRegex } = require('../utils/http');

const CONTACT_STATUSES = ['new', 'read', 'replied'];

// @route   GET /api/admin/stats
const getStats = async (_req, res) => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [openJobs, draftJobs, totalApps, newApps, weekApps, newEnquiries, byStatus] = await Promise.all([
        Job.countDocuments({ status: 'published' }),
        Job.countDocuments({ status: 'draft' }),
        Application.countDocuments(),
        Application.countDocuments({ status: 'pending' }),
        Application.countDocuments({ appliedAt: { $gte: weekAgo } }),
        Contact.countDocuments({ status: 'new' }),
        Application.aggregate([{ $group: { _id: '$status', total: { $sum: 1 } } }]),
    ]);
    res.json({
        success: true,
        data: {
            openJobs,
            draftJobs,
            totalApps,
            newApps,
            weekApps,
            newEnquiries,
            byStatus: Object.fromEntries(byStatus.map((s) => [s._id, s.total])),
        },
    });
};

// @route   GET /api/admin/enquiries
const listEnquiries = async (req, res) => {
    const filter = {};
    if (CONTACT_STATUSES.includes(req.query.status)) filter.status = req.query.status;
    if (req.query.type) filter.enquiryType = String(req.query.type).slice(0, 60);
    if (req.query.q) {
        const re = new RegExp(escapeRegex(String(req.query.q).slice(0, 80)), 'i');
        filter.$or = [{ name: re }, { email: re }, { company: re }, { subject: re }, { reference: re }];
    }
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25));
    const page = Math.max(1, Number(req.query.page) || 1);
    const [total, items] = await Promise.all([
        Contact.countDocuments(filter),
        Contact.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    ]);
    res.json({ success: true, total, page, pages: Math.max(1, Math.ceil(total / limit)), data: items });
};

// @route   PATCH /api/admin/enquiries/:id
const updateEnquiry = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, error: 'Enquiry not found' });
    const { status } = req.body || {};
    if (!CONTACT_STATUSES.includes(status)) return res.status(400).json({ success: false, error: 'Invalid status' });
    const enquiry = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!enquiry) return res.status(404).json({ success: false, error: 'Enquiry not found' });
    res.json({ success: true, data: enquiry });
};

module.exports = { getStats, listEnquiries, updateEnquiry };
