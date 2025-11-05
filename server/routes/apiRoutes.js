const mongoose = require('mongoose');
const axios = require('axios');
const requireLogin = require('../middleware/requiredLogin'); // Our guard

// Get our 'searches' blueprint
const Search = mongoose.model('searches'); 

module.exports = (app) => {

    // --- 1. Top Searches (Req #2) ---
    // GET /api/top-searches (Anyone can see this)
    app.get('/api/top-searches', async (req, res) => {
        try {
            // This is a MongoDB "Aggregation Pipeline".
            // It's a fancy way of saying "group all searches by term,
            // count them, sort by the highest count, and give me the top 5."
            const topSearches = await Search.aggregate([
                { $group: { _id: "$term", count: { $sum: 1 } } }, 
                { $sort: { count: -1 } },                         
                { $limit: 5 },                                    
                { $project: { _id: 0, term: "$_id", count: 1 } }  
            ]);
            res.send(topSearches);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    // --- 2. User's Search History (Req #5) ---
    // GET /api/history (Only logged-in users!)
    app.get('/api/history', requireLogin, async (req, res) => {
        try {
            // Find all searches that belong to the current user
            // 'req.user.id' comes from Passport
            const history = await Search.find({ _user: req.user.id })
                                        .sort({ timestamp: -1 }) // Newest first
                                        .limit(20);
            res.send(history);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    // --- 3. Search Functionality (Req #3) ---
    // POST /api/search (Only logged-in users!)
    app.post('/api/search', requireLogin, async (req, res) => {
        const { term } = req.body; // Get the search term from the client

        if (!term) {
            return res.status(400).send({ error: 'Search term is required' });
        }

        // 1. Store the search in our database
        const search = new Search({
            term,
            timestamp: new Date(),
            _user: req.user.id // Link it to the logged-in user
        });
        await search.save();

        // 2. Call the Unsplash API
        try {
            const unsplashUrl = `https://api.unsplash.com/search/photos?query=${term}&per_page=20`;
            const response = await axios.get(unsplashUrl, {
                headers: {
                    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
                }
            });

            // 3. Send the image results back to our React app
            res.send(response.data);

        } catch (err) {
            console.error("Unsplash API error", err);
            res.status(500).send({ error: 'Failed to fetch images' });
        }
    });

    // We also need to tell our app to parse JSON
    // This should be in index.js, but we can put it here for now.
    // Let's add it to index.js instead.
};