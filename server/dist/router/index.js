"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = _interopRequireDefault(require("express"));

var _Controller = require("./Controller");

var _middleware = require("./middleware");

var router = _express["default"].Router();

exports.router = router;
router.get('/', _middleware.authorize, function (req, res) {
  res.send("\n    <h1>Hello from / route! </h1>\n    ");
});
router.post('/register', _Controller.Controller.Register);
router.post('/login', _Controller.Controller.Login);
router.get('/refresh', _Controller.Controller.Refresh);
router.post('/logout', _Controller.Controller.Logout);
router.post('/addtodo', _middleware.authorize, _Controller.Controller.addTodo);
router["delete"]('/deletetodo', _middleware.authorize, _Controller.Controller.deleteTodo);
router.patch('/updatetodo', _middleware.authorize, _Controller.Controller.updateTodo);
router.patch('/toggle', _middleware.authorize, _Controller.Controller.toggleTodo);