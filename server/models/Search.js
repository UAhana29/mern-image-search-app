const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the blueprint for our 'searches'
const searchSchema = new Schema({
    term: String, // The actual word the user searched for (e.g., "cats")
    timestamp: Date, // When they searched for it

    // This is the most important part!
    // It's a "reference" to the specific user who made the search.
    // It links this search to a user in our 'users' collection.
    _user: { type: Schema.Types.ObjectId, ref: 'users' }
});

// Tell mongoose to create a new "collection" named 'searches'
mongoose.model('searches', searchSchema);