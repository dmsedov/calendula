import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import errAlert from '../middlewares/errAlert';

/* eslint-disable no-underscore-dangle */
// const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
// const devtoolMiddleware = ext && ext();
/* eslint-enable */
export default reducers => createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk, errAlert),
  ),
);
