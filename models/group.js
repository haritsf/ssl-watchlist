const Sequelize = require("sequelize");
const connection = require("../config/connection");

module.exports = connection.define("Group", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  group_abbr: Sequelize.STRING(10),
  group_full: Sequelize.STRING(100),
  group_div: Sequelize.STRING(10),
  group_is_group: Sequelize.ENUM("0", "1"),
  group_is_dto: Sequelize.ENUM("0", "1"),
});
