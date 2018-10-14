import React from 'react';
import { ModalHeader, ModalBody, Button } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { genAccessLink } from '../../api';

export default class AccessLink extends React.Component {
  state = {
    value: '',
    copied: false,
  };

  handleCloseModal = () => {
    const { toggle } = this.props;
    toggle();
  }

  handleGenAccessLink = async () => {
    const { c_id, resetErrorMsg, genLinkError } = this.props;
    try {
      const { link } = await genAccessLink(c_id);
      this.setState({ value: link });
      resetErrorMsg();
    } catch (e) {
      genLinkError();
    }
  }

  render() {
    const { value } = this.state;

    return (
      <div id="access-link">
        <ModalHeader>
          Ссылка доступа
        </ModalHeader>
        <ModalBody>
          <div className="content">
            <p className="description">Нажмите Скопировать для копирования ссылки в буфер</p>
            <input className="access-link" type="text" name="accessLink" value={value} readOnly />
            <CopyToClipboard
              text={value}
              onCopy={() => { this.setState({ copied: !this.state.copied }); }}
            >
              <Button onClick={this.handleCloseModal} color="primary" size="sm" />
            </CopyToClipboard>
            <Button onClick={this.handleGenAccessLink} color="primary" size="sm">Сгенерировать ссылку</Button>
          </div>
        </ModalBody>
      </div>
    );
  }
}
