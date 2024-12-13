require('dotenv').config({ path: __dirname + '/.env' }); // Load environment variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Database connection
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const roleRoutes = require('./routes/roleRoutes'); // Role-based routes
const eventRoutes = require('./routes/eventRoutes');
const projectRoutes = require('./routes/projectRoutes');
const listRoutes = require('./routes/listRoutes');

const app = express();

// Debug: Log environment variables (remove this in production)
console.log('Loaded Environment Variables:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI ? '***' : 'Not Defined', // Mask sensitive data
});

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Debug: Log middleware initialization
console.log('Middleware initialized: CORS and BodyParser');

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/roles', roleRoutes); // Role-based routes
app.use('/api/projects', projectRoutes); // Project routes
app.use('/api/lists', listRoutes); // List routes
app.use('/api/events', eventRoutes); // Event routes

// Debug: Log route initialization
console.log('Routes initialized:', ['/api/auth', '/api/roles', '/api/projects', '/api/lists', '/api/events']);

// Handle undefined routes
app.use((req, res, next) => {
  console.warn(`Undefined route accessed: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    message: `Cannot ${req.method} ${req.originalUrl}. Endpoint not found.`,
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(`Global Error: ${err.message}`);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Debug: Add log for Google login configuration
console.log('Ensure Google Login endpoint is configured at /api/auth/google-login');
