const Project = require('../models/Project');
const Team = require('../models/Team');
const UserTeam = require('../models/UserTeam');
const User = require('../models/User');
const Deliverable = require('../models/Deliverable');
const Grade = require('../models/Grade');

const teamController = {
    getTeamByProjectId: async (req, res) => {
        const { id } = req.params;

        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const team = await Team.findOne({
            where: { projectId: id },
            include: [
                {
                    model: Project,
                    include: [
                        {
                            model: User,
                        }
                    ]
                },
                {
                    model: User,
                },
                {
                    model: Deliverable,
                    include: [
                        {
                            model: Grade,
                            include: [
                                {
                                    model: User
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        return res.status(200).json(team);
    },
    addTeam: async (req, res) => {
        const { projectId, studentsId } = req.body;
        const team = new Team({
            projectId
        });
        
        const savedTeam = await team.save();

        studentsId.forEach(studentId => {
            const userTeam = new UserTeam({
                userId: studentId,
                teamId: savedTeam.id
            });
            userTeam.save();
        });

        return res.status(201).json(savedTeam);
    },
    updateTeam: async (req, res) => {
        const { id } = req.params;
        const { studentsId } = req.body;

        const team = await Team.findByPk(id);

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        await UserTeam.destroy({
            where: { teamId: id }
        });

        studentsId.forEach(studentId => {
            const userTeam = new UserTeam({
                userId: studentId,
                teamId: id
            });
            userTeam.save();
        });

        return res.status(200).json(team);
    },
    deleteTeam: async (req, res) => {
        const { id } = req.params;

        const team = await Team.findByPk(id);

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        await UserTeam.destroy({
            where: { teamId: id }
        });

        await team.destroy();

        return res.status(200).json(team);
    },
    updateProjectDetail: async (req, res) => {
        const { id } = req.params;
        const { teamName, projectName, projectDescription } = req.body;

        const team = await Team.findByPk(id);

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        team.teamName = teamName;
        team.projectName = projectName;
        team.projectDescription = projectDescription;

        await team.save();

        return res.status(200).json(team);
    }
};

module.exports = teamController;