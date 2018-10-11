import { combineReducers } from 'redux';
import { userFetchingProfileState, user } from './auth';
import { uiPopup, uiScreen } from './ui';
import error from './error';

export default combineReducers({
  userFetchingProfileState,
  user,
  uiPopup,
  uiScreen,
  error,
});
