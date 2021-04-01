const hbs = require( 'express-handlebars')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const csurf = require('csurf')
const helmet = require('helmet')
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const db = require('./config/db')(session)
const { Op } = require('sequelize')

const moment = require('moment')

const sslChecker = require('ssl-checker')
const getSslDetails = async (hostname) => await sslChecker(hostname)
// try {
//   sslChecker("bribook.bri.co.id", {
//     method: "GET",
//     port: 443,
//   }).then((result) => console.info(result))
// } catch (error) {
//   console.error(error)
// }

const PORT = process.env.PORT || 4008

// Load Router
// const dashboardRouter = require('./routes/dashboard')

// Load Model
const GroupModel = require('./models/group')
const ProductModel = require('./models/product')

GroupModel.hasMany(ProductModel, {foreignKey: 'id_function'})
ProductModel.belongsTo(GroupModel, {foreignKey: 'id_function'})

const getPagination = (page, size) => {
	// default data per page
	const limit = size ? +size : 5
	const offset = page ? page * limit : 0

	return { limit, offset }
}

const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: rows } = data
	const currentPage = page ? +page : 0
	const totalPages = Math.ceil(totalItems / limit)

	return { totalItems, rows, totalPages, currentPage }
}

// express app
const app = express()
app.set('view engine', 'hbs')
app.engine('hbs', hbs({
	extname: 'hbs',
	helpers: require('./config/helpers'),
	defaultView: 'default',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}))
app.use(cookieParser())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
	secret: 'awesome auth',
	store: db.SessionStore,
	resave: false,
	saveUninitialized: true
}))

// security
const csrf = csurf({ cookie: true })
app.use(helmet())
app.use(csrf)
app.use((err, req, res, next) => {
	if (err.code !== 'EBADCSRFTOKEN') return next(err)
	res.status(403).render('error', { message: 'Invalid form submission!' })
})

// passport
app.use(passport.initialize())
app.use(passport.session())
const passportConfig = { failureRedirect: '/login' }

const authRequired = (req, res, next) => {
	if (req.user) return next()
	else res.redirect('/login?required=1')
}

app.use((req, res, next) => {
	res.locals.user = req.user
	res.locals.isLoggedIn = (req.user && req.user.uid > 0)
	next()
})

passport.use(new LocalStrategy((username, password, done) => {
	db.getUserByUsername(username)
		.then(async (user) => {
			if (!user) return done(new Error('User not found!'), false)
			if (!(await db.isPasswordHashVerified(user.password_hash, password))) return done(new Error('Invalid Password'), false)
			return done(null, user)
		})
		.catch((err) => {
			return done(err)
		})
}))

passport.serializeUser((user, cb) => {
	cb(null, user.uid)
})

passport.deserializeUser((uid, cb) => {
	db.getUserById(uid)
		.then((user) => {
			cb(null, user)
		})
		.catch((err) => {
			cb(err, null)
		})
})

// app.use('/dashboard', dashboardRouter)

/* Routes */

app.get('/', (req, res) => {
	res.render('partials/client/index')
	console.log(`you're at ${req.protocol}://${req.get('host')}${req.originalUrl}`)
})

app.get('/new', authRequired, (req, res) => {
	res.render('new')
	console.log(`you're at ${req.protocol}://${req.get('host')}${req.originalUrl}`)
})

app.get('/r', (req, res) => {
	res.render('register-success')
})

app.get('/home', authRequired, (req, res) => {
	res.render('home')
	console.log(`you're at ${req.protocol}://${req.get('host')}${req.originalUrl}`)
})

app.get('/dashboard/summary', authRequired, async (req, res) => {
	const countGroups = await GroupModel.count()
	const countApps = await ProductModel.count()
	const countWarn = await ProductModel.count({
		where: {
			days_remain: {
				[Op.lte]: 120
			}
		}
	})

	res.render('partials/dashboard/component/summary', {
		isSummary: true,
		sub: "General",
		title: "Summary",
		user: {
			name: res.locals.user.username,
			email: res.locals.user.email
		},
		countGroups: countGroups,
		countApps: countApps,
		countOngo: Math.floor(Math.random() * 101),
		countWarn: countWarn,
	})
	console.log(`username ${req.user.username} at ${req.protocol}://${req.get('host')}${req.originalUrl}`)
})

