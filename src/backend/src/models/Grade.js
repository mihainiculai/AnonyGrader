const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');

const Grade = sequelize.define('Grade', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    deliverableId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

module.exports = Grade;