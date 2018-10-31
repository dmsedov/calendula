import { connect } from 'react-redux';
import Component from '../components/ErrorReport';
import { resetErrorMsg } from '../actions/error';

const mapStateToProps = (state) => {
  const { error } = state;
  return { error };
};

export default connect(mapStateToProps, { resetErrorMsg })(Component);
