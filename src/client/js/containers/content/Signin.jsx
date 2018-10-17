import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../../components/content/Signin';
import * as authActions from '../../actions/auth';


const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const Container = withRouter(connect(
  mapStateToProps,
  authActions,
)(Component));

export default Container;
