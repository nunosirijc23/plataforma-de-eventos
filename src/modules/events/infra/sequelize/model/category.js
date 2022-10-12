const { Model, DataTypes } = require('sequelize');

const sequelize = require('../../../../../shared/infra/sequelize/connection');

class Category extends Model {}

Category.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: DataTypes.STRING,
    createAt: DataTypes.DATE
}, {
    sequelize,
    tableName: "categories",
    timestamps: false
});

module.exports = Category;