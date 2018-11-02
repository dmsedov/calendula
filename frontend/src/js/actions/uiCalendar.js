import { createAction } from 'redux-actions';

export const clickOnDay = createAction('CLICK_ON_DAY');

export const clickOnEventEl = createAction('CLICK_ON_EVENT');

export const toggleEventsList = createAction('TOGGLE_EVENT_LIST');

export const resetDayState = createAction('RESET_DAY_STATE');
