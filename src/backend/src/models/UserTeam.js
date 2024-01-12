const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');
const User = require('./User');
const Team = require('./Team');

const UserTeam = sequelize.define('UserTeam', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    teamId: {
        type: DataTypes.INTEGER,
        references: {
            model: Team,
            key: 'id'
        }
    }
});

module.exports = UserTeam;