import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError,
} from 'axios';

type ClientOption<T> = {
  body: T;
  method: 'get' | 'post' | 'put' | 'delete';
};

export interface IHttpClient {
  fetch: <T>(url: string, options: ClientOption<T>) => Promise<AxiosResponse>;
}

class HttpClient implements IHttpClient {
  private static http: HttpClient;
  private client: AxiosInstance = axios.create({
    baseURL: this.baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  private constructor(readonly baseURL: string) {}

  static getHttp = (baseURL: string) => {
    if (!this.http) {
      this.http = new HttpClient(baseURL);
    }

    return this.http;
  };

  fetch = async <T>(
    url: string,
    options: ClientOption<T>
  ): Promise<AxiosResponse> => {
    const { body, method } = options;
    const req: AxiosRequestConfig<T> = {
      url,
      method,
      data: body,
    };

    try {
      const res: AxiosResponse = await this.client(req);
      return res;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        const data = err.response.data;
        const message = data?.message ? data.message : '네트워크 에러';
        throw new Error(message);
      }

      throw new Error('연결 실패');
    }
  };
}

export default HttpClient;
