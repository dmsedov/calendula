import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../components/Header';
import { logout } from '../actions/auth';
import { openModal, closeModal } from '../actions/header';

const mapStateToProps = (state) => {
  const { isAuthenticated, isAdmin } = state.user;
  const { isModalShown, modalName } = state.header;
  const mode = isAuthenticated ? 'autheticated' : 'guest';

  return {
    isAuthenticated,
    mode,
    isAdmin,
    isModalShown,
    modalName,
  };
};

export default withRouter(connect(mapStateToProps,
  { openModal, closeModal, logout })(Component));
