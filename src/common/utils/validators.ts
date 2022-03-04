export const validateEmail = (email: string): boolean => {
  email.trim();
  if (email.length < 5 || email.length > 30) {
    return false;
  }

  const regex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (!regex.test(email)) {
    return false;
  }

  return true;
};

export const validatePassword = (password: string): boolean => {
  password.trim();
  if (password.length < 6 || password.length > 15) {
    return false;
  }

  return true;
};

export const validateName = (name: string): boolean => {
  name.trim();
  if (name.length > 20) {
    return false;
  }

  return true;
};

export const validateTitle = (title: string): boolean => {
  title.trim();
  if (title.length > 100 || title.length < 1) {
    return false;
  }

  return true;
};
