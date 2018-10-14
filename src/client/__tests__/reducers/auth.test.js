import {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
} from '../../js/actions/auth';
import { userFetchingProfileState, user } from '../../js/reducers/auth';

describe('Fetching user data reducers', () => {
  const initialState = {
    isAuthenticated: false,
    uuid: null,
    name: null,
    imgUrl: null,
    email: null,
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

  it('LOGIN_USER_REQUEST', () => {
    expect(userFetchingProfileState('none', loginUserRequest())).toEqual('requested');

    expect(user(initialState, loginUserRequest()))
      .toEqual(initialState);
  });

  it('LOGIN_USER_SUCCESS', () => {
    expect(userFetchingProfileState('requested', loginUserSuccess())).toEqual('successed');

    expect(user(initialState, loginUserSuccess(userData)))
      .toEqual({ ...userData, isAuthenticated: true });
  });

  it('LOGIN_USER_FAILURE', () => {
    expect(userFetchingProfileState('requested', loginUserFailure())).toEqual('failured');

    expect(user(initialState, loginUserFailure()))
      .toEqual(initialState);
  });

  it('LOGIN_USER_SUCCESS after failed attempt', () => {
    expect(userFetchingProfileState('failured', loginUserRequest())).toEqual('requested');

    expect(userFetchingProfileState('requested', loginUserSuccess())).toEqual('successed');
  });

  it('LOG_OUT_USER', () => {
    expect(userFetchingProfileState('successed', logoutUser())).toEqual('none');

    expect(user({ ...userData, isAuthenticated: true }, logoutUser()))
      .toEqual(initialState);
  });
});
