import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    value: {
      isSessionCreated: false
    },
  },
  reducers: {
    setSession: (state, action) => {
        state.value = action.payload;
    },
  },
});

export const { setSession } = sessionSlice.actions;

export default sessionSlice.reducer;