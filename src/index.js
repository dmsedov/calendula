import 'bootstrap';
import './_scss/main.scss';
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import decodeJwt from 'jwt-decode';
import createStore from './js/store';
import rootReducer from './js/reducers';
import { loginUserSuccess } from './js/actions/auth';
import App from './js/app';

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
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('container'),
);

console.log('The App is launched!!! ');
