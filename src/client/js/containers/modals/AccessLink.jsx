import { connect } from 'react-redux';
import Component from '../../components/modals/AccessLink';
import { fetchAccessLink } from '../../actions/accessLink';

const mapStateToProps = (state) => {
  const {
    user: { c_id },
    accessLinkFetching,
    accessLink,
  } = state;

  return { c_id, accessLinkFetching, accessLink };
};

export default connect(mapStateToProps, { fetchAccessLink })(Component);
