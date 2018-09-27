export const loginUserError = (type) => {
  const decriptor = {
    fatal: 'Something went wrong, try again',
    popup_closed_by_user: '',
  }
  return decriptor[type];
};
