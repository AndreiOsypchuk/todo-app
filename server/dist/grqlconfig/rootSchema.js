"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootSchema = void 0;

var _graphql = require("graphql");

var _userSchema = require("./userSchema.grql");

var _todoListSchema = require("./todoListSchema.grql");

var rootSchema = (0, _graphql.buildSchema)("\n  ".concat(_todoListSchema.todoListQLSchema, "\n  ").concat(_userSchema.userQLSchema, "\n  input TodoInput {\n    _id: ID!, \n    title: String,\n    description: String\n    done: Boolean\n  }\n  type VoidResponse {\n    sucess: Boolean,\n    status: String\n  }\n\n  type Query {\n    todos(owner: ID): TodoList,\n    refresh: VoidResponse\n  }\n  type Mutation {\n    register(name: String!, email: String!, password: String!): User,\n    login(email: String!, password: String!): User,\n    logout: VoidResponse,\n    addTodo(title: String!, description: String): VoidResponse,\n    deleteTodos(todoIds: [ID]): VoidResponse,\n    updateTodo(todo: TodoInput!) : VoidResponse,\n    toggleTodo(todoId: ID): VoidResponse,\n  }\n"));
exports.rootSchema = rootSchema;