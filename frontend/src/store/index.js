import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.slice';
import { menuApi } from './api';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

export const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig, userReducer),
    [menuApi.reducerPath]: menuApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
    .concat(menuApi.middleware),
});

setupListeners(store.dispatch);

export default store;
