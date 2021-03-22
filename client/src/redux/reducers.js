const initialState = {
  loggedIn: false,
  todos: [],
};

export const rootReducer = (store = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN': {
      return {...store, loggedIn: true};
    }
    case 'LOG_OUT': {
      return initialState;
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
          if (temp[i]._id == action.payload[j]) {
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
