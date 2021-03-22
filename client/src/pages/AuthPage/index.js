import React from 'react';
import './index.css';
import {AuthForm} from '../../components';
import {Link} from 'react-router-dom';
import {Typography} from '@material-ui/core';
import {useLocation} from 'react-router-dom';
export const AuthPage = () => {
  const path = useLocation().pathname;
  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <Typography variant="h6">Todo app</Typography>
        {path === '/login' ? (
          <Link to="/" className="landing-link">
            Sign Up
          </Link>
        ) : (
          <Link to="/login" className="landing-link">
            Log in
          </Link>
        )}
      </nav>
      <div className="landing-main">
        <AuthForm/>
      </div>
    </div>
  );
};
