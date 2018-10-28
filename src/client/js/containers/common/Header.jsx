import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../../components/common/Header';
import { signoutUser } from '../../actions/auth';
import * as uiActions from '../../actions/uiPopup';
import MenuSwitch from '../../hoc/MenuSwitch';
import paths from '../../paths';

const mapStateToProps = (state) => {
  const {
    user: { name, isAuthenticated, imgUrl, c_id },
    uiPopup: { isNavMenuOpen, isModalShown, isPopoverOpen },
    uiScreen: { isLessThanMdScreen },
  } = state;

  const mode = isAuthenticated ? 'authenticated' : 'guest';

  return {
    userStatus: mode,
    name,
    imgUrl,
    c_id,
    isModalShown,
    isPopoverOpen,
    isNavMenuOpen,
    isLessThanMdScreen,
    paths,
  };
};

export default withRouter(connect(mapStateToProps,
  { ...uiActions, signoutUser })(MenuSwitch(Component)));
