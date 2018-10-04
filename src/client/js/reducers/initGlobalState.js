export const mediaQueryList = window.matchMedia('(max-width: 767.98px)');

export const initGlobalState = ({
  userFetchingProfileState: 'none',
  user: {
    isAuthenticated: false,
    name: null,
    isAdmin: null,
    imgUrl: null,
    err: null,
  },
  uiPopup: {
    isNavMenuOpen: false,
    isModalShown: false,
    modalName: null,
    isPopoverOpen: false,
  },
  uiScreen: {
    isSmallScreen: mediaQueryList.matches,
  },
});
