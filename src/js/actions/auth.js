import { createAction } from 'redux-actions';

export const loginUserRequest = createAction('LOGIN_USER_REQUEST');
export const loginUserSuccess = createAction('LOGIN__USER_SUCCESS');
export const loginUserFailure = createAction('LOGIN__USER_FAILURE');

export const logoutUser = createAction('LOGOUT_USER');
