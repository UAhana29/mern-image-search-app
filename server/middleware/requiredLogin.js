// This is our "guard"
module.exports = (req, res, next) => {
    if (!req.user) {
        // If the user is NOT logged in, send an error
        return res.status(401).send({ error: 'You must log in!' });
    }

    // If they are logged in, call 'next()' to
    // proceed to the actual API route
    next();
};