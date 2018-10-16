import axios from 'axios';
import nock from 'nock';
import httpAdapter from 'axios/lib/adapters/http';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwtGen from 'jwt-simple';
import * as authActions from '../../js/actions/auth';
import { resetErrorMsg } from '../../js/actions/error';
import urls from '../../js/api/v1/config';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  login,
} = authActions;

const user = {
  uuid: 'test_uuid',
  name: 'test_user',
  email: 'test_email',
  imgUrl: 'test_img_url',
};

describe('authentication actions', () => {
  describe('sync actions', () => {
    it('LOGIN_USER_REQUEST', () => {
      expect(loginUserRequest()).toEqual({ type: 'LOGIN_USER_REQUEST' });
    });

    it('LOGIN_USER_SUCCESS', () => {
      const payload = { ...user, c_id: 'test_c_id' };
      expect(loginUserSuccess(payload))
        .toEqual({
          type: 'LOGIN_USER_SUCCESS',
          payload,
        });
    });

    it('LOGIN_USER_FAILURE', () => {
      const msg = 'something_bad_happened';
      expect(loginUserFailure({ error: msg }))
        .toEqual({
          type: 'LOGIN_USER_FAILURE',
          payload: {
            error: msg,
          },
        });
    });

    it('LOGOUT_USER', () => {
      expect(logoutUser()).toEqual({ type: 'LOGOUT_USER' });
    });
  });

  describe('async action', () => {
    axios.defaults.adapter = httpAdapter;
    nock.disableNetConnect();
    const host = 'http://localhost';
    const mockHistory = [];
    const id = '000000000';
    const secret = 'xxx';
    const payload = { user, calendar: { id } };
    const testJwtToken = jwtGen.encode(payload, secret);

    it('login user success', async () => {
      const store = mockStore({});
      nock(host).post(urls.login)
        .reply('200', {
          status: 'ok',
          data: {
            jwt: testJwtToken,
          },
        });

      const expectedActions = [
        loginUserRequest(),
        resetErrorMsg(),
        loginUserSuccess({ ...user, c_id: id }),
      ];
      await store.dispatch(login(user, mockHistory));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('login user with error', async () => {
      const store = mockStore({});
      const msg = 'something_bad_happened';
      nock(host).post(urls.login).replyWithError(msg);

      const expectedActions = [
        loginUserRequest(),
        resetErrorMsg(),
        loginUserFailure(msg),
      ];
      await store.dispatch(login(user, mockHistory));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
