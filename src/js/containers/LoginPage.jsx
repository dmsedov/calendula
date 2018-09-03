import { connect } from 'react-redux';
import Component from '../components/LoginPage';
import { loginUserRequest, loginUserSuccess, loginUserFailure, loginUser } from '../actions/auth';


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
  loginUser,
};

const Container = connect(
  mapStateToProps,
  actions,
)(Component);

export default Container;
