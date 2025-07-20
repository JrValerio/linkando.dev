const Url = require('../model/urlModel'); 
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

exports.generateShortUrl = async (originalUrl, userId = null, isPrivate = false, password = null) => {
  const shortUrl = nanoid(6); 
  
  let hashedPassword = null;
  if (isPrivate && password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  
  const newUrl = new Url({ 
    originalUrl, 
    shortUrl, 
    userId,
    isPrivate,
    password: hashedPassword
  });
  
  await newUrl.save();
  return shortUrl;
};

exports.getOriginalUrl = async (shortUrl, password = null) => {
  const urlData = await Url.findOne({ shortUrl });
  
  if (!urlData) {
    return null;
  }
  
  // Se é um link privado, verificar senha
  if (urlData.isPrivate && urlData.password) {
    if (!password) {
      throw new Error('Senha necessária para acessar este link');
    }
    
    const isValidPassword = await bcrypt.compare(password, urlData.password);
    if (!isValidPassword) {
      throw new Error('Senha incorreta');
    }
  }
  
  // Incrementar contador de cliques
  urlData.clicks += 1;
  await urlData.save();
  
  return urlData.originalUrl;
};

exports.getUserUrls = async (userId) => {
  return await Url.find({ userId }).sort({ createdAt: -1 });
};

exports.getAllUrls = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const urls = await Url.find({})
    .populate('userId', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  
  const total = await Url.countDocuments({});
  
  return {
    urls,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

exports.getUrlsByUser = async (userId, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const urls = await Url.find({ userId })
    .populate('userId', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  
  const total = await Url.countDocuments({ userId });
  
  return {
    urls,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

exports.deleteUrl = async (shortUrl, userId, isAdmin = false) => {
  let url;
  
  if (isAdmin) {
    url = await Url.findOne({ shortUrl });
  } else {
    url = await Url.findOne({ shortUrl, userId });
  }
  
  if (!url) {
    throw new Error('URL não encontrada ou você não tem permissão para deletá-la');
  }
  
  await Url.findByIdAndDelete(url._id);
  return true;
};

exports.deleteUrlByAdmin = async (shortUrl) => {
  const url = await Url.findOne({ shortUrl });
  if (!url) {
    throw new Error('URL não encontrada');
  }
  
  await Url.findByIdAndDelete(url._id);
  return true;
};

exports.getUrlStats = async () => {
  const totalUrls = await Url.countDocuments({});
  const totalClicks = await Url.aggregate([
    { $group: { _id: null, total: { $sum: '$clicks' } } }
  ]);
  
  const urlsByUser = await Url.aggregate([
    { $group: { _id: '$userId', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
  
  const privateUrls = await Url.countDocuments({ isPrivate: true });
  const publicUrls = await Url.countDocuments({ isPrivate: false });
  
  return {
    totalUrls,
    totalClicks: totalClicks[0]?.total || 0,
    privateUrls,
    publicUrls,
    topUsers: urlsByUser
  };
};
