import { connect } from 'react-redux';
import Component from '../../components/modals/AccessLink';
import * as errorsAction from '../../actions/error';

const mapStateToProps = (state) => {
  const { user: { c_id } } = state;
  return { c_id };
};

export default connect(mapStateToProps, errorsAction)(Component);
