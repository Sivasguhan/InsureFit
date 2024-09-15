import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import docUploadReducer from './docUploadStore';

export const store = configureStore({
  reducer: {
    user: userReducer,
    docUpload: docUploadReducer
  },
});

export default store;
