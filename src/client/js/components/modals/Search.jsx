import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';
import _ from 'lodash';

export default class Search extends React.Component {
  handleSearchSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return [
      <ModalHeader key={_.uniqueId()}>
        Поиск события
      </ModalHeader>,
      <ModalBody key={_.uniqueId()}>
        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSearchSubmit}>
          <input className="form-control mr-sm-2" type="search" placeholder="Искать" aria-label="Search" />
          <button className="btn" type="submit">Искать</button>
        </form>
      </ModalBody>,
    ];
  }
}
