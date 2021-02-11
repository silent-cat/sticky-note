let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let passport = require("passport");
let session = require("express-session");

let indexRouter = require("./routes/index");
let api = require("./routes/api");
let auth = require("./routes/auth");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views")); //制定模板目录
app.set("view engine", "ejs"); //设置模板引擎

// 中间件 用来支持req.body
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 获取cookie
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); //设置静态文件目录

app.use(session({ secret: "sessionsecret" }));
app.use(passport.initialize());
app.use(passport.session());

// 使用中间件之后的路由
app.use("/", indexRouter);
// 当一个请求过来是以'/api'开头,就打开routes的api.js进行路由的处理
app.use("/api", api);
// 登录
app.use("/auth", auth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
