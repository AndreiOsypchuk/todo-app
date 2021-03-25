import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useMutation} from '@apollo/client';
import {client, REFRESH, UPDATE_TODO} from '../../apolloconfig';
import {TodoItem} from '../TodoItem';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TodoForm } from '../TodoForm';

export const TodoColumn = ({colCategory}) => {
  const todos = useSelector((store) => store.todos);
  const dispatch = useDispatch();
  const [updateTodoMutation] = useMutation(UPDATE_TODO);
  const [adding, setAdding] = React.useState(false);
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
    if (from && to) {
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
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const spawnTodoForm = () => {
    setAdding(true);
  }
  const destroyTodoForm = () => {
    setAdding(false);
  }

  return (
    <div className="shadow-lg flex-1 flex-grow m-3 rounded p-6">
      <div className="flex justify-between items-center p-1 mb-5 border-b-2">
        <h1 className="text-xl ">
          {colCategory.charAt(0).toUpperCase() + colCategory.slice(1)}
        </h1>
        {colCategory === 'todo' ? <AddCircleOutlineIcon onClick={spawnTodoForm} className="cursor-pointer"/> : null}
      </div>

      <div
        className="overflow-y-auto h-5/6 p-2 flex flex-col items-center "
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e)}
        >
        {adding ? <TodoForm action='create' handleClose={destroyTodoForm}/> : null}
        {todos[colCategory].map((thing) => (
          <TodoItem key={thing._id} todo={thing} origin={colCategory} />
        ))}
      </div>
    </div>
  );
};
