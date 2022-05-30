"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      group_abbr: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      group_full: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      group_div: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      group_is_group: {
        allowNull: false,
        type: Sequelize.ENUM("0", "1"),
      },
      group_is_dto: {
        allowNull: false,
        type: Sequelize.ENUM("0", "1"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Groups");
  },
};
