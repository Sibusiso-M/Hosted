import { createSlice } from "@reduxjs/toolkit";
const randomGap = () => Math.floor(Math.random() * 650);

export const initialState = {
  height: 600,
  width: 700,
  boarder: "2px solid black",
  floors: [],
  startGameButtonHidden: false,
  gameOver: false,
};

const gameBoardSlice = createSlice({
  name: "gameBoard",
  initialState,
  reducers: {
    moveFloors: (state) => {
      const updatedTops = state.floors.map((floorProps) => {
        return { ...floorProps, top: floorProps.top - 1 };
      });
      state.floors = updatedTops;
    },
    setStartGameButtonHidden: (state, action) => {
      state.startGameButtonHidden = action.payload;
    },
    addFloor: (state) => {
      const newFloor = { top: 600, hole: randomGap(), id: Date.now() };
      state.floors = [...state.floors, newFloor];
    },
    setFloor: (state) => {
      state.floors = state.floors.filter((floor) => floor.top > 0);
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload;
    },
    clearFloors: (state) => {
      state.floors = [];
    },
  },
});

export const {
  moveFloors,
  setStartGameButtonHidden,
  addFloor,
  setFloor,
  setGameOver,
  clearFloors,
} = gameBoardSlice.actions;
export default gameBoardSlice.reducer;
