//music-project/server/controllers/adminController.js
const User = require('../models/User');
const Festival = require('../models/Festival');
const Content = require('../models/Content');
const Role = require('../models/Role');

exports.getStats = async (req, res, next) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // --- Aggregate Queries ---
    const userCount = User.countDocuments();
    const adminRole = Role.findOne({ name: 'admin' });
    const festivalCount = Festival.countDocuments();
    const musicCount = Content.countDocuments({ contentType: 'music' });
    const newsCount = Content.countDocuments({ contentType: 'news' });

    const festivalReviews = Festival.aggregate([
      { $unwind: '$reviews' },
      { $group: { _id: null, count: { $sum: 1 } } }
    ]);
    const musicReviews = Content.aggregate([
      { $match: { contentType: 'music' } },
      { $unwind: '$reviews' },
      { $group: { _id: null, count: { $sum: 1 } } }
    ]);

    // Aggregation for new user registrations chart
    const userRegistrations = User.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // Aggregation for daily active users chart
    const dailyActiveUsers = User.aggregate([
      { $match: { lastActive: { $gte: thirtyDaysAgo } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$lastActive" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // --- Execute All Promises Concurrently ---
    const [
      users, adminRoleDoc, festivals, music, news, fReviews, mReviews, userRegs, activeUsers
    ] = await Promise.all([
      userCount, adminRole, festivalCount, musicCount, newsCount, festivalReviews, musicReviews, userRegistrations, dailyActiveUsers
    ]);

    let admins = 0;
    if (adminRoleDoc) {
      admins = await User.countDocuments({ roles: adminRoleDoc._id });
    }

    // --- Format Chart Data ---
    const dateMap = new Map();
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      dateMap.set(dateString, 0);
    }
    userRegs.forEach(item => { if (dateMap.has(item._id)) dateMap.set(item._id, item.count); });

    const activeDateMap = new Map(dateMap); // Create a copy for active users
    activeUsers.forEach(item => { if (activeDateMap.has(item._id)) activeDateMap.set(item._id, item.count); });

    const chartLabels = [...dateMap.keys()];
    const userChartData = [...dateMap.values()];
    const activeUserChartData = [...activeDateMap.values()];

    res.json({
      userCount: users,
      adminCount: admins,
      contentCount: { festivals, music, news },
      reviewCount: (fReviews[0]?.count || 0) + (mReviews[0]?.count || 0),
      userRegistrations: { labels: chartLabels, data: userChartData },
      dailyActive: { labels: chartLabels, data: activeUserChartData }
    });
  } catch (e) { next(e); }
};