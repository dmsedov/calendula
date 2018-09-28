import React from 'react';
import { ModalBody } from 'reactstrap';

export default class Search extends React.Component {
  handleSearchSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <ModalBody>
        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSearchSubmit}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </ModalBody>
    );
  }
}
