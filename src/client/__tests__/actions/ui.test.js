import {
  openModal,
  closeModal,
  openNavMenu,
  closeNavMenu,
} from '../../js/actions/uiPopup';
import resizeScreen from '../../js/actions/uiScreen';

describe('ui actions', () => {
  it('MODAL_OPEN', () => {
    expect(openModal()).toEqual({ type: 'MODAL_OPEN' });
  });

  it('MODAL_CLOSE', () => {
    expect(closeModal()).toEqual({ type: 'MODAL_CLOSE' });
  });

  it('MENU_OPEN', () => {
    expect(openNavMenu()).toEqual({ type: 'MENU_OPEN' });
  });

  it('MENU_CLOSE', () => {
    expect(closeNavMenu()).toEqual({ type: 'MENU_CLOSE' });
  });
});

describe('ui screen', () => {
  it('SCREEN_RESIZE', () => {
    const isSmallScreen = true;
    expect(resizeScreen({ isSmallScreen }))
      .toEqual({ type: 'SCREEN_RESIZE', payload: { isSmallScreen } });
  });
});
