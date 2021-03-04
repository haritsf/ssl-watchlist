const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();

const INDEX_CONTROLLER = require("../controllers/index_controller");

ROUTER.get("/", INDEX_CONTROLLER.index);
ROUTER.get("/burger", INDEX_CONTROLLER.burger);
ROUTER.get("/login", INDEX_CONTROLLER.login);
ROUTER.get("/dashboard?", INDEX_CONTROLLER.adminDashboard);

module.exports = ROUTER;
