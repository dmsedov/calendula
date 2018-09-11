import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../content/Menu';

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
    // const { isExpandNavMenu } = this.state;
    const {
      userStatus,
      location: { pathname },
      modalName,
      renderModalItemByName,
      isExpandNavMenu,
    } = this.props;

    return (
      <header>
        <div className="menu-position bg-primary">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/" onClick={this.handleClickOnLogo}>Calendula</Link>
            {userStatus === 'authenticated' && pathname === '/calendar' ? this.renderSearhEl() : null}
            <Menu {...this.props} />
            {isExpandNavMenu ? <div className="menu-layout" onClick={this.handleClickBeyoundOfMenu}></div> : null}
          </nav>
        </div>
        {renderModalItemByName(modalName)}
      </header>
    );
  }
}
