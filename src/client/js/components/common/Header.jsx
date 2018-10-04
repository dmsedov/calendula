import React from 'react';
// import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import Menu from '../content/Menu';
import Search from '../content/Search';
import UserBio from '../popovers/UserBio';

export default class Header extends React.Component {
  toggleNavBar = () => {
    const { isNavMenuOpen, openNavMenu, closeNavMenu, isSmallScreen } = this.props;
    if (!isSmallScreen) {
      closeNavMenu();
    }
    if (isNavMenuOpen) {
      closeNavMenu({ navMenuState: isNavMenuOpen });
    } else {
      openNavMenu();
    }
  }

  handleClickOnLayout = () => {
    const { closeNavMenu } = this.props;
    closeNavMenu();
  }

  renderLayout = () => {
    const backLayoutStyles =  {
      position: 'absolute',
      right: 0,
      left: 0,
      height: '100vh',
      zIndex: 500,
    }
    return (
      <div style={{ position: 'relative' }}>
        <div style={backLayoutStyles} onClick={this.handleClickOnLayout} />
      </div>
    );
  }

  render() {
    const {
      userStatus,
      name,
      imgUrl,
      location: { pathname },
      isNavMenuOpen,
      renderNavMenu,
      handleOpenModal,
      isPopoverOpen,
      isSmallScreen,
      paths: { main, calendar },
      togglePopOver,
      handleLogOut,
    } = this.props;

    return (
      <header>
        <div className="menu-position">
          <Navbar dark expand="md">
            <NavbarBrand href={main}>Calendula</NavbarBrand>
            <NavbarToggler className="mr-2" onClick={this.toggleNavBar} />
            <Collapse isOpen={isNavMenuOpen} exit={isSmallScreen} navbar>
              <Menu
                isNavMenuOpen={isNavMenuOpen}
                navMenu={renderNavMenu()}
                isSmallScreen={isSmallScreen}
              />
            </Collapse>
          </Navbar>
          {isNavMenuOpen ? this.renderLayout() : null}
          <div className="pos-container">
            <Search
              openModal={handleOpenModal}
              show={pathname === calendar}
            />
            <UserBio
              userStatus={userStatus}
              name={name}
              imgUrl={imgUrl}
              handleLogOut={handleLogOut}
              isPopoverOpen={isPopoverOpen}
              togglePopOver={togglePopOver}
            />
          </div>
        </div>
      </header>
    );
  }
}
