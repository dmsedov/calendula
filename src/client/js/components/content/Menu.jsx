import React from 'react';
import _ from 'lodash';
import { Nav, NavItem } from 'reactstrap';

export default class Menu extends React.PureComponent {
  componentDidUpdate(prevProps) {
    console.log('updating');
    const { navMenu, isNavMenuOpen, isSmallScreen } = prevProps;
    if (!isSmallScreen || isNavMenuOpen) {
      this.snapshotNavMenu = null;
      console.log('condition update');
    } else if (!isNavMenuOpen) {
      this.snapshotNavMenu = navMenu;
    }
  }

  render() {
    const { navMenu } = this.props;
    return (
      <Nav navbar>
        {React.Children.map(this.snapshotNavMenu || navMenu, item => (
          <NavItem key={_.uniqueId()}>{item}</NavItem>
        ))}
      </Nav>
    );
  }
}
