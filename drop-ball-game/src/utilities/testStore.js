import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../redux/rootReducer";
import {
  watchMoveFloorsSaga,
  watchManageFloorsSaga,
  watchBallDropSaga,
} from "../redux/sagas/gameWatcherSaga";
import { initialState as gameBoardInitialState } from "../redux/slices/gameBoardSlice";
import { initialState as gameStatusInitialState } from "../redux/slices/gameStatusSlice";
import { initialState as playerInitialState } from "../redux/slices/playerSlice";

export const rootInitialStateMock = {
  player: playerInitialState,
  gameBoard: gameBoardInitialState,
  gameStatus: gameStatusInitialState,
};

function createTestStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });

  sagaMiddleware.run(watchMoveFloorsSaga);
  sagaMiddleware.run(watchManageFloorsSaga);
  sagaMiddleware.run(watchBallDropSaga);

  return store;
}

export const createCleanInitialStateMock = () => {
  return { ...rootInitialStateMock };
};

export default createTestStore;
