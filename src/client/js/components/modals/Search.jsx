import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';

export default class Search extends React.Component {
  handleSearchSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return [
      <ModalHeader>
        Поиск события
      </ModalHeader>,
      <ModalBody>
        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSearchSubmit}>
          <input className="form-control mr-sm-2" type="search" placeholder="Искать" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Искать</button>
        </form>
      </ModalBody>,
    ];
  }
}
