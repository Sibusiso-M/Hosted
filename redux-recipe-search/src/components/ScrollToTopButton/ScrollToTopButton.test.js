import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ScrollToTopButton from "./ScrollToTopButton.js";
import { Provider } from "react-redux";
import createStoreTest from "../../utilities/testHelperFunctions";
import { initialState } from "../../redux/reducer";

const renderApp = (appStore) => {
  render(
    <Provider store={appStore}>
      <ScrollToTopButton />
    </Provider>
  );
};

describe("ScrollToTopButton", () => {
  let appStore;
  let initialStateMock;

  beforeEach(() => {
    initialStateMock = { ...initialState };
    appStore = createStoreTest(initialStateMock);
  });

  it("should not render the button initially when at top of page", () => {
    renderApp(appStore);

    const button = screen.queryByText("Top");

    expect(button).not.toBeInTheDocument();
  });

  it("should show 'Top' button when scrolled past 200px", () => {
    appStore = createStoreTest(initialStateMock);
    renderApp(appStore);

    window.scrollY = 201;
    fireEvent.scroll(window);

    const button = screen.getByRole("button", { name: /top/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ opacity: 1 });
  });
});
