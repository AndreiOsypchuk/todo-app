import {UserController, TodoController} from '../controller';
export const getRoot = async (req, res, graphQLParams) => {
  return {
    register: async (args) => await UserController.Register(args, req, res),
    login: async (args) => await UserController.Login(args, req, res),
    refresh: async () => await UserController.Refresh(req, res),
    logout: async () => await UserController.Logout(req, res),
    addTodo: async (args) => await TodoController.addTodo(args, req),
    deleteTodos: async (args) => await TodoController.deleteTodo(args, req),
    updateTodo: async (args) => await TodoController.updateTodo(args, req),
    toggleTodo: async (args) => await TodoController.toggleTodo(args, req),
    todos: async () => await TodoController.getTodos(req)
  };
};
