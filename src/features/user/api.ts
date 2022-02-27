import { IHttpClient } from '../../network/http';
import { AxiosResponse } from 'axios';
import { IAuth, User, UserData } from './type';

class AuthAPI implements IAuth {
  constructor(private http: IHttpClient) {}

  signup = async (req: User): Promise<UserData> => {
    const result: AxiosResponse<UserData> = await this.http.fetch(
      '/auth/signup',
      {
        method: 'post',
        body: req,
      }
    );
    return result.data;
  };
}

export default AuthAPI;
