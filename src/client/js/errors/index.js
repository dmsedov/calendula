export const loginUserError = (type) => {
  const decriptor = {
    'fatal': 'Something went wrong, try again',
  }
  return decriptor[type];
};
