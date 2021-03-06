import { handleActions } from 'redux-actions';
import * as actions from '../actions/auth';

const initialState = { isAuthenticated: false, name: null, isAdmin: null, err: null };

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
}, 'none');

const user = handleActions({
  [actions.loginUserRequest](state, { payload }) {
    return { ...state, err: null };
  },
  [actions.loginUserSuccess](state, { payload: { name, isAdmin } }) {
    return { isAuthenticated: true, name, isAdmin, err: null };
  },
  [actions.loginUserFailure](state, { payload: { err } }) {
    return { ...state, isAuthenticated: false, isAdmin: null, err };
  },
  [actions.logoutUser]() {
    return { isAuthenticated: false, name: null, isAdmin: null, err: null };
  },
}, initialState);

export { userFetchingProfileState, user };
