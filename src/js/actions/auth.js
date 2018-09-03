import { createAction } from 'redux-actions';
import * as api from '../api';

export const loginUserRequest = createAction('LOGIN_USER_REQUEST');
export const loginUserSuccess = createAction('LOGIN__USER_SUCCESS');
export const loginUserFailure = createAction('LOGIN__USER_FAILURE');

export const logoutUser = createAction('LOGOUT_USER');

export const loginUser = resp => async (dispatch) => {
  dispatch(loginUserRequest());

  try {
    const res = await api.loginUser(resp);
    dispatch(loginUserSuccess(res));
  } catch (e) {
    dispatch(loginUserFailure);
  }
};
