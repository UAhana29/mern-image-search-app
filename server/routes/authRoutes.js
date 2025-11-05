const passport = require('passport');

// This file exports a function that we will give our 'app' object to
module.exports = (app) => {
    // === Google Routes ===

    // Route 1: Starts the Google login process
    // When a user clicks "Login with Google", send them to this URL.
    // 'passport' will see this and talk to Google.
    app.get(
        '/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] })
    );

    // Route 2: The "callback" URL
    // After the user logs in on Google's page, Google sends them
    // back to this URL. Passport handles the rest.
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            // After login, send them to the main search page
            res.redirect('http://localhost:3000/search'); // <-- THIS IS THE FIX 
        }
    );

    // === General Auth Routes ===

    // Route 3: Logout
    app.get('/api/logout', (req, res) => {
        req.logout(); // Passport kills the cookie
        res.redirect('/'); // Send them back to the homepage
    });

    // Route 4: Check who is logged in
    // Lets our React app check if a user is already logged in.
    app.get('/api/current_user', (req, res) => {
        res.send(req.user); // 'req.user' is put there by Passport
    });
};