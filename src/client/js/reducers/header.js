import { handleActions } from 'redux-actions';
import { openModal, closeModal } from '../actions/header';

const initialState = { isModalShown: false, modalName: null };

const header = handleActions({
  [openModal](state, { payload: { name } }) {
    return { isModalShown: true, modalName: name };
  },
  [closeModal]() {
    return { isModalShown: false, modalName: null };
  },
}, initialState);

export default header;
