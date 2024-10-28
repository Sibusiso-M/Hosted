import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import GameBoard from "./GameBoard";
import {
  setStartGameButtonHidden,
  addFloor,
  setGameOver,
  clearFloors,
} from "../../redux/slices/gameBoardSlice";
import createTestStore from "../../utilities/testStore";
import { setHiddenPlayer } from "../../redux/slices/playerSlice";
import { actions } from "../../redux/actions/actions";
import { clearScore } from "../../redux/slices/gameStatusSlice";

const renderApp = (appStore) => {
  render(
    <Provider store={appStore}>
      <GameBoard />
    </Provider>
  );
};

describe("GameBoard component", () => {
  let appStore;

  beforeEach(() => {
    appStore = createTestStore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Start Game button", () => {
    renderApp(appStore);

    expect(screen.getByText("Start Game")).toBeInTheDocument();
  });

  it("handles Start Game button click", () => {
    const dispatchSpy = jest.spyOn(appStore, "dispatch");

    renderApp(appStore);

    fireEvent.click(screen.getByText("Start Game"));

    const expectedActions = [
      actions.startGame,
      setStartGameButtonHidden(true),
      setHiddenPlayer(false),
      addFloor(),
    ];

    expect(dispatchSpy.mock.calls.length).toBe(expectedActions.length);

    expectedActions.forEach((action, index) => {
      expect(dispatchSpy.mock.calls[index][0]).toEqual(action);
    });
  });

  it("handles Reset Game button click when game is over", () => {
    const dispatchSpy = jest.spyOn(appStore, "dispatch");

    appStore.dispatch(setGameOver(true));

    renderApp(appStore);

    fireEvent.click(screen.getByText("Reset Game"));

    const expectedActions = [
      setGameOver(true),
      setGameOver(false),
      clearFloors(),
      clearScore(),
      actions.startGame,
      setStartGameButtonHidden(true),
      setHiddenPlayer(false),
      addFloor(),
    ];
    expect(dispatchSpy.mock.calls.length).toBe(expectedActions.length);

    expectedActions.forEach((action, index) => {
      expect(dispatchSpy.mock.calls[index][0]).toEqual(action);
    });
    expect(screen.queryByText("Reset Game")).not.toBeInTheDocument();
  });
});
