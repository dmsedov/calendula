import { combineReducers } from 'redux';
import { userFetchingProfileState, user } from './auth';
import { uiPopup, uiScreen } from './ui';

export default combineReducers({
  userFetchingProfileState,
  user,
  uiPopup,
  uiScreen,
});
