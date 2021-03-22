"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodoController = exports.UserController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _dbconfig = require("../dbconfig");

var _utils = require("./utils");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var UserController = /*#__PURE__*/function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "Register",
    value: function () {
      var _Register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(args, _, res) {
        var name, email, password, exists, hash, newUser, newTodoList, aToken, rToken;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                name = args.name, email = args.email, password = args.password;

                if (!(name && email && password)) {
                  _context.next = 25;
                  break;
                }

                _context.next = 5;
                return _dbconfig.User.countDocuments({
                  email: email
                });

              case 5:
                exists = _context.sent;

                if (exists) {
                  _context.next = 22;
                  break;
                }

                _context.next = 9;
                return (0, _utils.encrypt)(password);

              case 9:
                hash = _context.sent;
                newUser = new _dbconfig.User(_objectSpread(_objectSpread({}, args), {}, {
                  password: hash
                }));
                newTodoList = new _dbconfig.TodoList({
                  owner: newUser._doc._id
                });
                newTodoList.save();
                aToken = (0, _utils.tokenize)({
                  id: newUser._doc._id
                }, '15m');
                rToken = (0, _utils.tokenize)({
                  id: newUser._doc._id
                }, '1d');
                newUser.addToken(rToken);
                newUser.save();
                res.cookie('acc', aToken, {
                  maxAge: 36000 * 15
                });
                res.cookie('ref', rToken, {
                  maxAge: 3600000 * 24
                });
                return _context.abrupt("return", {
                  _id: newUser._doc._id,
                  name: newUser._doc.name,
                  todoList: _objectSpread({}, newTodoList._doc)
                });

              case 22:
                throw new Error('user already exists');

              case 23:
                _context.next = 26;
                break;

              case 25:
                throw new Error('invalid entries');

              case 26:
                _context.next = 31;
                break;

              case 28:
                _context.prev = 28;
                _context.t0 = _context["catch"](0);
                throw new Error(_context.t0.message);

              case 31:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 28]]);
      }));

      function Register(_x, _x2, _x3) {
        return _Register.apply(this, arguments);
      }

      return Register;
    }()
  }, {
    key: "Login",
    value: function () {
      var _Login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(args, _, res) {
        var email, password, user, match, todos, aToken, rToken;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                email = args.email, password = args.password;

                if (!(email && password)) {
                  _context2.next = 31;
                  break;
                }

                _context2.next = 5;
                return _dbconfig.User.findOne({
                  email: email
                });

              case 5:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 9;
                return (0, _utils.compare)(password, user._doc.password);

              case 9:
                _context2.t0 = _context2.sent;
                _context2.next = 13;
                break;

              case 12:
                _context2.t0 = null;

              case 13:
                match = _context2.t0;

                if (!(user && match)) {
                  _context2.next = 28;
                  break;
                }

                _context2.next = 17;
                return _dbconfig.TodoList.findOne({
                  owner: user._doc._id
                });

              case 17:
                todos = _context2.sent;

                if (!todos) {
                  _context2.next = 26;
                  break;
                }

                aToken = (0, _utils.tokenize)({
                  id: user._doc._id
                }, '15m');
                rToken = (0, _utils.tokenize)({
                  id: user._doc._id
                }, '1d');
                user.addToken(rToken);
                user.save();
                res.cookie('acc', aToken, {
                  maxAge: 36000 * 15
                });
                res.cookie('ref', rToken, {
                  maxAge: 3600000 * 24
                });
                return _context2.abrupt("return", {
                  _id: user._doc._id,
                  name: user._doc.name,
                  todoList: _objectSpread({}, todos._doc)
                });

              case 26:
                _context2.next = 29;
                break;

              case 28:
                throw new Error('wrong email or password');

              case 29:
                _context2.next = 32;
                break;

              case 31:
                throw new Error('invalid entries');

              case 32:
                _context2.next = 37;
                break;

              case 34:
                _context2.prev = 34;
                _context2.t1 = _context2["catch"](0);
                throw new Error(_context2.t1.message);

              case 37:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 34]]);
      }));

      function Login(_x4, _x5, _x6) {
        return _Login.apply(this, arguments);
      }

      return Login;
    }()
  }, {
    key: "Refresh",
    value: function () {
      var _Refresh = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var ref, _jwt$verify, id, user, aToken;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                ref = req.cookies.ref;

                if (!ref) {
                  _context3.next = 20;
                  break;
                }

                _jwt$verify = _jsonwebtoken["default"].verify(ref, process.env.JWT_SECRET), id = _jwt$verify.id;

                if (!id) {
                  _context3.next = 17;
                  break;
                }

                _context3.next = 7;
                return _dbconfig.User.findById(id);

              case 7:
                user = _context3.sent;

                if (!user) {
                  _context3.next = 14;
                  break;
                }

                aToken = (0, _utils.tokenize)({
                  id: user._doc._id
                }, '15m');
                res.cookie('acc', aToken, {
                  maxAge: 36000 * 15
                });
                return _context3.abrupt("return", {
                  sucess: true,
                  status: 'OK'
                });

              case 14:
                throw new Error('invalid token');

              case 15:
                _context3.next = 18;
                break;

              case 17:
                throw new Error('invalid token');

              case 18:
                _context3.next = 21;
                break;

              case 20:
                throw new Error('invalid token');

              case 21:
                _context3.next = 26;
                break;

              case 23:
                _context3.prev = 23;
                _context3.t0 = _context3["catch"](0);
                throw new Error(_context3.t0.message);

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 23]]);
      }));

      function Refresh(_x7, _x8) {
        return _Refresh.apply(this, arguments);
      }

      return Refresh;
    }()
  }, {
    key: "Logout",
    value: function () {
      var _Logout = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var ref, _jwt$verify2, id, user;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                ref = req.cookies.ref;

                if (!ref) {
                  _context4.next = 18;
                  break;
                }

                _jwt$verify2 = _jsonwebtoken["default"].verify(ref, process.env.JWT_SECRET), id = _jwt$verify2.id;

                if (!id) {
                  _context4.next = 15;
                  break;
                }

                _context4.next = 7;
                return _dbconfig.User.findById(id);

              case 7:
                user = _context4.sent;
                user.deleteToken(ref);
                user.save();
                res.clearCookie('ref');
                res.clearCookie('acc');
                return _context4.abrupt("return", {
                  sucess: true,
                  status: 'OK'
                });

              case 15:
                return _context4.abrupt("return", {
                  sucess: true,
                  status: 'OK'
                });

              case 16:
                _context4.next = 19;
                break;

              case 18:
                return _context4.abrupt("return", {
                  sucess: true,
                  status: 'OK'
                });

              case 19:
                _context4.next = 24;
                break;

              case 21:
                _context4.prev = 21;
                _context4.t0 = _context4["catch"](0);
                throw new Error(_context4.t0.message);

              case 24:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 21]]);
      }));

      function Logout(_x9, _x10) {
        return _Logout.apply(this, arguments);
      }

      return Logout;
    }()
  }]);
  return UserController;
}();

