const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const Specialism = sequelize.define('Specialism', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    stack: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'specialisms',
    timestamps: false,
});

module.exports = Specialism;