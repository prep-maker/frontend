import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBlockAPI } from './blockAPI';
import { Block } from './blocksSlice';
import { NewBlockRequest } from './types';

type BlockExtraConfig = { extra: { blockAPI: IBlockAPI } };

export const createBlock = createAsyncThunk<
  Block[],
  NewBlockRequest,
  BlockExtraConfig
>('blocks/createStatus', async ({ userId, writingId, types }, { extra }) => {
  const result = await extra.blockAPI.create({ userId, writingId, types });

  return result;
});
