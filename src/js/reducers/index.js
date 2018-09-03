import { combineReducers } from 'redux';
import { userFetchingProfileState, user } from './user';

export default combineReducers({
  userFetchingProfileState,
  user,
});
