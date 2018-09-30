import React from 'react';

export default class Search extends React.Component {
  render() {
    const { openModal, show } = this.props;
    return show ? (
      <button
        type="button"
        className="search btn btn-primary"
        data-toggle="modal"
        onClick={openModal('Search')}
      />
    ) : null;
  }
}
