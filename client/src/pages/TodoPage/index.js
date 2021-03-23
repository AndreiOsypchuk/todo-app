import React from 'react';
import {client, REFRESH} from '../../apolloconfig';
import {GET_TODOS} from '../../apolloconfig';
import {TodoColumn} from '../../components'
import {useDispatch} from 'react-redux'
export const TodoPage = () => {
  const dispatch = useDispatch();
  //=============

  React.useEffect(() => {
    const fetchTodos = async () => {
      try {
        const {data} = await client.query({
          query: GET_TODOS,
        });
        console.log(data.todos);
        dispatch({type: 'LOAD_TODOS', payload: data.todos});
      } catch (e) {
        try {
          if (e.message === 'forbidden') {
            await client.query({
              query: REFRESH,
            });
            const {data} = await client.query({
              query: GET_TODOS,
            });
            console.log(data.todos);
            dispatch({type: 'LOAD_TODOS', payload: data.todos});
          }
        } catch (e) {
          console.log(e.message);
        }
        console.log(e.message);
      }
    };
    fetchTodos();
  }, [dispatch]);


  return (
    <div className="flex h-screen w-screen ">
      <TodoColumn colCategory='todo'/>
      <TodoColumn colCategory='doing'/>
      <TodoColumn colCategory='done'/>
    </div>
  );
};
