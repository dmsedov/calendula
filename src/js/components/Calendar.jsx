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
        <header>
          <h2>Welcome {name}</h2>
          <nav>
            <ul>
              <li>
                <a>Edit</a>
              </li>
              <li>
                <a href="#" onClick={this.handleLogOut}>Logout</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <div>Calendar</div>
        </main>
        <footer>
          Footer
        </footer>
      </div>
    );
  }
}
