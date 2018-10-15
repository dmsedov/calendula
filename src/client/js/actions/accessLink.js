import { createAction } from 'redux-actions';
import apiCall from '../api';
import { resetErrorMsg } from './error';
import errorHandler from '../helpers/errorHandler';

export const fetchLinkRequest = createAction('FETCH_LINK_REQUEST');

export const fetchLinkSuccess = createAction('FETCH_LINK_SUCCESS');

export const fetchLinkFailure = createAction('FETCH_LINK_FAILURE');

export const genAccessLink = id => async (dispatch) => {
  const { getAccessLink } = apiCall.private;
  dispatch(fetchLinkRequest());
  try {
    const {
      data: { link },
    } = await getAccessLink(id);
    dispatch(fetchLinkSuccess({ accessLink: link }));
    dispatch(resetErrorMsg());
  } catch (e) {
    dispatch(fetchLinkFailure(errorHandler(e)));
  }
};
