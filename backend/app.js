var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const session = require("express-session");

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");

var app = express();

app.use(
  cors({
    origin: ["http://our-otteam.xyz"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "bc2023_otteam_dev_youngjae", // 이 값을 비밀로 유지하고 복잡하게 설정해야 합니다.
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // HTTPS를 사용하지 않는 경우 false로 설정합니다.
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/", indexRouter);
app.use("/api", apiRouter);
// 모든 라우트를 index.html로 리디렉션
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

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
