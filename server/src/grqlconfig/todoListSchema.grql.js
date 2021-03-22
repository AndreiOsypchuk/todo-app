export const todoListQLSchema = `
  type Todo {
    _id: ID,
    title: String!,
    description: String,
    done: Boolean
  }
  type TodoList {
    _id: ID,
    owner: ID!,
    todos: [Todo!]
  }
`