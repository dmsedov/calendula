import { connect } from 'react-redux';
import Component from '../components/Header';
import * as actionCreators from '../actions/auth';

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.user;

  return { isAuthenticated };
};

export default connect(mapStateToProps, actionCreators)(Component);
