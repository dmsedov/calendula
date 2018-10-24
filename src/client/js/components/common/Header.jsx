import React from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import Menu from '../content/Menu';
import Search from '../content/Search';
import UserBio from '../popovers/UserBio';

export default class Header extends React.Component {
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = ({ target }) => {
    if ((!this.menuWrapper || !this.menuWrapper.contains(target))) {
      const { closeNavMenu, isNavMenuOpen } = this.props;
      isNavMenuOpen && closeNavMenu();
    }
  }

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

  setRefToNode = (node) => {
    this.menuWrapper = node;
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
      isSmallScreen,
      paths: { main, calendar },
      handleSignout,
      closeNavMenu,
    } = this.props;

    return (
      <header className="header header_bg-color">
        <div className="header__back-layer" />
        <div ref={this.setRefToNode} className="navbar header__content">
          <Navbar dark expand="md">
            <NavbarBrand href={main}>Calendula</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavBar} />
            <Collapse isOpen={isNavMenuOpen} exit={isSmallScreen} navbar>
              <Menu
                isNavMenuOpen={isNavMenuOpen}
                navMenu={renderNavMenu()}
                isSmallScreen={isSmallScreen}
              />
            </Collapse>
          </Navbar>
        </div>
        <div className="info-panel header__item-position">
          <Search
            openModal={handleOpenModal}
            show={pathname === calendar}
          />
          <UserBio
            userStatus={userStatus}
            name={name}
            imgUrl={imgUrl}
            handleSignout={handleSignout}
            isNavMenuOpen={isNavMenuOpen}
            closeNavMenu={closeNavMenu}
          />
        </div>
      </header>
    );
  }
}
