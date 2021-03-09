const Sequelize = require('sequelize')

const db_name = process.env.DB_NAME
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS

const connection = new Sequelize(db_name, db_user, db_pass, {
	dialect: 'mysql',
	logging: false,
})

connection.authenticate()
	.then(() => {
		// eslint-disable-next-line no-console
		console.log('Connection has been established successfully.')
	})
	.catch((err) => {
		// eslint-disable-next-line no-console
		console.error('Unable to connect to the database:', err)
	})

module.exports = connection