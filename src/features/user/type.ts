export type User = {
  email: string;
  password: string;
  name: string;
};

export type UserState = {
  id: string;
  email: string;
  name: string;
  token: string;
};

export type LoginInfo = Omit<User, 'name'>;
