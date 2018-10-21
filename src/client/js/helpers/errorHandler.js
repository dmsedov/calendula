export default (err) => {
  if (!err.response) {
    return 'something_bad_happened';
  }
  const { response: { data: errMsg } } = err;
  return errMsg;
};
