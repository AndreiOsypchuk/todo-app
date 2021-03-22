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
     _id
     title
     description
     done
    }
  }
`)