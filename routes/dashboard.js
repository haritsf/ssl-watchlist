// FILE INI SEBAGAI MIDDLEWARE

const express = require("express");
const router = express.Router();

const dashboard_controller = require("../controller/dashboardController");

const authRequired = (req, res, next) => {
  if (req.user) return next();
  else res.redirect("/login?required=1");
};

// Get Watchlist
router.get("/dashboard/summary", dashboard_controller.get_summary);
router.get("/dashboard/watchlist", dashboard_controller.get_watchlist);

module.exports = router;
