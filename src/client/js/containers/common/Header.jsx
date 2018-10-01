import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../../components/common/Header';
import { logout } from '../../actions/auth';
import * as uiActions from '../../actions/uiPopup';
import MenuSwitch from '../../hoc/MenuSwitch';
import paths from '../../paths';

const mapStateToProps = (state) => {
  const {
    user: { isAuthenticated, isAdmin },
    uiPopup: { isNavMenuOpen, isModalShown, isNavElClicked },
    uiScreen: { isSmallScreen },
  } = state;

  const mode = isAuthenticated ? 'authenticated' : 'guest';

  return {
    userStatus: mode,
    isAdmin,
    isModalShown,
    isNavMenuOpen,
    isNavElClicked,
    isSmallScreen,
    paths,
  };
};

export default withRouter(connect(mapStateToProps,
  { ...uiActions, logout })(MenuSwitch(Component)));
