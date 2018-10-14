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
  [actions.loginUserSuccess](state, { payload }) {
    return { isAuthenticated: true, ...payload };
  },
  [actions.loginUserFailure]() {
    return initGlobalState.user;
  },
  [actions.logoutUser]() {
    return initGlobalState.user;
  },
}, initGlobalState.user);

export { userFetchingProfileState, user };
