import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';


export default (Component, modalItems) => {
  return class FuncMenuBuilder extends React.Component {
    modalComponents = modalItems;

    handleOpenModal = name => (e) => {
      e.preventDefault();
      const { openModal, closeNavMenu, isExpandNavMenu } = this.props;
      if (isExpandNavMenu) {
        closeNavMenu();
      }
      openModal({ name });
    }

    handleClickOnNavItem = () => {
      const { closeNavMenu } = this.props;
      closeNavMenu();
    }

    handleLogOut = (e) => {
      e.preventDefault();
      const { closeNavMenu, logout, history } = this.props;
      closeNavMenu();
      logout(history);
    }

    makeAuthNavMenu = (pathName, isAdmin) => {
      const makeItemsByRights = () => {
        return isAdmin ? [
          <Link to="/" className="nav-link" onClick={this.handleClickOnNavItem}>Home</Link>,
          <a className="nav-link" href="#" onClick={this.handleOpenModal('GenLink')}>Generate link</a>,
          <a className="nav-link" href="#" onClick={this.handleOpenModal('AccessForm')}>Access settings</a>,
          <a className="nav-link" href="#" onClick={this.handleLogOut}>Logout</a>,
        ] :
          [
            <Link to="/" className="nav-link" onClick={this.handleClickOnNavItem}>Home</Link>,
            <a className="nav-link" href="#" onClick={this.handleLogOut}>Logout</a>,
          ];
      }; // поправить нарушение DRY!!!
      return {
        '/': <Link to="calendar" className="nav-link" onClick={this.handleClickOnNavItem}>Calendar</Link>,
        '/calendar': makeItemsByRights(),
      }[pathName];
    }

    makeNotAuthMenu = (pathName) => {
      return {
        '/': <Link to="login" className="nav-link" onClick={this.handleClickOnNavItem}>Login</Link>,
        '/login': <Link to="/" className="nav-link" onClick={this.handleClickOnNavItem}>Home</Link>,
      }[pathName];
    }

    makeNotFoundPageMenuItems = () => {
      return <Link className="nav-link" to="/" onClick={this.handleClickOnNavItem}>Back to Home</Link>;
    }

    renderModalItemByName = (name) => {
      const { isModalShown } = this.props;

      const Modal = this.modalComponents[name];
      return isModalShown ? <Modal /> : null;
    }

    renderNavMenuByPath = (openModalHandler) => {
      const { userStatus, isAdmin, location: { pathname } } = this.props;
      const menuItemsByUserStatus = {
        authenticated: this.makeAuthNavMenu,
        guest: this.makeNotAuthMenu,
      };
      return menuItemsByUserStatus[userStatus](pathname, isAdmin)
     || this.makeNotFoundPageMenuItems(openModalHandler);
    }

    render() {
      return (
        <Component
          {...this.props}
          handleOpenModal={this.handleOpenModal}
          renderNavMenuByPath={this.renderNavMenuByPath}
          renderModalItemByName={this.renderModalItemByName}
        />
      );
    }
  };
};
