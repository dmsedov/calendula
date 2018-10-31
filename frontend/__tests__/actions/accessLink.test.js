import axios from 'axios';
import nock from 'nock';
import httpAdapter from 'axios/lib/adapters/http';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchLinkRequest,
  fetchLinkSuccess,
  fetchLinkFailure,
  fetchAccessLink,
} from '../../js/actions/accessLink';
import urls from '../../js/api/urls';
import errors from '../../js/errors';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('accessLink actions', () => {
  describe('sync actions', () => {
    it('FETCH_LINK_REQUEST', () => {
      expect(fetchLinkRequest()).toEqual({ type: 'FETCH_LINK_REQUEST' });
    });

    it('FETCH_LINK_SUCCESS', () => {
      const link = 'test_link';
      expect(fetchLinkSuccess({ link }))
        .toEqual({ type: 'FETCH_LINK_SUCCESS', payload: { link } });
    });

    it('FETCH_LINK_FAILURE', () => {
      const msg = 'failed_get_link';

      expect(fetchLinkFailure({ error: msg }))
        .toEqual({
          type: 'FETCH_LINK_FAILURE',
          payload: {
            error: msg,
          },
        });
    });
  });

  describe('async actions', () => {
    axios.defaults.adapter = httpAdapter;
    nock.disableNetConnect();
    const host = 'http://localhost';
    const c_id = '000000000';

    describe('success fetchAccessLink', async () => {
      const store = mockStore({});
      const testLink = 'test_link';
      nock(host)
        .post(urls.accesslink)
        .reply('200', {
          status: 'ok',
          link: testLink,
        });

      const expectedActions = [
        fetchLinkRequest(),
        fetchLinkSuccess({ link: testLink }),
      ];
      await store.dispatch(fetchAccessLink(c_id));
      expect(store.getActions()).toEqual(expectedActions);
    });

    describe('fetchAccessLink with error', async () => {
      const store = mockStore({});
      const msg = 'something_bad_happened';
      nock(host).post(urls.accesslink).replyWithError(msg);

      const expectedActions = [
        fetchLinkRequest(),
        fetchLinkFailure({ error: errors[msg] }),
      ];
      await store.dispatch(fetchAccessLink(c_id));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
