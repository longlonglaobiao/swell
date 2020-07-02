var express = require("express");
var router = express.Router();

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Express" });
});

router.get("/register", function (req, res, next) {
  res.render("register", { title: "Express" });
});

router.get("/over", function (req, res, next) {
  delete req.session.uname;
  res.redirect("/login");
});

module.exports = router;
