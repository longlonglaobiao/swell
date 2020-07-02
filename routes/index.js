var express = require("express");
var router = express.Router();
const loginCheck = require("../middleware/loginCheck");
const apiController = require("../controller/api");

router.get("/", loginCheck, function (req, res, next) {
  res.render("list", { uinfo: req.session });
});

router.get("/test", loginCheck, function (req, res, next) {
  res.render("test", { title: "Express" });
});

router.get("/userinfo", loginCheck, function (req, res, next) {
  res.render("templates/userinfo", { uinfo: req.session });
});

router.get("/task", loginCheck, function (req, res, next) {
  let query = req.query;
  let result = apiController.workdetail(query.id);

  return result.then(
    (data) => {
      console.log(data[0]);
      return res.render("task", { uinfo: req.session, detail: data[0] });
    },
    (err) => {
      console.error(err);
    }
  );
});

router.post("/user/edit", loginCheck, function (req, res, next) {
  const uinfo = req.body;
  console.log(uinfo);
  let result = apiController.userEdit(uinfo);
  result.then(
    (data) => {
      if (data.affectedRows == 1) {
        delete req.session.uname;
      }
      console.log(data);
      res.json(data);
    },
    (err) => {
      console.error(err);
    }
  );
});

module.exports = router;
