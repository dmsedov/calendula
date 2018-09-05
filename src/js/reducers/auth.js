import { handleActions } from 'redux-actions';
import * as actions from '../actions/auth';

const initialState = { isAuthenticated: false, name: null, admin: null, err: null };

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
  }
}, 'none');

const user = handleActions({
  [actions.loginUserRequest](state, { payload }) {
    return { ...state, err: null };
  },
  [actions.loginUserSuccess](state, { payload: { name, admin } }) {
    return { isAuthenticated: true, name, admin, err: null };
  },
  [actions.loginUserFailure](state, { payload: { err } }) {
    return { ...state, isAuthenticated: false, err };
  },
  [actions.logoutUser](state, { payload }) {
    return { isAuthenticated: false, name: null, admin: null, err: null };
  },
}, initialState);

export { userFetchingProfileState, user };
