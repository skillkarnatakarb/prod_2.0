require('dotenv').config({ path: __dirname + '/.env' }); // Load environment variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Database connection
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const roleRoutes = require('./routes/roleRoutes'); // Role-based routes

const registrationRoutes = require('./routes/registrationRoutes');

const eventRoutes = require('./routes/eventRoutes');
const projectRoutes = require('./routes/projectRoutes');
const listRoutes = require('./routes/listRoutes');

const Event = require("./models/Event");



const app = express();

// Log environment variables for debugging (mask sensitive data)
if (process.env.NODE_ENV !== 'production') {
  console.log('Environment Variables:', {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI ? '***' : 'Not Defined', // Mask sensitive data
  });
} else {
  console.log('Environment Variables loaded for production mode.');
}

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Log middleware initialization
console.log('Middleware initialized: CORS and BodyParser');

// API Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/roles', roleRoutes); // Role-based routes
app.use('/api/projects', projectRoutes); // Project routes
app.use('/api/lists', listRoutes); // List routes
app.use('/api/events', eventRoutes); // Event routes

app.use('/api/registrations', registrationRoutes);

// Log initialized routes
const routes = ['/api/auth', '/api/roles', '/api/projects', '/api/lists', '/api/events'];
console.log('Routes initialized:', routes);

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
    error: process.env.NODE_ENV === 'production' ? undefined : err.message, // Hide error details in production
  });
});



// Add this debug log for Google login
console.log('Ensure Google Login endpoint is configured at /api/auth/google-login');


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Visit http://localhost:' + PORT + ' to access the API.');
});


// Additional logs for specific features
console.log('Ensure Google Login endpoint is configured at /api/auth/google-login');
console.log('Make sure MONGO_URI is set correctly in your .env file');


