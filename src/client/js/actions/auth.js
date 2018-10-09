import { createAction } from 'redux-actions';
import decodeJwt from 'jwt-decode';
import * as api from '../api';
import { loginUserError } from '../errors';
import paths from '../paths';
import resetErrorMsg from './error';
import responseHandler from '../helpers/responseHandler';


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
  try {
    const res = await api.loginUser(resp);
    const data = responseHandler(res);
    localStorage.setItem('user', data.token);
    const { name, isAdmin, imgUrl } = decodeJwt(data.token);
    dispatch(loginUserSuccess({ name, isAdmin, imgUrl }));
    history.push(paths.calendar);
    // setTimeout(() => {
    //   const res = { data: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRG1pdHJ5IFNlZG92IiwiaXNBZG1pbiI6dHJ1ZSwiaW1nVXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1WNkMyYXh4VWJQNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQU4zMURWZHp2VlJ0MmkxYk9od3NVNlg0dDM3MFdoakp3L3M5Ni1jL3Bob3RvLmpwZyJ9.CRyw1rNQV6O__UzBvsmZOJLquxGnDxutq7uJhZ1eRgM' } };
    //   localStorage.setItem('user', res.data.token);
    //   const { name, isAdmin, imgUrl } = decodeJwt(res.data.token);
    //   dispatch(loginUserSuccess({ name, isAdmin, imgUrl }));
    //   history.push('/calendar');
    // }, 2000);

    // dispatch(loginUserSuccess(res));
  } catch (e) {
    dispatch(loginUserFailure());
  }
};
