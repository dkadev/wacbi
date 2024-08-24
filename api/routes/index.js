const express = require('express');
const router = express.Router();
const { getRoot, getChats, getChatData, uploadChat, deleteChat } = require('../controllers');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage()});

router.get('/', getRoot);

router.post('/upload', upload.single('file'), uploadChat);
router.delete('/chats/:id', deleteChat);

router.get('/chats', getChats);

router.get('/chats/:id', getChatData);

module.exports = router;
