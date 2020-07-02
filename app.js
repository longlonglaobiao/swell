const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const redisStore = require("connect-redis")(session);
const redisClient = require("./db/redis");
// const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");
const userRouter = require("./routes/user");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(bodyParser.json({ limit: "50MB" }));
// app.use(bodyParser.urlencoded({ limit: "50MB", extended: false }));

const sessionStore = new redisStore({
  client: redisClient,
});
app.use(
  session({
    secret: "biao_swell_#@123", //密匙
    cookie: {
      path: "/", //默认值
      httpOnly: true /**默认值 ,让前端代码不能修改cookie */,
      maxAge: 60 * 60 * 1000,
    },
    store: sessionStore,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "upload")));

app.use("/", userRouter);
app.use("/index", indexRouter);
app.use("/admin", adminRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
