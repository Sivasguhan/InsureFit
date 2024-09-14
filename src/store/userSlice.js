import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  userData: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId : (state ,action) => {
        state.userId = action.payload;
    },
    setUserData : (state ,action) => {
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
    }
  },
});

export const { 
    setUserId,
    setUserData,
} = userSlice.actions;

export default userSlice.reducer;
