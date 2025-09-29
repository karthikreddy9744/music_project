//music-project/server/controllers/newsController.js
const Content = require('../models/Content');

exports.list = async (req, res, next) => {
  try {
    const q = await Content.find({ contentType: 'news' }).sort('-createdAt').populate('authorId', 'name');
    res.json(q);
  } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const doc = await Content.findOne({ _id: req.params.id, contentType: 'news' });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const body = { ...req.body, authorId: req.user._id, contentType: 'news' };
    const doc = await Content.create(body);
    res.status(201).json(doc);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const doc = await Content.findOneAndUpdate(
      { _id: req.params.id, contentType: 'news' },
      req.body,
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const doc = await Content.findOneAndDelete({ _id: req.params.id, contentType: 'news' });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  } catch (e) { next(e); }
};
