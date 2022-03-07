import { createAsyncThunk } from '@reduxjs/toolkit';
import { Block } from '../blocks/blocksSlice';
import { IWritingAPI, WritingResponse } from './writingAPI';
import { Writing } from './writingsSlice';

type WritingExtraConfig = { extra: { writingAPI: IWritingAPI } };

export const fetchEditingByUserId = createAsyncThunk<
  WritingResponse[],
  string,
  WritingExtraConfig
>('writings/fetchEditingByUserIdStatus', async (userId: string, { extra }) => {
  const result = await extra.writingAPI.getEditingByUserId(userId);

  return result;
});

type UpdateArg = { userId: string; writing: Omit<Writing, 'blocks'> };

export const updateWriting = createAsyncThunk<
  WritingResponse,
  UpdateArg,
  WritingExtraConfig
>('writings/updateTitleStatus', async ({ userId, writing }, { extra }) => {
  const result = await extra.writingAPI.update(userId, writing);

  return result;
});

type DeleteArg = { userId: string; writingId: string };

export const deleteWriting = createAsyncThunk<
  { id: string; blocks: Block[] },
  DeleteArg,
  WritingExtraConfig
>('writings/deleteStatus', async ({ userId, writingId }, { extra }) => {
  const result = await extra.writingAPI.delete(userId, writingId);

  return { id: writingId, blocks: result };
});

export const createWriting = createAsyncThunk<
  WritingResponse,
  string,
  WritingExtraConfig
>('writings/createStatus', async (userId, { extra }) => {
  const result = await extra.writingAPI.create(userId);

  return result;
});
