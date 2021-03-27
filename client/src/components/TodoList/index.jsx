import React from 'react';
import {TodoColumn} from '../TodoColumn'
import {useDispatch} from 'react-redux'
import {LoadTodos} from '../../redux/reducers'
import {client, REFRESH, GET_TODOS} from '../../apolloconfig';

export const TodoList = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchTodos = async () => {
      try {
        const {data} = await client.query({
          query: GET_TODOS,
        });
        dispatch({type: 'LOAD_TODOS', payload: data.todos});
      } catch (e) {
        try {
          if (e.message === 'forbidden') {
            await client.query({
              query: REFRESH,
            });
            dispatch(LoadTodos());
          }
        } catch (e) {
          if (e.message === 'invalid token') {
            dispatch({type: 'LOG_OUT'});
            client.resetStore();
          }
        }
      }
    };
    fetchTodos();
  }, [dispatch]);


  return (
    <div className="flex h-5/6 w-11/12">
      <TodoColumn colCategory='todo'/>
      <TodoColumn colCategory='doing'/>
      <TodoColumn colCategory='done'/>
    </div>
  );
};
