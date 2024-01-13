const Project = require('../models/Project');
const Team = require('../models/Team');
const User = require('../models/User');
const UserTeam = require('../models/UserTeam');

const projectController = {
    getProject: async (req, res) => {
        const project = await Project.findByPk(req.params.id, {
            include: [{
                model: Team,
                include: [{
                    model: User
                }]
            }]
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json(project);
    },
    getProjects: async (req, res) => {
        if (req.user.roleId === 2) {
            console.log("++++++++++++++++++");
            const projects = await Project.findAll({
                where: { teacherId: req.user.id },
                include: [{
                    model: Team
                }]
            });

            res.status(200).json(projects);
        } else {
            console.log("------------------");
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