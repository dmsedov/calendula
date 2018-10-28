import { createAction } from 'redux-actions';
import apiCall from '../api';
import errorHandler from '../helpers/errorHandler';
import errors from '../errors';


// import calendarJSON from './mockCalendar.json'; // delete in future

export const fetchCalendarRequest = createAction('FETCH_CALENDAR_REQUEST');

export const fetchCalendarSuccess = createAction('FETCH_CALENDAR_SUCCESS');

export const fetchCalendarFailure = createAction('FETCH_CALENDAR_FAILURE');

export const fetchCalendar = monthId => async (dispatch) => {
  const { getCalendar } = apiCall.private;
  dispatch(fetchCalendarRequest());
  try {
    const {
      data: { calendar },
    } = await getCalendar(monthId);
    // const calendar = calendarJSON;
    dispatch(fetchCalendarSuccess({ calendar }));
  } catch (e) {
    const errCode = errorHandler(e);
    dispatch(fetchCalendarFailure({ error: errors[errCode] }));
  }
};
