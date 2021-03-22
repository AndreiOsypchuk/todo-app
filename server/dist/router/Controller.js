"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _dbconfig = require("../dbconfig");

var _utils = require("./utils");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Controller = /*#__PURE__*/function () {
  function Controller() {
    (0, _classCallCheck2["default"])(this, Controller);
  }

  (0, _createClass2["default"])(Controller, null, [{
    key: "Register",
    value: function () {
      var _Register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, name, email, password, exists, hash, newUser, aToken, rToken;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;

                if (!(name && email && password)) {
                  _context.next = 20;
                  break;
                }

                _context.next = 5;
                return _dbconfig.User.findOne({
                  email: email
                });

              case 5:
                exists = _context.sent;

                if (exists) {
                  _context.next = 17;
                  break;
                }

                _context.next = 9;
                return (0, _utils.encrypt)(req.body.password);

              case 9:
                hash = _context.sent;
                newUser = new _dbconfig.User(_objectSpread(_objectSpread({}, req.body), {}, {
                  password: hash
                }));
                aToken = (0, _utils.tokenize)({
                  id: newUser._id
                }, '15m');
                rToken = (0, _utils.tokenize)({
                  id: newUser._id
                }, '1d');
                newUser.addToken(rToken);
                newUser.save(function (e) {
                  if (!e) {
                    res.cookie('acc', aToken, {
                      httpOnly: true,
                      maxAge: 12 * 3600000
                    });
                    res.cookie('ref', rToken, {
                      httpOnly: true,
                      maxAge: 12 * 3600000
                    });
                    var _newUser$_doc = newUser._doc,
                        _password = _newUser$_doc.password,
                        refTokens = _newUser$_doc.refTokens,
                        other = (0, _objectWithoutProperties2["default"])(_newUser$_doc, ["password", "refTokens"]);
                    res.status(200).json(_objectSpread({}, other));
                  } else {
                    res.status(400).json({
                      message: e.message
                    });
                  }
                });
                _context.next = 18;
                break;

              case 17:
                res.status(409).json({
                  message: 'user already exists'
                });

              case 18:
                _context.next = 21;
                break;

              case 20:
                res.status(400).json({
                  message: 'invalid credentials'
                });

              case 21:
                _context.next = 26;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](0);
                res.status(500).json({
                  message: _context.t0.message
                });

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 23]]);
      }));

      function Register(_x, _x2) {
        return _Register.apply(this, arguments);
      }

      return Register;
    }()
  }, {
    key: "Login",
    value: function () {
      var _Login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body2, email, password, user, match, aToken, rToken, _user$_doc, refTokens, _password2, other;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

                if (!(email && password)) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 5;
                return _dbconfig.User.findOne({
                  email: email
                });

              case 5:
                user = _context2.sent;

                if (user) {
                  match = (0, _utils.compare)(user.password, password);

                  if (match) {
                    aToken = (0, _utils.tokenize)({
                      id: user._id
                    }, '15m');
                    rToken = (0, _utils.tokenize)({
                      id: user._id
                    }, '1d');
                    user.addToken(rToken);
                    user.save();
                    res.cookie('acc', aToken, {
                      httpOnly: true,
                      maxAge: 12 * 3600000
                    });
                    res.cookie('ref', rToken, {
                      httpOnly: true,
                      maxAge: 12 * 3600000
                    });
                    _user$_doc = user._doc, refTokens = _user$_doc.refTokens, _password2 = _user$_doc.password, other = (0, _objectWithoutProperties2["default"])(_user$_doc, ["refTokens", "password"]);
                    res.status(200).json(_objectSpread({}, other));
                  } else {
                    res.status(403).json({
                      message: 'email or password is invalid'
                    });
                  }
                } else {
                  res.status(403).json({
                    message: 'email or password is invalid'
                  });
                }

                _context2.next = 10;
                break;

              case 9:
                res.status(400).json({
                  message: 'invalid credentials'
                });

              case 10:
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);
                res.status(500).json({
                  message: _context2.t0.message
                });

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 12]]);
      }));

      function Login(_x3, _x4) {
        return _Login.apply(this, arguments);
      }

      return Login;
    }()
  }, {
    key: "Logout",
    value: function () {
      var _Logout = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var ref, _jwt$verify, id, user;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                ref = req.cookies.ref;
                _jwt$verify = _jsonwebtoken["default"].verify(ref, process.env.JWT_SECRET), id = _jwt$verify.id;

                if (!ref) {
                  _context3.next = 16;
                  break;
                }

                _context3.next = 6;
                return _dbconfig.User.findById(id);

              case 6:
                user = _context3.sent;

                if (!user) {
                  _context3.next = 13;
                  break;
                }

                user.deleteToken(ref);
                user.save();
                res.status(200).json({
                  success: true
                });
                _context3.next = 14;
                break;

              case 13:
                throw new Error('something went wrong');

              case 14:
                _context3.next = 17;
                break;

              case 16:
                res.status(200).json({
                  success: true
                });

              case 17:
                _context3.next = 22;
                break;

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3["catch"](0);
                res.status(500).json({
                  message: _context3.t0.message
                });

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 19]]);
      }));

      function Logout(_x5, _x6) {
        return _Logout.apply(this, arguments);
      }

      return Logout;
    }()
  }, {
    key: "Refresh",
    value: function () {
      var _Refresh = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var ref, _jwt$verify2, id, user, exists, accToken;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                ref = req.cookies.ref;
                _jwt$verify2 = _jsonwebtoken["default"].verify(ref, process.env.JWT_SECRET), id = _jwt$verify2.id;

                if (!(ref && id)) {
                  _context4.next = 11;
                  break;
                }

                _context4.next = 6;
                return _dbconfig.User.findById(id);

              case 6:
                user = _context4.sent;
                exists = user.findToken(ref);

                if (user && exists) {
                  accToken = (0, _utils.tokenize)({
                    id: id
                  }, '15m');
                  res.cookie('rcc', accToken, {
                    httpOnly: true,
                    maxAge: 12 * 3600000
                  });
                  res.status(200).json({
                    success: true
                  });
                } else {
                  res.status(403).json({
                    message: 'invalid token'
                  });
                }

                _context4.next = 12;
                break;

              case 11:
                res.status(403).json({
                  message: 'invalid token'
                });

              case 12:
                _context4.next = 17;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4["catch"](0);
                res.status(500).json({
                  message: _context4.t0.message
                });

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 14]]);
      }));

      function Refresh(_x7, _x8) {
        return _Refresh.apply(this, arguments);
      }

      return Refresh;
    }()
  }, {
    key: "addTodo",
    value: function () {
      var _addTodo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, todo, user, _user$_doc2, refTokens, password, other;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                id = req.user.id;
                todo = req.body.todo;

                if (!(id && todo)) {
                  _context5.next = 10;
                  break;
                }

                _context5.next = 6;
                return _dbconfig.User.findById(id);

              case 6:
                user = _context5.sent;

                if (user) {
                  user.addTodo(todo);
                  user.save();
                  _user$_doc2 = user._doc, refTokens = _user$_doc2.refTokens, password = _user$_doc2.password, other = (0, _objectWithoutProperties2["default"])(_user$_doc2, ["refTokens", "password"]);
                  res.status(200).json(_objectSpread({}, other));
                } else {
                  res.status(400).json({
                    message: 'invalid entries'
                  });
                }

                _context5.next = 11;
                break;

              case 10:
                res.status(400).json({
                  message: 'invalid entries'
                });

              case 11:
                _context5.next = 16;
                break;

              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](0);
                res.status(500).json({
                  message: _context5.t0.message
                });

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 13]]);
      }));

      function addTodo(_x9, _x10) {
        return _addTodo.apply(this, arguments);
      }

      return addTodo;
    }()
  }, {
    key: "deleteTodo",
    value: function () {
      var _deleteTodo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var id, todoIds, user, _user$_doc3, refTokens, password, other;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                id = req.user.id;
                todoIds = req.body.todoIds;

                if (!(id && todoIds)) {
                  _context6.next = 13;
                  break;
                }

                _context6.next = 6;
                return _dbconfig.User.findById(id);

              case 6:
                user = _context6.sent;
                user.deleteTodos(todoIds);
                user.save();
                _user$_doc3 = user._doc, refTokens = _user$_doc3.refTokens, password = _user$_doc3.password, other = (0, _objectWithoutProperties2["default"])(_user$_doc3, ["refTokens", "password"]);
                res.status(200).json(_objectSpread({}, other));
                _context6.next = 14;
                break;

              case 13:
                res.status(400).json({
                  message: 'invalid entries'
                });

              case 14:
                _context6.next = 19;
                break;

              case 16:
                _context6.prev = 16;
                _context6.t0 = _context6["catch"](0);
                res.status(500).json({
                  message: _context6.t0.message
                });

              case 19:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 16]]);
      }));

      function deleteTodo(_x11, _x12) {
        return _deleteTodo.apply(this, arguments);
      }

      return deleteTodo;
    }()
  }, {
    key: "updateTodo",
    value: function () {
      var _updateTodo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var id, newTodo, user, _user$_doc4, refTokens, password, other;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                id = req.user.id;
                newTodo = req.body.newTodo;

                if (!(id && newTodo)) {
                  _context7.next = 17;
                  break;
                }

                _context7.next = 6;
                return _dbconfig.User.findById(id);

              case 6:
                user = _context7.sent;

                if (!user) {
                  _context7.next = 14;
                  break;
                }

                user.updateTodo(newTodo);
                user.save();
                _user$_doc4 = user._doc, refTokens = _user$_doc4.refTokens, password = _user$_doc4.password, other = (0, _objectWithoutProperties2["default"])(_user$_doc4, ["refTokens", "password"]);
                res.status(200).json(_objectSpread({}, other));
                _context7.next = 15;
                break;

              case 14:
                throw new Error('user not found');

              case 15:
                _context7.next = 18;
                break;

              case 17:
                res.status(400).json({
                  message: 'invalid entries'
                });

              case 18:
                _context7.next = 23;
                break;

              case 20:
                _context7.prev = 20;
                _context7.t0 = _context7["catch"](0);
                res.status(500).json({
                  message: _context7.t0.message
                });

              case 23:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 20]]);
      }));

      function updateTodo(_x13, _x14) {
        return _updateTodo.apply(this, arguments);
      }

      return updateTodo;
    }()
  }, {
    key: "toggleTodo",
    value: function () {
      var _toggleTodo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
        var id, todoId, user, _user$_doc5, refTokens, password, other;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                id = req.user.id;
                todoId = req.body.todoId;

                if (!(id && todoId)) {
                  _context8.next = 17;
                  break;
                }

                _context8.next = 6;
                return _dbconfig.User.findById(id);

              case 6:
                user = _context8.sent;

                if (!user) {
                  _context8.next = 14;
                  break;
                }

                user.toggleTodo(todoId);
                user.save();
                _user$_doc5 = user._doc, refTokens = _user$_doc5.refTokens, password = _user$_doc5.password, other = (0, _objectWithoutProperties2["default"])(_user$_doc5, ["refTokens", "password"]);
                res.status(200).json(_objectSpread({}, other));
                _context8.next = 15;
                break;

              case 14:
                throw new Error('user not found');

              case 15:
                _context8.next = 18;
                break;

              case 17:
                res.status(400).json({
                  message: 'invalid entries'
                });

              case 18:
                _context8.next = 23;
                break;

              case 20:
                _context8.prev = 20;
                _context8.t0 = _context8["catch"](0);
                res.status(500).json({
                  message: _context8.t0.message
                });

              case 23:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 20]]);
      }));

      function toggleTodo(_x15, _x16) {
        return _toggleTodo.apply(this, arguments);
      }

      return toggleTodo;
    }()
  }]);
  return Controller;
}();

exports.Controller = Controller;