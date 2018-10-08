import React from 'react';
import { ModalHeader, ModalBody, Button } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class AccessLink extends React.Component {
  state = {
    value: '',
    copied: false,
  };

  componentDidMount() {
    const mockLink = 'http://calendula.me:8888';
    this.setState({ value: mockLink });
  }

  handleCloseModal = () => {
    const { toggle } = this.props;
    toggle();
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
              <Button onClick={this.handleCloseModal} color="primary" size="sm">Скопировать</Button>
            </CopyToClipboard>
          </div>
        </ModalBody>
      </div>
    );
  }
}
