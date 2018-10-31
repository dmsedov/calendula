import { handleActions } from 'redux-actions';
import * as actions from '../actions/calendar';
import initGlobalState from './initGlobalState';

const calendarFetching = handleActions({
  [actions.fetchCalendarRequest]() {
    return 'requested';
  },
  [actions.fetchCalendarSuccess]() {
    return 'successed';
  },
  [actions.fetchCalendarFailure]() {
    return 'failured';
  },
}, initGlobalState.calendarFetchingState);

const calendar = handleActions({
  [actions.fetchCalendarSuccess](state, { payload }) {
    const {
      current_day_id,
      previous_month,
      current_month: {
        id,
        month_info: { month_name_ru },
        year_data: { year },
      },
      next_month,
      previous_month_days,
      current_month_days,
      next_month_days,
    } = payload.calendar;

    const days = [
      ...previous_month_days,
      ...current_month_days,
      ...next_month_days,
    ];
    const { number } = days.find(_day => _day.id === current_day_id);
    return {
      previous_month_id: previous_month.id,
      current_date: {
        day: {
          id: current_day_id,
          number,
        },
        month: {
          id,
          name: month_name_ru,
        },
        year,
      },
      next_month_id: next_month.id,
      days,
    };
  },
}, initGlobalState.calendar);

export { calendarFetching, calendar };
