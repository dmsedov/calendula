import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';


export default class Header extends React.Component {
  state = {
    isExpandNavMenu: false,
  }

  handleClickOnNavBtn = () => {
    this.setState({ isExpandNavMenu: !this.state.isExpandNavMenu });
  }

  renderSearhEl = () => {
    const { handleClickOnLink } = this.props;
    return <button type="button" className="search btn btn-primary" data-toggle="modal" onClick={handleClickOnLink('Search')} />;
  }

  render() {
    const { isExpandNavMenu } = this.state;
    const {
      userStatus,
      location: { pathname },
      modalName,
      renderNavMenuByPath,
      renderModalItemByName,
    } = this.props;

    const classesForBtn = cn({
      'navbar-toggler': true,
      collapsed: isExpandNavMenu,
    });
    const classesForNavBar = cn({
      collapse: true,
      'navbar-collapse': true,
      show: isExpandNavMenu,
    });

    return (
      <header>
        <div className="menu-position bg-primary">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">Calendula</Link>
            {userStatus === 'authenticated' && pathname === '/calendar' ? this.renderSearhEl() : null}
            <button
              className={classesForBtn}
              type="button"
              data-toggle="collapse"
              aria-controls="navbarNav"
              aria-expanded={isExpandNavMenu}
              aria-label="Toggle navigation"
              onClick={this.handleClickOnNavBtn}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className={classesForNavBar}>
              {renderNavMenuByPath()}
            </div>
          </nav>
        </div>
        {renderModalItemByName(modalName)}
      </header>
    );
  }
}
