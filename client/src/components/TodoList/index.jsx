import React from 'react';
import {TodoColumn} from '../TodoColumn'
import {useDispatch} from 'react-redux'
import {LoadTodos} from '../../redux/reducers'

export const TodoList = () => {
  const dispatch = useDispatch();
  //=============

  React.useEffect(() => {
    dispatch(LoadTodos());
  }, [dispatch]);


  return (
    <div className="flex h-5/6 w-11/12">
      <TodoColumn colCategory='todo'/>
      <TodoColumn colCategory='doing'/>
      <TodoColumn colCategory='done'/>
    </div>
  );
};
