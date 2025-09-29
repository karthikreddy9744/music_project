//music-project/server/controllers/reviewsController.js
const Content = require('../models/Content');
const Review = require('../models/Review');

exports.list = async (req, res, next) => {
  try {
    const items = await Content.find({ contentType: 'review' }).sort('-createdAt').populate('authorId', 'name');
    res.json(items);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    // Expect { title, body, track, rating }
    const content = await Content.create({
      contentType: 'review',
      title: req.body.title,
      body: req.body.body,
      authorId: req.user._id,
      media: req.body.media || []
    });

    const review = await Review.create({
      contentRef: content._id,
      track: req.body.track || {},
      rating: req.body.rating || 3
    });

    res.status(201).json({ content, review });
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const content = await Content.findOneAndUpdate(
      { _id: req.params.id, contentType: 'review' },
      { title: req.body.title, body: req.body.body, media: req.body.media },
      { new: true }
    );
    if (!content) return res.status(404).json({ message: 'Not found' });

    if (req.body.rating || req.body.track) {
      await Review.findOneAndUpdate(
        { contentRef: content._id },
        { rating: req.body.rating, track: req.body.track },
        { new: true }
      );
    }
    res.json(content);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const content = await Content.findOneAndDelete({ _id: req.params.id, contentType: 'review' });
    if (content) await Review.findOneAndDelete({ contentRef: content._id });
    res.json({ ok: true });
  } catch (e) { next(e); }
};
