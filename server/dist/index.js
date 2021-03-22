"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _dbconfig = require("./dbconfig");

var _grqlconfig = require("./grqlconfig");

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
app.use((0, _cors["default"])({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use('/graphql', _grqlconfig.grqlConfig);
(0, _dbconfig.dbConnection)();
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  return console.log('running on', PORT);
});