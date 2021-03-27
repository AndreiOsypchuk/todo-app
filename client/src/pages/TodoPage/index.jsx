import React from 'react';
import {TodoList, NavBar} from '../../components';
import {LinearProgress} from '@material-ui/core';
import {useSelector} from 'react-redux';
export const TodoPage = () => {
  const [progress, setProgress] = React.useState(0);
  const todos = useSelector((state) => state.todos);
  React.useEffect(() => {
    let full = todos.todo.length + todos.doing.length + todos.done.length;
    setProgress(() => (todos.done.length / full) * 100);
  }, [todos]);

  return (
    <div className="flex flex-col h-screen w-screen ">
      <NavBar />
      <LinearProgress
        variant="determinate"
        value={progress}
        className="w-full"
      />
      <div className=" flex flex-grow flex-col justify-center items-center">
        <TodoList />
      </div>
    </div>
  );
};
