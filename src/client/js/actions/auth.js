import { createAction } from 'redux-actions';
import decodeJwt from 'jwt-decode';
import * as api from '../api';
import { loginUserError } from '../errors';

export const loginUserRequest = createAction('LOGIN_USER_REQUEST');
export const loginUserSuccess = createAction('LOGIN__USER_SUCCESS');
export const loginUserFailure = createAction('LOGIN__USER_FAILURE');

export const logoutUser = createAction('LOGOUT_USER');

export const logout = history => (dispatch) => {
  localStorage.removeItem('user');
  dispatch(logoutUser());
  history.push('/login');
};

export const login = (resp, history) => async (dispatch) => {
  try {
    // const res = await api.loginUser(resp); // заглушка
    setTimeout(() => {
      const res = { data: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJuYW1lIjoiRG1pdHJ5IFNlZG92IiwiaXNBdXRoZW50aWNhdGVkIjp0cnVlfQ.EbHdv0iY5Elh74jk5S2SCnWKvHYA-ODm4bFYdILkAuQ' } };
      localStorage.setItem('user', res.data.token);
      const { name, isAdmin } = decodeJwt(res.data.token);
      dispatch(loginUserSuccess({ name, isAdmin }));
      history.push('/calendar');
    }, 2000);

    // dispatch(loginUserSuccess(res));
  } catch (e) {
    const msg = loginUserError('fatal');
    dispatch(loginUserFailure({ err: msg }));
  }
};
