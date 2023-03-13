import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    value: {
      id : "",
    },
  },
  reducers: {
    setSessionId: (state, action) => {
      state.value = action.payload;
  }
  },
});

export const { setSessionId } = sessionSlice.actions;

export default sessionSlice.reducer;