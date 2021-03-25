import React from 'react';

import {TodoForm} from '../TodoForm';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
export const TodoItem = ({todo, origin}) => {
  const [updating, setUpdating] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const handleDragStart = (e, id, or) => {
    e.dataTransfer.setData('id', id);
    e.dataTransfer.setData('origin', or);
    e.stopPropagation();
  };
  const handleUpdateClose = () => {
    setUpdating(false);
  };
  const handleMenuOpen = (e) => {
    setMenuAnchor(e.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const handleEdit = () => {
    handleMenuClose();
    setUpdating(true);
  }
  React.useEffect(() => console.log(todo, 'from item'), [todo]);
  return (
    <>
      {updating ? (
        <TodoForm todo={todo} action="update" handleClose={handleUpdateClose} />
      ) : (
        <li
          draggable
          onDragStartCapture={(e) => handleDragStart(e, todo._id, origin)}
          className=" relative flex flex-col jsutify-center align-cener h-auto w-full bg-gray-200 rounded-lg mb-2 shadow transition duration-300 cursor-move hover:shadow-xl p-4"
        >
            <div className="absolute right-2 top-0 cursor-pointer">
              <MoreHorizIcon onClick={handleMenuOpen} />
              <Menu
                id="simple-menu"
                anchorEl={menuAnchor}
                keepMounted
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
              </Menu>
            </div>
          <div onDoubleClick={() => setUpdating(true)} className="">
            <h1 className=" font-bold font-mono">{todo.title}</h1>
            <p className="text-sm">{todo.description}</p>
          </div>
        </li>
      )}
    </>
  );
};
