import { createAction } from 'redux-actions';

const resetErrorMsg = createAction('RESET_ERROR_MESSAGE');

const genLinkError = createAction('GEN_LINK_ERROR');

export { resetErrorMsg, genLinkError };
