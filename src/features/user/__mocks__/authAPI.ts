import { IAuthAPI } from '../authAPI';
import { LoginInfo, User, UserState } from '../types';

const USER_ID = '622337793d451494bbb1c0c9';
const TOKEN = 'token';
export const USER_NAME = 'username';

class AuthAPIStub implements IAuthAPI {
  constructor() {}

  signup = async (user: User): Promise<UserState> => ({
    id: USER_ID,
    email: user.email,
    name: user.name,
    token: TOKEN,
  });

  login = async (user: LoginInfo): Promise<UserState> => ({
    id: USER_ID,
    email: user.email,
    name: USER_NAME,
    token: TOKEN,
  });
}

export default AuthAPIStub;
