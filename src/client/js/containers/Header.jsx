import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../components/Header';
import { logout } from '../actions/auth';
import * as headerActions from '../actions/header';
import buildMenuByPath from './buildMenuByPath';

const mapStateToProps = (state) => {
  const { isAuthenticated, isAdmin } = state.user;
  const { isExpandNavMenu, isModalShown, modalName } = state.header;
  const mode = isAuthenticated ? 'authenticated' : 'guest';

  return {
    userStatus: mode,
    isAdmin,
    isModalShown,
    modalName,
    isExpandNavMenu,
  };
};

export default withRouter(connect(mapStateToProps,
  { ...headerActions, logout })(buildMenuByPath(Component)));
