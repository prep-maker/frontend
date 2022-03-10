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
  readonly delete: (request: Omit<IdParams, 'userId'>) => Promise<void>;
  readonly update: (request: BlocksUpdateRequest) => Promise<Block[]>;
}

class BlockAPI implements IBlockAPI {
  constructor(private http: IHttpClient) {}

  create = async (request: NewBlockRequest): Promise<Block[]> => {
    const { writingId, types } = request;
    const fetch = this.requestNewBlock.bind(this, writingId);
    const result = await Promise.all(types.map(fetch));

    return result;
  };

  private requestNewBlock = async (writingId: string, type: ParagraphType) => {
    const newBlock = {
      type,
      paragraphs: [{ type, content: '' }],
    };
    const result: AxiosResponse<Block> = await this.http.fetch(
      `/writings/${writingId}/blocks`,
      {
        method: 'post',
        body: newBlock,
      }
    );

    return result.data;
  };

  delete = async ({
    writingId,
    blockId,
  }: Omit<IdParams, 'userId'>): Promise<void> => {
    await this.http.fetch(`/writings/${writingId}/blocks/${blockId}`, {
      method: 'delete',
    });
  };

  update = async ({ writingId, blocks }: BlocksUpdateRequest) => {
    const result: AxiosResponse<Block[]> = await this.http.fetch(
      `/writings/${writingId}/blocks`,
      { method: 'put', body: { blocks } }
    );

    return result.data;
  };
}

export default BlockAPI;
