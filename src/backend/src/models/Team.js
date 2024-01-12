const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');

const Team = sequelize.define('Team', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Untitled Team"
    },
    projectName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Untitled Project"
    },
    projectDescription: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    projectId: {
        type: DataTypes.UUID,
        allowNull: false
    }
});

module.exports = Team;