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
      const { closeNavMenu, isNavMenuOpen } = this.props;
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
          <Link to={main} className="nav-link" onClick={this.handleClickOnNavItem}>Главная</Link>,
          <a className="nav-link" href="#" onClick={this.handleOpenModal('GenLink')}>Сгенерировать ссылку</a>,
          <a className="nav-link" href="#" onClick={this.handleOpenModal('AccessForm')}>Управление доступом</a>,
        ] :
          [
            <Link to={main} className="nav-link" onClick={this.handleClickOnNavItem}>Главная</Link>,
          ];
      };
      return {
        [main]: <Link to={calendar} className="nav-link" onClick={this.handleClickOnNavItem}>Календарь</Link>,
        [calendar]: makeItemsByRights(),
      }[pathName];
    }

    makeNotAuthMenu = (pathName) => {
      const { paths: { main, login } } = this.props;
      return {
        [main]: <Link to={login} className="nav-link" onClick={this.handleClickOnNavItem}>Вход</Link>,
        [login]: <Link to={main} className="nav-link" onClick={this.handleClickOnNavItem}>Главная</Link>,
      }[pathName];
    }

    makeNotFoundPageMenuItems = () => {
      const { paths: { main } } = this.props;
      return <Link className="nav-link" to={main} onClick={this.handleClickOnNavItem}>Назад на главную страницу</Link>;
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
          handleLogOut={this.handleLogOut}
          handleOpenModal={this.handleOpenModal}
          renderNavMenu={this.renderNavMenuByPathAndRights}
        />
      );
    }
  };
};
