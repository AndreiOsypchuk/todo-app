"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoListQLSchema = void 0;
var todoListQLSchema = "\n  type Todo {\n    _id: ID,\n    title: String!,\n    description: String,\n    done: Boolean\n  }\n  type TodoList {\n    _id: ID,\n    owner: ID!,\n    todos: [Todo!]\n  }\n";
exports.todoListQLSchema = todoListQLSchema;