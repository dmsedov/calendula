import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../../components/content/Signin';
import * as authActions from '../../actions/auth';


const mapStateToProps = (state) => {
  const { userFetchingProfileState, user } = state;
  return {
    requestStatus: userFetchingProfileState,
    user,
  };
};

const Container = withRouter(connect(
  mapStateToProps,
  authActions,
)(Component));

export default Container;
