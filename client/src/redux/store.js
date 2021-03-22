import { createStore, applyMiddleware } from 'redux';
import {rootReducer} from './reducers'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'store',
  storage: storage,
};

const reducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(reducer);
export const persistor = persistStore(store);