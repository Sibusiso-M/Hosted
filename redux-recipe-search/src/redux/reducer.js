import { handleNewIngredient } from "../utilities/helperFunction.js";
import { types } from "./types.js";

export const initialState = {
  searchKeyword: "",
  ingredient: "",
  ingredientLengthValid: true,
  ingredients: [],
  ingredientExists: false,
  ingredientInputEmpty: false,
  searchKeywordEmpty: false,
  recipes: [],
  isLoading: false,
  recipeResponseEmpty: false,
  appIdExists: false,
  apiKeyExists: false,
  alphabeticalKeywordError: false,
  alphabeticalIngredientError: false,
  fetchResponseErrorMessage: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_INGREDIENT:
      const newIngredient = state.ingredient;
      return handleNewIngredient(state, newIngredient);

    case types.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient !== action.payload
        ),
        ingredientLengthValid: true,
        ingredientExists: false,
        ingredientInputEmpty: false,
      };

    case types.SET_SEARCH_KEYWORD_INPUT:
      return { ...state, searchKeyword: action.payload };

    case types.SET_INGREDIENT_INPUT:
      return { ...state, ingredient: action.payload };

    case types.CHECK_INGREDIENT_EXISTENCE:
      return {
        ...state,
        ingredientExists: action.payload,
        ingredient: "",
        ingredientLengthValid: true,
        ingredientInputEmpty: false,
      };

    case types.INITIALIZE_INGREDIENT_ERRORS:
      return {
        ...state,
        ingredientExists: false,
        ingredientLengthValid: true,
        ingredientInputEmpty: false,
      };

    case types.SET_INGREDIENT_INPUT_EMPTY_ERROR:
      return {
        ...state,
        ingredientInputEmpty: action.payload,
        ingredientExists: false,
        ingredientLengthValid: true,
      };

    case types.GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        fetchResponseErrorMessage: null,
      };

    case types.SET_IS_DATA_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case types.SET_KEYWORD_INPUT_EMPTY_ERROR:
      return {
        ...state,
        searchKeywordEmpty: action.payload,
      };

    case types.SET_RECIPE_RESPONSE_EMPTY_ERROR:
      return {
        ...state,
        recipeResponseEmpty: action.payload,
      };

    case types.SET_API_KEY_EXISTENCE:
      return {
        ...state,
        apiKeyExists: action.payload,
      };

    case types.SET_APP_ID_EXISTENCE:
      return {
        ...state,
        appIdExists: action.payload,
      };

    case types.SET_ALPHABET_KEYWORD_INPUT_ERROR:
      return {
        ...state,
        alphabeticalKeywordError: action.payload,
      };

    case types.SET_ALPHABET_INGREDIENT_INPUT_ERROR:
      return {
        ...state,
        alphabeticalIngredientError: action.payload,
      };

    case types.CLEAR_RECIPES:
      return {
        ...state,
        recipes: [],
      };

    default:
      return state;
  }
}
