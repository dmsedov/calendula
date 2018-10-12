import React from 'react';
import { Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';

export default class UserBio extends React.PureComponent {
  state = {
    isOpen: false,
  }

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleExit = () => {
    const { handleLogOut } = this.props;
    this.setState({ isOpen: false });
    handleLogOut();
  }

  render() {
    const { isOpen } = this.state;
    const {
      userStatus,
      imgUrl,
      name,
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
        <Popover className="user-bio" placement="top-end" isOpen={isOpen} target="user-avatar-header" toggle={this.toggle}>
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
              <Button className="btn logout-btn" color="primary" size="sm" onClick={this.handleExit}>Выйти</Button>
            </div>
          </div>
        </Popover>
      </div>
    ) : null;
  }
}
