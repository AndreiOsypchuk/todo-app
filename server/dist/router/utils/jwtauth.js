"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenize = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var tokenize = function tokenize(data, exp) {
  var secret = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : process.env.JWT_SECRET;

  var token = _jsonwebtoken["default"].sign(data, secret, {
    expiresIn: exp
  });

  return token;
};

exports.tokenize = tokenize;