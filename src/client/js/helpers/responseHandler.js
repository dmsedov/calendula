export default (resp) => {
  const {
    data: {
      status,
      data,
    },
  } = resp;

  if (status === 'ok') {
    return data;
  }
  throw new Error(resp.errMsg);
};
