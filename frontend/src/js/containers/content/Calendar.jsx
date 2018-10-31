import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../../components/content/Calendar';
import * as actionCreators from '../../actions/calendar';

const mapStateToProps = (state) => {
  const { uiScreen, calendar } = state;
  return {
    isLessThanLgScreen: uiScreen.isLessThanLgScreen,
    calendar,
  };
};

export default withRouter(connect(mapStateToProps, actionCreators)(Component));
