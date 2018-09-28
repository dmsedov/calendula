import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../../components/common/Header';
import { logout } from '../../actions/auth';
import * as uiActions from '../../actions/uiPopup';
import addFuncMenuTo from '../../hoc/addFuncMenu';
import Search from '../modals/Search';
import AccessForm from '../modals/AccessForm';

const mapStateToProps = (state) => {
  const { isAuthenticated, isAdmin } = state.user;
  const { isExpandNavMenu, isModalShown } = state.uiPopup;
  const mode = isAuthenticated ? 'authenticated' : 'guest';

  return {
    userStatus: mode,
    isAdmin,
    isModalShown,
    isExpandNavMenu,
  };
};

export default withRouter(connect(mapStateToProps,
  { ...uiActions, logout })(addFuncMenuTo(Component, { Search, AccessForm })));
