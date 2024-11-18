import { types } from "./types.js";

export const recipeSearchActions = {
  setEmptyRecipeResponseError: (status) => ({
    type: types.SET_RECIPE_RESPONSE_EMPTY_ERROR,
    payload: status,
  }),

  setEmptyKeywordInputError: (status) => ({
    type: types.SET_KEYWORD_INPUT_EMPTY_ERROR,
    payload: status,
  }),

  setIsLoading: (status) => ({
    type: types.SET_IS_DATA_LOADING,
    payload: status,
  }),

  getRecipes: (recipes) => ({
    type: types.GET_RECIPES,
    payload: recipes,
  }),

  setEmptyIngredientInputError: (status) => ({
    type: types.SET_INGREDIENT_INPUT_EMPTY_ERROR,
    payload: status,
  }),

  initializeIngredientErrors: () => ({
    type: types.INITIALIZE_INGREDIENT_ERRORS,
  }),

  setIngredientExist: (ingredientExists) => ({
    type: types.CHECK_INGREDIENT_EXISTENCE,
    payload: ingredientExists,
  }),

  setSearchKeywordInput: (keywordText) => ({
    type: types.SET_SEARCH_KEYWORD_INPUT,
    payload: keywordText,
  }),

  setIngredientInput: (ingredientText) => ({
    type: types.SET_INGREDIENT_INPUT,
    payload: ingredientText,
  }),

  removeIngredient: (ingredientToRemove) => ({
    type: types.REMOVE_INGREDIENT,
    payload: ingredientToRemove,
  }),

  addIngredient: (ingredientToAdd) => ({
    type: types.ADD_INGREDIENT,
    payload: ingredientToAdd,
  }),

  setAlphabeticalKeywordError: (keyword) => ({
    type: types.SET_ALPHABET_KEYWORD_INPUT_ERROR,
    payload: keyword,
  }),

  setAlphabeticalIngredientError: (keyword) => ({
    type: types.SET_ALPHABET_INGREDIENT_INPUT_ERROR,
    payload: keyword,
  }),

  setFetchRequestError: (fetchErrorMessage) => ({
    type: types.SET_FETCH_REQUEST_ERROR,
    payload: fetchErrorMessage,
  }),

  clearRecipes: () => ({
    type: types.CLEAR_RECIPES,
  }),
};
