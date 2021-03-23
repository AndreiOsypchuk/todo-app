import react from 'react';
import {useDispatch} from 'react-redux';
import {useMutation} from '@apollo/client';

export const TodoForm = ({todo}) => {
  return (
    <li
      draggable
      onDragStart={(e) => handleDragStart(e, todo._id, origin)}
      className="flex jsutify-center align-cener h-auto w-11/12 bg-gray-300 rounded-lg mb-2 shadow transition duration-300 cursor-move hover:shadow-xl p-4"
    >
      <div>
        <input className="text-xl font-bold font-mono" value={todo.title} />
        <input value={todo.description} />
      </div>
    </li>
  );
};
