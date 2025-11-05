// 1. Import mongoose
const mongoose = require('mongoose');

// 2. Get the 'Schema' object from mongoose
// The Schema is our blueprint object
const { Schema } = mongoose;

// 3. Define the blueprint for our 'users'
const userSchema = new Schema({
    // We will store the user's ID from Google, GitHub, or Facebook
    googleId: String,
    githubId: String,
    facebookId: String,

    // We'll also store their name to say "Welcome, Ahanamol!"
    displayName: String,
    email: String
});

// 4. Tell mongoose to create a new "collection" (a table)
// named 'users' using the 'userSchema' blueprint.
mongoose.model('users', userSchema);