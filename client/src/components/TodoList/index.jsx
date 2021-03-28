import React from 'react';
import {TodoColumn} from '../TodoColumn'
export const TodoList = () => {
  return (
    <div className="flex h-5/6 w-11/12">
      <TodoColumn colCategory='todo'/>
      <TodoColumn colCategory='doing'/>
      <TodoColumn colCategory='done'/>
    </div>
  );
};
