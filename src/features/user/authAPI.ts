import { AxiosResponse } from 'axios';

import { IHttpClient } from '../../network/http';
import { User, LoginInfo, UserState } from './types';

export interface IAuthAPI {
  readonly signup: (user: User) => Promise<UserState>;
  readonly login: (user: LoginInfo) => Promise<UserState>;
}

class AuthAPI implements IAuthAPI {
  constructor(private http: IHttpClient) {}

  signup = async (user: User): Promise<UserState> => {
    const result: AxiosResponse<UserState> = await this.http.fetch(
      '/auth/signup',
      {
        method: 'post',
        body: user,
      }
    );

    return result.data;
  };

  login = async (user: LoginInfo): Promise<UserState> => {
    const result: AxiosResponse<UserState> = await this.http.fetch(
      '/auth/signin',
      {
        method: 'post',
        body: user,
      }
    );

    return result.data;
  };
}

export default AuthAPI;
