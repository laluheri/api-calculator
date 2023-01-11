var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const config = require("./app/config");
const userRouter = require("./app/login/router");
const accessRouter = require("./app/access/router");
var app = express();

console.log("ENV " + config.serviceName);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", userRouter);
app.use("/api", accessRouter);

module.exports = app;
