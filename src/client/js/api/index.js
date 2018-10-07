import axios from 'axios';
import { login } from './v1/paths';

export const loginUser = (userData) => {
  const { id, name, email, img } = userData;

  return axios({
    method: 'post',
    url: login,
    data: {
      id,
      name,
      email,
      img,
    },
  });
};
