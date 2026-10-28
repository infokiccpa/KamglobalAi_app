const fs = require('fs');
const path = require('path');
const Resource = require('../models/Resource');
const { CATEGORIES } = require('../models/Resource');

const ROOT = path.resolve('uploads', 'resources');

const publicResource = (doc) => ({
    id: doc._id,
    title: doc.title,
    summary: doc.summary,
    category: doc.category,
    fileUrl: doc.fileName ? `/uploads/resources/${doc.fileName}` : '',
    originalName: doc.originalName,
    published: doc.published,
    createdAt: doc.createdAt,
});

const removeFile = (fileName) => {
    if (!fileName) return;
    fs.unlink(path.join(ROOT, path.basename(fileName)), () => {});
};

const listPublic = async (_req, res) => {
    const items = await Resource.find({ published: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: items.map(publicResource) });
};

const listAdmin = async (_req, res) => {
    const items = await Resource.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items.map(publicResource) });
};

const createResource = async (req, res) => {
    const title = String(req.body.title || '').trim();
    const summary = String(req.body.summary || '').trim();
    const category = CATEGORIES.includes(req.body.category) ? req.body.category : 'Document';
    const published = req.body.published === 'true' || req.body.published === true;
    if (!title || !summary) return res.status(400).json({ success: false, error: 'Title and summary are required' });
    if (!req.file) return res.status(400).json({ success: false, error: 'Upload a PDF, Word document, or image' });

    const item = await Resource.create({
        title,
        summary,
        category,
        published,
        fileName: req.file.filename,
        originalName: req.file.originalname,
    });
    res.status(201).json({ success: true, data: publicResource(item) });
};

const updateResource = async (req, res) => {
    const item = await Resource.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Resource not found' });
    if (req.body.title !== undefined) item.title = String(req.body.title).trim().slice(0, 140);
    if (req.body.summary !== undefined) item.summary = String(req.body.summary).trim().slice(0, 400);
    if (req.body.category && CATEGORIES.includes(req.body.category)) item.category = req.body.category;
    if (req.body.published !== undefined) item.published = req.body.published === 'true' || req.body.published === true;
    if (req.file) {
        removeFile(item.fileName);
        item.fileName = req.file.filename;
        item.originalName = req.file.originalname;
    }
    await item.save();
    res.json({ success: true, data: publicResource(item) });
};

const deleteResource = async (req, res) => {
    const item = await Resource.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Resource not found' });
    removeFile(item.fileName);
    await item.deleteOne();
    res.json({ success: true });
};

module.exports = { listPublic, listAdmin, createResource, updateResource, deleteResource };
