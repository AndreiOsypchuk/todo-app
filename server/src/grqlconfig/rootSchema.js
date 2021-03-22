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
    done: Boolean
  }
  type VoidResponse {
    sucess: Boolean,
    status: String
  }

  type Query {
    todos(owner: ID): TodoList,
    refresh: VoidResponse
  }
  type Mutation {
    register(name: String!, email: String!, password: String!): User,
    login(email: String!, password: String!): User,
    logout: VoidResponse,
    addTodo(title: String!, description: String): VoidResponse,
    deleteTodos(todoIds: [ID]): VoidResponse,
    updateTodo(todo: TodoInput!) : VoidResponse,
    toggleTodo(todoId: ID): VoidResponse,
  }
`);
