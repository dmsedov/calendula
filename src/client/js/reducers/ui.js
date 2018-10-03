import { handleActions } from 'redux-actions';
import {
  openModal,
  closeModal,
  openNavMenu,
  closeNavMenu,
  togglePopOver,
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
    };
  },
  [closeModal](state) {
    return { ...state, isModalShown: false, modalName: null };
  },
  [togglePopOver](state) {
    return { ...state, isNavMenuOpen: false, isPopoverOpen: !state.isPopoverOpen };
  },
}, initGlobalState.uiPopup);
