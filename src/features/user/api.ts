import { IHttpClient } from '../../network/http';
import { AxiosResponse } from 'axios';
import { User, UserData, LoginInfo } from './type';

export interface IAuth {
  readonly signup: (user: User) => Promise<UserData>;
  readonly login: (user: LoginInfo) => Promise<UserData>;
}

class AuthAPI implements IAuth {
  constructor(private http: IHttpClient) {}

  signup = async (user: User): Promise<UserData> => {
    const result: AxiosResponse<UserData> = await this.http.fetch(
      '/auth/signup',
      {
        method: 'post',
        body: user,
      }
    );

    return result.data;
  };

  login = async (user: LoginInfo): Promise<UserData> => {
    const result: AxiosResponse<UserData> = await this.http.fetch(
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
