const Sequelize = require('sequelize')
const connection = require('./connection')
const bcrypt = require('bcryptjs')

const globalModelConfig = {
	underscored: true,
	timestamps: true,
}

const SessionModel = connection.define('Session', {
	sid: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	expires: Sequelize.DATE,
	data: Sequelize.STRING(50000),
}, globalModelConfig)

const UserModel = connection.define('User', {
	uid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: Sequelize.STRING(30),
	email: Sequelize.STRING(255),
	password_hash: Sequelize.STRING(255),
}, globalModelConfig)

connection.sync({
	alter: true
})

// const runQuery = (query, values, queryType) => sequelize.query(query, {
// 	replacements: values,
// 	type: queryType || sequelize.QueryTypes.SELECT
// })

const getUserById = uid => UserModel.findOne({ where: { uid } })
const getUserByUsername = username => UserModel.findOne({ where: { username } })
const getUserByEmail = email => UserModel.findOne({ where: { email } })

const isUsernameInUse = async username => {
	return await getUserByUsername(username) !== null
}

const isEmailInUse = async email => {
	return (await getUserByEmail(email) ? true : false)
}

const createUserRecord = userObj => new Promise(async (resolve, reject) => {
	const passwdHash = await createPasswordHash(userObj.password)
	UserModel.create({
		email: userObj.email,
		username: userObj.username,
		password_hash: passwdHash
	})
		.then((createdUser) => {
			resolve(createdUser)
		})
		.catch(err => reject(err))
})

const createPasswordHash = password => new Promise(async (resolve, reject) => {
	try {
		const saltRounds = 10
		bcrypt.hash(password, saltRounds, (err, hash) => {
			resolve(hash)
		})
	}
	catch (err) {
		reject(err)
	}
})

const isPasswordHashVerified = (hash, password) => new Promise(async (resolve, reject) => {
	try {
		bcrypt.compare(password, hash, (err, res) => {
			resolve(res)
		})
	}
	catch (err) {
		reject(err)
	}
})

module.exports = (session) => {
	const SequelizeStore = require('connect-session-sequelize')(session.Store)

	const SessionStore = new SequelizeStore({
		db: connection,
		table: 'Session'
	})

	return {
		SessionStore,
		getUserById,
		getUserByUsername,
		getUserByEmail,
		isUsernameInUse,
		isEmailInUse,
		createUserRecord,
		isPasswordHashVerified,
	}
}
