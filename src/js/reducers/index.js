import { combineReducers } from 'redux';
import { userFetchingProfileState, user } from './auth';

export default combineReducers({
  userFetchingProfileState,
  user,
});
