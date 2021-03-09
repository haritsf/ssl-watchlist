const express = require("express");
const router = express.Router();

const INDEX_CONTROLLER = require("../controllers/index_controller");

router.get("/", INDEX_CONTROLLER.index);
router.get("/burger", INDEX_CONTROLLER.burger);
router.get("/login", INDEX_CONTROLLER.login);
router.get("/dashboard", INDEX_CONTROLLER.adminDashboard);
router.get("/watchlist", INDEX_CONTROLLER.adminWatchlist);

module.exports = router;
