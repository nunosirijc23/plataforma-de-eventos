const { Model, DataTypes } = require('sequelize');

const sequelize = require('../../../../../shared/infra/sequelize/connection');
const Event = require('./event');
const User = require('../../../../user/infra/sequelize/model/user');

class Ticket extends Model {}

Ticket.init({
    payment: DataTypes.STRING,
    bankReceiptDirectory: DataTypes.TEXT,
    isApproved: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE
}, {
    sequelize,
    tableName: "tickets",
    timestamps: false
})

Ticket.belongsTo(User, { foreignKey: "userId", as: "user" });
Ticket.belongsTo(Event, { foreignKey: "eventId", as: "event" });

module.exports = Ticket;