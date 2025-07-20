const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Todas as rotas de admin requerem autenticação e privilégios de admin
router.use(authenticateToken);
router.use(requireAdmin);

// Rotas de URLs
router.get('/urls', adminController.getAllUrls);
router.get('/urls/user/:userId', adminController.getUrlsByUser);
router.delete('/urls/:shortUrl', adminController.deleteUrl);

// Rotas de usuários
router.get('/users', adminController.getAllUsers);
router.get('/users/:userId', adminController.getUserDetails);
router.patch('/users/:userId/admin', adminController.makeAdmin);

// Rotas de estatísticas
router.get('/stats', adminController.getStats);

module.exports = router; 