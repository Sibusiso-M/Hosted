import { createCleanInitialStateMock } from "../../utilities/testStore.js";
import gameBoardReducer, {
  moveFloors,
  addFloor,
  setStartGameButtonHidden,
  setFloor,
  setGameOver,
  clearFloors,
} from "./gameBoardSlice.js";

describe("gameBoardSlice Reducer", () => {
  describe("moveFloors action", () => {
    it("should decrease the 'top' property of floors", () => {
      const initialStateMock = createCleanInitialStateMock();
      const initialGameState = { ...initialStateMock.gameBoard };
      const newFloor = { top: 600, hole: 0, id: Date.now() };
      initialGameState.floors = [newFloor];
      const nextState = gameBoardReducer(initialGameState, moveFloors());

      expect(nextState.floors[0].top).toEqual(599);
    });
  });

  describe("addFloor action", () => {
    it("should add a new floor", () => {
      const initialGameState = { ...createCleanInitialStateMock().gameBoard };
      expect(initialGameState.floors.length).toEqual(0);

      const nextState = gameBoardReducer(initialGameState, addFloor());

      expect(nextState.floors.length).toEqual(1);
    });
  });

  describe("setStartGameButtonHidden action", () => {
    it("should set the 'startGameButtonHidden' property to true", () => {
      const initialGameState = { ...createCleanInitialStateMock().gameBoard };
      const nextState = gameBoardReducer(
        initialGameState,
        setStartGameButtonHidden(true)
      );

      expect(nextState.startGameButtonHidden).toEqual(true);
    });
  });

  describe("setFloor action", () => {
    it("should remove floors with top values less than or equal to 0", () => {
      const initialGameState = { ...createCleanInitialStateMock().gameBoard };
      initialGameState.floors = [
        { top: 100, hole: 50 },
        { top: 50, hole: 30 },
        { top: 0, hole: 20 },
      ];

      const nextState = gameBoardReducer(initialGameState, setFloor());

      const expectedState = {
        floors: [
          { top: 100, hole: 50 },
          { top: 50, hole: 30 },
        ],
      };

      expect(nextState.floors).toEqual(expectedState.floors);
    });
  });

  describe("setGameOver action", () => {
    it("should update gameOver with the payload", () => {
      const initialGameState = { ...createCleanInitialStateMock().gameBoard };

      initialGameState.gameOver = false;
      const payload = true;

      const nextState = gameBoardReducer(
        initialGameState,
        setGameOver(payload)
      );

      expect(nextState.gameOver).toBeTruthy();
    });
  });

  describe("clearFloors action", () => {
    it("should clear the floors array", () => {
      const initialGameState = { ...createCleanInitialStateMock().gameBoard };

      initialGameState.floors = [
        { top: 100, hole: 50, id: 0 },
        { top: 50, hole: 30, id: 1 },
      ];

      const nextState = gameBoardReducer(initialGameState, clearFloors());
      expect(nextState.floors).toHaveLength(0);
    });
  });
});
