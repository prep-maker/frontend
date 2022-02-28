import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import uiReducer from '../features/ui/uiSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
