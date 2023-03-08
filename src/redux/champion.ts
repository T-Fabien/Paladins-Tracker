import { createSlice } from '@reduxjs/toolkit';

export const championSlice = createSlice({
  name: 'champion',
  initialState: {
    value: {
      championList: null,
    },
  },
  reducers: {
    setChampionList: (state, action) => {
        state.value = action.payload;
    },
  },
});

export const { setChampionList } = championSlice.actions;

export default championSlice.reducer;