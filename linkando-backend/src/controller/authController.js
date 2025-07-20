const authService = require('../service/authService');
const User = require('../model/userModel');

// Callback do Google OAuth
exports.googleCallback = async (req, res) => {
  try {
    const user = await authService.findOrCreateUser(req.user, 'google');
    
    const accessToken = authService.generateToken(user._id);
    const refreshToken = authService.generateRefreshToken(user._id);
    
    await authService.saveRefreshToken(user._id, refreshToken);

    // Redirecionar para o frontend com tokens
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3001'}/auth/callback?access_token=${accessToken}&refresh_token=${refreshToken}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Erro no callback do Google:', error);
    const errorUrl = `${process.env.FRONTEND_URL || 'http://localhost:3001'}/auth/error?message=${encodeURIComponent(error.message)}`;
    res.redirect(errorUrl);
  }
};

// Callback do GitHub OAuth
exports.githubCallback = async (req, res) => {
  try {
    const user = await authService.findOrCreateUser(req.user, 'github');
    
    const accessToken = authService.generateToken(user._id);
    const refreshToken = authService.generateRefreshToken(user._id);
    
    await authService.saveRefreshToken(user._id, refreshToken);

    // Redirecionar para o frontend com tokens
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3001'}/auth/callback?access_token=${accessToken}&refresh_token=${refreshToken}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Erro no callback do GitHub:', error);
    const errorUrl = `${process.env.FRONTEND_URL || 'http://localhost:3001'}/auth/error?message=${encodeURIComponent(error.message)}`;
    res.redirect(errorUrl);
  }
};

// Refresh token
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token é necessário' });
    }

    const decoded = authService.verifyRefreshToken(refreshToken);
    const isValid = await authService.validateRefreshToken(decoded.userId, refreshToken);

    if (!isValid) {
      return res.status(401).json({ error: 'Refresh token inválido' });
    }

    const newAccessToken = authService.generateToken(decoded.userId);
    const newRefreshToken = authService.generateRefreshToken(decoded.userId);

    await authService.saveRefreshToken(decoded.userId, newRefreshToken);

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    res.status(401).json({ error: 'Refresh token inválido' });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    await authService.removeRefreshToken(req.user._id);
    res.json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer logout' });
  }
};

// Obter perfil do usuário
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-refreshToken');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter perfil' });
  }
}; 