import React from 'react';
import { ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
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
      pointerEvents: accessLink ? 'visiblePainted' : 'none',
    };

    return (
      <div className="access-form">
        <ModalHeader>
          Ссылка доступа
        </ModalHeader>
        <ModalBody>
          <div className="access-form__content">
            <p className="access-form__info-text">Сгенерируйте ссылку для доступа в календарь.</p>
            <div className="access-form__field">
              <input
                className="form-control access-form__access-link"
                type="text"
                value={accessLink}
                readOnly
              />
              <CopyToClipboard
                text={accessLink}
              >
                <Icon
                  type="copy"
                  theme="filled"
                  onClick={this.handleCloseModal}
                  style={iconStyle}
                />
              </CopyToClipboard>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.handleGenAccessLink}>Сгенерировать ссылку</Button>
        </ModalFooter>
      </div>
    );
  }
}
