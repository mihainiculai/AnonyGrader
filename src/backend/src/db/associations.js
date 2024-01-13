const Deliverable = require('../models/Deliverable');
const Grade = require('../models/Grade');
const Project = require('../models/Project');
const Role = require('../models/Role');
const Team = require('../models/Team');
const User = require('../models/User');
const UserTeam = require('../models/UserTeam');

User.belongsTo(Role, { foreignKey: 'roleId' });
Project.belongsTo(User, { foreignKey: 'teacherId' });

User.belongsToMany(Team, { through: UserTeam, foreignKey: 'userId' });
Team.belongsToMany(User, { through: UserTeam , foreignKey: 'teamId'});

Team.belongsTo(Project, { foreignKey: 'projectId' });
Project.hasMany(Team, { foreignKey: 'projectId' });

Deliverable.belongsTo(Team, { foreignKey: 'teamId' });
Team.hasMany(Deliverable, { foreignKey: 'teamId' });

Grade.belongsTo(Deliverable, { foreignKey: 'deliverableId' });
Deliverable.hasMany(Grade, { foreignKey: 'deliverableId' });

Grade.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Grade, { foreignKey: 'userId' });