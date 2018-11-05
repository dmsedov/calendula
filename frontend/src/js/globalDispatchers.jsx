import decodeJwt from 'jwt-decode';
import { signinUserSuccess } from './actions/auth';
import resizeScreen from './actions/uiScreen';
import { closeNavMenu } from './actions/uiPopup';

export default (store) => {
  const mediaQueryMdScreen = window.matchMedia('(max-width: 767.98px)');
  const mediaQueryLgScreen = window.matchMedia('(max-width: 992px)');

  store.dispatch(resizeScreen({ isLessThanMdScreen: mediaQueryMdScreen.matches }));
  store.dispatch(resizeScreen({ isLessThanLgScreen: mediaQueryLgScreen.matches }));


  mediaQueryMdScreen.addListener((mq) => {
    store.dispatch(resizeScreen({ isLessThanMdScreen: mq.matches }));
    const { uiPopup: { isNavMenuOpen } } = store.getState();
    if (isNavMenuOpen) {
      store.dispatch(closeNavMenu());
    }
  });

  mediaQueryLgScreen.addListener((mq) => {
    store.dispatch(resizeScreen({ isLessThanLgScreen: mq.matches }));
  });

  const jwt = localStorage.getItem('userData');

  if (jwt) {
    const {
      user,
      calendar: { id },
    } = decodeJwt(jwt);

    store.dispatch(signinUserSuccess({ ...user, c_id: id }));
  }
};
