import AuthAPI from '../../features/user/api';
import HttpClient, { IHttpClient } from '../../network/http';
import config from '../utils/config';

type API = AuthAPI;

interface APIConstructable {
  new (http: IHttpClient): API;
}

const http: HttpClient = HttpClient.getHttp(config.baseUrl);

const useApi = (apiClass: APIConstructable): API => {
  const api = new apiClass(http);
  return api;
};

export default useApi;
