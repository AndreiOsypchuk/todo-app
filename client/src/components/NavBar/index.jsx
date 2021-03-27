import React from 'react';
import {useMutation} from '@apollo/client';
import {client, LOG_OUT} from '../../apolloconfig';
import {useDispatch} from 'react-redux';
export const NavBar = () => {
  const [logoutMutation] = useMutation(LOG_OUT);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      await logoutMutation();
      client.resetStore();
      client.clearStore()
      dispatch({type: 'LOG_OUT'});
    } catch (e) {
      dispatch({type: 'LOG_OUT'});
      client.resetStore();
      client.clearStore()
      console.log(e);
    }
    client.clearStore()
  };
  return (
    <nav className="flex justify-between items-center shadow h-10 py-8 px-10">
      <p className="font-bold text-blue-900">Todo App</p>
      <button onClick={handleLogOut}>Log Out</button>
    </nav>
  );
};
