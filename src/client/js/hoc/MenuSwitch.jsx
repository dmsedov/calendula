import React from 'react';
import { Link } from 'react-router-dom';
import paths from '../paths';

const { main, calendar, login } = paths;

export default (Component) => {
  return class FuncMenuBuilder extends React.Component {
    handleOpenModal = name => (e) => {
      e.preventDefault();
      const { openModal } = this.props;
      openModal({ name });
    }

    handleClickOnNavItem = () => {
      const { closeNavMenu, isNavMenuOpen } = this.props;
      if (isNavMenuOpen) {
        closeNavMenu({ navMenuState: !isNavMenuOpen });
      }
      // else {
      //   openNavMenu();
      // }
    }

    handleLogOut = (e) => {
      e.preventDefault();
      const { closeNavMenu, isNavMenuOpen, logout, history } = this.props;
      closeNavMenu({ navMenuState: isNavMenuOpen });
      logout(history);
    }

    makeAuthNavMenu = (pathName, isAdmin) => {
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
      return {
        [main]: <Link to={login} className="nav-link" onClick={this.handleClickOnNavItem}>Login</Link>,
        [login]: <Link to={main} className="nav-link" onClick={this.handleClickOnNavItem}>Home</Link>,
      }[pathName];
    }

    makeNotFoundPageMenuItems = () => {
      return <Link className="nav-link" to={main} onClick={this.handleClickOnNavItem}>Back to Home</Link>;
    }

    renderNavMenuByPathAndRights = (openModalHandler) => {
      const { userStatus, isAdmin, location: { pathname }, isNavMenuOpen } = this.props;
      const menuItemsByUserStatus = {
        authenticated: this.makeAuthNavMenu,
        guest: this.makeNotAuthMenu,
      };
      const menuItems = menuItemsByUserStatus[userStatus](pathname, isAdmin)
     || this.makeNotFoundPageMenuItems(openModalHandler);
      return (!!isNavMenuOpen && menuItems) || menuItems;
      // (isNavMenuOpen && menuItems) ||
      // return isNavMenuOpen ? menuItems : null ; // лаги с анимацией при нажатии на элемент меню
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
