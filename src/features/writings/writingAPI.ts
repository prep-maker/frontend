import { AxiosResponse } from 'axios';
import { IHttpClient } from '../../network/http';
import { Writing } from './writingsSlice';
import { Block } from '../blocks/blocksSlice';

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
  readonly delete: (userId: string, writingId: string) => Promise<Block[]>;
  readonly create: (userId: string) => Promise<WritingResponse>;
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
    const result: AxiosResponse<WritingResponse> = await this.http.fetch(
      `/users/${userId}/writings/${writing.id}`,
      { method: 'put', body: writing }
    );

    return result.data;
  };

  delete = async (userId: string, writingId: string) => {
    const result = await this.http.fetch(
      `/users/${userId}/writings/${writingId}`,
      {
        method: 'delete',
      }
    );

    return result.data;
  };

  create = async (userId: string) => {
    const result: AxiosResponse<WritingResponse> = await this.http.fetch(
      `users/${userId}/writings`,
      { method: 'post' }
    );

    return result.data;
  };
}

export default WritingAPI;
