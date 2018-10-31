import axios from 'axios';
import nock from 'nock';
import httpAdapter from 'axios/lib/adapters/http';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchCalendarRequest,
  fetchCalendarSuccess,
  fetchCalendarFailure,
  fetchCalendar,
} from '../../src/js/actions/calendar';
import urls from '../../src/js/api/urls';
import errors from '../../src/js/errors';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('calendar actions', () => {
  describe('sync actions', () => {
    it('FETCH_CALENDAR_REQUEST', () => {
      expect(fetchCalendarRequest()).toEqual({ type: 'FETCH_CALENDAR_REQUEST' });
    });

    it('FETCH_CALENDAR_SUCCESS', () => {
      const calendar = { calendar_data: 'some_data' };
      expect(fetchCalendarSuccess({ calendar }))
        .toEqual({ type: 'FETCH_CALENDAR_SUCCESS', payload: { calendar } });
    });

    it('FETCH_CALENDAR_FAILURE', () => {
      const msg = 'failed_get_calendar';

      expect(fetchCalendarFailure({ error: msg }))
        .toEqual({
          type: 'FETCH_CALENDAR_FAILURE',
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

    describe('success fetchCalendar', async () => {
      const store = mockStore({});
      const testCalendar = 'test_calendar';
      nock(host)
        .get(urls.calendar)
        .reply('200', {
          status: 'ok',
          calendar: testCalendar,
        });

      const expectedActions = [
        fetchCalendarRequest(),
        fetchCalendarSuccess({ calendar: testCalendar }),
      ];
      await store.dispatch(fetchCalendar());
      expect(store.getActions()).toEqual(expectedActions);
    });

    describe('fetchCalendar with error', async () => {
      const store = mockStore({});
      const msg = 'something_bad_happened';
      nock(host).get(urls.calendar).replyWithError(msg);

      const expectedActions = [
        fetchCalendarRequest(),
        fetchCalendarFailure({ error: errors[msg] }),
      ];
      await store.dispatch(fetchCalendar());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
