import React from 'react';
import { Link } from 'react-router-dom';

export default (Component) => {
  return class DynamicMenuBuilder extends React.Component {
    handleOpenModal = name => (e) => {
      e.preventDefault();
      const { openModal } = this.props;
      openModal({ name });
    }

    handleClickOnNavItem = () => {
      const { closeNavMenu, isNavMenuOpen, clickOnNavItem } = this.props;
      clickOnNavItem();
      if (isNavMenuOpen) {
        closeNavMenu();
      }
    }

    handleLogOut = (e) => {
      e.preventDefault();
      const { closeNavMenu, logout, history } = this.props;
      closeNavMenu();
      logout(history);
    }

    makeAuthNavMenu = (pathName, isAdmin) => {
      const { paths: { main, calendar } } = this.props;
      const makeItemsByRights = () => {
        return isAdmin ? [
          <Link to={main} className="nav-link" onClick={this.handleClickOnNavItem}>Home</Link>,
          <a className="nav-link" href="#" onClick={this.handleOpenModal('GenLink')}>Generate link</a>,
          <a className="nav-link" href="#" onClick={this.handleOpenModal('AccessForm')}>Access settings</a>,
          <a className="nav-link" href="#" onClick={this.handleLogOut}>Logout</a>,
        ] :
          [
            <Link to={main} className="nav-link" onClick={this.handleClickOnNavItem}>Home</Link>,
            <a className="nav-link" href="#" onClick={this.handleLogOut}>Logout</a>,
          ];
      }; // поправить нарушение DRY!!!
      return {
        [main]: <Link to={calendar} className="nav-link" onClick={this.handleClickOnNavItem}>Calendar</Link>,
        [calendar]: makeItemsByRights(),
      }[pathName];
    }

    makeNotAuthMenu = (pathName) => {
      const { paths: { main, login } } = this.props;
      return {
        [main]: <Link to={login} className="nav-link" onClick={this.handleClickOnNavItem}>Login</Link>,
        [login]: <Link to={main} className="nav-link" onClick={this.handleClickOnNavItem}>Home</Link>,
      }[pathName];
    }

    makeNotFoundPageMenuItems = () => {
      const { paths: { main } } = this.props;
      return <Link className="nav-link" to={main} onClick={this.handleClickOnNavItem}>Back to Home</Link>;
    }

    renderNavMenuByPathAndRights = () => {
      const { userStatus, isAdmin, location: { pathname } } = this.props;
      const menuItemsByUserStatus = {
        authenticated: this.makeAuthNavMenu,
        guest: this.makeNotAuthMenu,
      };
      const menuItems = menuItemsByUserStatus[userStatus](pathname, isAdmin)
     || this.makeNotFoundPageMenuItems();
      return menuItems;
    }

    render() {
      return (
        <Component
          {...this.props}
          handleOpenModal={this.handleOpenModal}
          renderNavMenu={this.renderNavMenuByPathAndRights}
        />
      );
    }
  };
};
