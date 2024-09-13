import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  userId: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setUserId : (state ,action) => {
        state.userId = action.payload;
    }
  },
});

export const { 
    increment, 
    decrement,
    setUserId,
} = userSlice.actions;

export default userSlice.reducer;
