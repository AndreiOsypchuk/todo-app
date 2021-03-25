import {buildSchema} from 'graphql';
import {userQLSchema} from './userSchema.grql';
import {todoListQLSchema} from './todoListSchema.grql';
export const rootSchema = buildSchema(`
  ${todoListQLSchema}
  ${userQLSchema}
  input TodoInput {
    _id: ID!, 
    title: String,
    description: String
    category: String
  }
  type VoidResponse {
    sucess: Boolean,
    status: String
  }

  type Query {
    todos: [Todo],
    refresh: VoidResponse
  }
  type Mutation {
    register(name: String!, email: String!, password: String!): User,
    login(email: String!, password: String!): User,
    logout: VoidResponse,
    addTodo(title: String!, description: String): [Todo],
    deleteTodos(todoIds: [ID]): [Todo],
    updateTodo(todo: TodoInput!) : [Todo],
  }
`);
