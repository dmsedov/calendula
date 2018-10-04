export const loginUserError = (type) => {
  const decriptor = {
    fatal: 'Упс...Что-то пошло не так. Попробуйте войти снова.',
    popup_closed_by_user: '',
  }
  return decriptor[type];
};