app.get('/dashboard/watchlist', authRequired, async (req, res) => {
	let now = moment(new Date())

	const joinProduct = await ProductModel.findAll({
		include: [{
			model: GroupModel,
			required: true
		}]
	}).then(products => {
		let now = moment(new Date()), end = moment(products.valid_to), days = end.diff(now, "days")
		console.log(end)
		if (days <= 30) {
			return products
		}
	})

	let arrCihuy = []

	for (let x = 0; x < joinProduct.length; x++) {
		let end = moment(joinProduct[x].dataValues.valid_to)
		console.log(end)
	}

	// console.log(joinProduct[])

	res.render('partials/dashboard/component/watchlist', {
		isWatchlist: true,
		sub: "General",
		title: "Watchlist",
		user: {
			name: res.locals.user.username,
			email: res.locals.user.email
		},
		allProducts: joinProduct
	})
	console.log(`username ${req.user.username} at ${req.protocol}://${req.get('host')}${req.originalUrl}`)
})

app.get('/dashboard/function', authRequired, async (req, res) => {
	console.log(`username ${req.user.username} at ${req.protocol}://${req.get('host')}${req.originalUrl}`)

	const allGroups = await GroupModel.findAll()

	res.render('partials/dashboard/component/function', {
		isFunction: true,
		sub: "Component",
		title: "Function Unit",
		user: {
			name: res.locals.user.username,
			email: res.locals.user.email
		},
		allGroups: allGroups
	})
})

app.get('/dashboard/application', authRequired, async (req, res) => {
	console.log(`username ${req.user.username} at ${req.protocol}://${req.get('host')}${req.originalUrl}`)

	const joinProduct = await ProductModel.findAll({
		include: [{
			model: GroupModel,
			required: true
		}]
	}).then(groups => {
		return groups
	})

	if (req.query.getSSL) {
		const productByID = await ProductModel.findByPk(parseInt(req.query.getSSL)).then(results => {
			return results
		})

		const getSSL = await sslChecker(productByID.domain, {
			method: "GET",
			port: 443,
		}).then(async (result) => {
			console.log(result)
			productByID.days_remain = result.daysRemaining
			productByID.valid_from = new Date(result.validFrom)
			productByID.valid_to = new Date(result.validTo)
			productByID.updatedAt = new Date()
			await productByID.save()
			return result
		}).catch(error => {
			res.redirect('back')
		})

		dateFrom = new Date(getSSL.validFrom).toLocaleString('id-ID')
		dateTo = new Date(getSSL.validTo).toLocaleString('id-ID')

		res.render('partials/dashboard/component/application', {
			isApplication: true,
			sub: "Component",
			title: "Application",
			user: {
				name: res.locals.user.username,
				email: res.locals.user.email
			},
			allProducts: joinProduct,
			hasSSL: true,
			hasilSSL: getSSL,
			dariTanggal: dateFrom,
			sampaiTanggal: dateTo,
			namaDomain: productByID.domain
		})
	} else {
		res.render('partials/dashboard/component/application', {
			isApplication: true,
			sub: "Component",
			title: "Application",
			user: {
				name: res.locals.user.username,
				email: res.locals.user.email
			},
			allProducts: joinProduct,
			hasSSL: false
		})
	}
})

// app.put('/dashboard/application/push/:appID', authRequired, async (req, res, next) => {
// 	console.log(`Parameternya: ${req.params.appID}`)
// 	const productByID = ProductModel.findByPk(parseInt(req.params.appID)).then(results => {
// 		return results
// 	}).then(async results => {
// 		const getSSL = await sslChecker(results.domain, {
// 			method: "GET",
// 			port: 443,
// 		}).then(async data => {
// 			const pushSSL = await ProductModel.update({
// 				days_remain: data.daysRemaining,
// 				valid_from: data.validFrom,
// 				valid_to: data.validTo,
// 				updatedAt: new Date()
// 			})
// 		})
// 	}).catch(error => {
// 		console.log(error)
// 	})
// })

