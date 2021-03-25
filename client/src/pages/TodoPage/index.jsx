import React from 'react';
import {TodoList, NavBar} from '../../components';
import {useDispatch} from 'react-redux';
export const TodoPage = () => {
  const dispatch = useDispatch();
  //=============

  return (
    <div className="flex flex-col h-screen w-screen ">
      <NavBar />
      <div className=" flex flex-grow justify-center items-center">
        <TodoList />
      </div>
    </div>
  );
};
