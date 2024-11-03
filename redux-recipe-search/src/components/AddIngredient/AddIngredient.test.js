import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import createStoreTest from "../../utilities/testHelperFunctions.js";
import AddIngredient from "./AddIngredient.js";
import { initialState } from "../../redux/reducer.js";
import { recipeSearchActions } from "../../redux/actions.js";

const renderApp = (appStore) => {
  render(
    <Provider store={appStore}>
      <AddIngredient />
    </Provider>
  );
};

describe("AddIngredient", () => {
  let appStore;

  beforeEach(() => {
    appStore = createStoreTest({ ...initialState });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render AddIngredient component", () => {
    renderApp(appStore);
    expect(screen.getByTestId("add-ingredient-component")).toBeInTheDocument();
  });

  it("should dispatch addIngredient action when add button is clicked", () => {
    const dispatchSpy = jest.spyOn(appStore, "dispatch");
    renderApp(appStore);

    const ingredient = "Tomato";
    const ingredientInputBox = screen.getByRole("textbox", {
      name: /enter ingredient/i,
    });

    fireEvent.change(ingredientInputBox, { target: { value: ingredient } });

    const addButton = screen.getByRole("button", { name: /add ingredient/i });
    fireEvent.click(addButton);

    const expectedActions = [
      recipeSearchActions.setEmptyRecipeResponseError(false),
      recipeSearchActions.setIngredientInput(ingredient),
      recipeSearchActions.initializeIngredientErrors(),
      recipeSearchActions.addIngredient(ingredient),
    ];

    dispatchSpy.mock.calls.forEach((call, index) => {
      expect(call[0]).toEqual(expectedActions[index]);
    });
  });

  it("should add ingredient to ingredients list when add button is clicked", () => {
    renderApp(appStore);

    const addButton = screen.getByRole("button", { name: /add ingredient/i });
    expect(addButton).toBeInTheDocument();

    const ingredientErrorMessage = screen.queryByTestId("heading", {
      name: /ingredient exists/i,
    });
    expect(ingredientErrorMessage).not.toBeInTheDocument();

    const ingredientInputBox = screen.getByRole("textbox", {
      name: /enter ingredient/i,
    });

    expect(ingredientInputBox).toBeVisible();

    const ingredient = "Tomato";
    fireEvent.change(ingredientInputBox, { target: { value: ingredient } });
    fireEvent.click(addButton);

    const ingredientElement = screen.getByTestId("ingredients");
    expect(ingredientElement).toHaveTextContent(ingredient);
  });

  it("should display message when a duplicated ingredient is added", () => {
    renderApp(appStore);

    const addButton = screen.getByRole("button", { name: /add ingredient/i });
    expect(addButton).toBeInTheDocument();

    let ingredientErrorMessage = screen.queryByTestId("ingredient-error-text");
    expect(ingredientErrorMessage).not.toBeInTheDocument();

    const ingredientInputBox = screen.getByRole("textbox", {
      name: /enter ingredient/i,
    });
    expect(ingredientInputBox).toBeVisible();

    const ingredient = "Tomato";
    fireEvent.change(ingredientInputBox, { target: { value: ingredient } });
    fireEvent.click(addButton);

    const ingredientElement = screen.getByTestId("ingredients");
    expect(ingredientElement).toHaveTextContent(ingredient);

    fireEvent.change(ingredientInputBox, { target: { value: ingredient } });
    fireEvent.click(addButton);

    ingredientErrorMessage = screen.getByTestId("ingredient-error-text");
    expect(ingredientErrorMessage).toBeInTheDocument();
    expect(ingredientErrorMessage.textContent).toBe("Ingredient Exists");
  });

  it("should dispatch setIngredientInput when and ingredient is added", () => {
    appStore.dispatch = jest.fn();
    renderApp(appStore);

    const ingredientInputBox = screen.getByRole("textbox", {
      name: /enter ingredient/i,
    });
    expect(ingredientInputBox).toBeVisible();

    const ingredient = "Tomato";
    fireEvent.change(ingredientInputBox, { target: { value: ingredient } });
    expect(appStore.dispatch).toHaveBeenCalledWith(
      recipeSearchActions.setIngredientInput(ingredient)
    );
  });

  it("should render error when ingredient input is empty is false", () => {
    renderApp(appStore);

    const addButton = screen.getByRole("button", { name: /add ingredient/i });
    expect(addButton).toBeInTheDocument();

    let ingredientInputEmptyErrorText = screen.queryByTestId(
      "ingredient-input-empty-error-text"
    );
    expect(ingredientInputEmptyErrorText).not.toBeInTheDocument();

    const ingredientInputBox = screen.getByRole("textbox", {
      name: /enter ingredient/i,
    });
    expect(ingredientInputBox).toBeVisible();

    fireEvent.change(ingredientInputBox, { target: { value: "" } });
    fireEvent.click(addButton);
    ingredientInputEmptyErrorText = screen.queryByTestId(
      "ingredient-input-empty-error-text"
    );
    expect(ingredientInputEmptyErrorText).toBeInTheDocument();
  });

  it("should render error when ingredient length is less than three characters long when ingredients don't exist", () => {
    renderApp(appStore);

    const addButton = screen.getByRole("button", { name: /add ingredient/i });
    expect(addButton).toBeInTheDocument();

    let ingredientLengthErrorMessage = screen.queryByTestId(
      "ingredient-length-error-text"
    );
    expect(ingredientLengthErrorMessage).not.toBeInTheDocument();

    const ingredientInputBox = screen.getByRole("textbox", {
      name: /enter ingredient/i,
    });
    expect(ingredientInputBox).toBeVisible();

    fireEvent.change(ingredientInputBox, { target: { value: "To" } });
    fireEvent.click(addButton);
    ingredientLengthErrorMessage = screen.queryByTestId(
      "ingredient-length-error-text"
    );
    expect(ingredientLengthErrorMessage).toBeInTheDocument();
  });

  it("should render error when ingredient length is less than three characters long when ingredients exist", () => {
    const initialStateMock = { ...initialState };
    initialStateMock.ingredients = ["oil", "salt"];
    appStore = createStoreTest(initialStateMock);

    renderApp(appStore);

    const addButton = screen.getByRole("button", { name: /add ingredient/i });
    expect(addButton).toBeInTheDocument();

    let ingredientLengthErrorMessage = screen.queryByTestId(
      "ingredient-length-error-text"
    );
    expect(ingredientLengthErrorMessage).not.toBeInTheDocument();

    const ingredientInputBox = screen.getByRole("textbox", {
      name: /enter ingredient/i,
    });

    fireEvent.change(ingredientInputBox, { target: { value: "To" } });
    fireEvent.click(addButton);
    ingredientLengthErrorMessage = screen.queryByTestId(
      "ingredient-length-error-text"
    );
    expect(ingredientLengthErrorMessage).toBeInTheDocument();
    expect(ingredientLengthErrorMessage.textContent).toContain(
      "Ingredient Length Not Valid (must be greater or equal to 3 letters)"
    );
  });

  it("should display an error message for non-alphabetic input", () => {
    renderApp(appStore);

    fireEvent.change(
      screen.getByRole("textbox", { name: /enter ingredient/i }),
      {
        target: { value: "123" },
      }
    );
    fireEvent.click(screen.getByRole("button", { name: /add ingredient/i }));

    expect(
      screen.getByText(/ingredient should only contain alphabets/i)
    ).toBeInTheDocument();
  });

  it("should not display an error message for alphabetic input", () => {
    renderApp(appStore);

    fireEvent.change(
      screen.getByRole("textbox", { name: /enter ingredient/i }),
      {
        target: { value: "xyz" },
      }
    );
    fireEvent.click(screen.getByRole("button", { name: /add ingredient/i }));

    expect(
      screen.queryByText(/ingredient should only contain alphabets/i)
    ).not.toBeInTheDocument();
  });
});
