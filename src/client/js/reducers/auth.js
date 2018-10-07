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
    return 'failure';
  },
  [actions.logoutUser]() {
    return 'none';
  },
}, initGlobalState.userFetchingProfileState);

const user = handleActions({
  [actions.loginUserRequest](state) {
    return { ...state, err: null };
  },
  [actions.loginUserSuccess](state, { payload: { name, isAdmin, imgUrl } }) {
    return { isAuthenticated: true, name, isAdmin, imgUrl, err: null };
  },
  [actions.loginUserFailure](state, { payload: { descr } }) {
    return { ...state, isAuthenticated: false, isAdmin: null, err: descr };
  },
  [actions.logoutUser]() {
    return { isAuthenticated: false, name: null, isAdmin: null, imgUrl: null, err: null };
  },
}, initGlobalState.user);

export { userFetchingProfileState, user };
