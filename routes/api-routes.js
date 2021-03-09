// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
const express = require("express");
const router = express.Router();
const API_CONTROLLER = require("../controllers/api_controller");

router.get("/", API_CONTROLLER.total);
router.post("/burgers", API_CONTROLLER.new);
router.delete("/burgers/:id", API_CONTROLLER.destroy);
router.put("/burgers/:id", API_CONTROLLER.change);
router.put("/burgers/nameChange/:id", API_CONTROLLER.nameChange);
module.exports = router;
