import {gql} from '@apollo/client'
export const REFRESH = gql(`
{
  refresh {
    sucess,
    status
  }
}`)

export const LOG_IN = gql(`

  mutation Login($email: String!, $password: String!){
    user: login(email: $email, password: $password) {
      _id
    }
  }
`)

export const REGISTER = gql(`

mutation Register($name: String!, $email: String!, $password: String!){
  register(name: $name, email: $email, password:$password) {
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
  updateTodo(todo: {_id: $_id, title: $title, description: $description, category:$category}) {
    sucess
    status
  }
}
`)

export const ADD_TODO = gql(`
mutation addTodo($title: String!, $description: String!){
  addTodo(title: $title, description: $description ) {
    sucess, status
  }
}
`)