import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  userData: {},
  policyDetails: [],
  recommendedPolicy: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
    },
    setPolicyDetails: (state, action) => {
      if (action.payload.length > 0) {
        state.recommendedPolicy = action.payload[0];
      }
      state.policyDetails = [...action.payload];
    },
  },
});

export const { 
  setUserId,
  setUserData,
  setPolicyDetails,
} = userSlice.actions;

export default userSlice.reducer;
