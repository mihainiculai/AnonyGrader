const User = require('../models/User');
const Project = require('../models/Project');
const Role = require('../models/Role');
const Team = require('../models/Team');
const Deliverable = require('../models/Deliverable');
const Grade = require('../models/Grade');

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
    async getUserStats(req, res) {
        const user = await User.findByPk(req.user.id);

        if (user.roleId === 1) {
            const teams = await Team.findAll({
                include: [
                    {
                        model: User,
                        where: { id: user.id },
                    },
                    {
                        model: Project,
                    },
                    {
                        model: Deliverable,
                        include: [{
                            model: Grade,
                        }]
                    }
                ]
            });

            const stats = {
                numberOfProjects: teams.length,
                numberOfDeliverables: 0,
                avgGrade: 0,
            }

            const grades = [];

            teams.forEach(team => {
                if (!team.Deliverables) return;
                stats.numberOfDeliverables += team.Deliverables.length;

                let deliverableGrade = 0;

                team.Deliverables.forEach(deliverable => {
                    if (!deliverable.Grades) return;
                    deliverable.Grades.forEach(grade => {
                        deliverableGrade += grade.grade;
                    });
                });

                grades.push(deliverableGrade / team.Deliverables.length);
            });

            stats.avgGrade = grades.reduce((a, b) => a + b, 0) / grades.length;
            stats.avgGrade = parseFloat(stats.avgGrade.toFixed(2));

            return res.status(200).send(stats);
        } else if (user.roleId === 2) {
            const projects = await Project.findAll({
                where: { teacherId: user.id },
                include: [
                    {
                        model: Team,
                        include: [{
                            model: Deliverable,
                        },
                        {
                            model: User,
                        }]
                    }
                ]
            });

            const stats = {
                numberOfProjects: projects.length,
                numberOfTeams: 0,
                numberOfStudents: 0,
            }

            projects.forEach(project => {
                if (!project.Teams) return;
                stats.numberOfTeams += project.Teams.length;

                project.Teams.forEach(team => {
                    if (!team.Users) return;
                    stats.numberOfStudents += team.Users.length;
                });
            });

            return res.status(200).send(stats);
        }
    }
};

module.exports = userController;