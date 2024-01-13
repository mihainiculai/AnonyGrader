const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');

const Deliverable = sequelize.define('Deliverable', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    details: {
        type: DataTypes.STRING,
        allowNull: false
    },
    teamId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    videoLink: {
        type: DataTypes.STRING,
        allowNull: true
    },
    serverLink: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

module.exports = Deliverable;