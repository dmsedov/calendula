import {
  openModal,
  closeModal,
  openNavMenu,
  closeNavMenu,
} from '../../src/js/actions/uiPopup';
import resizeScreen from '../../src/js/actions/uiScreen';

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
    const isLessThanMdScreen = true;
    const isLessThanLgScreen = true;
    expect(resizeScreen({ isLessThanMdScreen }))
      .toEqual({ type: 'SCREEN_RESIZE', payload: { isLessThanMdScreen } });

    expect(resizeScreen({ isLessThanLgScreen }))
      .toEqual({ type: 'SCREEN_RESIZE', payload: { isLessThanLgScreen } });
  });
});
