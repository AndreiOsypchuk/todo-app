export const validateName = (str) => {
  return /^[A-Za-z0-9 ._]+$/.test(str);
};

export const validateEmail = (str) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  return re.test(str);
};

export const validatePassword = (str) => {
  const re = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.{6,})');
  return re.test(str);
};
