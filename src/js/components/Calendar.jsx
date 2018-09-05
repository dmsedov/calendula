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
      <div className="calendar">
          <div>Calendar</div>
      </div>
    );
  }
}
