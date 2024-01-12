const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = () => async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) {
        return res.status(401).send({ message: 'Not authenticated' });
    }

    req.user = user;

    next();
}

module.exports = authenticate;