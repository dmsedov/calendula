import { handleActions } from 'redux-actions';
import {
  openModal,
  closeModal,
  openNavMenu,
  closeNavMenu,
  clickOnNavItem,
  clickOnMenuBackLayout,
} from '../actions/uiPopup';
import resizeScreen from '../actions/uiScreen';
import { initGlobalState } from './initGlobalState';


export const uiScreen = handleActions({
  [resizeScreen](state, { payload: { isSmallScreen } }) {
    return { isSmallScreen };
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
      isNavMenuOpen: false,
      isModalShown: true,
      modalName: name,
      isNavElClicked: false,
    };
  },
  [closeModal](state) {
    return { ...state, isModalShown: false, modalName: null };
  },
  [clickOnNavItem](state) {
    return { ...state, isNavElClicked: true };
  },
  [clickOnMenuBackLayout](state) {
    return { ...state, isNavElClicked: false };
  },
}, initGlobalState.uiPopup);
