const Post = require('../models/Post');
const Ad = require('../models/Ad');
const { PLACEMENTS } = require('../models/Ad');

const slugify = (value) => String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);

const safeHref = (value) => {
    const href = String(value || '').trim();
    if (href.startsWith('/') && !href.startsWith('//')) return href;
    try {
        const url = new URL(href);
        if (url.protocol === 'https:' || url.protocol === 'http:') return url.toString();
    } catch {
        return '';
    }
    return '';
};

const publicPost = (doc, withBody) => ({
    id: doc._id,
    title: doc.title,
    slug: doc.slug,
    summary: doc.summary,
    ...(withBody ? { body: doc.body } : {}),
    published: doc.published,
    createdAt: doc.createdAt,
});

const publicAd = (doc) => ({
    id: doc._id,
    title: doc.title,
    text: doc.text,
    href: doc.href,
    placement: doc.placement,
    active: doc.active,
    createdAt: doc.createdAt,
});

const uniqueSlug = async (title, currentId) => {
    const base = slugify(title) || 'article';
    let slug = base;
    let n = 2;
    while (await Post.exists({ slug, ...(currentId ? { _id: { $ne: currentId } } : {}) })) {
        slug = `${base}-${n}`.slice(0, 80);
        n += 1;
    }
    return slug;
};

const listPublicPosts = async (_req, res) => {
    const items = await Post.find({ published: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: items.map((item) => publicPost(item, false)) });
};

const getPublicPost = async (req, res) => {
    const item = await Post.findOne({ slug: req.params.slug, published: true });
    if (!item) return res.status(404).json({ success: false, error: 'Article not found' });
    res.json({ success: true, data: publicPost(item, true) });
};

const listPublicAds = async (req, res) => {
    const placement = PLACEMENTS.includes(req.query.placement) ? req.query.placement : 'home';
    const items = await Ad.find({ active: true, placement }).sort({ createdAt: -1 }).limit(3);
    res.json({ success: true, data: items.map(publicAd) });
};

const listPosts = async (_req, res) => {
    const items = await Post.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items.map((item) => publicPost(item, true)) });
};

const savePost = async (req, res) => {
    const title = String(req.body.title || '').trim().slice(0, 140);
    const summary = String(req.body.summary || '').trim().slice(0, 400);
    const body = String(req.body.body || '').trim().slice(0, 8000);
    const published = req.body.published === true || req.body.published === 'true';
    if (!title || !summary || !body) {
        return res.status(400).json({ success: false, error: 'Title, summary and article text are required' });
    }
    const item = req.params.id ? await Post.findById(req.params.id) : new Post();
    if (!item) return res.status(404).json({ success: false, error: 'Article not found' });
    item.title = title;
    item.summary = summary;
    item.body = body;
    item.published = published;
    if (!item.slug || item.title !== title) item.slug = await uniqueSlug(title, item._id);
    if (!item.slug) item.slug = await uniqueSlug(title, item._id);
    await item.save();
    res.status(req.params.id ? 200 : 201).json({ success: true, data: publicPost(item, true) });
};

const deletePost = async (req, res) => {
    const item = await Post.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Article not found' });
    await item.deleteOne();
    res.json({ success: true });
};

const listAds = async (_req, res) => {
    const items = await Ad.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items.map(publicAd) });
};

const saveAd = async (req, res) => {
    const title = String(req.body.title || '').trim().slice(0, 80);
    const text = String(req.body.text || '').trim().slice(0, 240);
    const href = safeHref(req.body.href);
    const placement = PLACEMENTS.includes(req.body.placement) ? req.body.placement : 'home';
    const active = req.body.active === true || req.body.active === 'true';
    if (!title || !text || !href) {
        return res.status(400).json({ success: false, error: 'Title, text and a site or https link are required' });
    }
    const item = req.params.id ? await Ad.findById(req.params.id) : new Ad();
    if (!item) return res.status(404).json({ success: false, error: 'Ad not found' });
    item.title = title;
    item.text = text;
    item.href = href;
    item.placement = placement;
    item.active = active;
    await item.save();
    res.status(req.params.id ? 200 : 201).json({ success: true, data: publicAd(item) });
};

const deleteAd = async (req, res) => {
    const item = await Ad.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Ad not found' });
    await item.deleteOne();
    res.json({ success: true });
};

module.exports = {
    listPublicPosts,
    getPublicPost,
    listPublicAds,
    listPosts,
    savePost,
    deletePost,
    listAds,
    saveAd,
    deleteAd,
};
