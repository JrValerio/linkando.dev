const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

// Gerar token JWT
exports.generateToken = (userId) => {
  return jwt.sign(
    { userId, type: 'access' },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Gerar refresh token
exports.generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    JWT_REFRESH_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES_IN }
  );
};

// Verificar token JWT
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido');
  }
};

// Verificar refresh token
exports.verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error('Refresh token inválido');
  }
};

// Encontrar ou criar usuário
exports.findOrCreateUser = async (profile, provider) => {
  const { id, displayName, emails, photos } = profile;
  const email = emails[0].value;
  
  let user = await User.findOne({ 
    provider, 
    providerId: id.toString() 
  });

  if (!user) {
    // Verificar se já existe usuário com este email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email já está em uso por outro provedor');
    }

    // Criar novo usuário
    user = new User({
      email,
      name: displayName,
      avatar: photos[0]?.value,
      provider,
      providerId: id.toString()
    });
  } else {
    // Atualizar informações do usuário
    user.name = displayName;
    user.avatar = photos[0]?.value;
    user.lastLogin = new Date();
  }

  await user.save();
  return user;
};

// Salvar refresh token no usuário
exports.saveRefreshToken = async (userId, refreshToken) => {
  await User.findByIdAndUpdate(userId, { refreshToken });
};

// Remover refresh token do usuário
exports.removeRefreshToken = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

// Verificar se refresh token é válido
exports.validateRefreshToken = async (userId, refreshToken) => {
  const user = await User.findById(userId);
  return user && user.refreshToken === refreshToken;
}; 