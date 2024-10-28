import { createCleanInitialStateMock } from "../../utilities/testStore.js";

import gameStatusReducer, {
  increaseScore,
  clearScore,
} from "./gameStatusSlice";

describe("gameStatusSlice Reducer", () => {
  describe("increaseScore action", () => {
    it("should increase the score by 1", () => {
      const initialStateMock = createCleanInitialStateMock();
      const initialGameState = { ...initialStateMock.gameStatus };
      const nextState = gameStatusReducer(initialGameState, increaseScore());
      expect(nextState.score).toEqual(1);
    });
  });

  describe("clearScore action", () => {
    it("should set the 'score' property to 0", () => {
      const initialStateMock = createCleanInitialStateMock();
      const initialGameState = { ...initialStateMock.gameStatus };
      const nextState = gameStatusReducer(initialGameState, clearScore());

      expect(nextState.score).toEqual(0);
    });
  });
});
