import React from 'react';
import { ModalHeader, ModalBody, Button } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Icon } from 'antd';

export default class AccessLink extends React.Component {
  handleCloseModal = () => {
    const { toggle } = this.props;
    toggle();
  }

  handleGenAccessLink = async () => {
    const { c_id, fetchAccessLink } = this.props;
    fetchAccessLink(c_id);
  }

  render() {
    const { accessLink } = this.props;
    const iconStyle = {
      fontSize: '1.5rem',
      cursor: 'pointer',
      pointerEvents: accessLink ? 'visiblePainted' : 'none',
    };

    return (
      <div id="access-link">
        <ModalHeader>
          Ссылка доступа
        </ModalHeader>
        <ModalBody>
          <div className="content">
            <p className="description">Сгенерируйте ссылку для доступа в Ваш календарь.</p>
            <input className="access-link" type="text" name="accessLink" value={accessLink} readOnly />
            <CopyToClipboard
              text={accessLink}
            >
              <Icon
                type="copy"
                theme="twoTone"
                style={iconStyle}
                twoToneColor="#00f"
                onClick={this.handleCloseModal}
              />
            </CopyToClipboard>
            <Button onClick={this.handleGenAccessLink} color="primary" size="sm">Сгенерировать ссылку</Button>
          </div>
        </ModalBody>
      </div>
    );
  }
}
