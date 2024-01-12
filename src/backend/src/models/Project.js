const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ""
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Project;