import React from 'react';
import './index.css';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
export const Todo = ({todo}) => {
  return (
    <div className="t-container">
      <div>
        <h1 className="t-title">{todo.title}</h1>
        {todo.done ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
      </div>
      <p>{todo.description}</p>
    </div>
  );
};
