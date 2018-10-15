import axios from 'axios';
import urls from './v1/config';

const { login, generateLink } = urls;

const loginUser = (userData) => {
  const { uuid, name, email, imgUrl } = userData;

  return axios({
    method: 'post',
    url: login,
    data: {
      uuid,
      name,
      email,
      imgUrl,
    },
  });
};

const getAccessLink = (id) => {
  return axios({
    method: 'post',
    url: generateLink,
    data: {
      calendar_id: id,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userData')}`,
    },
  });
};

export default {
  public: {
    loginUser,
  },
  private: {
    getAccessLink,
  },
};
