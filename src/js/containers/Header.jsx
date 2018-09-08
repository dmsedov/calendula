import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../components/Header';
import * as actionCreators from '../actions/auth';

const mapStateToProps = (state) => {
  const { isAuthenticated, isAdmin } = state.user;
  const mode = isAuthenticated ? 'autheticated' : 'guest';

  return { isAuthenticated, mode, isAdmin };
};

export default withRouter(connect(mapStateToProps, actionCreators)(Component));
