const express = require('express');
const { asyncHandler } = require('../utils/http');
const { listPublic } = require('../controllers/resourceController');

const router = express.Router();

router.get('/', asyncHandler(listPublic));

module.exports = router;
