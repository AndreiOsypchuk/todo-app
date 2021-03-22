export const userQLSchema = `
  type User {
    _id: ID,
    name: String,
    todoList: TodoList
  }
`;