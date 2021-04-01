const ProductModel = require('../models/product')
const GroupModel = require('../models/group')

const { Op } = require('sequelize')

exports.get_summary = async (req, res, next) => {
    console.log("kiwwww")
    // const countGroups = await GroupModel.count()
	// const countApps = await ProductModel.count()
	// const countWarn = await ProductModel.count({
	// 	where: {
	// 		days_remain: {
	// 			[Op.lte]: 120
	// 		}
	// 	}
	// })

	// res.render('partials/dashboard/component/summary', {
	// 	isSummary: true,
	// 	sub: "General",
	// 	title: "Summary",
	// 	user: {
	// 		name: res.locals.user.username,
	// 		email: res.locals.user.email
	// 	},
	// 	countGroups: countGroups,
	// 	countApps: countApps,
	// 	countOngo: Math.floor(Math.random() * 101),
	// 	countWarn: countWarn,
	// })
	// console.log(`username ${req.user.username} at ${req.protocol}://${req.get('host')}${req.originalUrl}`)
}

exports.get_watchlist = async (req, res, next) => {
    const joinProduct = await ProductModel.findAll({
        include: [{
            model: GroupModel,
            required: true
        }],
        where: {
            days_remain: {
                [Op.lte]: 120
            }
        }
    }).then(products => {
        return products
    })

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
}