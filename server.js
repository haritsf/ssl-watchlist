const express = require('express')
const bodyParser = require('body-parser')
const hbs = require( 'express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const csurf = require('csurf')
const helmet = require('helmet')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./config/db')(session)

const PORT = process.env.PORT || 4008

// express app
const app = express()
app.set('view engine', 'hbs')
app.engine('hbs', hbs({
	extname: 'hbs',
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

app.get('/dashboard/summary', authRequired, (req, res) => {
	res.render('partials/dashboard/component/summary', {
		isSummary: true,
		stateAct: "active",
		sub: "General",
		title: "Summary",
		user: {
			name: res.locals.user.username,
			email: res.locals.user.email
		}
	})
	console.log(`username ${req.user.username} at ${req.protocol}://${req.get('host')}${req.originalUrl}`)
})

app.get('/dashboard/icon', authRequired, (req, res) => {
	res.render('partials/dashboard/component/icon', {
		isIcon: true,
		stateAct: "active",
		sub: "General",
		title: "Icons",
		user: {
			name: res.locals.user.username,
			email: res.locals.user.email
		}
	})
	console.log(`username ${req.user.username} at ${req.protocol}://${req.get('host')}${req.originalUrl}`)
})

app.get('/dashboard/watchlist', authRequired, (req, res) => {
	res.render('partials/dashboard/component/watchlist', {
		isIcon: true,
		stateAct: "active",
		sub: "General",
		title: "Watchlist",
		user: {
			name: res.locals.user.username,
			email: res.locals.user.email
		}
	})
	console.log(`username ${req.user.username} at ${req.protocol}://${req.get('host')}${req.originalUrl}`)
})

app.get('/dashboard/function', authRequired, (req, res) => {
	const Test = async () => {
		const Group = require('./models/group')
		const allGroups = await Group.findAll()
		console.log(allGroups.every(group => group instanceof Group)) // true
		console.log("All groups:", JSON.stringify(allGroups, null, 2))
	}
	Test()
	res.render('partials/dashboard/component/function', {
		isIcon: true,
		stateAct: "active",
		sub: "Component",
		title: "Function Unit",
		user: {
			name: res.locals.user.username,
			email: res.locals.user.email
		}
	})
	console.log(`username ${req.user.username} at ${req.protocol}://${req.get('host')}${req.originalUrl}`)
})

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
				return res.send('<script>location.href="/dashboard/summary";</script>')
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
	return res.send('<script>location.href="/";</script>')
})

// App start
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
