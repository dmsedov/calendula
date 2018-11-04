import { handleActions } from 'redux-actions';
import {
  openModal,
  closeModal,
  openNavMenu,
  closeNavMenu,
} from '../actions/uiPopup';
import resizeScreen from '../actions/uiScreen';
import {
  clickOnEventEl,
  clickOnDay,
  resetDayState,
} from '../actions/uiCalendar';
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

export const uiCalendar = handleActions({
  [clickOnEventEl](state, { payload: { id, dayId } }) {
    return { ...state, idClickedEvent: id, idClickedDay: dayId };
  },
  [clickOnDay](state, { payload: { dayId } }) {
    return { ...state, isOpenEventsList: !state.isOpenEventsList, idClickedDay: dayId };
  },
  // [toggleEventsList](state, { payload: { dayId } }) {
  //   // if (dayId === state.dayId) {
  //     return { ...state, isOpenEventsList: !state.isOpenEventsList };
  //   // }
  //   // return state;
  // },
  [resizeScreen](state, { payload: { isLessThanLgScreen } }) {
    if (!isLessThanLgScreen && state.idClickedDay) {
      return { ...state, isOpenEventsList: true };
    }
    return state;
  },
  [resetDayState]() {
    return initGlobalState.uiCalendar;
  },
}, initGlobalState.uiCalendar);