exports.UserController = UserController;

var TodoController = /*#__PURE__*/function () {
  function TodoController() {
    (0, _classCallCheck2["default"])(this, TodoController);
  }

  (0, _createClass2["default"])(TodoController, null, [{
    key: "addTodo",
    value: function () {
      var _addTodo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(args, req) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return TodoController.verifyRequest(req, /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(todos) {
                    return _regenerator["default"].wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            todos.addTodo(_objectSpread({}, args));
                            todos.save();

                          case 2:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));

                  return function (_x13) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 3:
                return _context6.abrupt("return", {
                  sucess: true,
                  status: 'OK'
                });

              case 6:
                _context6.prev = 6;
                _context6.t0 = _context6["catch"](0);
                throw new Error(_context6.t0.message);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 6]]);
      }));

      function addTodo(_x11, _x12) {
        return _addTodo.apply(this, arguments);
      }

      return addTodo;
    }()
  }, {
    key: "deleteTodo",
    value: function () {
      var _deleteTodo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(args, req) {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                TodoController.verifyRequest(req, /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(todos) {
                    return _regenerator["default"].wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            todos.deleteTodos(args.todoIds);
                            todos.save();

                          case 2:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function (_x16) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                return _context8.abrupt("return", {
                  sucess: true,
                  status: 'OK'
                });

              case 5:
                _context8.prev = 5;
                _context8.t0 = _context8["catch"](0);
                throw new Error(_context8.t0.message);

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 5]]);
      }));

      function deleteTodo(_x14, _x15) {
        return _deleteTodo.apply(this, arguments);
      }

      return deleteTodo;
    }()
  }, {
    key: "updateTodo",
    value: function () {
      var _updateTodo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(args, req) {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                TodoController.verifyRequest(req, /*#__PURE__*/function () {
                  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(todos) {
                    return _regenerator["default"].wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            todos.updateTodo(args.todo);
                            todos.save();

                          case 2:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  return function (_x19) {
                    return _ref3.apply(this, arguments);
                  };
                }());
                return _context10.abrupt("return", {
                  sucess: true,
                  status: 'OK'
                });

              case 5:
                _context10.prev = 5;
                _context10.t0 = _context10["catch"](0);
                throw new Error(_context10.t0.message);

              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[0, 5]]);
      }));

      function updateTodo(_x17, _x18) {
        return _updateTodo.apply(this, arguments);
      }

      return updateTodo;
    }()
  }, {
    key: "toggleTodo",
    value: function () {
      var _toggleTodo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(args, req) {
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                _context12.next = 3;
                return TodoController.verifyRequest(req, /*#__PURE__*/function () {
                  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(todos) {
                    return _regenerator["default"].wrap(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            todos.toggleTodo(args.todoId);
                            todos.save();

                          case 2:
                          case "end":
                            return _context11.stop();
                        }
                      }
                    }, _callee11);
                  }));

                  return function (_x22) {
                    return _ref4.apply(this, arguments);
                  };
                }());

              case 3:
                return _context12.abrupt("return", {
                  sucess: true,
                  status: 'OK'
                });

              case 6:
                _context12.prev = 6;
                _context12.t0 = _context12["catch"](0);
                throw new Error(_context12.t0.message);

              case 9:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[0, 6]]);
      }));

      function toggleTodo(_x20, _x21) {
        return _toggleTodo.apply(this, arguments);
      }

      return toggleTodo;
    }()
  }, {
    key: "verifyRequest",
    value: function () {
      var _verifyRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, cb) {
        var acc, _jwt$verify3, id, todos;

        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                acc = req.cookies.acc;

                if (!acc) {
                  _context13.next = 19;
                  break;
                }

                _jwt$verify3 = _jsonwebtoken["default"].verify(acc, process.env.JWT_SECRET), id = _jwt$verify3.id;

                if (!id) {
                  _context13.next = 10;
                  break;
                }

                _context13.next = 7;
                return _dbconfig.TodoList.findOne({
                  owner: id
                });

              case 7:
                _context13.t0 = _context13.sent;
                _context13.next = 11;
                break;

              case 10:
                _context13.t0 = null;

              case 11:
                todos = _context13.t0;

                if (!todos) {
                  _context13.next = 16;
                  break;
                }

                cb(todos);
                _context13.next = 17;
                break;

              case 16:
                throw new Error('no todo list was found');

              case 17:
                _context13.next = 20;
                break;

              case 19:
                throw new Error('forbidden');

              case 20:
                _context13.next = 25;
                break;

              case 22:
                _context13.prev = 22;
                _context13.t1 = _context13["catch"](0);
                throw new Error(_context13.t1.message);

              case 25:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[0, 22]]);
      }));

      function verifyRequest(_x23, _x24) {
        return _verifyRequest.apply(this, arguments);
      }

      return verifyRequest;
    }()
  }]);
  return TodoController;
}();

exports.TodoController = TodoController;