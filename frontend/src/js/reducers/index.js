import { combineReducers } from 'redux';
import { userFetchingProfileState, user } from './auth';
import { uiPopup, uiScreen, uiCalendar } from './ui';
import { accessLinkFetching, accessLink } from './accessLink';
import { calendarFetching, calendar } from './calendar';
import error from './error';

export default combineReducers({
  userFetchingProfileState,
  accessLinkFetching,
  calendarFetching,
  user,
  calendar,
  accessLink,
  uiScreen,
  uiPopup,
  uiCalendar,
  error,
});
