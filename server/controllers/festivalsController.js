//music-project/server/controllers/festivalsController.js
const Festival = require('../models/Festival');

exports.list = async (req, res, next) => {
  try {
    const q = await Festival.find().sort({ startDate: 1 });
    res.json(q);
  } catch (e) { next(e); }
};

exports.get = async (req, res, next) => {
  try {
    const doc = await Festival.findById(req.params.id)
      .populate('reviews.author', 'name');
    if (!doc) return res.status(404).json({ message: 'Festival not found' });
    res.json(doc);
  } catch (e) { next(e); }
};


exports.create = async (req, res, next) => {
  try {
    const { address, location, name, startDate, endDate, description, lineup } = req.body;

    if (!address || !location || typeof location.latitude !== 'number' || typeof location.longitude !== 'number') {
      return res.status(400).json({ message: 'Address and valid latitude/longitude required' });
    }

    const doc = await Festival.create({
      name,
      address,
      location,
      startDate,
      endDate,
      description,
      lineup,
      createdBy: req.user._id
    });
    res.status(201).json(doc);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const { address, location, name, startDate, endDate, description, lineup } = req.body;

    if (location && (typeof location.latitude !== 'number' || typeof location.longitude !== 'number')) {
      return res.status(400).json({ message: 'Valid latitude/longitude required' });
    }

    const doc = await Festival.findByIdAndUpdate(
      req.params.id,
      {
        name,
        address,
        location,
        startDate,
        endDate,
        description,
        lineup
      },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const doc = await Festival.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  } catch (e) { next(e); }
};
