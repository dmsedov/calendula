import React from 'react';

const Search = (props) => {
  const { openModal, show } = props;
  return show ? (
    <button
      type="button"
      className="btn info-panel__search-btn"
      data-toggle="modal"
      onClick={openModal('Search')}
    />
  ) : null;
};

export default Search;
