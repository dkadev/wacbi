const express = require('express');
const router = express.Router();
const { getRoot } = require('../controllers');

router.get('/', getRoot);

module.exports = router;
