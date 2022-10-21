const { Model, DataTypes } = require('sequelize');

const sequelize = require('../../../../../shared/infra/sequelize/connection');
const Category = require('./category');
const Producer = require('../../../../producer/infra/sequelize/model/producer');

class Event extends Model {}

Event.init({
    name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    price: DataTypes.FLOAT,
    photo: DataTypes.TEXT,
    capacity: DataTypes.INTEGER,
    province: DataTypes.STRING,
    county: DataTypes.STRING,
    district: DataTypes.STRING,
    street: DataTypes.STRING,
    description: DataTypes.TEXT,
    createAt: DataTypes.DATE
}, {
    sequelize,
    tableName: "events",
    timestamps: false
})

Event.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Event.belongsTo(Producer, { foreignKey: "producerId", as: "producer" });

module.exports = Event;