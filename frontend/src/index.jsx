import 'bootstrap';
import './_scss/main.scss';
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import decodeJwt from 'jwt-decode';
import './images/icons/preloader.gif';
import './images/icons/google-32px.png';
import './images/icons/facebook-32px.png';
import './images/icons/search.png';
import createStore from './js/store';
import rootReducer from './js/reducers';
import { signinUserSuccess } from './js/actions/auth';
import resizeScreen from './js/actions/uiScreen';
import { closeNavMenu } from './js/actions/uiPopup';
import App from './js/app';

const store = createStore(rootReducer);

const mediaQueryMdScreen = window.matchMedia('(max-width: 767.98px)');
const mediaQueryLgScreen = window.matchMedia('(max-width: 992px)');

store.dispatch(resizeScreen({ isLessThanMdScreen: mediaQueryMdScreen.matches }));
store.dispatch(resizeScreen({ isLessThanLgScreen: mediaQueryLgScreen.matches }));


mediaQueryMdScreen.addListener((mq) => {
  store.dispatch(resizeScreen({ isLessThanMdScreen: mq.matches }));
  const { uiPopup: { isNavMenuOpen } } = store.getState();
  if (isNavMenuOpen) {
    store.dispatch(closeNavMenu());
  }
});

mediaQueryLgScreen.addListener((mq) => {
  store.dispatch(resizeScreen({ isLessThanLgScreen: mq.matches }));
});

const jwt = localStorage.getItem('userData');

if (jwt) {
  const {
    user,
    calendar: { id },
  } = decodeJwt(jwt);

  store.dispatch(signinUserSuccess({ ...user, c_id: id }));
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
