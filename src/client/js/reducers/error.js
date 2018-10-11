import resetErrAction from '../actions/error';
import initGlobalState from './initGlobalState';

const { errMsg } = initGlobalState;
const resetErrorMsg = resetErrAction();

export default (state = errMsg, action) => {
  const { type, payload } = action;
  if (type === resetErrorMsg.type) {
    return null;
  } else if (payload === undefined) {
    return state;
  } else if (payload.error) {
    return payload.error;
  }
  return state;
};
