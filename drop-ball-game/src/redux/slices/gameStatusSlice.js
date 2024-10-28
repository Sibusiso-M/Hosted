import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  score: 0,
};

const gameStatusSlice = createSlice({
  name: "gameStatus",
  initialState,
  reducers: {
    increaseScore: (state) => {
      state.score += 1;
    },

    clearScore: (state) => {
      state.score = 0;
    },
  },
});

export const { increaseScore, clearScore } = gameStatusSlice.actions;

export default gameStatusSlice.reducer;
