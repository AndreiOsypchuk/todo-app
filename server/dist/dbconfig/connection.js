"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbConnection = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var dbConnection = function dbConnection() {
  _mongoose["default"].connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  var db = _mongoose["default"].connection;
  db.on("open", function () {
    return console.log("connected to db");
  });
  db.on("error", function (e) {
    return console.log(e);
  });
};

exports.dbConnection = dbConnection;