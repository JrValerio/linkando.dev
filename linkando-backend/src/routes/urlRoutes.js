const express = require('express');
const router = express.Router();
const urlController = require('../controller/urlController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

// Rotas públicas
router.post('/shorten', optionalAuth, urlController.shortenUrl);
router.get('/:shortUrl', urlController.redirect);

// Rotas protegidas (requerem autenticação)
router.get('/user/urls', authenticateToken, urlController.getUserUrls);
router.delete('/:shortUrl', authenticateToken, urlController.deleteUrl);

module.exports = router;
