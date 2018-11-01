import { createAction } from 'redux-actions';

export const clickEventEl = createAction('CLICK_ON_EVENT');

export const toggleEventsList = createAction('TOGGLE_EVENT_LIST');

export const resetDayState = createAction('RESET_DAY_STATE');
