import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import { initialState } from "../../redux/reducer.js";
import createStoreTest from "../../utilities/testHelperFunctions.js";
import SearchRecipeBar from "./SearchRecipeBar.js";

const renderApp = (appStore) => {
  render(
    <Provider store={appStore}>
      <SearchRecipeBar />
    </Provider>
  );
};

describe("SearchRecipeBar component", () => {
  let appStore;
  let initialStateMock;

  beforeEach(() => {
    initialStateMock = { ...initialState };
    appStore = createStoreTest(initialStateMock);
  });

  it("should render without errors", () => {
    renderApp(appStore);

    expect(screen.getByText("Your chosen keyword:")).toBeInTheDocument();
    expect(
      screen.queryByTestId("search-keyword-input-empty-error-text")
    ).not.toBeInTheDocument();
  });

  it("should handle fetch", () => {
    renderApp(appStore);

    const fetch = jest.spyOn(global, "fetch");

    const keyword = "beef";
    const searchInputBox = screen.getByRole("textbox", {
      name: /enter keyword/i,
    });
    fireEvent.change(searchInputBox, { target: { value: keyword } });

    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should show error when search keyword is not given", () => {
    renderApp(appStore);

    expect(
      screen.queryByText(/please enter a keyword/i)
    ).not.toBeInTheDocument();

    const searchKeywordInputBox = screen.getByRole("textbox", {
      name: /enter keyword/i,
    });
    expect(searchKeywordInputBox).toBeVisible();

    const searchKeywordButton = screen.getByRole("button", {
      name: /search/i,
    });
    expect(searchKeywordButton).toBeVisible();

    const searchKeyword = "";
    fireEvent.change(searchKeywordInputBox, {
      target: { value: searchKeyword },
    });
    fireEvent.click(searchKeywordButton);

    expect(screen.getByText(/please enter a keyword/i)).toBeInTheDocument();
  });

  describe("search button", () => {
    it("should be visible", () => {
      renderApp(appStore);

      const searchKeywordButton = screen.getByRole("button", {
        name: /search/i,
      });
      fireEvent.click(searchKeywordButton);

      expect(searchKeywordButton).toBeVisible();
    });
  });

  it("should display an error message for non-alphabetic input", () => {
    renderApp(appStore);

    fireEvent.change(screen.getByRole("textbox", { name: /enter keyword/i }), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(
      screen.getByText(/keyword should only contain alphabets/i)
    ).toBeInTheDocument();
  });

  it("should not display an error message for alphabetic input", () => {
    renderApp(appStore);

    fireEvent.change(screen.getByRole("textbox", { name: /enter keyword/i }), {
      target: { value: "xyz" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    expect(
      screen.queryByText(/keyword should only contain alphabets/i)
    ).not.toBeInTheDocument();
  });
});
