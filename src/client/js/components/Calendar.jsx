import React from 'react';
// import { Link } from 'react-router-dom';

export default class Calendar extends React.Component {
  handleLogOut = (e) => {
    e.preventDefault();

    const { logout, history } = this.props;
    logout(history);
  }

  render() {
    const { name } = this.props;

    return (
      <div id="calendar-content">
        <div className="calendar">
          <div className="controls">
            <div className="nav-arrow left" />
            <div className="date">1 августа 2018 г.</div>
            <div className="nav-arrow right" />
            <div className="add-event-btn" />
          </div>
          <div className="days">
            <div className="day not-current">28</div>
            <div className="day not-current">29</div>
            <div className="day not-current">30</div>
            <div className="day not-current">31</div>
            <div className="day">
              <div className="day-of-week">
                <span className="name">Чт</span>
                <span className="number current active">1</span>
              </div>
              <div className="content">
                <ul className="events">
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
            <div className="day">2</div>
            <div className="day">3</div>
            <div className="day">4</div>
            <div className="day">5</div>
            <div className="day">6</div>
            <div className="day">7</div>
            <div className="day">8</div>
            <div className="day">9</div>
            <div className="day">10</div>
            <div className="day">11</div>
            <div className="day">12</div>
            <div className="day">13</div>
            <div className="day">14</div>
            <div className="day">15</div>
            <div className="day">16</div>
            <div className="day">17</div>
            <div className="day">18</div>
            <div className="day">19</div>
            <div className="day">20</div>
            <div className="day">21</div>
            <div className="day">22</div>
            <div className="day">23</div>
            <div className="day">24</div>
            <div className="day">25</div>
            <div className="day">26</div>
            <div className="day">27</div>
            <div className="day">28</div>
            <div className="day">29</div>
            <div className="day">30</div>
            <div className="day">31</div>
          </div>
        </div>
      </div>
    );
  }
}
