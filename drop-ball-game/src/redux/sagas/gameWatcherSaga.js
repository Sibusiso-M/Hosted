import { delay, put, select, takeEvery } from "redux-saga/effects";
import {
  addFloor,
  moveFloors,
  setFloor,
  setGameOver,
} from "../slices/gameBoardSlice";
import { moveDown, moveUp } from "../slices/playerSlice";
import { actions } from "../actions/actions";
import { types } from "../types/types";
import { increaseScore } from "../slices/gameStatusSlice";

export function* moveFloorsSaga() {
  while (true) {
    yield delay(10);
    yield put(moveFloors());
    yield put(actions.makeBallDrop);
    yield put(actions.setFloors);

    const playerTop = yield select((state) => state.player.top);
    if (playerTop > 0) {
      continue;
    }
    const gameOver = yield select((state) => state.gameBoard.gameOver);

    if (gameOver === false) {
      yield put(setGameOver(true));
      break;
    }
  }
}

export function* manageBallDropSaga() {
  const floors = yield select((state) => state.gameBoard.floors);
  const playerTop = yield select((state) => state.player.top);
  const playerLeft = yield select((state) => state.player.left);

  const isCollisionTop = floors.some(
    (floor) =>
      floor.top - playerTop <= 30 &&
      floor.top - playerTop >= 25 &&
      !(floor.hole <= playerLeft && floor.hole + 30 >= playerLeft)
  );

  if (isCollisionTop) {
    yield put(moveUp());
  } else {
    const currentFloor = floors.find(
      (floor) =>
        floor.top - playerTop <= 30 &&
        floor.top - playerTop >= 25 &&
        floor.hole <= playerLeft &&
        floor.hole + 30 >= playerLeft
    );
    if (currentFloor) {
      yield put(increaseScore());
      yield put(moveDown());
    }

    yield put(moveDown());
  }
}

export function* addFloorsSaga() {
  const floors = yield select((state) => state.gameBoard.floors);
  const lastFloor = floors[floors.length - 1];

  if (lastFloor?.top < 500) {
    yield put(addFloor());
  }

  yield put(setFloor());
}

export function* watchMoveFloorsSaga() {
  yield takeEvery(types.START_GAME, moveFloorsSaga);
}

export function* watchManageFloorsSaga() {
  yield takeEvery(types.MANAGE_GAME_FLOORS, addFloorsSaga);
}

export function* watchBallDropSaga() {
  yield takeEvery(types.BALL_DROP, manageBallDropSaga);
}
