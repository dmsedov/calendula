import { connect } from 'react-redux';
import Component from '../../components/modals/AccessForm';
import * as actionCreators from '../../actions/uiPopup';

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, actionCreators)(Component);
