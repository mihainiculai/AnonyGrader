const Project = require('../models/Project');
const Team = require('../models/Team');

const projectController = {
    async getProjects(req, res) {
        if (req.user.roleId === 2) {
            const projects = await Project.findAll({
                where: { teacherId: req.user.id },
                include: [{
                    model: Team
                }]
            });

            res.send(projects);
        } else {
            const teams = await Team.findAll({
                where: { userId: req.user.id }
            });

            const projects = await Project.findAll({
                where: { id: teams.map(team => team.projectId) }
            });

            res.send(projects);
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