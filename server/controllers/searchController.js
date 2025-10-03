const Festival = require('../models/Festival');
const Content = require('../models/Content');

exports.searchAll = async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ message: 'Search query is required.' });
    }

    // Use a case-insensitive regex for searching
    const regex = new RegExp(query, 'i');

    try {
        // Create promises for all three searches to run them in parallel
        const festivalPromise = Festival.find({
            $or: [
                { name: regex },
                { address: regex },
                { description: regex }
            ]
        }).limit(5).select('name');

        const musicPromise = Content.find({
            contentType: 'music',
            $or: [
                { title: regex },
                { body: regex }
            ]
        }).limit(5).select('title');

        const newsPromise = Content.find({
            contentType: 'news',
            $or: [
                { title: regex },
                { body: regex }
            ]
        }).limit(5).select('title');

        const [festivals, music, news] = await Promise.all([festivalPromise, musicPromise, newsPromise]);

        res.json({ festivals, music, news });
    } catch (error) {
        res.status(500).json({ message: 'Server error during search.', error });
    }
};