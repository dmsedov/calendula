import axios from 'axios';
import urls from './urls';

const makeAuthHeader = () => {
  return `Bearer ${localStorage.getItem('userData')}`;
};

const signin = (userData) => {
  const { uuid, name, email, imgUrl } = userData;

  return axios({
    method: 'post',
    url: urls.signin,
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
    url: urls.accesslink,
    data: {
      calendar_id: id,
    },
    headers: {
      Authorization: makeAuthHeader(),
    },
  });
};

export default (
  {
    public: {
      signin,
    },
    private: {
      getAccessLink,
    },
  }
);
