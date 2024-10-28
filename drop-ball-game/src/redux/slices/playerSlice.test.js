import { createCleanInitialStateMock } from "../../utilities/testStore.js";
import playerReducer, {
  moveRight,
  moveLeft,
  moveDown,
  moveUp,
  setHiddenPlayer,
} from "./playerSlice";

describe("playerSlice Reducer", () => {
  describe("moveRight action", () => {
    it("should move player right", () => {
      const initialStateMock = createCleanInitialStateMock();
      const initialGameState = { ...initialStateMock.player };
      initialGameState.left = 500;
      const nextState = playerReducer(initialGameState, moveRight());

      expect(nextState.left).toBeGreaterThan(initialGameState.left);
      expect(nextState.left).toBe(504);
    });

    it("should not move right when left is greater than or equal to 670", () => {
      const initialStateMock = createCleanInitialStateMock();
      const initialGameState = { ...initialStateMock.player };
      initialGameState.left = 670;

      const nextState = playerReducer(initialStateMock, moveRight());

      expect(nextState.left).toEqual(initialStateMock.left);
    });
  });

  describe("moveLeft action", () => {
    it("should move left when left is greater than or equal to 0", () => {
      const initialStateMock = createCleanInitialStateMock();
      const initialGameState = { ...initialStateMock.player };
      initialGameState.left = 50;
      const nextState = playerReducer(initialGameState, moveLeft());

      expect(nextState.left).toBeLessThan(initialGameState.left);
      expect(nextState.left).toBe(46);
    });

    it("should not move left when left is less than 4", () => {
      const initialStateMock = createCleanInitialStateMock();
      const initialGameState = { ...initialStateMock.player };
      initialGameState.left = 2;
      const nextState = playerReducer(initialGameState, moveLeft());

      expect(nextState.left).toEqual(initialGameState.left);
    });
  });

  describe("moveDown action", () => {
    it("should move down when top is less than 570", () => {
      const initialStateMock = createCleanInitialStateMock();
      const initialGameState = { ...initialStateMock.player };
      initialGameState.top = 50;

      const nextState = playerReducer(initialGameState, moveDown());

      expect(nextState.top).toBeGreaterThan(initialGameState.top);
      expect(nextState.top).toBeLessThan(570);
    });

    it("should not move down when top is greater than or equal to 570", () => {
      const initialStateMock = createCleanInitialStateMock();
      const initialGameState = { ...initialStateMock.player };
      initialGameState.top = 570;

      const nextState = playerReducer(initialGameState, moveDown());

      expect(nextState.top).toEqual(initialGameState.top);
    });
  });

  describe("moveUp action", () => {
    it("should move up by decrementing top", () => {
      const initialStateMock = createCleanInitialStateMock();
      const initialGameState = { ...initialStateMock.player };
      initialGameState.top = 50;
      const nextState = playerReducer(initialGameState, moveUp());

      expect(nextState.top).toEqual(initialGameState.top - 1);
    });
  });

  describe("setHiddenPlayer action", () => {
    it("should set hidePlayer to true when payload is true", () => {
      const initialStateMock = createCleanInitialStateMock();
      const initialGameState = { ...initialStateMock.player };
      initialGameState.hidePlayer = false;

      const nextState = playerReducer(initialGameState, setHiddenPlayer(true));

      expect(nextState.hidePlayer).toEqual(true);
    });

    it("should set hidePlayer to false when payload is false", () => {
      const initialStateMock = createCleanInitialStateMock();
      const initialGameState = { ...initialStateMock.player };
      initialGameState.hidePlayer = true;
      const nextState = playerReducer(initialGameState, setHiddenPlayer(false));

      expect(nextState.hidePlayer).toEqual(false);
    });
  });
});
