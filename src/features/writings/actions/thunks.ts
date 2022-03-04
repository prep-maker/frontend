import { createAsyncThunk } from '@reduxjs/toolkit';
import { IWritingAPI, WritingResponse } from '../writingAPI';
import { Writing } from '../writingsSlice';

export const fetchEditingByUserId = createAsyncThunk<
  WritingResponse[],
  string,
  { extra: { writingAPI: IWritingAPI } }
>('writings/fetchEditingByUserIdStatus', async (userId: string, { extra }) => {
  const result = await extra.writingAPI.getEditingByUserId(userId);

  return result;
});

export const updateWriting = createAsyncThunk<
  WritingResponse,
  { userId: string; writing: Omit<Writing, 'blocks'> },
  { extra: { writingAPI: IWritingAPI } }
>('writings/updateTitleStatus', async ({ userId, writing }, { extra }) => {
  const result = await extra.writingAPI.update(userId, writing);

  return result;
});
