import {
  signinUserRequest,
  signinUserSuccess,
  signinUserFailure,
  signout,
  foreignAuthUserRequest,
} from '../../src/js/actions/auth';
import { userFetchingProfileState, user } from '../../src/js/reducers/auth';

describe('Fetching user data reducers', () => {
  const initialState = {
    isAuthenticated: false,
    uuid: null,
    name: null,
    imgUrl: null,
    email: null,
    c_id: null,
  };

  const userData = {
    uuid: 'tets_uuid',
    name: 'test_user',
    email: 'test_email',
    imgUrl: 'some_img_url',
    c_id: 'test_c_id',
  };

  it('should return the initial state', () => {
    expect(user(undefined, {})).toEqual(initialState);
    expect(userFetchingProfileState(undefined, {})).toEqual('none');
  });

  it('FOREIGN_AUTH_USER_REQUEST', () => {
    expect(userFetchingProfileState('none', foreignAuthUserRequest()))
      .toEqual('pending');

    expect(user(initialState, foreignAuthUserRequest()))
      .toEqual(initialState);
  });

  it('SIGN_IN_USER_REQUEST', () => {
    expect(userFetchingProfileState('pending', signinUserRequest())).toEqual('requested');

    expect(user(initialState, signinUserRequest()))
      .toEqual(initialState);
  });

  it('SIGN_IN_USER_SUCCESS', () => {
    expect(userFetchingProfileState('requested', signinUserSuccess())).toEqual('successed');

    expect(user(initialState, signinUserSuccess(userData)))
      .toEqual({ ...userData, isAuthenticated: true });
  });

  it('SIGN_IN_USER_FAILURE', () => {
    expect(userFetchingProfileState('requested', signinUserFailure())).toEqual('failured');

    expect(user(initialState, signinUserFailure()))
      .toEqual(initialState);
  });

  it('SIGN_IN_USER_SUCCESS after failed attempt', () => {
    expect(userFetchingProfileState('failured', foreignAuthUserRequest())).toEqual('pending');

    expect(userFetchingProfileState('pending', signinUserRequest())).toEqual('requested');

    expect(userFetchingProfileState('requested', signinUserSuccess())).toEqual('successed');
  });

  it('SIGN_OUT_USER', () => {
    expect(userFetchingProfileState('successed', signout())).toEqual('none');

    expect(user({ ...userData, isAuthenticated: true }, signout()))
      .toEqual(initialState);
  });
});
