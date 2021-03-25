import React from 'react';
import {useMutation} from '@apollo/client';
import {client, REFRESH, UPDATE_TODO} from '../../apolloconfig';
import {useDispatch} from 'react-redux';
import {Button} from '@material-ui/core';

export const TodoForm = ({todo, action, handleClose}) => {
  const dispatch = useDispatch();
  const [updateTodoMutation] = useMutation(UPDATE_TODO);
  const [input, setInput] = React.useState({title: todo.title, description: todo.description});
  
  const updateTodo = async (t) => {
    try {
      const {data} = await updateTodoMutation({variables: {...t}});
      console.log(data)
      dispatch({type: 'LOAD_TODOS', payload: data.todos})
    } catch (e) {
      if (e.message === 'forbidden') {
        await client.query({query: REFRESH});
        await updateTodo(t);
      } else if (e.message === 'invalid token') {
        dispatch({type: 'LOG_OUT'});
      } else {
        console.log(e.message);
      }
    }
  };

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setInput((input) => ({...input, [field]: value}));
  };

  const handleSubmit = async () => {
    try {
      if (action === 'update') {
        await updateTodo({...todo, title: input.title, description: input.description})
        handleClose();
      }
    } catch (e) {}
  };
  return (
    <li className="flex flex-col jsutify-center align-cener h-auto w-full bg-gray-200 rounded-lg mb-2 shadow p-4">
      <div className="flex flex-col h-full">
        <input
          defaultValue={todo.title}
          className="w-full mb-4 p-2 rounded bg-gray-50 shadow"
          onChange={handleChange}
          name="title"
        />

        <textarea
          type="text"
          defaultValue={todo.description}
          className="h-full w-full p-2 rounded bg-gray-50 shadow"
          onChange={handleChange}
          name="description"
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => handleClose()} style={{color: 'rgb(240,0, 0)'}} className="px-4 w-24 py-2">
          Cancel
        </Button>
        <Button
          style={{color: 'rgb(0, 240, 0)', fontWeight: 'bold'}}
          className="w-24 px-4 py-2"
          onClick={handleSubmit}
        >
          Ok
        </Button>
      </div>
    </li>
  );
};
