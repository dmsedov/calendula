import React from 'react';
import { Icon } from 'antd';

export default class Calendar extends React.Component {
  render() {
    const { name } = this.props;

    return (
      <div className="calendar">
        <div className="calendar__control-panel">
          <div className="calendar__nav-btn">
            <Icon type="left-circle" theme="filled" />
          </div>
          <div className="calendar__date">1 августа 2018 г.</div>
          <div className="calendar__nav-btn">
            <Icon type="right-circle" theme="filled" />
          </div>
          <div className="calendar__add-event-btn">
            <Icon type="plus-circle" theme="filled" />
          </div>
        </div>
        <div className="calendar__days">
          <div className="calendar__day calendar__day_not-current">28</div>
          <div className="calendar__day calendar__day_not-current">29</div>
          <div className="calendar__day calendar__day_not-current">30</div>
          <div className="calendar__day calendar__day_not-current">31</div>
          <div className="calendar__day">
            <div className="calendar__day-of-week">
              <span className="calendar__day-name">Чт</span>
              <span className="calendar__day-number calendar__day-number_current">1</span>
            </div>
            <div className="calendar__day-content">
              <ul className="calendar__day-events">
                <li>Утром сделать это</li>
                <li>Магазин</li>
                <li>Поход в кино</li>
                <li>Встреча с другом</li>
                <li>Встреча по работе</li>
                <li>Забрать дебетовую карту из банка</li>
                <li>Поход в кино1</li>
                <li>Встреча с другом</li>
                <li>Встреча по работе</li>
                <li>Забрать дебетовую карту из банка</li>
                <li>Поход в кино2</li>
                <li>Встреча с другом</li>
                <li>Встреча по работе</li>
                <li>Забрать дебетовую карту из банка</li>
              </ul>
            </div>
          </div>
          <div className="calendar__day">2</div>
          <div className="calendar__day">3</div>
          <div className="calendar__day">4</div>
          <div className="calendar__day">5</div>
          <div className="calendar__day">6</div>
          <div className="calendar__day">7</div>
          <div className="calendar__day">8</div>
          <div className="calendar__day">9</div>
          <div className="calendar__day">10</div>
          <div className="calendar__day">11</div>
          <div className="calendar__day">12</div>
          <div className="calendar__day">13</div>
          <div className="calendar__day">14</div>
          <div className="calendar__day">15</div>
          <div className="calendar__day">16</div>
          <div className="calendar__day">17</div>
          <div className="calendar__day">18</div>
          <div className="calendar__day">19</div>
          <div className="calendar__day">20</div>
          <div className="calendar__day">21</div>
          <div className="calendar__day">22</div>
          <div className="calendar__day">23</div>
          <div className="calendar__day">24</div>
          <div className="calendar__day">25</div>
          <div className="calendar__day">26</div>
          <div className="calendar__day">27</div>
          <div className="calendar__day">28</div>
          <div className="calendar__day">29</div>
          <div className="calendar__day">30</div>
          <div className="calendar__day">31</div>
        </div>
      </div>
    );
  }
}
