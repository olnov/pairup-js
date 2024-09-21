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
            const rawDate = this.getDataValue('registred_at');
            return rawDate ? rawDate.toISOString().split('T')[0] : null;
          },
    },
    date_end: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            const rawDate = this.getDataValue('registred_at');
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
    registred_at: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            const rawDate = this.getDataValue('registred_at');
            return rawDate ? rawDate.toISOString().split('T')[0] : null;
          },
    }
}, {
    tableName: 'cohorts ',
    timestamps: false,
});

Cohort.hasMany(Specialism, {foreignKey: 'specialism_id'});
Cohort.belongsTo(Specialism, {foreignKey: 'specialism_id'});

module.exports = Cohort;