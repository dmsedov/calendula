import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from '../../components/content/Calendar';
import * as actionCalendar from '../../actions/calendar';
import * as actionUiCalendar from '../../actions/uiCalendar';

const mapStateToProps = (state) => {
  const { uiScreen, calendar, uiCalendar } = state;
  return {
    isLessThanLgScreen: uiScreen.isLessThanLgScreen,
    calendar,
    ...uiCalendar,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    ...actionCalendar,
    ...actionUiCalendar,
  })(Component),
);
