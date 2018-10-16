import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../../components/content/Calendar';
import * as actionCreators from '../../actions/auth';

const mapStateToProps = (state) => {
  return state.user;
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(Component));
