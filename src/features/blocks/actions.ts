import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBlockAPI } from './blockAPI';
import { Block } from './blocksSlice';
import { BlocksUpdateRequest, IdParams, NewBlockRequest } from './types';

type BlockExtraConfig = { extra: { blockAPI: IBlockAPI } };

export const createBlock = createAsyncThunk<
  { blocks: Block[]; writingId: string },
  NewBlockRequest,
  BlockExtraConfig
>('blocks/createStatus', async ({ writingId, types }, { extra }) => {
  const blocks = await extra.blockAPI.create({ writingId, types });

  return { blocks, writingId };
});

export const deleteBlock = createAsyncThunk<
  Omit<IdParams, 'userId'>,
  IdParams,
  BlockExtraConfig
>('blocks/deleteStatus', async ({ writingId, blockId }, { extra }) => {
  await extra.blockAPI.delete({ writingId, blockId });

  return { writingId, blockId };
});

export const saveBlocks = createAsyncThunk<
  { newBlocks: Block[]; oldBlocks: Block[]; writingId: string },
  BlocksUpdateRequest,
  BlockExtraConfig
>('blocks/saveStatus', async ({ writingId, blocks }, { extra }) => {
  const updated = await extra.blockAPI.update({ writingId, blocks });

  return { newBlocks: updated, oldBlocks: blocks, writingId };
});
