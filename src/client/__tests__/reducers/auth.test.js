import {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
} from '../../js/actions/auth';
import { userFetchingProfileState, user } from '../../js/reducers/auth';

describe('Fetching user data reducers', () => {
  const basisState = {
    isAuthenticated: false,
    name: null,
    isAdmin: null,
    imgUrl: null,
  };

  const userData = {
    name: 'test_user',
    isAdmin: true,
    imgUrl: 'some_img_url',
  };

  it('should return the initial state', () => {
    const initialState = basisState;
    expect(user(undefined, {})).toEqual(initialState);
    expect(userFetchingProfileState(undefined, {})).toEqual('none');
  });

  it('LOGIN_USER_REQUEST', () => {
    const initialState = basisState;

    expect(userFetchingProfileState('none', loginUserRequest())).toEqual('requested');

    expect(user(initialState, loginUserRequest()))
      .toEqual(initialState);
  });

  it('LOGIN_USER_SUCCESS', () => {
    expect(userFetchingProfileState('requested', loginUserSuccess())).toEqual('successed');

    const initialState = basisState;

    expect(user(initialState, loginUserSuccess(userData)))
      .toEqual({ ...initialState, ...userData, isAuthenticated: true });
  });

  it('LOGIN_USER_FAILURE', () => {
    expect(userFetchingProfileState('requested', loginUserFailure())).toEqual('failured');

    const initialState = basisState;

    expect(user(initialState, loginUserFailure()))
      .toEqual(initialState);
  });

  it('LOGIN_USER_SUCCESS after failed attempt', () => {
    expect(userFetchingProfileState('failured', loginUserRequest())).toEqual('requested');

    expect(userFetchingProfileState('requested', loginUserSuccess())).toEqual('successed');
  });

  it('LOG_OUT_USER', () => {
    const initialState = {
      isAuthenticated: true,
      name: 'test_user',
      isAdmin: true,
      imgUrl: 'some_img_url',
    };

    const finalState = basisState;

    expect(userFetchingProfileState('successed', logoutUser())).toEqual('none');

    expect(user(initialState, logoutUser()))
      .toEqual(finalState);
  });
});
