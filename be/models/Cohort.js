const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const Specialism = require('../models/Specialism');

const Cohort = sequelize.define('Cohort', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    date_start: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            const rawDate = this.getDataValue('date_start');
            return rawDate ? rawDate.toISOString().split('T')[0] : null;
          },
    },
    date_end: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            const rawDate = this.getDataValue('date_end');
            return rawDate ? rawDate.toISOString().split('T')[0] : null;
          },
    },
    specialism_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Specialism,
            key:'id'
        }
    },
    registered_at: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            const rawDate = this.getDataValue('registered_at');
            return rawDate ? rawDate.toISOString().split('T')[0] : null;
          },
    }
}, {
    tableName: 'cohorts',
    timestamps: false,
});

Cohort.belongsTo(Specialism, {foreignKey: 'specialism_id'});

module.exports = Cohort;