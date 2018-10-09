import { handleActions } from 'redux-actions';
import * as actions from '../actions/auth';
import initGlobalState from './initGlobalState';

const userFetchingProfileState = handleActions({
  [actions.loginUserRequest]() {
    return 'requested';
  },
  [actions.loginUserSuccess]() {
    return 'successed';
  },
  [actions.loginUserFailure]() {
    return 'failured';
  },
  [actions.logoutUser]() {
    return 'none';
  },
}, initGlobalState.userFetchingProfileState);

const user = handleActions({
  [actions.loginUserRequest](state) {
    return state;
  },
  [actions.loginUserSuccess](state, { payload: { name, isAdmin, imgUrl } }) {
    return { isAuthenticated: true, name, isAdmin, imgUrl };
  },
  [actions.loginUserFailure](state) {
    return { ...state, isAuthenticated: false, isAdmin: null };
  },
  [actions.logoutUser]() {
    return { isAuthenticated: false, name: null, isAdmin: null, imgUrl: null };
  },
}, initGlobalState.user);

export { userFetchingProfileState, user };
