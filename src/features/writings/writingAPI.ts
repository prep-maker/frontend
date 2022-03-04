import { AxiosResponse } from 'axios';
import { IHttpClient } from '../../network/http';
import { Writing } from './writingsSlice';

type Block = {
  id: string;
  type: 'P' | 'R' | 'E' | 'PR' | 'RE' | 'EP' | 'PRE' | 'REP' | 'PREP';
  canMerge: boolean;
  paragraphs: {
    type: 'P' | 'R' | 'E';
    content: string;
  }[];
};

export type WritingResponse = {
  id: string;
  isDone: boolean;
  title: string;
  blocks: Block[];
};

export interface IWritingAPI {
  readonly getEditingByUserId: (userId: string) => Promise<WritingResponse[]>;
  readonly getDoneByUserId: (userId: string) => Promise<WritingResponse[]>;
  readonly update: (
    userId: string,
    writing: Omit<Writing, 'blocks'>
  ) => Promise<WritingResponse>;
}

class WritingAPI implements IWritingAPI {
  constructor(private http: IHttpClient) {}

  getEditingByUserId = async (userId: string): Promise<WritingResponse[]> => {
    const result: AxiosResponse<WritingResponse[]> = await this.http.fetch(
      `/users/${userId}/writings?state=editing`,
      {
        method: 'get',
      }
    );

    return result.data;
  };

  getDoneByUserId = async (userId: string): Promise<WritingResponse[]> => {
    const result: AxiosResponse<WritingResponse[]> = await this.http.fetch(
      `/users/${userId}/writings?state=done`,
      {
        method: 'get',
      }
    );

    return result.data;
  };

  update = async (
    userId: string,
    writing: Omit<Writing, 'blocks'>
  ): Promise<WritingResponse> => {
    console.log(writing);
    const result: AxiosResponse<WritingResponse> = await this.http.fetch(
      `/users/${userId}/writings/${writing.id}`,
      { method: 'put', body: writing }
    );

    return result.data;
  };
}

export default WritingAPI;
