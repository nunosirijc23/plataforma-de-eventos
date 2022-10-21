'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("events", {
      id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false
      },
      startTime: {
        type: Sequelize.DataTypes.TIME,
        allowNull: false
      },
      endTime: {
        type: Sequelize.DataTypes.TIME,
        allowNull: false
      },
      price: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
      },
      photo: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      capacity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      province: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      county: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      district: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      street: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      categoryId: {
        type: Sequelize.DataTypes.STRING,
        references: {
          model: {
            tableName: 'categories',
          },
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      producerId: {
        type: Sequelize.DataTypes.STRING,
        references: {
          model: {
            tableName: 'producers',
          },
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        allowNull: false
      },
      createAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("events");
  }
};
