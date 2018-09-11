import { connect } from 'react-redux';
import Component from '../components/Search';
import { closeModal } from '../actions/header';


const mapStateToProps = () => {
  return {};
};

const Container = connect(
  mapStateToProps,
  { closeModal },
)(Component);

export default Container;
