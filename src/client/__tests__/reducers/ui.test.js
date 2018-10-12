import {
  openModal,
  closeModal,
  openNavMenu,
  closeNavMenu,
} from '../../js/actions/uiPopup';
import resizeScreen from '../../js/actions/uiScreen';
import { uiScreen, uiPopup } from '../../js/reducers/ui';

describe('ui reducers', () => {
  describe('uiPopup reducers', () => {
    const initUiPopupState = {
      isNavMenuOpen: false,
      isModalShown: false,
      modalName: null,
    };

    it('should return the initial state', () => {
      expect(uiPopup(undefined, {})).toEqual(initUiPopupState);
    });

    it('MODAL_OPEN', () => {
      const modalName = 'TestModal';
      expect(uiPopup(initUiPopupState, openModal({ name: modalName })))
        .toEqual({
          ...initUiPopupState,
          isNavMenuOpen: false,
          isModalShown: true,
          modalName,
        });
    });

    it('MODAL_CLOSE', () => {
      expect(uiPopup(initUiPopupState, closeModal()))
        .toEqual({
          ...initUiPopupState,
          isModalShown: false,
          modalName: null,
        });
    });

    it('MENU_OPEN', () => {
      expect(uiPopup(initUiPopupState, openNavMenu()))
        .toEqual({
          ...initUiPopupState,
          isNavMenuOpen: true,
        });
    });

    it('MENU_CLOSE', () => {
      expect(uiPopup(initUiPopupState, closeNavMenu()))
        .toEqual({
          ...initUiPopupState,
          isNavMenuOpen: false,
        });
    });
  });

  describe('uiScreen reducers', () => {
    const initUiScreen = {
      isSmallScreen: null,
    };

    it('should return the initial state', () => {
      expect(uiScreen(undefined, {})).toEqual(initUiScreen);
    });

    it('SCREEN_RESIZE', () => {
      expect(uiScreen(initUiScreen, resizeScreen({ isSmallScreen: true })))
        .toEqual({
          isSmallScreen: true,
        });
    });
  });
});
