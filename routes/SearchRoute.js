const path = require('path');
const express = require('express');
const router = express();

const searchController = require('../controllers/searchController');
router.get('/',searchController.handleSearch);
router.post('/',searchController.getNewSearch);

module.exports = router;