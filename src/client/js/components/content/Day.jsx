import React from 'react';
import { Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';

export default class Day extends React.Component {
  state = { isOpenEventsList: false }

  toggle = () => {
    this.setState({ isOpenEventsList: !this.state.isOpenEventsList });
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

  handleClickOnEvent = id => () => {
    console.log(id, 'getEventData on this id');
  }

  makeDayEventsList = eventsList => eventsList.map((eventData) => {
    const { id, title } = eventData;
    return (
      <li key={id} className="calendar__day-event" onClick={this.handleClickOnEvent(id)}>{title}</li>
    );
  });

  render() {
    const { isOpenEventsList } = this.state;
    const {
      isLessThanLgScreen,
      dayId,
      number,
      weekDay,
      events,
      classNamesDayNumber,
      classNamesDay,
    } = this.props;

    const eventsListItems = this.makeDayEventsList(events);

    return (
      <div key={dayId} id={`calendar-day-${dayId}`} className={classNamesDay} onClick={this.toggle}>
        <div className="calendar__day-of-week">
          {isLessThanLgScreen && <span className="calendar__day-name">{this.makeShortWeekDayNames(weekDay)}</span>}
          <span className={classNamesDayNumber}>{number}</span>
        </div>
        <div className="calendar__day-content">
          <ul className="calendar__day-events">
            {eventsListItems}
          </ul>
        </div>
        <Popover
          className="info-panel__user-bio"
          placement="top-start"
          isOpen={isOpenEventsList}
          target={`calendar-day-${dayId}`}
          toggle={this.toggle}
        >
          <PopoverHeader>
            События
          </PopoverHeader>
          <PopoverBody>
              <ul className="calendar__day-events-popup">
                {eventsListItems}
              </ul>
          </PopoverBody>
          <div className="popover-footer">
            <div className="info-panel__account-controls">
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}
