import { combineReducers } from 'redux';
import { userFetchingProfileState, user } from './auth';
import header from './header';

export default combineReducers({
  userFetchingProfileState,
  user,
  header,
});
