import { recipeSearchActions } from "../actions";

export const fetchRecipeThunk = (url, body) => async (dispatch) => {
  try {
    const response = await fetch(`${url}/recipes`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://hosted-production.up.railway.app"
      },
      body: JSON.stringify(body),
    });
    const recipes = await response.json();

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
