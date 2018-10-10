import resetErrAction from '../actions/error';
import initGlobalState from './initGlobalState';

const { error } = initGlobalState;
const resetErrorMsg = resetErrAction();

export default (state = error, { type, payload }) => {
  if (type === resetErrorMsg.type) {
    return null;
  } else if (payload) {
    return payload;
  }
  return state;
};
