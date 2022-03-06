import { AxiosResponse } from 'axios';
import { IHttpClient } from '../../network/http';
import { Block } from './blocksSlice';
import { ParagraphType } from './types';

type CreateRequest = {
  userId: string;
  writingId: string;
  type: ParagraphType & 'PREP';
};

export interface IBlockAPI {
  readonly create: (request: CreateRequest) => Promise<Block>;
}

class BlockAPI implements IBlockAPI {
  constructor(private http: IHttpClient) {}

  create = async (request: CreateRequest): Promise<Block> => {
    const { userId, writingId, type } = request;
    const result: AxiosResponse<Block> = await this.http.fetch(
      `/users/${userId}/writings/${writingId}/blocks`,
      {
        method: 'post',
        body: {
          type,
          paragraphs: [],
        },
      }
    );

    return result.data;
  };
}

export default BlockAPI;
