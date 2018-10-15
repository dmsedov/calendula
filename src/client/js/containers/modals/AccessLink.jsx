import { connect } from 'react-redux';
import Component from '../../components/modals/AccessLink';
import { genAccessLink } from '../../actions/accessLink';

const mapStateToProps = (state) => {
  const {
    user: { c_id },
    accessLinkFetching,
    accessLink,
  } = state;

  return { c_id, accessLinkFetching, accessLink };
};

export default connect(mapStateToProps, { genAccessLink })(Component);
