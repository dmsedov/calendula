import * as authActions from '../js/actions/auth';
import { userFetchingProfileState, user } from '../js/reducers/auth';

describe('Fetching user data reducers', () => {
  const {
    loginUserRequest,
    loginUserSuccess,
    loginUserFailure,
    logoutUser,
  } = authActions;

  const basisState = {
    isAuthenticated: false,
    name: null,
    isAdmin: null,
    imgUrl: null,
    err: null,
  };

  const userData = {
    name: 'test_user',
    isAdmin: true,
    imgUrl: 'some_img_url',
  };

  it('LOGIN_USER_REQUEST', () => {
    const initialState = basisState;

    expect(userFetchingProfileState('none', loginUserRequest())).toEqual('requested');

    expect(user(initialState, loginUserRequest()))
      .toEqual({ ...initialState });
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
    const errMsg = 'fatal';

    expect(user(initialState, loginUserFailure({ descr: errMsg })))
      .toEqual({ ...initialState, err: errMsg });
  });

  it('LOGIN_USER_SUCCESS after failed attempt', () => {
    expect(userFetchingProfileState('failured', loginUserRequest())).toEqual('requested');

    const initialState = {
      ...basisState,
      err: 'fatal',
    };

    expect(user(initialState, loginUserRequest()))
      .toEqual({ ...initialState, err: null });

    expect(userFetchingProfileState('requested', loginUserSuccess())).toEqual('successed');

    expect(user({ ...initialState, err: null }, loginUserSuccess(userData)))
      .toEqual({ ...initialState, err: null, ...userData, isAuthenticated: true });
  });

  it('LOG_OUT_USER', () => {
    const initialState = {
      isAuthenticated: true,
      name: 'test_user',
      isAdmin: true,
      imgUrl: 'some_img_url',
      err: null,
    };

    const finalState = basisState;

    expect(userFetchingProfileState('successed', logoutUser())).toEqual('none');

    expect(user(initialState, logoutUser()))
      .toEqual(finalState);
  });
});
