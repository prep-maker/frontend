export const validateEmail = (email: string): boolean => {
  if (email.length < 5) {
    return false;
  }

  if (email.length > 30) {
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
  if (password.length < 6) {
    return false;
  }

  if (password.length > 15) {
    return false;
  }

  return true;
};
