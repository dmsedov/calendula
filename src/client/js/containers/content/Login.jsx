import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../../components/content/Login';
import { loginUserRequest, loginUserSuccess, loginUserFailure, login } from '../../actions/auth';


const mapStateToProps = (state) => {
  const { userFetchingProfileState, user } = state;
  return {
    requestStatus: userFetchingProfileState,
    user,
  };
};

const actions = {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  login,
};

const Container = withRouter(connect(
  mapStateToProps,
  actions,
)(Component));

export default Container;
