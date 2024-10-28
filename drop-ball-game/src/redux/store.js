import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import {
  watchMoveFloorsSaga,
  watchManageFloorsSaga,
  watchBallDropSaga,
} from "./sagas/gameWatcherSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchMoveFloorsSaga);
sagaMiddleware.run(watchManageFloorsSaga);
sagaMiddleware.run(watchBallDropSaga);

export default store;