// app.get('/dashboard/application/details/:appID', authRequired, async (req, res) => {
// 	console.log(`Parameternya: ${req.params.appID}`)
// 	const productByID = await ProductModel.findByPk(parseInt(req.params.appID)).then(results => {
// 		return results
// 	})
// 	console.log(productByID)
// 	res.render('partials/dashboard/component/application-details')
// })

app.all('/login', (req, res, next) => {
	new Promise((resolve, reject) => {
		if (req.method === 'GET') { return reject() }
		if (req.body.username && req.body.password) {
			passport.authenticate('local', (err, user, info) => {
				if (!err && user) {
					return resolve(user)
				}
				reject(err)
			})(req, res, next)
		}
		else {
			reject(new Error('Please fill all fields'))
		}
	})
		.then(user => new Promise((resolve, reject) => {
			req.login(user, err => { // save authentication
				if (err) return reject(err)
				return res.send('<script>location.href="/dashboard/summary"</script>')
			})
		}))
		.catch(error => {
			let errorMsg = (error && error.message) || ''
			if (!error && req.query.required) errorMsg = 'Authentication required'

			res.render('partials/client/component/login', {
				csrfToken: req.csrfToken(),
				hasError: (errorMsg && errorMsg.length > 0),
				error: errorMsg,
				form: req.body,
				notRegister: true,
				stateMuted: "text-muted"
			})
		})
})

app.all('/register', (req, res) => {
	new Promise(async (resolve, reject) => {
		if (Object.keys(req.body).length > 0) {
			// console.log(req.body)
			if (
				!(req.body.email && req.body.email.length > 5)
				|| !(req.body.username && req.body.username.length > 1)
				|| !(req.body.password && req.body.password.length > 3)
				|| !(req.body.password2 && req.body.password2.length > 3)
			) {
				reject('Please fill all fields')
			}
			else if (!(
				req.body.email.indexOf('@') !== -1 
				&& req.body.email.indexOf('.') !== -1
			)) {
				reject('Invalid email address')
			}
			else if (req.body.password !== req.body.password2) {
				reject("Password don't match")
			}
			else if (await db.isUsernameInUse(req.body.username)) {
				reject('Username is taken')
			}
			else if (await db.isEmailInUse(req.body.email)) {
				reject('Email address is already registered')
			}
			else {
				resolve(true)
			}
		}
		else {
			resolve(false)
		}
	})
		.then(isValidFormData => new Promise((resolve, reject) => {
			if (Object.keys(req.body).length > 0 && isValidFormData) {
				db.createUserRecord({
					username: req.body.username,
					email: req.body.email,
					password: req.body.password
				})
					.then((createdUser) => {
						// console.log('====> user created...')
						// console.log(creationSuccessful)
						// authenticate?
						resolve(createdUser)
					})
					.catch(err => reject(err))
			}
			else {
				resolve(false)
			}
		}))
		.then((createdUserRecord) => {
			if (createdUserRecord) {
				// Log them in in the session
				req.login(createdUserRecord, (err) => {
					console.log(err)
				})
				res.render('partials/client/component/register-success')
			}
			else {
				res.render('partials/client/component/register', {
					csrfToken: req.csrfToken(),
					hasError: false,
					form: req.body,
					notLogin: true,
					stateMuted: "text-muted"
				})
			}
		})
		.catch((error) => {
			// console.log(error)
			res.render('partials/client/component/register', {
				csrfToken: req.csrfToken(),
				hasError: true,
				error,
				form: req.body
			})
		})
})

app.get('/logout', authRequired, (req, res) => {
	req.logout()
	console.log('Last User has been Ejected')
	return res.send('<script>location.href="/"</script>')
})

// App start
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
