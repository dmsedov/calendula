import axios from 'axios';

export const loginUser = (userData) => {
  const { id, name, email, img } = userData;

  return axios({
    method: 'post',
    url: '/login',
    data: {
      id,
      name,
      email,
      img,
    },
  });
};
