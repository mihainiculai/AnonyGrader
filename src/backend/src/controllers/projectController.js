const Project = require('../models/Project');
const Team = require('../models/Team');
const User = require('../models/User');
const UserTeam = require('../models/UserTeam');
const Deliverable = require('../models/Deliverable');
const Grade = require('../models/Grade');

const projectController = {
    getProject: async (req, res) => {
        const project = await Project.findByPk(req.params.id, {
            include: [{
                model: Team,
                include: [{
                    model: User
                },
                {
                    model: Deliverable,
                    include: [{
                        model: Grade
                    }]
                }]
            }]
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        for (const team of project.Teams) {
            for (const deliverable of team.Deliverables) {
                let sum = 0;
                let count = 0;
                let countNotNull = 0;
                for (const grade of deliverable.Grades) {
                    if (grade.grade !== null) {
                        sum += grade.grade;
                        countNotNull++;
                    }
                    count++;
                }
                deliverable.dataValues.grade = parseFloat((sum / countNotNull).toFixed(2));
                deliverable.dataValues.gradeCountTotal = count;
                deliverable.dataValues.gradeCount = countNotNull;
            }
        }

        return res.status(200).json(project);
    },
    getProjects: async (req, res) => {
        if (req.user.roleId === 2) {
            const projects = await Project.findAll({
                where: { teacherId: req.user.id },
                include: [{
                    model: Team
                }]
            });

            res.status(200).json(projects);
        } else {
            let projects = await Project.findAll({
                include: [{
                    model: Team,
                    include: [{
                        model: User,
                    }]
                }],
            });

            projects = projects.filter(project => {
                for (const team of project.Teams) {
                    for (const user of team.Users) {
                        if (user.id === req.user.id) {
                            return true;
                        }
                    }
                }
                return false;
            }
            );

            res.status(200).json(projects);
        }
    },
    createProject: async (req, res) => {
        if (req.user.roleId !== 2) {
            return res.status(403).json({ message: 'Teachers access only' });
        }

        const { title, description } = req.body;

        const project = new Project({
            title,
            description,
            teacherId: req.user.id
        });

        const savedProject = await project.save();
        return res.status(201).json(savedProject);
    },
    updateProject: async (req, res) => {
        if (req.user.roleId !== 2) {
            return res.status(403).json({ message: 'Teachers access only' });
        }

        const { title, description } = req.body;

        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.title = title;
        project.description = description;

        const savedProject = await project.save();
        return res.status(200).json(savedProject);
    },
    deleteProject: async (req, res) => {
        if (req.user.roleId !== 2) {
            return res.status(403).json({ message: 'Teachers access only' });
        }

        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.destroy();
        return res.status(204).json();
    },
};

module.exports = projectController;