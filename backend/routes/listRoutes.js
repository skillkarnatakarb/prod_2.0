const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const upload = require('../middleware/uploadMiddleware');

// Routes
router.get('/template', listController.downloadTemplate);
router.post('/create', upload.single('csvFile'), listController.createList);
router.get('/', listController.getLists);
router.delete('/:id', listController.deleteList);

module.exports = router;
