import React from 'react';
import { Icon } from 'antd';
import cn from 'classnames';
import _ from 'lodash';
import Day from './Day';

export default class Calendar extends React.Component {
  componentDidMount() {
    const { fetchCalendar } = this.props;
    fetchCalendar();
  }

  renderPanelWithWeekDayNames = () => {
    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    return dayNames.map(dayName => <div key={_.uniqueId()} className="calendar__day-names">{dayName}</div>);
  }

  render() {
    const {
      calendar,
      isLessThanLgScreen,
    } = this.props;

    if (!calendar) {
      return null;
    }

    const {
      calendar: {
        previous_month_id,
        current_date: {
          day,
          month,
          year,
        },
        next_month_id,
        days,
      },
    } = this.props;

    return (
      <div className="calendar">
        <div className="calendar__control-panel">
          <div className="calendar__nav-btn">
            <Icon type="left-circle" theme="filled" />
          </div>
          <div className="calendar__date">{month.name} {year} г.</div>
          <div className="calendar__nav-btn">
            <Icon type="right-circle" theme="filled" />
          </div>
          <div className="calendar__add-event-btn">
            <Icon type="plus-circle" theme="filled" />
          </div>
        </div>
        <div className="calendar__days">
          {!isLessThanLgScreen ? this.renderPanelWithWeekDayNames() : null}
          {days.map((_day) => {
            const { id, number, week_day, month_id, events_data: { events } } = _day;
            const classNamesDay = cn({
              'calendar__day': true,
              'calendar__day_not-current_month': month_id !== month.id,
            });
            const classNamesDayNumber = cn({
              'calendar__day-number': true,
              'calendar__day-number_current': number === day.number,
            });

            return (
              <Day
                key={id}
                dayId={id}
                weekDay={week_day}
                events={events}
                number={number}
                isLessThanLgScreen={isLessThanLgScreen}
                classNamesDay={classNamesDay}
                classNamesDayNumber={classNamesDayNumber}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
