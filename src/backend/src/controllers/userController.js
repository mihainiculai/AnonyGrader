const User = require('../models/User');
const Project = require('../models/Project');
const Role = require('../models/Role');
const Team = require('../models/Team');

const userController = {
    async getStudents(req, res) {
        const students = await User.findAll({
            where: { roleId: 1 }
        });
        res.status(200).send(students);
    },
    async changeName(req, res) {
        const { user } = req;
        user.name = req.body.name;
        await user.save();
        res.status(200).send({ message: 'Name changed successfully' });
    },
};

module.exports = userController;