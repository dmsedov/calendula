import React from 'react';
// import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import Menu from '../content/Menu';
import paths from '../../paths';

const { main, calendar } = paths;

export default class Header extends React.Component {
  handleCloseModal = () => {
    const { closeModal } = this.props;

    closeModal();
  }

  renderSearhEl = () => {
    const { handleOpenModal } = this.props;
    return <button type="button" className="search btn btn-primary" data-toggle="modal" onClick={handleOpenModal('Search')} />;
  }

  render() {
    const {
      userStatus,
      location: { pathname },
      isExpandNavMenu,
    } = this.props;

    return (
      <header>
        <div className="menu-position">
          <Navbar expand="md">
            <NavbarBrand href={main}>Calendula</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isExpandNavMenu} navbar>
              <Menu {...this.props} />
            </Collapse>
          </Navbar>
          {userStatus === 'authenticated' && pathname === calendar ? this.renderSearhEl() : null}
        </div>
      </header>
    );
  }
}
