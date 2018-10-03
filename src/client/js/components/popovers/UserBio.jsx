import React from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export default class UserBio extends React.PureComponent {
  toggle = () => {
    const { togglePopOver } = this.props;
    togglePopOver();
  };

  render() {
    const {
      imgUrl,
      name,
      handleLogOut,
      isPopoverOpen,
    } = this.props;

    return (
      <div className="user-info">
        <div id="user-avatar" onClick={this.toggle}>
          <img alt="avatar" src={imgUrl} width="32" height="32" />
        </div>
        <Popover className="user-bio" placement="top-end" isOpen={isPopoverOpen} target="user-avatar" toggle={this.toggle}>
          <PopoverHeader>
            User Bio
          </PopoverHeader>
          <PopoverBody>
            <div className="user-data">
              <img alt="avatar" src={imgUrl} width="96" height="96" />
              <span>User name: {name}</span>
            </div>
            <div className="account-controls">
              <span className="log-out" onClick={handleLogOut}>Logout</span>,
            </div>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}
