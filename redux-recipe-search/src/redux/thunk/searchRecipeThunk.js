import { recipeSearchActions } from "../actions";

export const fetchRecipeThunk = (url) => async (dispatch) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const recipes = data.hits.map(({ recipe }) => {
      const { image, ingredientLines, label } = recipe;
      return { image, ingredientLines, label };
    });

    if (recipes.length === 0)
      dispatch(recipeSearchActions.setEmptyRecipeResponseError(true));

    dispatch(recipeSearchActions.getRecipes(recipes));
  } catch (error) {
    dispatch(
      recipeSearchActions.setFetchRequestError(`HTTP error: ${error.message}`)
    );
  } finally {
    dispatch(recipeSearchActions.setIsLoading(false));
  }
};
