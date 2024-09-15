import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobId: ''
};

export const docUploadStore = createSlice({
  name: 'docUpload',
  initialState,
  reducers: {
    setJobId : (state ,action) => {
        state.jobId = action.payload;
    },
  },
});

export const { 
    setJobId,
} = docUploadStore.actions;

export default docUploadStore.reducer;
