import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import Recipe from "./Recipe";
import { initialState } from "../../redux/reducer.js";
import createStoreTest from "../../utilities/testHelperFunctions.js";

const renderApp = (appStore) => {
  render(
    <Provider store={appStore}>
      <Recipe />
    </Provider>
  );
};

describe("Recipe component", () => {
  let initialStateMock;
  let appStore;

  beforeEach(() => {
    initialStateMock = { ...initialState };
    appStore = createStoreTest(initialStateMock);
  });

  it("should render", () => {
    renderApp(appStore);
    expect(screen.getByTestId("results-container")).toBeInTheDocument();
  });

  it("should render loading message when isLoading is true", () => {
    initialStateMock = {
      ...initialStateMock,
      isLoading: true,
    };
    appStore = createStoreTest(initialStateMock);
    renderApp(appStore);

    appStore.getState().isLoading = true;
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });

  it("should render recipe cards when recipes exist", () => {
    const mockRecipeResponse = [];

    for (let i = 0; i < 12; i++) {
      mockRecipeResponse.push({
        image: "recipeTestImage",
        ingredientLines: [
          "ingredient1 and measurement",
          "ingredient2 and measurement",
          "ingredient3 and measurement",
        ],
        label: `label-${i}`,
      });
    }

    initialStateMock.recipes = mockRecipeResponse;
    appStore = createStoreTest(initialStateMock);
    renderApp(appStore);

    const recipeLabels = appStore
      .getState()
      .recipes.map((recipe) => recipe.label);

    const recipeCards = screen.getAllByTestId("recipe-card");
    recipeLabels.forEach((label) => {
      const recipeCard = screen.getByText(label);
      expect(recipeCard).toBeInTheDocument();
    });

    expect(recipeCards.length).toBe(initialStateMock.recipes.length);
  });

  it("should render error when recipe response is empty", () => {
    initialStateMock.recipeResponseEmpty = true;
    appStore = createStoreTest(initialStateMock);
    renderApp(appStore);

    expect(screen.getByText(/no recipes were found./i)).toBeInTheDocument();
  });

  it("should not render error when recipes response has recipes", () => {
    initialStateMock.recipeResponseEmpty = false;
    appStore = createStoreTest(initialStateMock);
    renderApp(appStore);

    expect(
      screen.queryByText(/no recipes were found./i)
    ).not.toBeInTheDocument();
  });

  it("should show an error when fetch request throws an error", () => {
    initialStateMock = {
      ...initialStateMock,
      fetchResponseErrorMessage: "Mock http error",
    };
    appStore = createStoreTest(initialStateMock);

    renderApp(appStore);
    expect(
      screen.getByTestId("fetch-response-error-message")
    ).toBeInTheDocument();
  });

  it("should not show an error when fetch request successful", () => {
    initialStateMock = {
      ...initialStateMock,
      fetchResponseErrorMessage: null,
    };
    appStore = createStoreTest(initialStateMock);

    renderApp(appStore);
    expect(
      screen.queryByTestId("fetch-response-error-message")
    ).not.toBeInTheDocument();
  });
});
