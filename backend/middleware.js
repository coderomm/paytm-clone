const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "Authorization header missing or malformed"
        });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded && decoded.userId) {
            req.userId = decoded.userId;
            next()
        } else {
            return res.status(403).json({
                message: "Invalid token"
            });
        }
    } catch (err) {
        return res.status(403).json({
            message: "Token verification failed",
            error: err.message
        });
    }
};

module.exports = {
    authMiddleware
};