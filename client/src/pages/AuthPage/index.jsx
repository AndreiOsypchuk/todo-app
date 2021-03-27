import React from 'react';
import {Button, Grid, TextField} from '@material-ui/core';
import {useMutation} from '@apollo/client';
import {LOG_IN, REGISTER} from '../../apolloconfig';
import {useDispatch} from 'react-redux';
import {Validate} from './validators';

const ErrorPopup = ({message, styles}) => {
  return <p className={`${styles} text-red-500 text-sm`}>{message}</p>;
};

export const AuthPage = () => {
  const [user, setUser] = React.useState({});
  const [islogin, setLogin] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState({});
  const [Login] = useMutation(LOG_IN);
  const [Register] = useMutation(REGISTER);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    if (!islogin) {
      const valid = Validate[field](value);
      setErrorMessage((errorMessage) => ({...errorMessage, [field]: valid}));
    }
    setUser((user) => ({...user, [field]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (islogin) {
      try {
        const {data} = await Login({variables: {...user}});
        dispatch({type: 'LOG_IN', payload: data.todos});
      } catch (e) {
        setErrorMessage((errorMessage)=> ({...errorMessage, auth: e.message}));
      }
    } else if (
      !islogin &&
      !(errorMessage.name || errorMessage.password || errorMessage.email)
    ) {
      try {
        const {data} = await Register({variables: {...user}});
        dispatch({type: 'LOG_IN', payload: data.todos});
      } catch (e) {
        setErrorMessage((errorMessage)=> ({...errorMessage, auth: e.message}));
      }
    }
  };
  return (
    <div className="flex flex-col justify-center align-center w-screen h-screen">
      <nav className="flex justify-between items-center shadow h-10 py-8 px-10">
        <p className="font-bold text-blue-900 ">Todo App</p>
        <Button onClick={() => {setLogin((islogin) => !islogin); setErrorMessage({}); setUser({})}}>
          {!islogin ? 'Log In' : 'Sign Up'}
        </Button>
      </nav>
      <div className="flex flex-grow justify-center items-center">
        <div className="flex flex-col justify-center align-center h-auto w-1/3 p-20">
          <div className="relative">
            <h1 className="font-bold text-4xl pb-10 mb-4">
              {islogin ? 'Log In' : 'Sign Up'}
            </h1>
            
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {!islogin ? (
                <Grid item xs={12} className="relative">
                  <ErrorPopup message={errorMessage.name} styles='bottom-16 absolute '/>
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
              <Grid item xs={12} className="relative">
                <ErrorPopup message={errorMessage.email} styles='bottom-16 absolute '/>
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
              <Grid item xs={12} className="relative">
                <ErrorPopup message={errorMessage.password} styles='bottom-16 absolute '/>
                <TextField
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="password"
                  label="Password"
                  type="password"
                  onChange={handleChange}
                  required
                  value={user.password ? user.password : ''}
                />
              </Grid>
              <Grid item xs={12} className="flex flex-col justify-between items-center">

                <button
                  type="submit"
                  className="w-full p-2 bg-blue-400 text-white rounded-md font-bold transition duration-300
                  hover:shadow-md "
                >
                  {!islogin ? 'Sign Up' : 'Log In'}
                </button>
                  <ErrorPopup message={errorMessage.auth} styles='w-full h-8 text-center'/>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};
