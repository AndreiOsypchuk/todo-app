import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {ApolloProvider} from '@apollo/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import App from './App';

import {client} from './apolloconfig';
import {store, persistor} from './redux/store';

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
