import { createAction } from 'redux-actions';

export const openModal = createAction('MODAL_OPEN');

export const closeModal = createAction('MODAL_CLOSE');

export const openNavMenu = createAction('MENU_OPEN');

export const closeNavMenu = createAction('MENU_CLOSE');
