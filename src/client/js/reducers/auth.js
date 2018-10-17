import { handleActions } from 'redux-actions';
import * as actions from '../actions/auth';
import initGlobalState from './initGlobalState';

const userFetchingProfileState = handleActions({
  [actions.signinUserRequest]() {
    return 'requested';
  },
  [actions.signinUserSuccess]() {
    return 'successed';
  },
  [actions.signinUserFailure]() {
    return 'failured';
  },
  [actions.signout]() {
    return 'none';
  },
}, initGlobalState.userFetchingProfileState);

const user = handleActions({
  [actions.signinUserRequest](state) {
    return state;
  },
  [actions.signinUserSuccess](state, { payload }) {
    return { isAuthenticated: true, ...payload };
  },
  [actions.signinUserFailure]() {
    return initGlobalState.user;
  },
  [actions.signout]() {
    return initGlobalState.user;
  },
}, initGlobalState.user);

export { userFetchingProfileState, user };
