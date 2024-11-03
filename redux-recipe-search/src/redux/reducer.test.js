import { recipeSearchActions } from "./actions.js";
import reducer, { initialState } from "./reducer.js";

describe("reducer", () => {
  let initialStateMock;

  beforeEach(() => {
    initialStateMock = { ...initialState };
  });

  it("should handle setIngredientInput", () => {
    const ingredient = "onion";
    const action = recipeSearchActions.setIngredientInput(ingredient);
    const newState = reducer(initialStateMock, action);
    expect(newState.ingredient).toBe(ingredient);
  });

  it("should handle addIngredient", () => {
    const ingredient = "onion";
    initialStateMock.ingredient = ingredient;
    const action = recipeSearchActions.addIngredient(
      initialStateMock.ingredient
    );
    const newState = reducer(initialStateMock, action);
    expect(newState.ingredients).toContain(ingredient);
  });

  it("should handle removeIngredient", () => {
    initialStateMock = {
      ...initialStateMock,
      ingredientLengthValid: false,
      ingredientExists: true,
      ingredientInputEmpty: true,
      ingredients: ["onion", "pepper", "pineapple", "guava"],
    };

    const ingredient1 = "onion";
    let action = recipeSearchActions.removeIngredient(ingredient1);
    let newState = reducer(initialStateMock, action);
    expect(newState.ingredients).not.toContain(ingredient1);

    const ingredient2 = "guava";
    action = recipeSearchActions.removeIngredient(ingredient2);
    newState = reducer(newState, action);
    expect(newState.ingredients).not.toContain(ingredient2);
    expect(newState.ingredients).toEqual(["pepper", "pineapple"]);
    expect(newState.ingredientLengthValid).toBeTruthy();
    expect(newState.ingredientExists).toBeFalsy();
    expect(newState.ingredientInputEmpty).toBeFalsy();
  });

  it("should handle setSearchKeywordInput", () => {
    const ingredient1 = "garlic";
    const action = recipeSearchActions.setSearchKeywordInput(ingredient1);
    const newState = reducer(initialStateMock, action);
    expect(newState.searchKeyword).toBe(ingredient1);
  });

  it("should handle setIngredientExist", () => {
    initialStateMock = {
      ...initialStateMock,
      ingredientExists: false,
      ingredient: "garlic",
      ingredientLengthValid: false,
      ingredientInputEmpty: true,
    };

    const action = recipeSearchActions.setIngredientExist(true);
    const newState = reducer(initialStateMock, action);
    expect(newState.ingredientExists).toBeTruthy();
    expect(newState.ingredient).toBe("");
    expect(newState.ingredientLengthValid).toBeTruthy();
    expect(newState.ingredientInputEmpty).toBeFalsy();
  });

  it("should handle initializeIngredientErrors", () => {
    initialStateMock = {
      ...initialStateMock,
      ingredientExists: true,
      ingredientLengthValid: false,
      ingredientInputEmpty: true,
    };

    const action = recipeSearchActions.initializeIngredientErrors();
    const newState = reducer(initialStateMock, action);
    expect(newState.ingredientExists).toBeFalsy();
    expect(newState.ingredientLengthValid).toBeTruthy();
    expect(newState.ingredientInputEmpty).toBeFalsy();
  });

  it("should handle setEmptyIngredientInputError", () => {
    initialStateMock = {
      ...initialStateMock,
      ingredientInputEmpty: false,
      ingredientExists: true,
      ingredientLengthValid: false,
    };

    const action = recipeSearchActions.setEmptyIngredientInputError(true);
    const newState = reducer(initialStateMock, action);
    expect(newState.ingredientInputEmpty).toBeTruthy();
    expect(newState.ingredientExists).toBeFalsy();
    expect(newState.ingredientLengthValid).toBeTruthy();
  });

  it("should handle getRecipes", () => {
    const mockRecipeResponse = [
      {
        image:
          "https://edamam-product-images.s3.amazonaws.com/web…1770b0c9ed35cf3ee6b8d4aa6432a97ef9742ec785d0093cc",
        ingredientLines: [
          "ingredient1 and measurement",
          "ingredient2 and measurement",
          "ingredient3 and measurement",
        ],
        label: "Roast sirloin of beef",
      },
    ];

    const action = recipeSearchActions.getRecipes(mockRecipeResponse);
    const newState = reducer(initialStateMock, action);
    expect(newState.recipes).toBe(mockRecipeResponse);
  });

  it("should handle setEmptyKeywordInputError", () => {
    initialStateMock = {
      ...initialStateMock,
      searchKeywordEmpty: false,
    };
    let action = recipeSearchActions.setEmptyKeywordInputError(true);
    let newState = reducer(initialStateMock, action);
    expect(newState.searchKeywordEmpty).toBeTruthy();

    action = recipeSearchActions.setEmptyKeywordInputError(false);
    newState = reducer(newState, action);
    expect(newState.searchKeywordEmpty).toBeFalsy();
  });

  it("should handle setEmptyRecipeResponseError", () => {
    initialStateMock = {
      ...initialStateMock,
      recipeResponseEmpty: false,
    };
    let action = recipeSearchActions.setEmptyRecipeResponseError(true);
    let newState = reducer(initialStateMock, action);
    expect(newState.recipeResponseEmpty).toBeTruthy();

    action = recipeSearchActions.setEmptyRecipeResponseError(false);
    newState = reducer(newState, action);
    expect(newState.recipeResponseEmpty).toBeFalsy();
  });
  it("should handle setAlphabeticalKeywordError", () => {
    initialStateMock = {
      ...initialStateMock,
      alphabeticalKeywordError: false,
    };
    let action = recipeSearchActions.setAlphabeticalKeywordError(true);
    let newState = reducer(initialStateMock, action);
    expect(newState.alphabeticalKeywordError).toBeTruthy();

    action = recipeSearchActions.setAlphabeticalKeywordError(false);
    newState = reducer(newState, action);
    expect(newState.alphabeticalKeywordError).toBeFalsy();
  });

  it("should handle setAlphabeticalIngredientError", () => {
    initialStateMock = {
      ...initialStateMock,
      alphabeticalIngredientError: false,
    };
    let action = recipeSearchActions.setAlphabeticalIngredientError(true);
    let newState = reducer(initialStateMock, action);
    expect(newState.alphabeticalIngredientError).toBeTruthy();

    action = recipeSearchActions.setAlphabeticalIngredientError(false);
    newState = reducer(newState, action);
    expect(newState.alphabeticalIngredientError).toBeFalsy();
  });

  it("should handle setApiKeyExists", () => {
    initialStateMock = {
      ...initialStateMock,
      apiKeyExists: false,
    };
    let action = recipeSearchActions.setApiKeyExists(true);
    let newState = reducer(initialStateMock, action);
    expect(newState.apiKeyExists).toBeTruthy();

    action = recipeSearchActions.setApiKeyExists(false);
    newState = reducer(newState, action);
    expect(newState.apiKeyExists).toBeFalsy();
  });

  it("should handle setAppIdExists", () => {
    initialStateMock = {
      ...initialStateMock,
      appIdExists: false,
    };
    let action = recipeSearchActions.setAppIdExists(true);
    let newState = reducer(initialStateMock, action);
    expect(newState.appIdExists).toBeTruthy();

    action = recipeSearchActions.setAppIdExists(false);
    newState = reducer(newState, action);
    expect(newState.appIdExists).toBeFalsy();
  });
});
