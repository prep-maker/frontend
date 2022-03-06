import { AxiosResponse } from 'axios';
import { IHttpClient } from '../../network/http';
import { Block } from './blocksSlice';
import { ParagraphType, NewBlockRequest, IdParams } from './types';

export interface IBlockAPI {
  readonly create: (request: NewBlockRequest) => Promise<Block[]>;
  readonly delete: (request: IdParams) => Promise<void>;
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

  delete = async (request: IdParams): Promise<void> => {
    const { userId, writingId, blockId } = request;
    await this.http.fetch(
      `/users/${userId}/writings/${writingId}/blocks/${blockId}`,
      { method: 'delete' }
    );
  };
}

export default BlockAPI;
