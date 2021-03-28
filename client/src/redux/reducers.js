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
      let newTodos = {todo: [], doing: [], done: []};
      for (let i = 0; i < action.payload.length; i++) {
        newTodos[action.payload[i].category].push(action.payload[i]);
      }
      return {...store, todos: newTodos, loggedIn: true};
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
      const newTodos = store.todos.todo;
      newTodos.unshift(action.payload);
      return {...store, todos: {...store.todos, todo: newTodos}};
    }
    case 'UPDATE_TODO': {
      let newTodos = store.todos[action.payload.category];
      for (let t in newTodos) {
        if (newTodos[t]._id === action.payload._id) {
          newTodos[t] = action.payload;
        }
      }
      return {...store, todos: {...store.todos, [action.payload.category]: newTodos}};
    }
    case 'DELETE_TODO': {
      let newTodos = store.todos[action.payload.category].filter(todo => todo._id !== action.payload._id);
      
      return {...store, todos: {...store.todos, [action.payload.category]: newTodos}};
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
