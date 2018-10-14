import 'bootstrap';
import './_scss/main.scss';
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import decodeJwt from 'jwt-decode';
import createStore from './js/store';
import rootReducer from './js/reducers';
import { loginUserSuccess } from './js/actions/auth';
import resizeScreen from './js/actions/uiScreen';
import { closeNavMenu } from './js/actions/uiPopup';
import App from './js/app';
import ErrorReport from './js/components/alerts/ErrorReport';

const store = createStore(rootReducer);

const mediaQueryList = window.matchMedia('(max-width: 767.98px)');

store.dispatch(resizeScreen({ isSmallScreen: mediaQueryList.matches }));

mediaQueryList.addListener((mq) => {
  store.dispatch(resizeScreen({ isSmallScreen: mq.matches }));
  const { uiPopup: { isNavMenuOpen } } = store.getState();
  if (isNavMenuOpen) {
    store.dispatch(closeNavMenu());
  }
});

const jwt = localStorage.getItem('userData');

if (jwt) {
  const {
    user,
    calendar: { id },
  } = decodeJwt(jwt);

  store.dispatch(loginUserSuccess({ ...user, c_id: id }));
}

const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale',
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);

console.log('The App is launched!!! ');
