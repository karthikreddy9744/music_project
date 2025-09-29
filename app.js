//music-project/server/app.js
// app.js (Located in Project Root)
require('dotenv').config();
require('./server/config/db'); // Path correct relative to root
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path'); // <-- CRUCIAL ADDITION
const bodyParser = require('body-parser');


const authRoutes = require('./server/routes/authRoutes');
const userRoutes = require('./server/routes/userRoutes');
const newsRoutes = require('./server/routes/newsRoutes');
const festivalsRoutes = require('./server/routes/festivalsRoutes');
const reviewsRoutes = require('./server/routes/reviewsRoutes');
const adminRoutes = require('./server/routes/adminRoutes');

const app = express();
// Middleware
app.use(cors()); 
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// 1. API Route Definitions
app.use('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/festivals', festivalsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/admin', adminRoutes);

// =========================================================================
// 2. FRONTEND ROUTING FIX (Corrected for Root app.js location)
// =========================================================================

// Serve static assets from the 'public' folder (CSS, jQuery, minified JS bundle)
// Path: [Project_Root]/public
app.use(express.static(path.join(__dirname, 'public'))); 

// Serve the Angular files from 'app-client' (index.html, views, individual scripts)
// Path: [Project_Root]/app-client
app.use(express.static(path.join(__dirname, 'app-client')));

// Catch-all route to serve index.html for all non-API URLs (Angular Routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app-client', 'index.html'));
});

// =========================================================================

const PORT = process.env.PORT || 3000;
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

module.exports = app;