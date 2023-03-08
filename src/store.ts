import { configureStore } from "@reduxjs/toolkit";

// Reducers
import sessionReducer from './redux/session';
import championReducer from './redux/champion';

export const store = configureStore({
    reducer: {
      session: sessionReducer,
      champion: championReducer,
    },
  });