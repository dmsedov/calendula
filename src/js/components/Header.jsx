import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import cn from 'classnames';
import Search from '../containers/Search';

export default class Header extends React.Component {
  state = {
    isExpandNavMenu: false,
  }

  handleLogOut = (e) => {
    e.preventDefault();

    const { logout, history } = this.props;
    logout(history);
  }

  handleClickOnLink = name => (e) => {
    e.preventDefault();

    const { openModal } = this.props;
    openModal({ name });
  }

  handleClickOnNavBtn = () => {
    this.setState({ isExpandNavMenu: !this.state.isExpandNavMenu });
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
        <li key={_.uniqueId()} className="nav-item active">
          <a className="nav-link" href="#" onClick={this.handleClickOnLink('GenLink')}>Generate link</a>
        </li>,
        <li key={_.uniqueId()} className="nav-item">
          <a className="nav-link" href="#" onClick={this.handleClickOnLink('Access')}>Access settings</a>
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
    return <button type="button" className="search btn btn-primary" data-toggle="modal" onClick={this.handleClickOnLink('Search')} />;
  }

  renderModalBy = (name) => {
    const Modal = {
      Search
    }[name];

    return <Modal />;
  }

  render() {
    const { isExpandNavMenu } = this.state;
    const {
      isAuthenticated,
      mode,
      isAdmin,
      location: { pathname },
      isModalShown,
      modalName,
    } = this.props;

    const classesForBtn = cn({
      'navbar-toggler': true,
      collapsed: isExpandNavMenu,
    });
    const classesForNavBar = cn({
      collapse: true,
      'navbar-collapse': true,
      show: isExpandNavMenu
    });
    return (
      <header>
        <div className="menu-position bg-primary">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">Calendula</Link>
            {isAuthenticated && pathname === '/calendar' ? this.renderSearhEl() : null}
            <button
              className={classesForBtn}
              type="button"
              data-toggle="collapse"
              aria-controls="navbarNav"
              aria-expanded={isExpandNavMenu}
              aria-label="Toggle navigation"
              onClick={this.handleClickOnNavBtn}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className={classesForNavBar}>
              {this.getNavMenuBy(mode, isAdmin, pathname)}
            </div>
          </nav>
        </div>
        {isModalShown ? this.renderModalBy(modalName) : null}
      </header>
    );
  }
}
