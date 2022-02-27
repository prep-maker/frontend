export type User = {
  email: string;
  password: string;
  name: string;
};

export type UserData = {
  userId: string;
  email: string;
  name: string;
  token: string;
};

export type LoginInfo = Omit<User, 'name'>;
