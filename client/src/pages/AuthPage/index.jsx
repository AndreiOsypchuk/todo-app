import React from 'react';
import {Button, Grid, TextField} from '@material-ui/core';
import {useMutation} from '@apollo/client';
import {LOG_IN, REGISTER} from '../../apolloconfig';
import {useDispatch} from 'react-redux'
export const AuthPage = () => {
  const [user, setUser] = React.useState({});
  const [islogin, setLogin] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [Login] = useMutation(LOG_IN);
  const [Register] = useMutation(REGISTER);
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setUser((user) => ({...user, [field]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (islogin) {
      try {
        await Login({variables: {...user}});
        dispatch({type: 'LOG_IN'});

      } catch (e) {
        setErrorMessage(e.message);
      }
    } else {
      try {
        await Register({variables: {...user}});
        dispatch({type: 'LOG_IN'});
      } catch (e) {
        setErrorMessage(e.message);
      }
    }
    setUser({});
    setErrorMessage('')
  };
  React.useEffect(() => console.log(user), [user]);
  return (
    <div className="flex flex-col justify-center align-center w-screen h-screen">
      <nav className="flex justify-between items-center shadow h-10 py-8 px-10">
        <p className="font-bold text-blue-900">Todo App</p>
        <Button onClick={() => setLogin((islogin) => !islogin)}>
          {!islogin ? 'Log In' : 'Sign Up'}
        </Button>
      </nav>
      <div className="flex flex-grow justify-center items-center">
        <div className="flex flex-col justify-center align-center h-auto w-1/3 p-20">
          <div className="relative">
          <h1 className="font-bold text-4xl pb-10">
            {islogin ? 'Log In' : 'Sign Up'}
          </h1>
          <p className="absolute top-12 text-red-500 text-sm">{errorMessage}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {!islogin ? (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="name"
                    label="Name"
                    onChange={handleChange}
                    required
                    value={user.name ? user.name : ''}
                  />
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  required
                  value={user.email ? user.email : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="password"
                  label="Password"
                  type='password'
                  onChange={handleChange}
                  required
                  value={user.password ? user.password : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <button type="submit" className="w-full p-2 bg-blue-400 text-white rounded-md font-bold transition duration-300
                 hover:shadow-md ">
                  {!islogin ? 'Sign Up' : 'Log In'}
                </button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};
