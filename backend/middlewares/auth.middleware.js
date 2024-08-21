const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    jwt.verify(token, process.env.key, (err, decoded) => {
        if (err) {
            return res.status(403).json({ msg: 'Invalid token' });
        }
        req.user = decoded; // Add decoded user info to the request object
        next();
    });
};

module.exports = { auth };