"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodoList = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _todoSchema = require("./todoSchema");

var todoListSchema = new _mongoose["default"].Schema({
  owner: {
    type: _mongoose["default"].Types.ObjectId,
    required: true
  },
  todos: [_todoSchema.todoSchema]
});

todoListSchema.methods.addTodo = function addTodo(todo) {
  this.todos.push(todo);
};

todoListSchema.methods.updateTodo = function updateTodo(todo) {
  for (var i = 0; i < this.todos.length; i++) {
    if (this.todos[i]._id == todo._id) {
      this.todos[i] = todo;
      break;
    }
  }
};

todoListSchema.methods.toggleTodo = function toggleTodo(todoId) {
  for (var i = 0; i < this.todos.length; i++) {
    if (this.todos[i]._id == todoId) {
      this.todos[i].done = !this.todos[i].done;
      break;
    }
  }
};

todoListSchema.methods.deleteTodos = function deleteTodos(todoIds) {
  for (var i = 0; i < this.todos.length; i++) {
    for (var j = 0; j < todoIds.length; j++) {
      if (this.todos[i]._id == todoIds[j]) {
        this.todos.splice(i, 1);
      }
    }
  }
};

var TodoList = _mongoose["default"].model('TodoList', todoListSchema);

exports.TodoList = TodoList;