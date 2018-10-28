import { createAction } from 'redux-actions';
import apiCall from '../api';
import errorHandler from '../helpers/errorHandler';
import errors from '../errors';

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
    const errCode = errorHandler(e);
    dispatch(fetchLinkFailure({ error: errors[errCode] }));
  }
};
