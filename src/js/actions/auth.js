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
      const res = { data: { token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiRG1pdHJ5IFNlZG92IiwiYWRtaW4iOnRydWUsImVyciI6e30sImp0aSI6IjkzMDg2MWE0LTQ0MGItNDA2Yy1iODUxLTc5ODJlYTBjNTc5OCIsImlhdCI6MTUzNjAwMjEwNiwiZXhwIjoxNTM2MDA1NzA2fQ.op7F69AbrEHdzPrKd0V7hNDinUB-H-z9DhpEnxL93Zw' } };
      localStorage.setItem('user', res.data.token);
      const { name, admin } = decodeJwt(res.data.token);
      dispatch(loginUserSuccess({ name, admin }));
      history.push('/calendar');
    }, 2000);

    // dispatch(loginUserSuccess(res));
  } catch (e) {
    const msg = loginUserError('fatal');
    dispatch(loginUserFailure({ err: msg }));
  }
};
