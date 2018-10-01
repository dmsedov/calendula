import React from 'react';
// import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import Menu from '../content/Menu';
import Search from '../content/Search';

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
    const styles = {
      position: 'absolute',
      right: 0,
      left: 0,
      height: '100vh',
      backgroundColor: 'transparent!important',
      zIndex: 500,
    };
    return (
      <div className="nav-backlayout" style={styles} onClick={this.handleClickOnLayout} />
    )
  }

  render() {
    const {
      location: { pathname },
      isNavMenuOpen,
      renderNavMenu,
      handleOpenModal,
      isNavElClicked,
      paths: { main, calendar },
    } = this.props;

    return (
      <header>
        <div className="menu-position">
          <Navbar dark expand="md">
            <NavbarBrand href={main}>Calendula</NavbarBrand>
            <NavbarToggler className="mr-2" onClick={this.toggleNavBar} />
            <Collapse isOpen={isNavMenuOpen} exit={!isNavElClicked} navbar>
              <Menu renderNavMenu={renderNavMenu} />
            </Collapse>
            {isNavMenuOpen ? this.renderLayout() : null}
          </Navbar>
          <Search
            openModal={handleOpenModal}
            show={pathname === calendar}
          />
        </div>
      </header>
    );
  }
}
