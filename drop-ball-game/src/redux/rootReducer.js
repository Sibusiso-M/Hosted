import { combineReducers } from "@reduxjs/toolkit";

import playerReducer from "./slices/playerSlice";
import gameBoardReducer from "./slices/gameBoardSlice";
import gameStatusReducer from "./slices/gameStatusSlice";

const rootReducer = combineReducers({
  player: playerReducer,
  gameBoard: gameBoardReducer,
  gameStatus: gameStatusReducer,
});

export default rootReducer;
