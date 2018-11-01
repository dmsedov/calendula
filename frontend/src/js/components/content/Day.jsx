import React from 'react';
import { Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';
import cn from 'classnames';

export default class Day extends React.Component {
  componentDidUpdate = (prevProps) => {
    if (this.props.isLessThanLgScreen !== prevProps.isLessThanLgScreen) {
      this.props.resetState();
    }
  }

  makeShortWeekDayNames = (weekDay) => {
    return {
      Понедельник: 'Пн',
      Вторник: 'Вт',
      Среда: 'Ср',
      Четверг: 'Чт',
      Пятница: 'Пт',
      Суббота: 'Сб',
      Воскресенье: 'Вс',
    }[weekDay];
  }

  makeVerboseDayEventsList = (elStyle) => {
    const { events, idClickedEvent, handleClickOnEvent } = this.props;

    return events.map((eventData) => {
      const { id, title, time_interval } = eventData;
      console.log(idClickedEvent === id, 'comparing is');
      const classNamesEventEl = cn({
        [`calendar${elStyle}`]: true,
        'calendar__day-event_clicked': idClickedEvent === id,
      });

      return (
        <li key={id} className={classNamesEventEl} onClick={handleClickOnEvent(id)}>
          <span>
            {time_interval}
          </span>
          {title}
        </li>
      );
    });
  }

  makeShortDayEventsList = (elStyle) => {
    const { events } = this.props;
    return events.map((eventData) => {
      const { id, title } = eventData;
      return title ? (
        <li key={id} className={`calendar${elStyle}`}>
          {title}
        </li>
      ) : null;
    });
  }

  renderPopupEventList = () => {
    const { dayId, isOpenEventsList, toggleEventsList } = this.props;

    return (
      <Popover
        className="calendar__popup-events"
        placement="top-start"
        isOpen={isOpenEventsList}
        target={`calendar-day-${dayId}`}
        toggle={toggleEventsList(dayId)}
      >
        <PopoverHeader>
          События
        </PopoverHeader>
        <PopoverBody>
          <ul className="calendar__popup-day-events">
            {this.makeVerboseDayEventsList('__day-event')}
          </ul>
        </PopoverBody>
        <div className="popover-footer">
          <div className="calendar__popup-control-panel">
            Control
          </div>
        </div>
      </Popover>
    );
  }

  render() {
    const {
      isLessThanLgScreen,
      dayId,
      number,
      weekDay,
      classNamesDayNumber,
      classNamesDay,
      toggleEventsList,
    } = this.props;

    const classNamesDayEvents = cn({
      'calendar__day-events': true,
      'calendar__day-events_screen_small': isLessThanLgScreen,
    });
    return (
      <div
        key={dayId}
        id={`calendar-day-${dayId}`}
        className={classNamesDay}
        onClick={!isLessThanLgScreen ? toggleEventsList(dayId) : null}
      >
        <div className="calendar__day-of-week">
          {isLessThanLgScreen && <span className="calendar__day-name">{this.makeShortWeekDayNames(weekDay)}</span>}
          <span className={classNamesDayNumber}>{number}</span>
        </div>
        <div className="calendar__day-content">
          <ul className={classNamesDayEvents}>
            {!isLessThanLgScreen ?
              this.makeShortDayEventsList('__day-event')
              : this.makeVerboseDayEventsList('__day-event')}
          </ul>
        </div>
        {!isLessThanLgScreen ? this.renderPopupEventList() : null}
      </div>
    );
  }
}
