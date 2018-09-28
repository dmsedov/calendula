import { combineReducers } from 'redux';
import { userFetchingProfileState, user } from './auth';
import uiPopup from './uiPopup';

export default combineReducers({
  userFetchingProfileState,
  user,
  uiPopup,
});
