import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../../components/common/Header';
import { logout } from '../../actions/auth';
import * as uiActions from '../../actions/uiPopup';
import MenuSwitch from '../../hoc/MenuSwitch';

const mapStateToProps = (state) => {
  const { isAuthenticated, isAdmin } = state.user;
  const { isNavMenuOpen, isModalShown, isNavElClicked } = state.uiPopup;
  const mode = isAuthenticated ? 'authenticated' : 'guest';

  return {
    userStatus: mode,
    isAdmin,
    isModalShown,
    isNavMenuOpen,
    isNavElClicked,
  };
};

export default withRouter(connect(mapStateToProps,
  { ...uiActions, logout })(MenuSwitch(Component)));
