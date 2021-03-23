import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useMutation} from '@apollo/client';
import {client, REFRESH, UPDATE_TODO} from '../../apolloconfig';
import {TodoItem} from '../TodoItem';
export const TodoColumn = ({colCategory}) => {
  const todos = useSelector((store) => store.todos);
  const dispatch = useDispatch();
  const [updateTodoMutation] = useMutation(UPDATE_TODO);

  const updateTodo = async (todo) => {
    try {
      await updateTodoMutation({variables: {...todo}});
    } catch (e) {
      if (e.message === 'forbidden') {
        await client.query({query: REFRESH});
        await updateTodo(todo);
      } else if (e.message === 'invalid token') {
        dispatch({type: 'LOG_OUT'});
      } else {
        console.log(e.message);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('id');
    const origin = e.dataTransfer.getData('origin');
    let from = todos[origin];
    let to = todos[colCategory];
    let t;
    for (let i = 0; i < from.length; i++) {
      if (from[i]._id === id) {
        t = {...from[i], category: colCategory};
        from.splice(i, 1);
      }
    }
    to.push(t);
    dispatch({
      type: 'SET_TODOS',
      payload: {...todos, [origin]: from, [colCategory]: to},
    });
    updateTodo(t);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div className="bg-yellow-300 flex-1 flex-grow">
      <h1 className="text-3xl">
        {colCategory.charAt(0).toUpperCase() + colCategory.slice(1)}
      </h1>
      <div
        className="border-t-2 bg-white overflow-y-auto transition pb-32 duration-100 hover:pb-32 max-h-96 h-auto"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e)}
      >
        {todos[colCategory].map((thing) => (
          <TodoItem key={thing._id} todo={thing} origin={colCategory} />
        ))}
      </div>
    </div>
  );
};
