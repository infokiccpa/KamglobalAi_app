const express = require('express');
const { asyncHandler } = require('../utils/http');
const content = require('../controllers/contentController');

const router = express.Router();

router.get('/posts', asyncHandler(content.listPublicPosts));
router.get('/posts/:slug', asyncHandler(content.getPublicPost));
router.get('/ads', asyncHandler(content.listPublicAds));

module.exports = router;
