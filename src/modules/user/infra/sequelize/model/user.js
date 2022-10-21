const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../../../../shared/infra/sequelize/connection');

class User extends Model {}

User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    photo: DataTypes.TEXT,
    password: DataTypes.TEXT,
    createAt: DataTypes.DATE
}, {
    sequelize,
    tableName: "users",
    timestamps: false
});

module.exports = User;