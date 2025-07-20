const urlService = require('../service/urlService');
const User = require('../model/userModel');

// Obter todas as URLs (com paginação)
exports.getAllUrls = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const result = await urlService.getAllUrls(parseInt(page), parseInt(limit));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter URLs de um usuário específico
exports.getUrlsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    
    // Verificar se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    const result = await urlService.getUrlsByUser(userId, parseInt(page), parseInt(limit));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deletar URL (admin pode deletar qualquer URL)
exports.deleteUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    await urlService.deleteUrlByAdmin(shortUrl);
    res.json({ message: 'URL deletada com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obter estatísticas gerais
exports.getStats = async (req, res) => {
  try {
    const stats = await urlService.getUrlStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const users = await User.find({})
      .select('-refreshToken')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await User.countDocuments({});
    
    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tornar usuário admin
exports.makeAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isAdmin } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId, 
      { isAdmin }, 
      { new: true }
    ).select('-refreshToken');
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json({ 
      message: `Usuário ${isAdmin ? 'promovido a' : 'removido de'} administrador`,
      user 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter detalhes de um usuário específico
exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select('-refreshToken');
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Obter URLs do usuário
    const userUrls = await urlService.getUserUrls(userId);
    
    res.json({
      user,
      urls: userUrls
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 