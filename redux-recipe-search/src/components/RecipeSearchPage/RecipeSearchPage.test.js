import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import createStoreTest from "../../utilities/testHelperFunctions.js";
import { initialState } from "../../redux/reducer.js";
import RecipeSearchPage from "./RecipeSearchPage.js";

const renderApp = (appStore) => {
  render(
    <Provider store={appStore}>
      <RecipeSearchPage />
    </Provider>
  );
};

describe("RecipeSearchPage component", () => {
  let appStore;
  let initialStateMock;

  beforeEach(() => {
    initialStateMock = { ...initialState };
    appStore = createStoreTest(initialStateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display error message when a duplicated ingredient is added with similar spelling", () => {
    renderApp(appStore);

    const addButton = screen.getByRole("button", { name: /add ingredient/i });
    expect(addButton).toBeInTheDocument();

    let ingredientErrorMessage = screen.queryByTestId("ingredient-error-text");
    expect(ingredientErrorMessage).not.toBeInTheDocument();

    const ingredientInputBox = screen.getAllByRole("textbox")[1];
    expect(ingredientInputBox).toBeVisible();

    const ingredient = "tomatoes";
    fireEvent.change(ingredientInputBox, { target: { value: ingredient } });
    fireEvent.click(addButton);

    const ingredientElement = screen.getByTestId("ingredients");
    expect(ingredientElement).toHaveTextContent(ingredient);

    fireEvent.change(ingredientInputBox, { target: { value: "tomaotoes" } });
    fireEvent.click(addButton);

    ingredientErrorMessage = screen.getByTestId("ingredient-error-text");

    expect(ingredientErrorMessage).toBeInTheDocument();
    expect(ingredientErrorMessage.textContent).toBe("Ingredient Exists");

    fireEvent.change(ingredientInputBox, { target: { value: "tomoattoes" } });
    fireEvent.click(addButton);

    ingredientErrorMessage = screen.getByTestId("ingredient-error-text");
    expect(ingredientErrorMessage.textContent).toBe("Ingredient Exists");
  });

  it("should remove selected ingredient from ingredient list", () => {
    initialStateMock.ingredient = "";
    appStore = createStoreTest(initialStateMock);

    renderApp(appStore);

    const addButton = screen.getByTestId("add-ingredient-button");
    expect(addButton).toBeInTheDocument();

    const ingredientInputBox = screen.getAllByRole("textbox")[1];
    expect(ingredientInputBox).toBeVisible();
    const ingredient = "Tomato";

    fireEvent.change(ingredientInputBox, { target: { value: ingredient } });
    fireEvent.click(addButton);

    let ingredientElement = screen.getByTestId("ingredients");
    expect(ingredientElement).toHaveTextContent(ingredient);

    const removeIngredientElement = screen.getByTestId("remove-ingredient");
    expect(removeIngredientElement).toBeInTheDocument();

    fireEvent.click(removeIngredientElement);

    ingredientElement = screen.getByTestId("ingredients");
    expect(ingredientElement).not.toHaveTextContent(ingredient);
  });

  it("should display chosen keyword", () => {
    renderApp(appStore);

    const setKeyWordInputBox = screen.getByRole("textbox", {
      name: /enter keyword/i,
    });
    fireEvent.change(setKeyWordInputBox, { target: { value: "swazi" } });
    expect(screen.getByText(/your chosen keyword: swazi/i)).toBeVisible();
  });

  it("should scroll to top when button is clicked", () => {
    renderApp(appStore);

    window.scrollTo = jest.fn();
    window.scrollY = 201;
    fireEvent.scroll(window);

    const button = screen.getByText("Top");
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
