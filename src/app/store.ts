import { Middleware } from 'redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import config from '../common/utils/config';
import uiReducer from '../features/ui/uiSlice';
import userReducer from '../features/user/userSlice';
import writingsReducer from '../features/writings/writingsSlice';
import AuthAPI from '../features/user/authAPI';
import HttpClient from '../network/http';
import WritingAPI from '../features/writings/writingAPI';
import blocksReducer from '../features/blocks/blocksSlice';
import BlockAPI from '../features/blocks/blockAPI';

const reducers = combineReducers({
  ui: uiReducer,
  user: userReducer,
  writings: writingsReducer,
  blocks: blocksReducer,
});

const persisitConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persisitConfig, reducers);
const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const http = HttpClient.getHttp(config.baseUrl);
const authAPI = new AuthAPI(http);
const writingAPI = new WritingAPI(http);
const blockAPI = new BlockAPI(http);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          authAPI,
          writingAPI,
          blockAPI,
        },
      },
    }).concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
