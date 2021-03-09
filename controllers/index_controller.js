const burger_model = require("../models/burgers.js");
exports.index = function (req, res) {
  res.render("index");
};

exports.burger = function (req, res) {
  burger_model.all(function (data) {
    var hbsObject = {
      burger: data,
    };
    console.log(hbsObject);
    res.render("partials/burgers/burger", hbsObject);
  });
};

exports.login = function (req, res) {
  res.render("partials/auth/login");
};

exports.adminDashboard = function (req, res) {
  res.render("layouts/dashboard");
};

exports.adminWatchlist = function (req, res) {
  res.render("partials/dashboard/watchlist");
};