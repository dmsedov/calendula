import resetErrorMsg from '../actions/error';
import initGlobalState from './initGlobalState';

const { error } = initGlobalState;

export default (state = error, { type, payload }) => {
  if (type === resetErrorMsg.type) {
    return payload;
  }
  return state;
};
