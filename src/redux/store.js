import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { getIsDevelopment } from '../helpers/utils';
import { reducers } from './reducers';

export const store = configureStore({
  reducer: reducers,
  devTools: getIsDevelopment(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export const { dispatch } = store;
