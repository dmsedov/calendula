import React from 'react';

export default class Search extends React.Component {
  handleSearchSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSearchSubmit}>
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
