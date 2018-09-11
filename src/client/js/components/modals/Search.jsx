import React from 'react';

export default class Search extends React.Component {
  handleSearchClick = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const styles = { display: 'block' };

    return (
      <div className="modal fade show" tabIndex="-1" style={styles} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        <div className="modal-backdrop fade show" onClick={this.handleSearchClick} />
      </div>
    );
  }
}
