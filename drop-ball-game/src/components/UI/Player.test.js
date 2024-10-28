import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import createTestStore from "../../utilities/testStore";
import Player from "./Player";
import {
  moveLeft,
  moveRight,
  setHiddenPlayer,
} from "../../redux/slices/playerSlice";

const renderApp = (appStore) => {
  render(
    <Provider store={appStore}>
      <Player />
    </Provider>
  );
};

describe("Player component", () => {
  let appStore;

  beforeEach(() => {
    appStore = createTestStore();
  });

  it("renders Player component", () => {
    appStore.dispatch(setHiddenPlayer(false));
    renderApp(appStore);

    const playerElement = screen.getByTestId("player-player");
    expect(playerElement).toBeInTheDocument();
  });

  it("moves left when 'arrowleft' key is pressed", () => {
    appStore = createTestStore();

    const dispatchSpy = jest.spyOn(appStore, "dispatch");
    renderApp(appStore);

    fireEvent.keyDown(window, { key: "arrowleft" });

    expect(dispatchSpy.mock.calls[0][0]).toEqual(moveLeft());
  });

  it("moves right when 'arrowright' key is pressed", () => {
    const dispatchSpy = jest.spyOn(appStore, "dispatch");
    renderApp(appStore);

    fireEvent.keyDown(window, { key: "arrowright" });

    expect(dispatchSpy.mock.calls[0][0]).toEqual(moveRight());
  });
});
