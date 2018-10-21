import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../components/Header';
import { logout } from '../actions/auth';
import { openModal, closeModal } from '../actions/header';
import buildMenuByPath from './buildMenuByPath';

const mapStateToProps = (state) => {
  const { isAuthenticated, isAdmin } = state.user;
  const { isModalShown, modalName } = state.header;
  const mode = isAuthenticated ? 'authenticated' : 'guest';

  return {
    userStatus: mode,
    isAdmin,
    isModalShown,
    modalName,
  };
};

export default withRouter(connect(mapStateToProps,
  { openModal, closeModal, logout })(buildMenuByPath(Component)));
