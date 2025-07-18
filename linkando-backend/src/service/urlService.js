const Url = require('../model/urlModel'); 
const { nanoid } = require('nanoid');

exports.generateShortUrl = async (originalUrl) => {
  const shortUrl = nanoid(6); 
  const newUrl = new Url({ originalUrl, shortUrl });
  await newUrl.save();
  return shortUrl;
};

exports.getOriginalUrl = async (shortUrl) => {
  const urlData = await Url.findOne({ shortUrl });
  return urlData ? urlData.originalUrl : null;
};
