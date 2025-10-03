//music-project/server/app.js
// app.js (Located in Project Root)
// app.js (Located in Project Root)
require('dotenv').config();
require('./server/config/db');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path'); 

const authRoutes = require('./server/routes/authRoutes');
const userRoutes = require('./server/routes/userRoutes');
const newsRoutes = require('./server/routes/newsRoutes');
const profileRoutes = require('./server/routes/profileRoutes');
const festivalsRoutes = require('./server/routes/festivalsRoutes');
const musicRoutes = require('./server/routes/musicRoutes');
const reviewsRoutes = require('./server/routes/reviewsRoutes');
const mediaRoutes = require('./server/routes/mediaRoutes');
const chatRoutes = require('./server/routes/chatRoutes');
const adminRoutes = require('./server/routes/adminRoutes');
const searchRoutes = require('./server/routes/searchRoutes');

const app = express();


// Middleware
app.use(express.json({ limit: '7mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// 1. API Route Definitions
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/festivals', festivalsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/search', searchRoutes);

// 2. FRONTEND ROUTING: Serve Static Assets and Catch-All (Must be LAST before error handler)
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname, 'app-client')));

// CATCH-ALL ROUTE: This is the Angular fix.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app-client', 'index.html'));
});

// Final Error Handler
const PORT = process.env.PORT || 3000;
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

module.exports = app;