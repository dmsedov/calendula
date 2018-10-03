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
import resizeScreen from './js/actions/uiScreen';
import { closeNavMenu } from './js/actions/uiPopup';
import App from './js/app';
import { mediaQueryList } from './js/reducers/initGlobalState';

const store = createStore(rootReducer);
const jwt = localStorage.getItem('user');

mediaQueryList.addListener((mq) => {
  store.dispatch(resizeScreen({ isSmallScreen: mq.matches }));
  const { uiPopup: { isNavMenuOpen } } = store.getState();
  if (isNavMenuOpen) {
    store.dispatch(closeNavMenu());
  }
});

if (localStorage.getItem('user')) {
  const userData = decodeJwt(jwt);
  const { name, isAdmin, imgUrl } = userData;

  store.dispatch(loginUserSuccess({ name, imgUrl, isAdmin, isAuthenticated: true }));
}


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);

console.log('The App is launched!!! ');
