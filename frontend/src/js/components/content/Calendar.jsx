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

  // componentDidUpdate = (prevProps) => {
  //   if (this.props.isLessThanLgScreen !== prevProps.isLessThanLgScreen) {
  //     this.props.resetDayState();
  //   }
  // }

  handleClickOnDay = dayId => () => {
    const { clickOnDay, resetDayState, idClickedDay } = this.props;

    if (idClickedDay !== dayId) {
      resetDayState();
      clickOnDay({ dayId });
    }
  }

  handleClickOnEvent = (id, dayId) => () => {
    const {
      idClickedEvent,
      idClickedDay,
      resetDayState,
      clickOnEventEl,
    } = this.props;

    // if (idClickedDay !== dayId) {
    //   idClickedEvent && resetDayState();
    // }
    if (idClickedEvent !== id) {
      clickOnEventEl({ id, dayId });
    } else if (idClickedDay !== dayId || idClickedEvent === id ) {
      console.log(id, 'getEventData on this id');
      resetDayState();
    }
  }

  renderPanelWithWeekDayNames = () => {
    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    return dayNames.map(dayName => <div key={_.uniqueId()} className="calendar__day-names">{dayName}</div>);
  }

  render() {
    const {
      calendar,
      isLessThanLgScreen,
      idClickedEvent,
      idClickedDay,
      resetDayState,
      isOpenEventsList,
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
          <div className="calendar__date">{day.number} {month.name} {year} г.</div>
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
                isOpenEventsList={isOpenEventsList}
                classNamesDay={classNamesDay}
                classNamesDayNumber={classNamesDayNumber}
                handleClickOnDay={this.handleClickOnDay}
                handleClickOnEvent={this.handleClickOnEvent}
                resetState={resetDayState}
                idClickedEvent={idClickedEvent}
                idClickedDay={idClickedDay}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
