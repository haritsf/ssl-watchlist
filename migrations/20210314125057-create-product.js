'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_function: {
        allowNull: false,
        foreignKey: 'id_group',
        type: Sequelize.INTEGER
      },
      domain: {
        allowNull: true,
        type: Sequelize.STRING
      },
      ip_address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      type_product: {
        allowNull: true,
        type: Sequelize.ENUM('db', 'app')
      },
      type_ssl: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING
      },
      days_remain: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      valid: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      valid_from: {
        allowNull: true,
        type: Sequelize.TIME
      },
      valid_to: {
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};