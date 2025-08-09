require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Updated fintech dashboard API - August 2025
const authRoutes = require('./routes/authRoutes');
const testRoute = require('./routes/testRoute');
const dashboardRoutes = require('./routes/dashboardRoutes');
const generatorRoutes = require('./routes/generators/generatorRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const errorHandler = require('./middleware/errorHandler');
const profileRoutes = require('./routes/profileRoutes');
const profileUploadRoutes = require('./routes/profileUploadRoutes');

const app = express();

app.use(express.json());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      scriptSrc: ["'self'", "'unsafe-inline'"]
    }
  }
}));
const allowedOrigins = [
  'https://fintech-dashboard-api-mu.vercel.app',
];

// Add frontend URL from environment variable if available
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      return callback(new Error('CORS not allowed from this origin'), false);
    }
  },
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type']
}));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    standardHeaders: true,
    legacyHeaders: false,
  })
);

//Check api health status
app.get('/api/health', (req, res) => {
  res.json({ status: "OK" });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/profile', profileUploadRoutes);
app.use('/api', dashboardRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/test', testRoute);

app.use(errorHandler);

module.exports = app;
const { swaggerUi, swaggerSpec } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
