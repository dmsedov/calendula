import { connect } from 'react-redux';
import Component from '../../components/modals/Search';
import { closeModal } from '../../actions/uiPopup';


const mapStateToProps = () => {
  return {};
};

const Container = connect(
  mapStateToProps,
  { closeModal },
)(Component);

export default Container;
