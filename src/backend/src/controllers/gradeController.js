const { Op } = require('sequelize');
const moment = require('moment');
const Grade = require('../models/Grade');
const Deliverable = require('../models/Deliverable');
const Team = require('../models/Team');
const Project = require('../models/Project');

const gradeController = {
    getProjectsToGrade: async (req, res) => {
        const fiveMinutesAgo = moment().subtract(5, 'minutes').toDate();

        const grades = await Grade.findAll({
            where: {
                userId: req.user.id,
                [Op.or]: [
                    { grade: null },
                    {
                        updatedAt: {
                            [Op.gte]: fiveMinutesAgo
                        }
                    }
                ]
            },
            include: [{
                model: Deliverable,
                include: [{
                    model: Team,
                    include: [{
                        model: Project,
                    }]
                }]
            }]
        });

        res.status(200).json(grades);
    },
    setGrade: async (req, res) => {
        const grade = await Grade.findByPk(req.params.id);

        if (!grade) {
            return res.status(404).json({ message: 'Grade not found' });
        }

        grade.grade = req.body.grade;
        await grade.save();

        return res.status(200).json(grade);
    }
}

module.exports = gradeController;