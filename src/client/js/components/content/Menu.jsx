import React from 'react';
import _ from 'lodash';
import { Nav } from 'reactstrap';

export default class Menu extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { navMenu, isLessThanMdScreen } = prevProps;
    if (this.props.isNavMenuOpen && isLessThanMdScreen) {
      this.snapshotNavMenu = navMenu;
    } else {
      this.snapshotNavMenu = null;
    }
  }

  render() {
    const { navMenu } = this.props;
    return (
      <Nav navbar>
        {React.Children.map(this.snapshotNavMenu || navMenu, item => (
          <div key={_.uniqueId()}>{item}</div>
        ))}
      </Nav>
    );
  }
}
