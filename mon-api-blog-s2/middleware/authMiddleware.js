const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.userId;
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Token invalide' });
        }
    }

    return res.status(401).json({ message: 'Pas de token, accès refusé' });
};

module.exports = { protect };