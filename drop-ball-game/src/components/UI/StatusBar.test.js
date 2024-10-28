import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import createTestStore, {
  createCleanInitialStateMock,
} from "../../utilities/testStore";
import StatusBar from "./StatusBar";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const renderApp = (appStore) => {
  render(
    <Provider store={appStore}>
      <StatusBar />
    </Provider>
  );
};

describe("StatusBar component", () => {
  let appStore;

  beforeEach(() => {
    appStore = createTestStore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders StatusBar component", () => {
    renderApp(appStore);

    const statusBarElement = screen.getByTestId("status-bar");
    expect(statusBarElement).toBeInTheDocument();
  });

  it("should display score", () => {
    appStore = mockStore({
      ...createCleanInitialStateMock(),
      gameStatus: { ...createCleanInitialStateMock().gameStatus, score: 10 },
    });

    renderApp(appStore);
    expect(screen.getByText(/score: 10/i)).toBeInTheDocument();
  });
});
