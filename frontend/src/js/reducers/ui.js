import { handleActions } from 'redux-actions';
import {
  openModal,
  closeModal,
  openNavMenu,
  closeNavMenu,
} from '../actions/uiPopup';
import resizeScreen from '../actions/uiScreen';
import initGlobalState from './initGlobalState';


export const uiScreen = handleActions({
  [resizeScreen](state, { payload }) {
    return { ...state, ...payload };
  },
}, initGlobalState.uiScreen);

export const uiPopup = handleActions({
  [openNavMenu](state) {
    return { ...state, isNavMenuOpen: true };
  },
  [closeNavMenu](state) {
    return {
      ...state,
      isNavMenuOpen: false,
    };
  },
  [openModal](state, { payload: { name } }) {
    return {
      ...state,
      isNavMenuOpen: false,
      isModalShown: true,
      modalName: name,
    };
  },
  [closeModal](state) {
    return { ...state, isModalShown: false, modalName: null };
  },
}, initGlobalState.uiPopup);
