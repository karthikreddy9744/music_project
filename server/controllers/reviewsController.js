//music-project/server/controllers/reviewsController.js
const Content = require('../models/Content');
const Festival = require('../models/Festival');

exports.addReviewToContent = async (req, res, next) => {
  try {
    const { rating, reviewText } = req.body;
    const content = await Content.findById(req.params.contentId);
    if (!content) return res.status(404).json({ message: 'Content not found' });
    
    // Only allow reviews on 'music' content type
    if (content.contentType !== 'music') {
      return res.status(400).json({ message: 'Reviews are not enabled for this content type.' });
    }
    
    const review = { author: req.user._id, rating, reviewText };
    content.reviews.push(review);
    
    await content.save();
    res.status(201).json(content);
  } catch (e) { next(e); }
};

exports.addReviewToFestival = async (req, res, next) => {
  try {
    const { rating, reviewText } = req.body;
    const festival = await Festival.findById(req.params.festivalId);
    if (!festival) return res.status(404).json({ message: 'Festival not found' });

    const review = { author: req.user._id, rating, reviewText };
    festival.reviews.push(review);

    await festival.save();
    res.status(201).json(festival);
  } catch (e) { next(e); }
};

// Note: Deleting and updating sub-document reviews would require more specific logic.
// For example, POST /api/festivals/:festivalId/reviews/:reviewId/delete
// This is a good next step for enhancing the API.
