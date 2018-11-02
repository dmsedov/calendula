export default {
  userFetchingProfileState: 'none',
  accessLinkFetchingState: 'none',
  calendarFetchingState: 'none',
  user: {
    isAuthenticated: false,
    uuid: null,
    name: null,
    email: null,
    imgUrl: null,
    c_id: null,
  },
  accessLink: '',
  errMsg: null,
  calendar: null,
  uiPopup: {
    isNavMenuOpen: false,
    isModalShown: false,
    modalName: null,
  },
  uiScreen: {
    isLessThanMdScreen: null,
    isLessThanLgScreen: null,
  },
  uiCalendar: {
    idClickedEvent: null,
    // isOpenEventsList: false,
  },
};
