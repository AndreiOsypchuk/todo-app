import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useQuery} from '@apollo/client'
import { GET_TODOS } from '../../apolloconfig';
export const TodoPage = () => {
  const todos = useSelector(store => store.todos);
  const dispatch = useDispatch();
  const {loading, error, data} = useQuery(GET_TODOS);
  console.log(data);
  return (<h1>hello</h1>)
}