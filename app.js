//music-project/server/app.js
require('dotenv').config();
require('./server/config/db');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path'); // <-- ADD THIS

const authRoutes = require('./server/routes/authRoutes');
const userRoutes = require('./server/routes/userRoutes');
const newsRoutes = require('./server/routes/newsRoutes');
const festivalsRoutes = require('./server/routes/festivalsRoutes');
const reviewsRoutes = require('./server/routes/reviewsRoutes');
const adminRoutes = require('./server/routes/adminRoutes');

const app = express();

//app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/festivals', festivalsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => res.status(404).json({ message: 'Not found' }));

// 2. STATIC FILE AND ANGULAR CATCHALL ROUTING (The Fix)
// =========================================================================

// Serve static assets from the main public folder (CSS, Bootstrap, jQuery, bundled JS)
app.use(express.static(path.join(__dirname, 'public'))); 

// Serve the Angular app-client folder (for index.html and view files)
app.use(express.static(path.join(__dirname, 'app-client')));

// Catch-all route to serve the Angular index.html for all non-API requests.
// This allows Angular's ngRoute to handle deep links (like /login or /festivals/123).
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app-client', 'index.html'));
});



module.exports = app;
