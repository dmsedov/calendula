import Alert from 'react-s-alert';
import errorReport from '../errors';

export default store => next => (action) => {
  const { payload } = action;
  if (payload && payload.error) {
    const msg = payload.error;
    const report = errorReport(msg);
    report && Alert.error(report);
  }
  const result = next(action);
  return result;
};
