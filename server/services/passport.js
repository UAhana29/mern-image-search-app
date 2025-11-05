const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users'); // Get our 'users' blueprint

// --- Session Management ---
// This runs when a user logs IN.
// It decides what info to put on the "wristband" (the cookie).
// We just put the user's database ID.
passport.serializeUser((user, done) => {
    done(null, user.id); // user.id is the unique _id from MongoDB
});

// This runs on every request from a logged-in user.
// It takes the ID from the "wristband" and finds the user in the database.
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user); // Attaches the full user model to the request
    });
});
// --- Google Strategy ---
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,     // Gets the ID from your .env
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Gets the secret from your .env
        callbackURL: '/auth/google/callback', // Must match the one in Google Console
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        // This function runs after Google confirms who the user is

        // 1. Check if we already have this user in our database
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
            // 2a. If we do, we're done!
            return done(null, existingUser);
        }

        // 2b. If we don't, create a new user in our database
        const user = await new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value
        }).save();

        done(null, user);
    }
));