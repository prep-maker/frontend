import { AxiosResponse } from 'axios';
import { IHttpClient } from '../../network/http';
import { Block } from './blocksSlice';
import { ParagraphType, NewBlockRequest } from './types';

export interface IBlockAPI {
  readonly create: (request: NewBlockRequest) => Promise<Block[]>;
}

class BlockAPI implements IBlockAPI {
  constructor(private http: IHttpClient) {}

  create = async (request: NewBlockRequest): Promise<Block[]> => {
    const { userId, writingId, types } = request;
    const fetch = this.requestNewBlock.bind(this, userId, writingId);
    const result = await Promise.all(types.map(fetch));

    return result;
  };

  private requestNewBlock = async (
    userId: string,
    writingId: string,
    type: ParagraphType
  ) => {
    const newBlock = {
      type,
      paragraphs: [{ type, content: '' }],
    };
    const result: AxiosResponse<Block> = await this.http.fetch(
      `/users/${userId}/writings/${writingId}/blocks`,
      {
        method: 'post',
        body: newBlock,
      }
    );

    return result.data;
  };
}

export default BlockAPI;
