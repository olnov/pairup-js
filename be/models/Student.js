const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const Cohort = require('../models/Cohort');

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    full_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    skill_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cohort_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cohort,
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
    tableName: 'students',
    timestamps: false,
});

Cohort.hasMany(Student, {foreignKey: 'cohort_id'});
Student.belongsTo(Cohort, {foreignKey: 'cohort_id'});

module.exports = Student;