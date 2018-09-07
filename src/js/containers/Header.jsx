import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../components/Header';
import * as actionCreators from '../actions/auth';

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.user;

  return { isAuthenticated };
};

export default withRouter(connect(mapStateToProps, actionCreators)(Component));
