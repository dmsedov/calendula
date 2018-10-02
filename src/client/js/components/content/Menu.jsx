import React from 'react';
import _ from 'lodash';
import { Nav, NavItem } from 'reactstrap';

export default class Menu extends React.PureComponent {
  componentDidMount() {
    const { navMenu, isSmallScreen } = this.props;
    if (isSmallScreen) {
      this.prevNavMenu = navMenu;
    } else {
      this.prevNavMenu = null;
    }
  }

  componentDidUpdate(prevProps) {
    console.log('updating');
    const { navMenu, isNavMenuOpen, isSmallScreen } = prevProps;
    if (isNavMenuOpen && isSmallScreen) {//косяк
      // this.prevNavMenu = null;
      console.log('condition update');
    } else {
      this.prevNavMenu = navMenu;
    }
  }

  render() {
    const { navMenu } = this.props;
    return (
      <Nav navbar>
        {React.Children.map(this.prevNavMenu || navMenu, item => (
          <NavItem key={_.uniqueId()}>{item}</NavItem>
        ))}
      </Nav>
    );
  }
}
