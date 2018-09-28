import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../content/Menu';
import paths from '../../paths';

const { main, calendar } = paths;

export default class Header extends React.Component {
  handleClickBeyoundOfMenu = () => {
    const { closeNavMenu } = this.props;
    closeNavMenu();
  }

  handleClickOnLogo = () => {
    const { closeNavMenu } = this.props;
    closeNavMenu();
  } // требует рефакторинга обработчиков много повторений!!!

  renderSearhEl = () => {
    const { handleOpenModal } = this.props;
    return <button type="button" className="search btn btn-primary" data-toggle="modal" onClick={handleOpenModal('Search')} />;
  }

  render() {
    const {
      userStatus,
      location: { pathname },
      // modalName,
      // renderModalItemByName,
      isExpandNavMenu,
    } = this.props;

    return (
      <header>
        <div className="menu-position bg-primary">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to={main} onClick={this.handleClickOnLogo}>Calendula</Link>
            {userStatus === 'authenticated' && pathname === calendar ? this.renderSearhEl() : null}
            <Menu {...this.props} />
            {isExpandNavMenu ? <div className="menu-layout" onClick={this.handleClickBeyoundOfMenu} /> : null}
          </nav>
        </div>
      </header>
    );
  }
}
