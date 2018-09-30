import { handleActions } from 'redux-actions';
import {
  openModal,
  closeModal,
  openNavMenu,
  closeNavMenu,
} from '../actions/uiPopup';

const initialState = {
  isNavMenuOpen: false,
  isModalShown: false,
  modalName: null,
};

const uiPopup = handleActions({
  [openNavMenu](state) {
    return { ...state, isNavMenuOpen: true };
  },
  [closeNavMenu](state, { payload: { navMenuState } }) {
    // const isNavMenuOpen = navMenuState === state.isNavMenuOpen ? !navMenuState : navMenuState;
    return { ...state, isNavMenuOpen: navMenuState };
  },
  [openModal](state, { payload: { name } }) {
    return {
      isNavMenuOpen: false,
      isModalShown: true,
      modalName: name,
    };
  },
  [closeModal](state) {
    return { ...state, isModalShown: false, modalName: null };
  },
}, initialState);

export default uiPopup;
