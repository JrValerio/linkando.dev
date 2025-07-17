const urlService = require('../service/urlService');

exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  try {
    const shortUrl = await urlService.generateShortUrl(originalUrl);
    res.status(201).json({ originalUrl, shortUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.redirect = async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const originalUrl = await urlService.getOriginalUrl(shortUrl);
    if (originalUrl) {
      return res.redirect(originalUrl);
    }
    res.status(404).json({ error: 'URL não encontrada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
