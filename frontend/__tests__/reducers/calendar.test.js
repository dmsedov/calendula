import {
  fetchCalendarRequest,
  fetchCalendarSuccess,
  fetchCalendarFailure,
} from '../../src/js/actions/calendar';
import { calendarFetching, calendar } from '../../src/js/reducers/calendar';
import testCalendar from './testData/calendar.json';

describe('Fetching calendar reducers', () => {
  it('should return the initial state', () => {
    expect(calendar(undefined, {})).toEqual(null);
    expect(calendarFetching(undefined, {})).toEqual('none');
  });

  it('FETCH_CALENDAR_REQUEST', () => {
    expect(calendarFetching('none', fetchCalendarRequest())).toEqual('requested');

    expect(calendar(null, fetchCalendarRequest()))
      .toEqual(null);
  });

  it('FETCH_CALENDAR_SUCCESS', () => {
    expect(calendarFetching('requested', fetchCalendarSuccess())).toEqual('successed');

    const {
      previous_month_days,
      current_month_days,
      next_month_days,
    } = testCalendar;

    const calendarData = {
      previous_month_id: 1,
      current_date: {
        day: {
          id: 58,
          number: 28,
        },
        month: {
          id: 2,
          name: 'Октябрь',
        },
        year: 2018,
      },
      next_month_id: 3,
      days: [
        ...previous_month_days,
        ...current_month_days,
        ...next_month_days,
      ],
    };

    expect(calendar(null, fetchCalendarSuccess({ calendar: testCalendar })))
      .toEqual(calendarData);
  });

  it('FETCH_CALENDAR_FAILURE', () => {
    expect(calendarFetching('requested', fetchCalendarFailure())).toEqual('failured');
  });
});
