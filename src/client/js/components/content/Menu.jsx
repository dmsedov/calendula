import React from 'react';
import _ from 'lodash';
import { Nav, NavItem } from 'reactstrap';

export default class Menu extends React.Component {
  render() {
    const {
      renderNavMenu,
    } = this.props;

    return (
      <Nav navbar>
        {React.Children.map(renderNavMenu(), item => (
          <NavItem key={_.uniqueId()}>{item}</NavItem>
        ))}
      </Nav>
    );
  }
}
