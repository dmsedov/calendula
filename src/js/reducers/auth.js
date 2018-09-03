import { handleActions } from 'redux-actions';
import * as actions from '../actions/auth';

const sessionData = JSON.parse(window.localStorage.getItem('user'));
const defaultState = { isAuthenticated: false, name: null, role: null, err: {} };
const initialState = sessionData || defaultState;


const userFetchingProfileState = handleActions({
  [actions.loginUserRequest]() {
    return 'requested';
  },
  [actions.loginUserSuccess]() {
    return 'successed';
  },
  [actions.loginUserFailure]() {
    return 'failure';
  }
}, 'none');

const user = handleActions({
  [actions.loginUserRequest](state, { payload }) {
    return { ...state, err: {} };
  },
  [actions.loginUserSuccess](state, { payload: { name, role } }) {
    return { isAuthenticated: true, name, role, err: {} };
  },
  [actions.loginUserFailure](state, { payload: { err } }) {
    return { ...state, isAuthenticated: false, err };
  },
  [actions.logoutUser](state, { payload }) {
    return { isAuthenticated: false, name: null, role: null, err: {} };
  },
}, initialState);

export default { userFetchingProfileState, user };
