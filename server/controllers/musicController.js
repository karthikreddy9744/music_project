//music-project/server/controllers/musicController.js
const Content = require('../models/Content');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

// Configure AWS S3 Client (same as in mediaController)
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

exports.list = async (req, res, next) => {
  try {
    const q = await Content.find({ contentType: 'music' }).sort('-createdAt').populate('authorId', 'name');
    res.json(q);
  } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const doc = await Content.findOne({ _id: req.params.id, contentType: 'music' })
      .populate('authorId', 'name') // Populate author's name
      .populate('reviews.author', 'name'); // Populate reviewer's name
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const body = { ...req.body, authorId: req.user._id, contentType: 'music' };
    const doc = await Content.create(body);
    res.status(201).json(doc);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    // Find the existing document to check for an old file to delete
    const existingDoc = await Content.findById(req.params.id);

    // Check if a new file was uploaded and an old one exists
    if (existingDoc && existingDoc.media && existingDoc.media.length > 0 && req.body.media && req.body.media.length > 0) {
      const oldUrl = existingDoc.media[0].url;
      const newUrl = req.body.media[0].url;

      // If the URLs are different, delete the old object from S3
      if (oldUrl !== newUrl) {
        const oldKey = new URL(oldUrl).pathname.substring(1);
        const deleteParams = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: oldKey,
        };
        await s3.send(new DeleteObjectCommand(deleteParams));
      }
    }

    // Now, proceed with updating the document in the database
    const doc = await Content.findOneAndUpdate(
      { _id: req.params.id, contentType: 'music' },
      req.body,
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    // First, find the document to get the media file details
    const doc = await Content.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });

    // If there are media files associated with it, delete them from S3
    if (doc.media && doc.media.length > 0) {
      for (const mediaItem of doc.media) {
        if (mediaItem.url) {
          // Extract the key from the S3 URL
          const url = new URL(mediaItem.url);
          const key = url.pathname.substring(1); // Remove leading '/'

          const deleteParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
          };
          await s3.send(new DeleteObjectCommand(deleteParams));
        }
      }
    }

    // After deleting from S3, delete the document from the database
    await Content.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
};