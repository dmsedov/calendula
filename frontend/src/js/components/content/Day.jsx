import React from 'react';
import { Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';
import cn from 'classnames';

export default class Day extends React.Component {
  state = {
    idClickedEvent: null,
    isClickedDay: false,
  }

  toggle = () => {
    console.log('changeDayState');
    const { isClickedDay } = this.state;
    isClickedDay ? this.resetState():
    this.setState({ isClickedDay: true });
  }

  resetState = () => {
    this.setState({
      isClickedDay: false,
      idClickedEvent: null,
    })
  }

  handleClickOnEvent = id => ({ target }) => {
    const { idClickedEvent } = this.state;
    if (id === idClickedEvent) {
      this.resetState();
      console.log('request to get form');
      return;
    }
    console.log('handleClickOnEvent');
    this.setState({ idClickedEvent: id, isClickedDay: true });
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
    const { idClickedEvent } = this.state;
    const { events } = this.props;

    return events.map((eventData) => {
      const { id, title, time_interval } = eventData;
      console.log(idClickedEvent === id, 'comparing is');
      const classNamesEventEl = cn({
        [`calendar${elStyle}`]: true,
        'calendar__day-event_clicked': idClickedEvent === id,
      });

      return (
        <li
          key={id}
          className={classNamesEventEl}
          onClick={this.handleClickOnEvent(id)}
        >
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

  renderPopupEventList = (eventList) => {
    const { isClickedDay } = this.state;
    const { dayId, isLessThanLgScreen } = this.props;

    const popoverClassnames = cn({
      'calendar__popup-events': true,
      popover_hidden: isLessThanLgScreen,
    });

    return (
      <Popover
        className={popoverClassnames}
        placement="top-start"
        isOpen={isClickedDay}
        target={`calendar-day-${dayId}`}
        toggle={this.toggle}
      >
        <PopoverHeader>
          События
        </PopoverHeader>
        <PopoverBody>
          <ul className="calendar__popup-day-events">
            {eventList}
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
    } = this.props;

    const classNamesDayEvents = cn({
      'calendar__day-events': true,
      'calendar__day-events_screen_small': isLessThanLgScreen,
    });
    const verboseEventList = this.makeVerboseDayEventsList('__day-event');
    const shortEventList = this.makeShortDayEventsList('__day-event');

    const eventListToggler = !isLessThanLgScreen ? this.toggle : null;
    return (
      <div
        key={dayId}
        id={`calendar-day-${dayId}`}
        className={classNamesDay}
        onClick={eventListToggler}
      >
        <div className="calendar__day-of-week">
          {isLessThanLgScreen && <span className="calendar__day-name">{this.makeShortWeekDayNames(weekDay)}</span>}
          <span className={classNamesDayNumber}>{number}</span>
        </div>
        <div className="calendar__day-content">
          <ul className={classNamesDayEvents}>
            {!isLessThanLgScreen ? shortEventList : verboseEventList}
          </ul>
        </div>
        {this.renderPopupEventList(verboseEventList)}
      </div>
    );
  }
}
