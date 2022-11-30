'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('tickets', 'createAt', 'createdAt');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('tickets', 'createdAt', 'createAt');
  }
};
