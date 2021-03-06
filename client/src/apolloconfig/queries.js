import {gql} from '@apollo/client'
export const REFRESH = gql(`
{
  refresh {
    success,
    status
  }
}`)

export const LOG_IN = gql(`
  mutation Login($email: String!, $password: String!){
    todos: login(email: $email, password: $password) {
      title
      description
      category
      _id
    }
  }
`)

export const REGISTER = gql(`
mutation Register($name: String!, $email: String!, $password: String!){
  todos: register(name: $name, email: $email, password:$password) {
    title
    description
    category
    _id
  }
}
`)

export const GET_TODOS = gql(`
{
  todos {
    title
    description
    category
    _id
  }
}
`)

export const UPDATE_TODO = gql(`
mutation updateTodo($_id: ID!, $title: String!, $description: String!, $category: String){
  todo: updateTodo(todo: {_id: $_id, title: $title, description: $description, category:$category}) {
    success
    status
  }
}
`)

export const ADD_TODO = gql(`
mutation addTodo($title: String!, $description: String){
  todo: addTodo(title: $title, description: $description ) {
    title
    description
    category
    _id
  }
}
`)

export const DELETE_TODO = gql(`
mutation deleteTodos($_id: [ID]!){
  todos: deleteTodos(todoIds: $_id ) {
    success
    status
  }
}
`)


export const LOG_OUT = gql(`
mutation {
  logout {
    success
    status
  }
}
`)