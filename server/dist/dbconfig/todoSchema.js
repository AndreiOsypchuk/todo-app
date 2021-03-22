"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var todoSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    requried: true
  },
  description: {
    type: String,
    "default": ''
  },
  done: {
    type: Boolean,
    "default": false
  }
});
exports.todoSchema = todoSchema;