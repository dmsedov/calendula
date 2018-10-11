import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { withRouter } from 'react-router-dom';
import Component from '../../components/common/Header';
import { logout } from '../../actions/auth';
import * as uiActions from '../../actions/uiPopup';
import MenuSwitch from '../../hoc/MenuSwitch';
import paths from '../../paths';

const mapStateToProps = (state) => {
  const {
    user: { name, isAuthenticated, isAdmin, imgUrl },
    uiPopup: { isNavMenuOpen, isModalShown, isPopoverOpen },
    uiScreen: { isSmallScreen },
  } = state;

  const mode = isAuthenticated ? 'authenticated' : 'guest';

  return {
    userStatus: mode,
    name,
    imgUrl,
    isAdmin,
    isModalShown,
    isPopoverOpen,
    isNavMenuOpen,
    isSmallScreen,
    paths,
  };
};

export default withAlert(withRouter(connect(mapStateToProps,
  { ...uiActions, logout })(MenuSwitch(Component))));
