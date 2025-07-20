const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controller/authController');
const { authenticateToken } = require('../middleware/auth');

// Rotas de OAuth
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }), 
  authController.googleCallback
);

router.get('/github', passport.authenticate('github', { 
  scope: ['user:email'] 
}));

router.get('/github/callback', 
  passport.authenticate('github', { session: false }), 
  authController.githubCallback
);

// Rotas de token
router.post('/refresh', authController.refreshToken);

// Rotas protegidas
router.post('/logout', authenticateToken, authController.logout);
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router; 