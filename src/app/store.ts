import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import uiReducer from '../features/ui/uiSlice';
import userReducer from '../features/user/userSlice';
import AuthAPI from '../features/user/authAPI';
import HttpClient from '../network/http';
import config from '../common/utils/config';

const reducers = combineReducers({
  ui: uiReducer,
  user: userReducer,
});

const persisitConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persisitConfig, reducers);

const http = HttpClient.getHttp(config.baseUrl);
const authAPI = new AuthAPI(http);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          authAPI,
        },
      },
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
