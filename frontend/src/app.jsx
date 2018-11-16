import 'bootstrap';
import './_scss/main.scss';
import '@babel/polyfill';
import './js/images';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './js/containers/common/Header';
import Main from './js/components/common/Main';
import routes from './js/routes';
import ModalConductor from './js/containers/common/ModalConductor';
import ErrorReport from './js/containers/ErrorReport';
import createStore from './js/store';
import rootReducer from './js/reducers';
import setGlobalDispatchers from './js/globalDispatchers';

const store = createStore(rootReducer);

setGlobalDispatchers(store);

const App = (
  <Provider store={store}>
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Main>
          {routes}
        </Main>
        <ModalConductor />
        <ErrorReport />
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  App,
  document.getElementById('app'),
);

console.log('The App is launched!!! ');
