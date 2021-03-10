'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Groups", [
      {
        id: 1,
        group_abbr: "ISG",
        group_full: "IT Strategy & Governance",
        group_div: "ISG",
        group_is_group: "0",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        group_abbr: "APP",
        group_full: "Application Management & Operation",
        group_div: "APP",
        group_is_group: "0",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        group_abbr: "DCE",
        group_full: "Digital Center of Excellence",
        group_div: "DCE",
        group_is_group: "0",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Groups", null, {})
  }
};
