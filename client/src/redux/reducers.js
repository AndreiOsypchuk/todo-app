const initialStore = {
}

export const rootReducer = (store = initialStore, action) => {
  switch(action.type) {
    case 'ADD_USER': {
      return action.payload ;
    }
    case 'TOGGLE_TODO': {
      return {}
    }
    default: 
      return store;
  }
}
