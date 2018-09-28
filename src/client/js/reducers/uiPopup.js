import { handleActions } from 'redux-actions';
import {
  openModal,
  closeModal,
  openNavMenu,
  closeNavMenu,
} from '../actions/uiPopup';

const initialState = { isExpandNavMenu: false, isModalShown: false, modalName: null };

const uiPopup = handleActions({
  [openNavMenu](state) {
    return { ...state, isExpandNavMenu: true };
  },
  [closeNavMenu](state) {
    return { ...state, isExpandNavMenu: false };
  },
  [openModal](state, { payload: { name } }) {
    return { isExpandNavMenu: false, isModalShown: true, modalName: name };
  },
  [closeModal](state) {
    return { ...state, isModalShown: false, modalName: null };
  },
}, initialState);

export default uiPopup;
