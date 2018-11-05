import React from 'react';
import { Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';

export default class UserBio extends React.PureComponent {
  state = {
    isOpen: false,
  }

  toggle = () => {
    const { isOpen } = this.state;
    const { isNavMenuOpen, closeNavMenu } = this.props;
    isNavMenuOpen && closeNavMenu();
    this.setState({ isOpen: !isOpen });
  };

  handleExit = () => {
    const { handleSignout } = this.props;
    this.setState({ isOpen: false });
    handleSignout();
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
      <div className="info-panel__user-profile">
        <div id="user-avatar-header" className="info-panel__user-avatar" onClick={this.toggle}>
          <img alt="avatar" src={imgUrl} width="32" height="32" style={avatarHeaderCss} />
        </div>
        <Popover className="info-panel__user-bio" placement="top-end" isOpen={isOpen} target="user-avatar-header" toggle={this.toggle}>
          <PopoverHeader>
            Пользователь
          </PopoverHeader>
          <PopoverBody>
            <div className="info-panel__user-data">
              <img alt="avatar" src={imgUrl} width="56" height="56" style={avatarPopoverrCss} />
              <span>{name}</span>
            </div>
          </PopoverBody>
          <div className="popover-footer">
            <div className="info-panel__account-controls">
              <Button size="sm" onClick={this.handleExit}>Выйти</Button>
            </div>
          </div>
        </Popover>
      </div>
    ) : null;
  }
}
