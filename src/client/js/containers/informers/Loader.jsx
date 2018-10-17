import { connect } from 'react-redux';
import Component from '../../components/informers/Loader';

const mapStateToProps = (state) => {
  return { requestStatus: state.userFetchingProfileState };
};

export default connect(mapStateToProps)(Component);
