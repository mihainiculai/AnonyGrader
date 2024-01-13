const Deliverable = require('../models/Deliverable');
const Grade = require('../models/Grade');
const Team = require('../models/Team');
const User = require('../models/User');

const deliverableController = {
    getDeliverableByTeamId: async (req, res) => {
        const { id } = req.params;

        const deliverable = await Deliverable.findOne({
            where: { teamId: id },
            include: [
                {
                    model: Grade,
                }
            ]
        });

        return res.status(200).json(deliverable);
    },
    addDeliverable: async (req, res) => {
        const { title, details, teamId, dueDate, videoLink, serverLink } = req.body;
        const deliverable = new Deliverable({
            title,
            details,
            teamId,
            dueDate,
            videoLink,
            serverLink
        });

        const savedDeliverable = await deliverable.save();

        const team = await Team.findByPk(teamId);
        const projectId = team.projectId;

        const teams = await Team.findAll({
            where: { projectId },
            include: [
                {
                    model: User,
                }
            ]
        });
        const otherTeams = teams.filter(t => t.id !== teamId);

        const userIds = [];
        for (let team of otherTeams) {
            for (let user of team.Users) {
                userIds.push(user.id);
            }
        }

        let shuffled = userIds.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, Math.ceil(shuffled.length / 2));

        for (let userId of selected) {
            const grade = new Grade({
                deliverableId: savedDeliverable.id,
                userId
            });

            await grade.save();
        }

        return res.status(201).json(savedDeliverable);
    },
    updateDeliverable: async (req, res) => {
        const { id } = req.params;
        const { title, details, dueDate, videoLink, serverLink } = req.body;

        const deliverable = await Deliverable.findByPk(id);

        if (!deliverable) {
            return res.status(404).json({ message: 'Deliverable not found' });
        }

        deliverable.title = title;
        deliverable.details = details;
        deliverable.dueDate = dueDate;
        deliverable.videoLink = videoLink;
        deliverable.serverLink = serverLink;

        const updatedDeliverable = await deliverable.save();

        return res.status(200).json(updatedDeliverable);
    },
    deleteDeliverable: async (req, res) => {
        const { id } = req.params;

        const deliverable = await Deliverable.findByPk(id);

        if (!deliverable) {
            return res.status(404).json({ message: 'Deliverable not found' });
        }

        await deliverable.destroy();

        return res.status(200).json({ message: 'Deliverable deleted' });
    }
};

module.exports = deliverableController;