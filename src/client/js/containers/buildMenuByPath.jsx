import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Search from './Search';
import AccessForm from './AccessForm';

export default (Component) => {
  return class BuilderMenuByPath extends React.Component {
    handleOpenModal = name => (e) => {
      e.preventDefault();
      const { openModal, closeNavMenu, isExpandNavMenu } = this.props;
      if (isExpandNavMenu) {
        closeNavMenu();
      }
      openModal({ name });
    }


   handleLogOut = (e) => {
     e.preventDefault();
     const { closeNavMenu, logout, history } = this.props;
     closeNavMenu();
     logout(history);
   }

   makeAuthNavMenu = (pathName, isAdmin) => {
     const makeAdminItems = () => {
       return isAdmin ? [
         <li key={_.uniqueId()} className="nav-item active">
           <a className="nav-link" href="#" onClick={this.handleOpenModal('GenLink')}>Generate link</a>
         </li>,
         <li key={_.uniqueId()} className="nav-item">
           <a className="nav-link" href="#" onClick={this.handleOpenModal('AccessForm')}>Access settings</a>
         </li>,
       ] : null;
     };

     return {
       '/': (
         <ul className="navbar-nav">
           <li className="nav-item">
             <Link to="calendar" className="nav-link">Calendar</Link>
           </li>
         </ul>
       ),
       '/calendar': (
         <ul className="navbar-nav">
           <li className="nav-item">
             <Link to="/" className="nav-link">Home</Link>
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
             <Link to="login" className="nav-link">Login</Link>
           </li>
         </ul>
       ),
       '/login': (
         <ul className="navbar-nav">
           <li className="nav-item">
             <Link to="/" className="nav-link">Home</Link>
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

   renderModalItemByName = (name) => {
     const { isModalShown } = this.props;

     const Modal = {
       Search,
       AccessForm,
     }[name];

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
