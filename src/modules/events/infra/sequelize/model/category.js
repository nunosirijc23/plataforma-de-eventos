const { Model, DataTypes } = require('sequelize');

const sequelize = require('../../../../../shared/infra/sequelize/connection');

class Category extends Model {}

Category.init({
    name: DataTypes.STRING,
    createAt: DataTypes.DATE
}, {
    sequelize,
    tableName: "categories",
    timestamps: false
});

module.exports = Category;