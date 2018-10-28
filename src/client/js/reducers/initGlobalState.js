export default {
  userFetchingProfileState: 'none',
  user: {
    isAuthenticated: false,
    uuid: null,
    name: null,
    email: null,
    imgUrl: null,
    c_id: null,
  },
  uiPopup: {
    isNavMenuOpen: false,
    isModalShown: false,
    modalName: null,
  },
  uiScreen: {
    isLessThanMdScreen: null,
    isLessThanLgScreen: null,
  },
  accessLinkFetchingState: 'none',
  calendarFetchingState: 'none',
  accessLink: '',
  errMsg: null,
  calendar: null,
};
