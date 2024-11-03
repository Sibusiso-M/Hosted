import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import { initialState } from "../../redux/reducer.js";
import IngredientsList from "./IngredientsList.js";
import createStoreTest from "../../utilities/testHelperFunctions.js";
import { recipeSearchActions } from "../../redux/actions.js";

describe("IngredientsList component", () => {
  let appStore;
  const ingredientsMock = ["Tomato", "Avo", "Onion"];

  const renderApp = (appStore) => {
    render(
      <Provider store={appStore}>
        <IngredientsList ingredients={ingredientsMock} />
      </Provider>
    );
  };

  beforeEach(() => {
    appStore = createStoreTest({ ...initialState });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render IngredientsList component without errors", () => {
    renderApp(appStore);
    expect(screen.getByText("Ingredients List:")).toBeInTheDocument();
  });
  it("should display all ingredients from ingredientsMock array", () => {
    renderApp(appStore);

    ingredientsMock.forEach((ingredient) => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });
  });
  it("should dispatch removeIngredient action when remove button is clicked", () => {
    appStore.dispatch = jest.fn();
    renderApp(appStore);

    const removeButton = screen.getAllByRole("button", {
      name: "remove",
    });

    fireEvent.click(removeButton[0]);
    expect(appStore.dispatch).toHaveBeenCalledWith(
      recipeSearchActions.removeIngredient("Tomato")
    );
  });
});
