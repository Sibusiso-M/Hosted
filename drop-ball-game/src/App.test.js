import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import createTestStore from "./utilities/testStore";

const renderApp = (appStore) => {
  render(
    <Provider store={appStore}>
      <App />
    </Provider>
  );
};

describe("GameBoard component", () => {
  let appStore;

  beforeEach(() => {
    appStore = createTestStore();
  });
  it("renders the Ball Drop title", () => {
    renderApp(appStore);
    const title = screen.getByText(/Ball Drop/i);
    expect(title).toBeInTheDocument();
  });
  it("renders the GameBoard component", () => {
    renderApp(appStore);
    expect(screen.getByTestId("gameboard")).toBeInTheDocument();
  });

  it("renders the StatusBar component", () => {
    renderApp(appStore);
    expect(screen.getByTestId("status-bar")).toBeInTheDocument();
  });
});
