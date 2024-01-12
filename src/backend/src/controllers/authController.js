const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authController = {
    async register(req, res) {
        const userExists = await User.findOne({ where: { email: req.body.email } });
        if (userExists) {
            return res.status(400).send({ message: 'There is already an account with this email' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            roleId: req.body.roleId
        });

        const token = jwt.sign({ userId: user.id, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        });

        res.status(201).send({ message: 'User registered successfully' });
    },

    async login(req, res) {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).send({ message: 'Authentication failed' });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ userId: user.id, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        });

        res.send({ message: 'Logged in successfully' });
    },

    async me(req, res) {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({ message: 'Not authenticated' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send({name: user.name, email: user.email, roleId: user.roleId });
    },

    logout(req, res) {
        res.cookie('token', '', { maxAge: 0 });
        res.send({ message: 'Logged out successfully' });
    },
};

module.exports = authController;