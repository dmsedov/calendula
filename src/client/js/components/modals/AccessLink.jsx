import React from 'react';
import { ModalHeader, ModalBody, Button } from 'reactstrap';

export default class AccessLink extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div id="access-link">
        <ModalHeader>
          Ссылка доступа
        </ModalHeader>
        <ModalBody>
          <div className="content">
            <p className="description">Нажмите Скопировать для копирования ссылки в буфер</p>
            <input className="access-link" type="text" name="accessLink" readOnly />
            <Button color="primary" size="sm">Скопировать</Button>
          </div>
        </ModalBody>
      </div>
    );
  }
}
