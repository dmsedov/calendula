const google = (resp) => {
  const { profileObj: { googleId, name, imageUrl, email } } = resp;

  const userData = {
    id: googleId,
    name,
    email,
    imageUrl,
  };
  return userData;
};

const facebook = (resp) => {
  const { userId, name, email, picture: { data: { url } } } = resp;

  const userData = {
    id: userId,
    name,
    email,
    imageUrl: url,
  };
  return userData;
};

export default (type) => {
  return {
    google,
    facebook,
  }[type];
};
