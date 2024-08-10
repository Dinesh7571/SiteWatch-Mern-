const express = require('express');
const { addWebsite, getWebsites, updateWebsite, deleteWebsite } = require('../controllers/websiteController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, addWebsite);
router.get('/', protect, getWebsites);
router.put('/:id', protect, updateWebsite);
router.delete('/:id', protect, deleteWebsite);

module.exports = router;
