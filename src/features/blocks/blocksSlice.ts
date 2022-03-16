import { createSlice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

import { deleteFromStore } from '../../common/utils/store';
import {
  fetchEditingByUserId,
  deleteWriting,
  fetchDoneByUserId,
  fetchWritingById,
} from '../writings/actions';
import { WritingResponse } from '../writings/writingAPI';
import { createBlock, deleteBlock, saveBlocks, updateBlock } from './actions';
import { BlockType, ParagraphType } from './types';

export type Comment = {
  username: string;
  author: string;
  content: string;
  isPending?: boolean;
};

export type Paragraph = {
  readonly type: ParagraphType;
  readonly content: string;
  comments: Comment[];
};

export type Block = {
  readonly id: string;
  readonly type: BlockType;
  readonly paragraphs: Paragraph[];
};

const initialState: NormalizedObjects<Block> = {
  allIds: [],
  byId: {},
};

export const blocksSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    updateParagraph: (state, action) => {
      const { blockId, index, value } = action.payload;
      state.byId[blockId].paragraphs[index].content = value;
    },
    combineBlocks: (state, action) => {
      const { targetId, combinedId } = action.payload;
      const target = state.byId[targetId];
      const merged = state.byId[combinedId];
      target.paragraphs.push(...merged.paragraphs);

      if (target.type !== 'PREP') {
        state.byId[targetId].type = (target.type + merged.type) as BlockType;
      }

      deleteFromStore(state, combinedId);
    },
    addCommentToParagraph: (state, action) => {
      const { blockId, content, author, username, pIndex } = action.payload;
      const comment = {
        content,
        author,
        username,
        isPending: true,
      };

      state.byId[blockId].paragraphs[pIndex].comments.push(comment);
    },
    cancelPendingComment: (state, action) => {
      const blockId = action.payload;
      const paragraphs = state.byId[blockId].paragraphs;

      for (const paragraph of paragraphs) {
        paragraph.comments = paragraph.comments.filter(
          (comment) => !comment.isPending
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditingByUserId.fulfilled, (state, action) => {
        state.allIds = [];
        state.byId = {};
        const writings = action.payload;

        for (const writing of writings) {
          addBlocksToStore(state, writing);
        }
      })
      .addCase(fetchDoneByUserId.fulfilled, (state, action) => {
        state.allIds = [];
        state.byId = {};
        const writings = action.payload;

        for (const writing of writings) {
          addBlocksToStore(state, writing);
        }
      })
      .addCase(fetchWritingById.fulfilled, (state, action) => {
        addBlocksToStore(state, action.payload);
      })
      .addCase(createBlock.fulfilled, (state, action) => {
        const { blocks } = action.payload;

        for (const block of blocks) {
          state.allIds.push(block.id);
          state.byId[block.id] = block;
        }
      })
      .addCase(deleteBlock.fulfilled, (state, action) => {
        const { blockId } = action.payload;
        deleteFromStore(state, blockId);
      })
      .addCase(saveBlocks.fulfilled, (state, action) => {
        const { newBlocks, oldBlocks } = action.payload;

        oldBlocks.forEach((block) => deleteFromStore(state, block.id));

        for (const block of newBlocks) {
          state.allIds.push(block.id);
          state.byId[block.id] = block;
        }
      })
      .addCase(deleteWriting.fulfilled, (state, action) => {
        const { blocks } = action.payload;
        blocks.forEach((block) => deleteFromStore(state, block.id));
      })
      .addCase(updateBlock.fulfilled, (state, action) => {
        const block = action.payload;
        state.byId[block.id] = block;
      });
  },
});

const addBlocksToStore = (
  state: WritableDraft<NormalizedObjects<Block>>,
  writing: WritingResponse
) => {
  const blockIds = writing.blocks.map((block) => block.id);
  state.allIds.push(...blockIds);

  for (const block of writing.blocks) {
    state.byId[block.id] = block;
  }
};

export const {
  updateParagraph,
  combineBlocks,
  addCommentToParagraph,
  cancelPendingComment,
} = blocksSlice.actions;

export default blocksSlice.reducer;
