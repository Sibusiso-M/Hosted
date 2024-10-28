import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  left: 0,
  top: 0,
  hidePlayer: true,
  lastScoredFloor: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    moveRight: (state) => {
      if (state.left < 670) {
        state.left += 4;
      }
    },
    moveLeft: (state) => {
      if (state.left - 4 >= 0) {
        state.left -= 4;
      }
    },
    moveDown: (state) => {
      if (state.top < 570) state.top += 4;
    },
    moveUp: (state) => {
      state.top -= 1;
    },
    setHiddenPlayer: (state, action) => {
      state.hidePlayer = action.payload;
    },
  },
});

export const { moveRight, moveLeft, moveUp, moveDown, setHiddenPlayer } =
  playerSlice.actions;

export default playerSlice.reducer;
