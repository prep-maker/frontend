import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBlockAPI } from './blockAPI';
import { Block } from './blocksSlice';
import { CreateRequest } from './types';

type BlockExtraConfig = { extra: { blockAPI: IBlockAPI } };

export const createBlock = createAsyncThunk<
  Block[],
  CreateRequest,
  BlockExtraConfig
>('blocks/createStatus', async ({ userId, writingId, types }, { extra }) => {
  const result = await extra.blockAPI.create({ userId, writingId, types });

  return result;
});
