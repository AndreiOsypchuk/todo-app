import React from 'react';
import {Grid, TextField, Button, Typography} from '@material-ui/core';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import './index.css';
import {validateName, validateEmail, validatePassword} from './validation';
export const AuthForm = ({label, header}) => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({});
  const [error, setError] = React.useState('');
  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    let validation = '';
    if (path === '/') {
      if (field === 'name') {
        const valid = validateName(value);
        validation = !valid ? 'invalid name format' : '';
      }
      if (field === 'email') {
        const valid = validateEmail(value);

        validation = !valid ? 'invalid email format' : '';
      }
      if (field === 'password') {
        const valid = validatePassword(value);

        validation = !valid
          ? 'password must be at least 6 characters long and have one lowercase, one uppercase, and a number'
          : '';
      }
    }
    setError(validation);
    setUser((user) => ({...user, [field]: value}));
  };

  const handleSubmit = async () => {
    if (!error) {
      if (path === '/') {
        try {
          const response = await axios.post('http://localhost:3001/register', user, {
            withCredentials: true,
          });
          dispatch({type: 'ADD_USER', payload: {...response.data, loggedIn: true}});
        } catch (e) {
          console.log(e);
        }
      }
      if (path === '/login') {
        try {
          const response = await axios.post('http://localhost:3001/login', user, {
            withCredentials: true,
          });
          dispatch({type: 'ADD_USER', payload: {...response.data, loggedIn: true}});
        } catch (e) {
          if(e.response.status === 403) {
            setError('wrong email or password')
          }
        }
      }
    }
  };
  React.useEffect(() => console.log(user), [user]);
  return (
    <div className="auth-container">
      <div className="auth-header full-width">
        <Typography variant="h4">
          {path === '/' ? 'Sign Up' : 'Log In'}
        </Typography>
        <p className="auth-alert">{error}</p>
      </div>
      <form className="auth-form">
        <Grid container spacing={3}>
          {path === '/' ? (
            <Grid item xs={12}>
              <TextField
                className="full-width"
                variant="outlined"
                label="Name"
                name="name"
                onChange={handleChange}
                required
              />
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <TextField
              className="full-width"
              variant="outlined"
              label="Email"
              name="email"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              className="full-width"
              variant="outlined"
              label="Password"
              name="password"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              className="full-width"
              variant="contained"
            >
              {path === '/' ? 'Sign Up' : 'Log In'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
