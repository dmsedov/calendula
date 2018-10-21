const google = (resp) => {
  const { profileObj: { googleId, name, imageUrl, email } } = resp;

  const userData = {
    uuid: googleId,
    name,
    email,
    imgUrl: imageUrl,
  };
  return userData;
};

const facebook = (resp) => {
  const { userId, name, email, picture: { data: { url } } } = resp;

  const userData = {
    uuid: userId,
    name,
    email,
    imgUrl: url,
  };
  return userData;
};

export default (type) => {
  return {
    google,
    facebook,
  }[type];
};
