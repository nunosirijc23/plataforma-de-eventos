'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'tickets',
      'bankReceiptDirectory',
      {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      }
    );

    await queryInterface.addColumn(
      'tickets',
      'isApproved',
      {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('tickets', 'bankReceiptDirectory');
    await queryInterface.removeColumn('tickets', 'isApproved');
  }
};