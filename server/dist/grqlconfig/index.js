"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.grqlConfig = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _rootValue = require("./rootValue");

var _rootSchema = require("./rootSchema");

var _expressGraphql = require("express-graphql");

var grqlConfig = (0, _expressGraphql.graphqlHTTP)( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, graphQLParams) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _rootSchema.rootSchema;
            _context.next = 3;
            return (0, _rootValue.getRoot)(req, res, graphQLParams);

          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt("return", {
              schema: _context.t0,
              rootValue: _context.t1,
              graphiql: true
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
exports.grqlConfig = grqlConfig;