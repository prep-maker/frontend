import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import uiReducer from '../features/ui/uiSlice';
import userReducer from '../features/user/userSlice';

const reducers = combineReducers({
  ui: uiReducer,
  user: userReducer,
});

const persisitConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persisitConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
