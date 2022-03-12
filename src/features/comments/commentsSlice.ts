import { createSlice } from '@reduxjs/toolkit';

export type Comment = {
  id: string;
  content: string;
  username: string;
  isPending: boolean;
};

const initialState: NormalizedObjects<Comment> = {
  allIds: [],
  byId: {},
};

export const commentsSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addCommentToParagraph: (state, action) => {
      const { commentId, content, username } = action.payload;
      state.allIds.push(commentId);
      state.byId[commentId] = {
        id: commentId,
        content,
        username,
        isPending: true,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { addCommentToParagraph } = commentsSlice.actions;

export default commentsSlice.reducer;
