import React from 'react';
import { Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';

export default class UserBio extends React.PureComponent {
  toggle = () => {
    const { togglePopOver } = this.props;
    togglePopOver();
  };

  render() {
    const {
      userStatus,
      imgUrl,
      name,
      handleLogOut,
      isPopoverOpen,
    } = this.props;

    const avatarHeaderCss = {
      borderRadius: '32px',
    };
    const avatarPopoverrCss = {
      borderRadius: '56px',
    };
    return userStatus === 'authenticated' ? (
      <div className="user-profile">
        <div id="user-avatar-header" className="user-avatar" onClick={this.toggle}>
          <img alt="avatar" src={imgUrl} width="32" height="32" style={avatarHeaderCss} />
        </div>
        <Popover className="user-bio" placement="top-end" isOpen={isPopoverOpen} target="user-avatar-header" toggle={this.toggle}>
          <PopoverHeader>
            Пользователь
          </PopoverHeader>
          <PopoverBody>
            <div className="user-data">
              <img alt="avatar" src={imgUrl} width="56" height="56" style={avatarPopoverrCss} />
              <span>{name}</span>
            </div>
          </PopoverBody>
          <div className="popover-footer">
            <div className="account-controls">
              <Button className="btn logout-btn" color="primary" size="sm" onClick={handleLogOut}>Выйти</Button>
            </div>
          </div>
        </Popover>
      </div>
    ) : null;
  }
}
