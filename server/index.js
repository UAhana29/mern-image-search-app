// This 'require('dotenv').config()' line loads all the variables from your .env file.
// It's very important that it's at the absolute top of your file.
require('dotenv').config();

// 1. Import the 'express' tool
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
// Connect to MongoDB

// 2. Create a new express app
const app = express();
// --- Middleware ---
// 1. Enable session-based sessions
// 0. Parse JSON request bodies
app.use(express.json());
app.use(
    session({
        secret: process.env.COOKIE_KEY, // Uses the key from your .env file
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
    })
);

// 2. Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
require('./models/User');
require('./models/Search');
// Load Passport configuration
require('./services/passport');
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch(err => console.error('MongoDB connection error:', err));

// 3. Tell the app to "listen" for requests on a specific "port"
// We'll try to use a port from the .env file, or default to 5000
const PORT = process.env.PORT || 5000;
// --- Routes ---
// Import and immediately call the authRoutes function, passing it 'app'
require('./routes/apiRoutes')(app);
require('./routes/authRoutes')(app);
app.listen(PORT, () => {
    // This message will print in your terminal so you know the server is working
    console.log(`Server is running on port ${PORT}`);
});