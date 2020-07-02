var express = require("express");
var router = express.Router();
const loginCheck = require("../middleware/loginCheck");
const saveFile = require("../middleware/saveFile");
const apiController = require("../controller/api");
//const multer = require("multer");

const fs = require("fs");
const multiparty = require("multiparty"); //引入multiparty插件
const path = require("path");
// const upload = multer({
//   dest: "upload", //上传文件存放路径
// });

/* 显示后台列表页. */
router.get("/list", loginCheck, function (req, res, next) {
  res.render("admin-list", { uinfo: req.session });
});

router.get("/task", loginCheck, function (req, res, next) {
  res.render("admin-task", { uinfo: req.session });
});

router.get("/assets", loginCheck, function (req, res, next) {
  res.render("admin-assets", { uinfo: req.session });
});

router.get("/class", loginCheck, function (req, res, next) {
  res.render("admin-class", { uinfo: req.session });
});

/**用户管理界面 */
router.get("/user", loginCheck, function (req, res, next) {
  res.render("admin-user", { uinfo: req.session });
});

/**用户列表数据 */
router.get("/user/list", loginCheck, function (req, res, next) {
  //res.render("adm", { uinfo: req.session });
  let query = req.query;
  console.log(query);
  const result = apiController.getUserList(query.cid);
  result.then(
    (data) => {
      console.log(data);
      res.json(data);
    },
    (err) => {
      console.error(err);
    }
  );
});

/**用户状态切换 */
router.get("/user/level", loginCheck, function (req, res, next) {
  let query = req.query;
  console.log(query);
  const result = apiController.userLevel(query);
  result.then(
    (data) => {
      res.json({
        affRows: data.affectedRows,
      });
    },
    (err) => {
      res.json({
        affRows: -1,
      });
    }
  );
});

/**班级课程信息管理 */
router.get("/course", loginCheck, function (req, res, next) {
  res.render("admin-course", { uinfo: req.session });
});

/**
 * 删除用户 
router.get("/user/del", loginCheck, function (req, res, next) {
  let query = req.query;
  console.log(query);
  const result = apiController.userDel(query.uid);
  result.then(
    (data) => {
      res.json({
        affRows: data.affectedRows,
      });
    },
    (err) => {
      res.json({
        affRows: -1,
      });
    }
  );
});
*/
/** admin 作业发布 */
router.post("/api/task", loginCheck, function (req, res, next) {
  let form = new multiparty.Form();
  let d = new Date();
  let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  let filepath = "";
  let filename = "";
  let result = null;

  form.parse(req, function (err, fields, files) {
    if (err) throw err;

    filepath = "./upload/work/" + date;
    try {
      filename = files.file[0].originalFilename;
      saveFile(files, filepath, filename);

      result = apiController.addTask(
        fields,
        "/work/" + date + "/" + filename,
        date
      );
    } catch (err) {
      result = apiController.addTask(fields, "", date);
    }

    result.then(
      (data) => {
        res.json({
          affRows: data.affectedRows,
        });
      },
      (err) => {
        console.log(err);
        res.json({
          affRows: -1,
        });
      }
    );
  });
});

router.get("/api/getWorksList", loginCheck, function (req, res, next) {
  console.log(req.query);
  const result = apiController.getWorksList(req.query);

  result.then(
    (data) => {
      console.log(data.length);
      let resData = [];
      let widArr = [0];
      let names = [];
      if (data.length > 0) {
        let wid = data[0].wid;

        for (let i = 0; i < data.length; i++) {
          if (wid != data[i].wid) {
            widArr.push(i);
            wid = data[i].wid;
          }
          if (wid == data[0].wid) {
            names.push(data[i].name);
          }
        }

        for (let i = 0; i < widArr.length; i++) {
          let index = widArr[i];
          let info = [];
          let rows = [];
          info.push({
            wid: data[index].wid,
            title: data[index].title,
            retime: data[index].retime,
            file: data[index].file,
          });

          console.log(info);

          for (let j = names.length * i; j < names.length * (i + 1); j++) {
            rows.push({
              uid: data[j].uid,
              status: data[j].status,
              name: data[j].name,
            });
          }
          resData.push({
            rows: rows,
            info: info,
          });
        }
      }

      res.json({
        names,
        resData,
      });
    },
    (err) => {
      throw err;
    }
  );
});

module.exports = router;
