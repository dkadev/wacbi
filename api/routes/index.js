const express = require('express');
const router = express.Router();
const { getRoot, uploadChat } = require('../controllers');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage()});

router.get('/', getRoot);

router.post('/upload', upload.single('file'), uploadChat);

module.exports = router;
