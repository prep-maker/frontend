import { Block } from '../../blocks/blocksSlice';
import { Writing } from '../writingsSlice';
import { WritingResponse } from '../writingAPI';
import dummyWritings from './dummyWritings.json';

export interface IWritingAPI {
  readonly getEditingByUserId: (userId: string) => Promise<WritingResponse[]>;
  readonly getDoneByUserId: (userId: string) => Promise<WritingResponse[]>;
  readonly getById: (writingId: string) => Promise<WritingResponse>;
  readonly update: (
    writing: Omit<Writing, 'blocks'>
  ) => Promise<WritingResponse>;
  readonly delete: (userId: string, writingId: string) => Promise<Block[]>;
  readonly create: (userId: string) => Promise<WritingResponse>;
}

class WritingAPIStub implements IWritingAPI {
  constructor() {}

  getEditingByUserId = async (userId: string): Promise<WritingResponse[]> => {
    const writings = dummyWritings.filter(
      (writing) => writing.author === userId
    );

    return writings.filter((writing) => !writing.isDone) as any;
  };

  getDoneByUserId = async (userId: string): Promise<WritingResponse[]> => {
    const writings = dummyWritings.filter(
      (writing) => writing.author === userId
    );

    return writings.filter((writing) => writing.isDone) as any;
  };

  getById = async (writingId: string): Promise<WritingResponse> => {
    return dummyWritings.find((writing) => writing.id === writingId) as any;
  };

  update = async (
    writing: Omit<Writing, 'blocks'>
  ): Promise<WritingResponse> => {
    return {
      ...writing,
      blocks: [],
    } as any;
  };

  delete = async (userId: string, writingId: string): Promise<Block[]> => [
    {
      id: '1',
      type: 'P',
      paragraphs: [
        {
          type: 'P',
          content: 'test',
          comments: [],
        },
      ],
    },
  ];

  create = async (userId: string): Promise<WritingResponse> => ({
    id: 'id',
    isDone: false,
    author: userId,
    title: 'Untitled',
    blocks: [],
  });
}

export default WritingAPIStub;
