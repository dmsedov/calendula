import axios from 'axios';
import urls from './v1/config';

const { login } = urls;

export const loginUser = (userData) => {
  const { id, name, img } = userData;

  return axios({
    method: 'post',
    url: login,
    data: {
      id,
      name,
      img,
    },
  });
};
