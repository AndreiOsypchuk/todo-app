import React from 'react';
import './index.css';
import {useSelector, useDispatch} from 'react-redux';
import {Todo} from '../../components';
import {Button, Typography, Grid} from '@material-ui/core';
export const TodoPage = () => {
  const todos = useSelector((store) => store.todoList);
  const dispatch = useDispatch();
  return (
    <div className="todo-container">
      <nav className="todo-nav">
        <Typography variant="h6">Todo app</Typography>
        <Button>Log out</Button>
      </nav>
      <div className="todo-main">
        <ul className="todo-list">
          
            {todos.map((todo) => {
              return (
                <li key={todo._id}>
                  <Todo todo={todo} />
                </li>
              );
            })}
          </ul>
      </div>
    </div>
  );
};
