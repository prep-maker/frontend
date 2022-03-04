import { IAuthAPI } from '../../features/user/authAPI';
import HttpClient, { IHttpClient } from '../../network/http';
import config from '../utils/config';

export type API = IAuthAPI;

interface APIConstructable {
  new (http: IHttpClient): API;
}

const http: HttpClient = HttpClient.getHttp(config.baseUrl);

const useAPI = (apiClass: APIConstructable): API => {
  const api = new apiClass(http);
  return api;
};

export default useAPI;
