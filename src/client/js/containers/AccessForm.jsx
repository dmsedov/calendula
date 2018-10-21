import { connect } from 'react-redux';
import Component from '../components/AccessForm';
import * as actionCreators from '../actions/header';

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, actionCreators)(Component);
