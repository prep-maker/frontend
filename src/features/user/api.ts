import { IHttpClient } from '../../network/http';
import { AxiosResponse } from 'axios';
import { IAuth, User, UserData } from './type';

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
}

export default AuthAPI;
