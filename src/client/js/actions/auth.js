import { createAction } from 'redux-actions';
import decodeJwt from 'jwt-decode';
import apiCall from '../api';
import paths from '../paths';
import errorHandler from '../helpers/errorHandler';
import errors from '../errors';

export const signinUserRequest = createAction('SIGN_IN_USER_REQUEST');
export const signinUserSuccess = createAction('SIGN_IN_USER_SUCCESS');
export const signinUserFailure = createAction('SIGN_IN_USER_FAILURE');

export const signout = createAction('SIGN_OUT_USER');

export const signoutUser = history => (dispatch) => {
  localStorage.removeItem('user');
  dispatch(signout());
  history.push(paths.login);
};

export const signinUser = (resp, history) => async (dispatch) => {
  // dispatch(signinUserRequest());
  // const { public: { signin } } = apiCall;
  // try {
  //   const {
  //     data: {
  //       data: { jwt },
  //     },
  //   } = await signin(resp);
  //   localStorage.setItem('userData', jwt);
  //   const {
  //     user,
  //     calendar: { id },
  //   } = decodeJwt(jwt);
  //   dispatch(signinUserSuccess({ ...user, c_id: id }));
  //   history.push(paths.calendar);

    setTimeout(() => {
      const res = { data: { jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InV1aWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRtaXRyeSBTZWRvdiIsImVtYWlsIjoiZG1zZWRvdjkyQGdtYWlsLmNvbSIsImltZ1VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tVjZDMmF4eFViUDQvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUFOMzFEVmR6dlZSdDJpMWJPaHdzVTZYNHQzNzBXaGpKdy9zOTYtYy9waG90by5qcGcifSwiY2FsZW5kYXIiOnsiaWQiOjEyM319.DuqxRXEMk0R-3huOlaQ_SU8Fb-4UuQ1nRXd_R5cuBY0' } };
      localStorage.setItem('userData', res.data.jwt);
      const { user, calendar: { id } } = decodeJwt(res.data.jwt);
      dispatch(signinUserSuccess({ ...user, c_id: id }));
      history.push('/calendar');
    }, 2000);
  // } catch (e) {
  //   const errCode = errorHandler(e);
  //   dispatch(signinUserFailure({ error: errors[errCode] }));
  // }
};
