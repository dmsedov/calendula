import React from 'react';
import cn from 'classnames';
import _ from 'lodash';

export default class Menu extends React.Component {
  handleClickOnMenuToggle = () => {
    const { isExpandNavMenu, openNavMenu, closeNavMenu } = this.props;
    if (isExpandNavMenu) {
      closeNavMenu();
    } else {
      openNavMenu();
    }
  }

  render() {
    const {
      renderNavMenuByPath,
      isExpandNavMenu,
    } = this.props;

    const classesForNavBar = cn({
      collapse: true,
      'navbar-collapse': true,
      show: isExpandNavMenu,
    });

    return [
      <button
        key={_.uniqueId()}
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        aria-controls="navbarNav"
        aria-label="Toggle navigation"
        onClick={this.handleClickOnMenuToggle}
      >
        <span className="navbar-toggler-icon" />
      </button>,
      <div key={_.uniqueId()} className={classesForNavBar}>
        {renderNavMenuByPath()}
      </div>,
    ];
  }
}
