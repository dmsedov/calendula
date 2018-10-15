import { handleActions } from 'redux-actions';
import * as actions from '../actions/accessLink';
import initGlobalState from './initGlobalState';

const accessLinkFetching = handleActions({
  [actions.fetchLinkRequest]() {
    return 'requested';
  },
  [actions.fetchLinkSuccess]() {
    return 'successed';
  },
  [actions.fetchLinkFailure]() {
    return 'failured';
  },
  [actions.logoutUser]() {
    return 'none';
  },
}, initGlobalState.accessLinkFetchingState);

const accessLink = handleActions({
  [actions.fetchLinkRequest](state) {
    return state;
  },
  [actions.fetchLinkSuccess](state, { payload: { link } }) {
    return link;
  },
  [actions.fetchLinkFailure](state) {
    return state;
  },
}, initGlobalState.accessLink);

export { accessLinkFetching, accessLink };
