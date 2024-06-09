const express = require('express');
const router = express.Router();
const { getRoot, uploadChat } = require('../controllers');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', getRoot);

router.post('/upload', upload.single('file'), uploadChat);

module.exports = router;
