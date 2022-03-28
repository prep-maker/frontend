import { IBlockAPI } from '../blockAPI';
import { Block } from '../blocksSlice';
import {
  NewBlockRequest,
  IdParams,
  BlocksUpdateRequest,
  BlockUpdateRequest,
} from '../types';

let i = 99;

class blockAPIStub implements IBlockAPI {
  create = async (request: NewBlockRequest): Promise<Block[]> => {
    const { types } = request;

    return types.map((type) => ({
      id: String(i++),
      type,
      paragraphs: [
        {
          type,
          content: '',
          comments: [],
        },
      ],
    }));
  };

  delete = async (request: Omit<IdParams, 'userId'>) => {};

  pdateMany = async (request: BlocksUpdateRequest): Promise<Block[]> => {
    return request.blocks;
  };

  updateOne = async (request: BlockUpdateRequest): Promise<Block> => {
    const copy = JSON.parse(JSON.stringify(request.block));
    const { paragraphs } = copy;

    for (const paragraph of paragraphs) {
      for (const comment of paragraph.comments) {
        comment.isPending = false;
      }
    }

    return copy;
  };
}

export default blockAPIStub;
