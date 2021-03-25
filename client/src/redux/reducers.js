import {client, REFRESH, GET_TODOS} from '../apolloconfig';

const initialState = {
  loggedIn: false,
  todos: {
    todo: [],
    doing: [],
    done: [],
  },
};

export const rootReducer = (store = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN': {
      return {...store, loggedIn: true};
    }
    case 'LOG_OUT': {
      return initialState;
    }
    case 'LOAD_TODOS': {
      let newTodos = {todo: [], doing: [], done: []};
      for (let i = 0; i < action.payload.length; i++) {
        newTodos[action.payload[i].category].push(action.payload[i]);
      }
      return {...store, todos: newTodos};
    }
    case 'SET_TODOS': {
      return {...store, todos: action.payload};
    }
    case 'ADD_TODO': {
      return {...store, todos: store.push(action.payload)};
    }
    case 'DELETE_TODOS': {
      let temp = store.todos;
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < action.payload; j++) {
          if (temp[i]._id === action.payload[j]) {
            temp.splice(i, 1);
          }
        }
      }
      return {...store, todos: temp};
    }
    default:
      return store;
  }
};

export const LoadTodos = () => {
  return async (dispatch) => {
    try {
      const {data} = await client.query({
        query: GET_TODOS,
      });
      dispatch({type: 'LOAD_TODOS', payload: data.todos});
    } catch (e) {
      try {
        if (e.message === 'forbidden') {
          await client.query({
            query: REFRESH,
          });
          dispatch(LoadTodos());
        }
      } catch (e) {
        if (e.message === 'invalid token') {
          dispatch({type: 'LOG_OUT'});
        }
      }
    }
  };
};