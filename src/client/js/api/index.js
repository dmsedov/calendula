import axios from 'axios';
import urls from './v1/config';

const baseUrl = 'http://calendula.me:8888';
const { login } = urls;

export const loginUser = (userData) => {
  const { id, name, img } = userData;

  return axios({
    baseURL: baseUrl,
    method: 'post',
    url: login,
    data: {
      id,
      name,
      img,
    },
  });
};
