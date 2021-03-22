"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var userSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  refTokens: {
    type: [String]
  }
});

userSchema.methods.deleteToken = function delteToken(token) {
  this.refTokens = this.refTokens.filter(function (t) {
    return t !== token;
  });
};

userSchema.methods.addToken = function addToken(token) {
  if (this.refTokens.length >= 3) {
    this.refTokens.pop();
  }

  this.refTokens.push(token);
};

userSchema.methods.findToken = function findToken(token) {
  return this.refTokens.find(function (t) {
    return t === token;
  });
};

var User = _mongoose["default"].model('User', userSchema);

exports.User = User;