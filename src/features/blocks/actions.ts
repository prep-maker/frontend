import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBlockAPI } from './blockAPI';
import { Block } from './blocksSlice';
import { BlocksUpdateRequest, IdParams, NewBlockRequest } from './types';

type BlockExtraConfig = { extra: { blockAPI: IBlockAPI } };

export const createBlock = createAsyncThunk<
  { blocks: Block[]; writingId: string },
  NewBlockRequest,
  BlockExtraConfig
>('blocks/createStatus', async ({ userId, writingId, types }, { extra }) => {
  const blocks = await extra.blockAPI.create({ userId, writingId, types });

  return { blocks, writingId };
});

export const deleteBlock = createAsyncThunk<
  Omit<IdParams, 'userId'>,
  IdParams,
  BlockExtraConfig
>('blocks/deleteStatus', async ({ userId, writingId, blockId }, { extra }) => {
  await extra.blockAPI.delete({ userId, writingId, blockId });

  return { writingId, blockId };
});

export const saveBlocks = createAsyncThunk<
  Block[],
  BlocksUpdateRequest,
  BlockExtraConfig
>('blocks/saveStatus', async ({ userId, writingId, blocks }, { extra }) => {
  const updated = await extra.blockAPI.update({ userId, writingId, blocks });

  return updated;
});
