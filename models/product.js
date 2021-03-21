const Sequelize = require('sequelize')
const connection = require('../config/connection')

module.exports = connection.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_function: {
    type: Sequelize.INTEGER,
    foreignKey: 'id_group',
  },
  domain: Sequelize.STRING(25),
  ip_address: Sequelize.STRING(25),
  type_product: Sequelize.ENUM('db', 'app'),
  type_ssl: Sequelize.STRING(),
  status: Sequelize.STRING(),
  days_remain: Sequelize.INTEGER(4),
  valid: Sequelize.BOOLEAN,
  valid_from: Sequelize.TIME,
  valid_to: Sequelize.TIME,
})