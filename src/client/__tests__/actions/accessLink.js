import axios from 'axios';
import nock from 'nock';
import httpAdapter from 'axios/lib/adapters/http';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwtGen from 'jwt-simple';
import {
  fetchLinkRequest,
  fetchLinkSuccess,
  fetchLinkFailure,
  genAccessLink,
} from '../../js/actions/accessLink';
import { resetErrorMsg } from '../../js/actions/error';
import urls from '../../js/api/v1/config';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('accessLink actions', () => {
  describe('sync actions', () => {
    it('FETCH_LINK_REQUEST', () => {
      expect(fetchLinkRequest()).toEqual({ type: 'FETCH_LINK_REQUEST' });
    });

    it('FETCH_LINK_SUCCESS', () => {
      expect(fetchLinkSuccess()).toEqual({ type: 'FETCH_LINK_SUCCESS' });
    });

    it('FETCH_LINK_FAILURE', () => {
      expect(fetchLinkFailure()).toEqual({ type: 'FETCH_LINK_FAILURE' });
    });
  });

  describe('async actions', () => {
    axios.defaults.adapter = httpAdapter;
    nock.disableNetConnect();
    const host = 'http://localhost';
    const c_id = '000000000';
    const secret = 'xxx';
    const user = {
      uuid: 'test_uuid',
      name: 'test_user',
      email: 'test_email',
      imgUrl: 'test_img_url',
    };
    const payload = { user, calendar: { id: c_id } };
    const testJwtToken = jwtGen.encode(payload, secret);

    describe('success genAccessLink', async () => {
      const store = mockStore({});
      const testLink = 'test_link';
      nock(host)
        .post(urls.generateLink)
        .reply('200', {
          status: 'ok',
          link: testLink,
        });

      const expectedActions = [
        fetchLinkRequest(),
        fetchLinkSuccess({ accessLink: testLink }),
        resetErrorMsg(),
      ];
      await store.dispatch(genAccessLink(c_id));
      expect(store.getActions()).toEqual(expectedActions);
    });

    describe('genAccessLink with error', async () => {
      const store = mockStore({});
      const msg = 'something_bad_happened';
      nock(host).post(urls.login).replyWithError(msg);

      const expectedActions = [
        fetchLinkRequest(),
        fetchLinkFailure(msg),
      ];
      await store.dispatch(genAccessLink(c_id, testJwtToken));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
