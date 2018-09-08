import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  handleLogOut = (e) => {
    e.preventDefault();

    const { logout, history } = this.props;
    logout(history);
  }

  getNavMenuBy = (userStatus, isAdmin, pathName) => {
    const menuItemsByUserStatus = {
      autheticated: this.makeAuthNavMenu,
      guest: this.makeNotAuthMenu,
    };

    return menuItemsByUserStatus[userStatus](pathName, isAdmin) || this.makeNotFoundPageMenuItems();
  }

  makeAuthNavMenu = (pathName, isAdmin) => {
    const makeAdminItems = () => {
      return isAdmin ? [
        <li className="nav-item active">
          <a className="nav-link" href="#">Generate link</a>
        </li>,
        <li className="nav-item">
          <a className="nav-link" href="#">Access settings</a>
        </li>,
      ] : null;
    };
    return {
      '/': (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="calendar" className="nav-link" href="#">Calendar</Link>
          </li>
        </ul>
      ),
      '/calendar': (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link" href="#">Home</Link>
          </li>
          {makeAdminItems()}
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={this.handleLogOut}>Logout</a>
          </li>
        </ul>
      ),
    }[pathName];
  }

  makeNotAuthMenu = (pathName) => {
    return {
      '/': (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="login" className="nav-link" href="#">Login</Link>
          </li>
        </ul>
      ),
      '/login': (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link" href="#">Home</Link>
          </li>
        </ul>
      ),
    }[pathName];
  }

  makeNotFoundPageMenuItems = () => {
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">Back to Home</Link>
        </li>
      </ul>
    );
  }

  renderSearhEl = () => {
    return [
      <button key="searchBtn" type="button" className="search btn btn-primary" data-toggle="modal" data-target="#search" />,
      <div key="modalForSearchBtn" className="modal fade" id="search" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </div>,
    ];
  }

  render() {
    const { isAuthenticated, mode, isAdmin, location: { pathname } } = this.props;

    return (
      <header>
        <div className="menu-position bg-primary">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">Calendula</Link>
            {isAuthenticated ? this.renderSearhEl() : null}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              {this.getNavMenuBy(mode, isAdmin, pathname)}
            </div>
          </nav>
        </div>
      </header>
    );
  }
}
