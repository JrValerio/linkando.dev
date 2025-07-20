const urlService = require('../service/urlService');

exports.shortenUrl = async (req, res) => {
  const { originalUrl, isPrivate, password } = req.body;
  const userId = req.user ? req.user._id : null;
  
  try {
    const shortUrl = await urlService.generateShortUrl(originalUrl, userId, isPrivate, password);
    res.status(201).json({ originalUrl, shortUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.redirect = async (req, res) => {
  const { shortUrl } = req.params;
  const { password } = req.query;
  
  try {
    const originalUrl = await urlService.getOriginalUrl(shortUrl, password);
    if (originalUrl) {
      return res.redirect(originalUrl);
    }
    res.status(404).json({ error: 'URL não encontrada' });
  } catch (err) {
    if (err.message.includes('Senha')) {
      return res.status(401).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getUserUrls = async (req, res) => {
  try {
    const urls = await urlService.getUserUrls(req.user._id);
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUrl = async (req, res) => {
  const { shortUrl } = req.params;
  
  try {
    await urlService.deleteUrl(shortUrl, req.user._id, req.user.isAdmin);
    res.json({ message: 'URL deletada com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
