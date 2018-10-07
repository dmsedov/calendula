import axios from 'axios';
import nock from 'nock';
import httpAdapter from 'axios/lib/adapters/http';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwtGen from 'jwt-simple';
import { history } from 'react-router-dom';
import * as authActions from '../js/actions/auth';
import urls from '../js/api/v1/config';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  login,
} = authActions;

const userData = {
  name: 'test_user',
  imgUrl: 'some_img_url',
};

describe('authentication actions', () => {
//   describe('sync actions', () => {
//     it('LOGIN_USER_REQUEST', () => {
//       expect(loginUserRequest()).toEqual({ type: 'LOGIN_USER_REQUEST' });
//     });
//
//     it('LOGIN_USER_SUCCESS', () => {
//       expect(loginUserSuccess({ ...userData, isAdmin: true }))
//         .toEqual({
//           type: 'LOGIN__USER_SUCCESS',
//           payload: { ...userData, isAdmin: true },
//         });
//     });
//
//     it('LOGIN_USER_FAILURE', () => {
//       const errorData = { err: 'fatal' };
//       expect(loginUserFailure(errorData))
//         .toEqual({
//           type: 'LOGIN__USER_FAILURE',
//           payload: errorData,
//         });
//     });
//
//     it('LOGOUT_USER', () => {
//       expect(logoutUser()).toEqual({ type: 'LOGOUT_USER' });
//     });
//   });

  describe('async action', () => {
    axios.defaults.adapter = httpAdapter;
    nock.disableNetConnect();
    const host = 'http://calendula.me:8888';

    it('login user', async () => {
      const store = mockStore({});
      const id = '123456789';
      const secret = 'xxx';
      const payload = { ...userData, isAdmin: true, id };
      const testJwtToken = jwtGen.encode(payload, secret);

      nock(host).post(urls.login)
        .reply('200', {
          status: 'ok',
          data: {
            token: testJwtToken,
          },
        });

      const expectedActions = [
        loginUserRequest(),
        loginUserSuccess({ ...userData, isAdmin: true }),
      ];
      await store.dispatch(login({ id, ...userData }, history));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
