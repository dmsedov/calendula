import React from 'react';
import { Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';
import cn from 'classnames';
import _ from 'lodash';

export default class Day extends React.Component {
  state = {
    idClickedEvent: null,
    isClickedDay: false,
  }

  toggle = () => {
    const { isClickedDay } = this.state;
    // console.log(isClickedDay, 'isClickedDay');
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
      // console.log('request to get form');
      return;
    }
    // console.log('handleClickOnEvent');
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

  makeVerboseDayEventsList = () => {
    const { idClickedEvent } = this.state;
    const { events } = this.props;

    return events.map((eventData) => {
      const { id, title, time_interval } = eventData;

      const classNamesEventEl = cn({
        'calendar__day-event': true,
        active: idClickedEvent === id,
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

  makeShortDayEventsList = () => {
    const { events } = this.props;
    const countVisibleEvent = 4;
    const titledEvents = events.filter(eventData => eventData.title);
    const visibleEvents = titledEvents
      .map((eventData, index) => {
        const { id, title } = eventData;
        const shortTitle = title.slice(0, 15);
        const endStr = shortTitle.length === 15 ? '...' : '';
        return title && index <= countVisibleEvent ? (
          <li key={id} className="calendar__day-event-short">
            {`${shortTitle}${endStr}`}
          </li>
        ) : null;
      });

    const countOfHiddenEvents = titledEvents.length - countVisibleEvent;
    const eventsCounter = countOfHiddenEvents > 0 ?
      (<div key={_.uniqueId()} className="calendar__eventsCounter">{`+${countOfHiddenEvents}`}</div>) :
      null;
    return [
      visibleEvents,
      eventsCounter,
    ];
  }

  renderPopupEventList = (listEvents) => {
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
          {listEvents.length === 0 ?
            <p className="calendar__popup-info-msg">Здесь пока нет событий</p>
            : (
              <ul className="calendar__popup-day-events">
                {listEvents}
              </ul>
            )}
        </PopoverBody>
        <div className="popover-footer">
          <div className="calendar__popup-control-panel">
            <Button>Cоздать событие</Button>
          </div>
        </div>
      </Popover>
    );
  }

  renderDayContentFull = (listEvents) => {
    return (
      <div className="calendar__day-content">
        <ul className="calendar__day-events">
          {listEvents}
        </ul>
      </div>
    );
  }

  renderDayContentShort = () => {
    return (
      <div className="calendar__day-content-short">
        <ul className="calendar__day-events-short">
          {this.makeShortDayEventsList()}
        </ul>
      </div>
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

    const eventListToggler = !isLessThanLgScreen ? this.toggle : null;
    const listEvents = this.makeVerboseDayEventsList();

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
        {isLessThanLgScreen ? this.renderDayContentFull(listEvents)
          : this.renderDayContentShort()}
        {this.renderPopupEventList(listEvents)}
      </div>
    );
  }
}
