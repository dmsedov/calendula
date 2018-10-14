import { createAction } from 'redux-actions';
import decodeJwt from 'jwt-decode';
import * as api from '../api';
import { loginUserError } from '../errors';
import paths from '../paths';
import { resetErrorMsg } from './error';
import errorHandler from '../helpers/errorHandler';


export const loginUserRequest = createAction('LOGIN_USER_REQUEST');
export const loginUserSuccess = createAction('LOGIN_USER_SUCCESS');
export const loginUserFailure = createAction('LOGIN_USER_FAILURE');

export const logoutUser = createAction('LOGOUT_USER');

export const logout = history => (dispatch) => {
  localStorage.removeItem('user');
  dispatch(logoutUser());
  history.push(paths.login);
};

export const login = (resp, history) => async (dispatch) => {
  dispatch(loginUserRequest());
  // try {
  //   const {
  //     data: {
  //       data: { jwt },
  //     }
  //   } = await api.loginUser(resp);
  //   localStorage.setItem('userData', jwt);
  //   const {
  //     user,
  //     calendar: { id },
  //   } = decodeJwt(jwt);
  //   dispatch(loginUserSuccess({ ...user, c_id: id }));
  //   dispatch(resetErrorMsg());
  //   history.push(paths.calendar);

    setTimeout(() => {
      const res = { data: { jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InV1aWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRtaXRyeSBTZWRvdiIsImVtYWlsIjoiZG1zZWRvdjkyQGdtYWlsLmNvbSIsImltZ1VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tVjZDMmF4eFViUDQvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUFOMzFEVmR6dlZSdDJpMWJPaHdzVTZYNHQzNzBXaGpKdy9zOTYtYy9waG90by5qcGcifSwiY2FsZW5kYXIiOnsiaWQiOjEyM319.DuqxRXEMk0R-3huOlaQ_SU8Fb-4UuQ1nRXd_R5cuBY0' } };
      localStorage.setItem('userData', res.data.jwt);
      const { user, calendar: { id } } = decodeJwt(res.data.jwt);
      dispatch(loginUserSuccess({ ...user, c_id: id }));
      dispatch(resetErrorMsg());
      history.push('/calendar');
    }, 2000);
  // } catch (e) {
  //   dispatch(loginUserFailure(errorHandler(e)));
  // }
};
