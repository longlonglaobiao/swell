const express = require("express");
const router = express.Router();
const apiController = require("../controller/api");
const saveFile = require("../middleware/saveFile");
const multiparty = require("multiparty"); //引入multiparty插件

/* 获取班级信息数据 */
router.get("/cls", function (req, res, next) {
  /*
  res.header("Access-Control-Allow-Origin", "*");
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  */
  let result = apiController.getCls();
  result.then((data) => {
    res.json(data);
  });
});
/*
router.post("/test", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  var body = req.body;
  console.log(body);
  res.end("您已成功提交数据");
});
*/

/**获取学科数据 */
router.get("/subject", function (req, res, next) {
  let result = apiController.getSubject();
  result.then((data) => {
    res.json(data);
  });
});

/**注册资料提交 */
router.post("/register", function (req, res, next) {
  const uinfo = req.body; /**获取传递过来的参数 */

  let result = apiController.addUserInfo(uinfo);
  result.then(
    (data) => {
      res.json({
        affRows: data.affectedRows,
      });
    },
    (err) => {
      console.log(err);
      console.log(err.errno);
      res.json({
        affRows: -1,
      });
    }
  );
});

/**登录验证 */
router.post("/logincheck", function (req, res, next) {
  const uinfo = req.body;
  let result = apiController.checkLogin(uinfo);
  result.then(
    (data) => {
      if (data.length == 1) {
        req.session.uname = data[0].uname;
        req.session.name = data[0].name;
        req.session.level = data[0].level;
        req.session.uid = data[0].id;
      }
      res.json(data);
    },
    (err) => {
      console.error(err);
    }
  );
});

/** 获取学生作业列表数据 */
router.get("/worklist", function (req, res, next) {
  let result = apiController.worklist(req.session.uid);
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

router.post("/workup", function (req, res, next) {
  let form = new multiparty.Form();
  let filename = "";
  let filepath = "";
  form.parse(req, function (err, fields, files) {
    console.log(fields);
    if (err) throw err;

    try {
      filename = fields.yname[0] + "--" + files.file[0].originalFilename;
      filepath = "./upload/uwork/" + fields.title[0];
      saveFile(files, filepath, filename);
      result = apiController.workUp(
        fields,
        "./uwork/" + fields.title[0] + "/" + filename
      );
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
    } catch (err) {
      throw err;
    }
  });
});

/** 获取作业详情 */
// router.get("/workdetail", function (req, res, next) {
//   let query = req.query;

//   let result = apiController.workdetail(query.id);
//   result.then(
//     (data) => {
//       console.log(data);
//       res.json(data);
//     },
//     (err) => {
//       console.error(err);
//     }
//   );
// });

module.exports = router;
