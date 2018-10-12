import React from 'react';
import { Link } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
} from 'reactstrap';

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

    handleLogOut = () => {
      const { logout, history } = this.props;
      logout(history);
    }

    makeAuthNavMenu = (pathName, isAdmin) => {
      const { paths: { main, calendar } } = this.props;
      const makeItemsByRights = () => {
        return isAdmin ? [
          <NavItem>
            <Link to={main} className="nav-link" onClick={this.handleClickOnNavItem}>Главная</Link>
          </NavItem>,
          <NavItem>
            <a className="nav-link" href="#" onClick={this.handleOpenModal('AccessLink')}>Cсылка для доступа</a>
          </NavItem>,
          <NavItem>
            <a className="nav-link" href="#" onClick={this.handleOpenModal('AccessForm')}>Управление доступом</a>
          </NavItem>,
        ] :
          [
            <NavItem>
              <Link to={main} className="nav-link" onClick={this.handleClickOnNavItem}>Главная</Link>
            </NavItem>,
          ];
      };
      return {
        [main]: [
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
               Календари
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link to={calendar} className="nav-link" onClick={this.handleClickOnNavItem}>Мой календарь</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to={calendar} className="nav-link" onClick={this.handleClickOnNavItem}>календарь</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>,
        ],
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
