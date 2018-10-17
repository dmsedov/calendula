import { createAction } from 'redux-actions';
import apiCall from '../api';
import { resetErrorMsg } from './error';
import errorHandler from '../helpers/errorHandler';

export const fetchLinkRequest = createAction('FETCH_LINK_REQUEST');

export const fetchLinkSuccess = createAction('FETCH_LINK_SUCCESS');

export const fetchLinkFailure = createAction('FETCH_LINK_FAILURE');

export const fetchAccessLink = id => async (dispatch) => {
  const { getAccessLink } = apiCall.private;
  dispatch(fetchLinkRequest());
  try {
    const {
      data: { link },
    } = await getAccessLink(id);
    // const link = 'http://localhost:3000/calendar?c_id=123456';
    dispatch(fetchLinkSuccess({ link }));
  } catch (e) {
    dispatch(fetchLinkFailure({ error: errorHandler(e) }));
  }
};
