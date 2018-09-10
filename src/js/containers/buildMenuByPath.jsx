import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Search from './Search';

export default (Component) => {
  return class BuilderMenuByPath extends React.Component {
    handleClickOnLink = name => (e) => {
      e.preventDefault();
      const { openModal } = this.props;

      openModal({ name });
    }


   handleLogOut = (e) => {
     e.preventDefault();
     const { logout, history } = this.props;
     logout(history);
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

   renderModalItemByName = (name) => {
     const { isModalShown } = this.props;

     const Modal = {
       Search,
     }[name];

     return isModalShown ? <Modal /> : null;
   }

   renderNavMenuByPath = () => {
     const { userStatus, isAdmin, location: { pathname } } = this.props;
     const menuItemsByUserStatus = {
       authenticated: this.makeAuthNavMenu,
       guest: this.makeNotAuthMenu,
     };
     return menuItemsByUserStatus[userStatus](pathname, isAdmin)
     || this.makeNotFoundPageMenuItems();
   }

   render() {
     return (
       <Component
         {...this.props}
         handleClickOnLink={this.handleClickOnLink}
         renderNavMenuByPath={this.renderNavMenuByPath}
         renderModalItemByName={this.renderModalItemByName}
       />
     );
   }
  };
};
