"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorize = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var authorize = function authorize(req, res, next) {
  try {
    var acc = req.cookies.acc;

    if (acc) {
      var data = _jsonwebtoken["default"].verify(acc, process.env.JWT_SECRET);

      if (data) {
        req.user = data;
        return next();
      } else {
        res.status(403).json({
          message: 'invalid token'
        });
      }
    } else {
      res.status(403).json({
        message: 'no token'
      });
    }
  } catch (e) {
    res.status(403).json({
      message: e.message
    });
  }
};

exports.authorize = authorize;