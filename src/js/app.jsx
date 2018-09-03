import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import decodeJwt from 'jwt-decode';
import routes from './routes';
import createStore from './store';
import rootReducer from './reducers';
import { loginUserSuccess } from './actions/auth';

const store = createStore(rootReducer);
const jwt = localStorage.getItem('user');

if (localStorage.getItem('user')) {
  const userData = decodeJwt(jwt);
  const { name, admin } = userData;

  store.dispatch(loginUserSuccess({ name, admin, isAuthenticated: true }));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>,
  document.getElementById('container'),
);
