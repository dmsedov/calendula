import React from 'react';
// import cn from 'classnames';
import _ from 'lodash';
import { Nav, NavItem } from 'reactstrap';

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
    } = this.props;

    return (
      <Nav className="ml-auto">
        {React.Children.map(renderNavMenuByPath(), item => (
          <NavItem key={_.uniqueId()}>{item}</NavItem>
        ))}
      </Nav>
    );
  }
}
