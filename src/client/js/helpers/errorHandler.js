export default (err) => {
  if (!err.response) {
    return 'something bad happened';
  }
  const { response: { data: errMsg } } = err;
  return errMsg;
};
