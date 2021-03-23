import React from 'react';

export const TodoItem = ({todo, origin}) => {
  const [editable, setEditable] = React.useState({title: false, desc: false});
  const handleDragStart = (e, id, or) => {
    console.log('drag start', id);
    e.dataTransfer.setData('id', id);
    e.dataTransfer.setData('origin', or);
    console.log(or);
  };
  const handleDoubleClick = (e) => {
    console.log(e.target.id);
    setEditable((editable) => ({...editable, [e.target.id]: true}));
  };

  const handleBlur = () => {
    setEditable(() => ({title: false, desc: false}));
    console.log('blurred');
  };
  return (
    <>
      <li
        draggable
        onDragStart={(e) => handleDragStart(e, todo._id, origin)}
        className="flex jsutify-center align-cener h-auto w-11/12 bg-gray-300 rounded-lg mb-2 shadow transition duration-300 cursor-move hover:shadow-xl p-4"
      >
        <div>
          <h1
            className="text-xl font-bold font-mono"
            contentEditable={editable.title}
            onBlur={handleBlur}
            onClick={handleDoubleClick}
            id="title"
          >
            {todo.title}
          </h1>
          <p
            contentEditable={editable.desc}
            onDoubleClick={handleDoubleClick}
            onBlur={handleBlur}
            id="desc"
          >
            {todo.description}
          </p>
        </div>
      </li>
    </>
  );
};
