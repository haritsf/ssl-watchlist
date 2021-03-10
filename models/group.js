const Sequelize = require('sequelize')
const connection = require('../config/connection')

module.exports = connection.define('Group', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  group_abbr: Sequelize.STRING(10),
  group_full: Sequelize.STRING(100),
  group_div: Sequelize.STRING(10),
  group_is_group: Sequelize.ENUM('0', '1'),
  group_is_dto: Sequelize.ENUM('0', '1'),
})

// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Group extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Group.init(
//     {
//       group_abbr: DataTypes.STRING(10),
//       group_full: DataTypes.STRING(100),
//       group_div: DataTypes.STRING(10),
//       group_is_group: DataTypes.ENUM("0", "1"),
//       group_is_dto: DataTypes.ENUM("0", "1"),
//     },
//     {
//       sequelize,
//       modelName: "Group",
//     }
//   );
//   return Group;
// };