import React from 'react';
import { ModalHeader, ModalBody, Button } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class AccessLink extends React.Component {
  state = {
    copied: false,
  };

  handleCloseModal = () => {
    const { toggle } = this.props;
    toggle();
  }

  handleGenAccessLink = async () => {
    const { c_id, accessLinkFetching, genAccessLink } = this.props;
    genAccessLink(c_id);
  }

  render() {
    const { accessLink } = this.props;

    return (
      <div id="access-link">
        <ModalHeader>
          Ссылка доступа
        </ModalHeader>
        <ModalBody>
          <div className="content">
            <p className="description">Нажмите Скопировать для копирования ссылки в буфер</p>
            <input className="access-link" type="text" name="accessLink" value={accessLink} readOnly />
            <CopyToClipboard
              text={accessLink}
              onCopy={() => { this.setState({ copied: !this.state.copied }); }}
            >
              <Button disabled={!accessLink} onClick={this.handleCloseModal} color="primary" size="sm">Буфер</Button>
            </CopyToClipboard>
            <Button onClick={this.handleGenAccessLink} color="primary" size="sm">Сгенерировать ссылку</Button>
          </div>
        </ModalBody>
      </div>
    );
  }
}
