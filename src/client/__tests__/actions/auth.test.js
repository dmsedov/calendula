import axios from 'axios';
import nock from 'nock';
import httpAdapter from 'axios/lib/adapters/http';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwtGen from 'jwt-simple';
import * as authActions from '../../js/actions/auth';
import urls from '../../js/api/urls';
import errors from '../../js/errors';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const {
  signinUserRequest,
  signinUserSuccess,
  signinUserFailure,
  signinUser,
  signout,
  foreignAuthUserRequest,
} = authActions;

const user = {
  uuid: 'test_uuid',
  name: 'test_user',
  email: 'test_email',
  imgUrl: 'test_img_url',
};

describe('authentication actions', () => {
  describe('sync actions', () => {
    it('FOREIGN_AUTH_USER_REQUEST', () => {
      expect(foreignAuthUserRequest()).toEqual({ type: 'FOREIGN_AUTH_USER_REQUEST' });
    });

    it('SIGN_IN_USER_REQUEST', () => {
      expect(signinUserRequest()).toEqual({ type: 'SIGN_IN_USER_REQUEST' });
    });

    it('SIGN_IN_USER_SUCCESS', () => {
      const payload = { ...user, c_id: 'test_c_id' };
      expect(signinUserSuccess(payload))
        .toEqual({
          type: 'SIGN_IN_USER_SUCCESS',
          payload,
        });
    });

    it('SIGN_IN_USER_FAILURE', () => {
      const msg = 'something_bad_happened';
      expect(signinUserFailure({ error: msg }))
        .toEqual({
          type: 'SIGN_IN_USER_FAILURE',
          payload: {
            error: msg,
          },
        });
    });

    it('SIGN_OUT_USER', () => {
      expect(signout()).toEqual({ type: 'SIGN_OUT_USER' });
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

    it('sign in user success', async () => {
      const store = mockStore({});
      nock(host).post(urls.signin)
        .reply('200', {
          status: 'ok',
          data: {
            jwt: testJwtToken,
          },
        });

      const expectedActions = [
        signinUserRequest(),
        signinUserSuccess({ ...user, c_id: id }),
      ];
      await store.dispatch(signinUser(user, mockHistory));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('sign in user with error', async () => {
      const store = mockStore({});
      const msg = 'something_bad_happened';
      nock(host).post(urls.signin).replyWithError(msg);

      const expectedActions = [
        signinUserRequest(),
        signinUserFailure({ error: errors[msg] }),
      ];
      await store.dispatch(signinUser(user, mockHistory));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
