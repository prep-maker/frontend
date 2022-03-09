import { AxiosResponse } from 'axios';
import { IHttpClient } from '../../network/http';
import { Block } from './blocksSlice';
import {
  ParagraphType,
  NewBlockRequest,
  IdParams,
  BlocksUpdateRequest,
} from './types';

export interface IBlockAPI {
  readonly create: (request: NewBlockRequest) => Promise<Block[]>;
  readonly delete: (request: IdParams) => Promise<void>;
  readonly update: (request: BlocksUpdateRequest) => Promise<Block[]>;
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

  delete = async ({ userId, writingId, blockId }: IdParams): Promise<void> => {
    await this.http.fetch(
      `/users/${userId}/writings/${writingId}/blocks/${blockId}`,
      { method: 'delete' }
    );
  };

  update = async ({ userId, writingId, blocks }: BlocksUpdateRequest) => {
    const result: AxiosResponse<Block[]> = await this.http.fetch(
      `/users/${userId}/writings/${writingId}/blocks`,
      { method: 'put', body: { blocks } }
    );

    return result.data;
  };
}

export default BlockAPI;
