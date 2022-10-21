const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../../../../shared/infra/sequelize/connection');

class Producer extends Model {}

Producer.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    createAt: DataTypes.DATE
}, {
    sequelize,
    tableName: "producers",
    timestamps: false
});

module.exports = Producer;