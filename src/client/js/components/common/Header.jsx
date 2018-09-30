import React from 'react';
// import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import Menu from '../content/Menu';
import Search from '../content/Search';
import paths from '../../paths';

const { main, calendar } = paths;

export default class Header extends React.Component {
  toggleNavBar = () => {
    const { isNavMenuOpen, openNavMenu, closeNavMenu } = this.props;
    // closeNavMenu({ navMenuState: isNavMenuOpen });
    isNavMenuOpen ? closeNavMenu({ navMenuState: isNavMenuOpen }) : openNavMenu();
  }

  render() {
    const {
      location: { pathname },
      isNavMenuOpen,
      renderNavMenu,
      handleOpenModal,
    } = this.props;

    const navBarStyle = { backgroundColor: 'blue' };

    return (
      <header>
        <div className="menu-position">
          <Navbar color="blue" dark style={navBarStyle} expand="md">
            <NavbarBrand href={main}>Calendula</NavbarBrand>
            <NavbarToggler className="mr-2" onClick={this.toggleNavBar} />
            <Collapse isOpen={isNavMenuOpen} navbar>
              <Menu renderNavMenu={renderNavMenu} />
            </Collapse>
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
