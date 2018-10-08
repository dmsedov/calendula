import { logoutUser } from '../../js/actions/auth';
import {
  openModal,
  closeModal,
  openNavMenu,
  closeNavMenu,
  togglePopOver,
} from '../../js/actions/uiPopup';
import resizeScreen from '../../js/actions/uiScreen';
import { uiScreen, uiPopup } from '../../js/reducers/ui';

describe('ui reducers', () => {
  const initUiPopupState = {
    isNavMenuOpen: false,
    isModalShown: false,
    modalName: null,
    isPopoverOpen: false,
  };

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

  it('TOGGLE_POPOVER', () => {
    expect(uiPopup(initUiPopupState, togglePopOver()))
      .toEqual({
        ...initUiPopupState,
        isNavMenuOpen: false,
        isPopoverOpen: true,
      });

    expect(uiPopup({
      ...initUiPopupState,
      isNavMenuOpen: false,
      isPopoverOpen: true,
    }, togglePopOver()))
      .toEqual({
        ...initUiPopupState,
        isNavMenuOpen: false,
        isPopoverOpen: false,
      });
  });

  it('LOGOUT_USER', () => {
    expect(uiPopup({
      ...initUiPopupState,
      isPopoverOpen: true,
    }, logoutUser()))
      .toEqual({
        ...initUiPopupState,
      });
  });

  const initUiScreen = {
    isSmallScreen: null,
  };

  it('SCREEN_RESIZE', () => {
    expect(uiScreen(initUiScreen, resizeScreen({ isSmallScreen: true })))
      .toEqual({
        isSmallScreen: true,
      });
  });
});
