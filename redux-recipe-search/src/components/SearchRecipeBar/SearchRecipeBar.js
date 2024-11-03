import React, { useCallback, useEffect } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";

import { recipeSearchActions } from "../../redux/actions.js";
import { fetchRecipeThunk } from "../../redux/thunk/searchRecipeThunk.js";
import { configurationVariables } from "../../configurationVariables.js";
import {
  checkApiKeyExists,
  checkAppIdExists,
  validateAlphabeticInput,
} from "../../utilities/helperFunction.js";
import SearchKeywordFeedback from "./SearchKeywordFeedback.js";

const { apiKey, appId } = configurationVariables;

export default function SearchRecipeBar() {
  const searchKeyword = useSelector((state) => state.searchKeyword);
  const searchKeywordEmpty = useSelector((state) => state.searchKeywordEmpty);
  const apiKeyExists = useSelector((state) => state.apiKeyExists);
  const appIdExists = useSelector((state) => state.appIdExists);
  const ingredientExists = useSelector((state) => state.ingredientExists);
  const ingredients = useSelector((state) => state.ingredients);
  const ingredientLengthValid = useSelector(
    (state) => state.ingredientLengthValid
  );
  const ingredientInputEmpty = useSelector(
    (state) => state.ingredientInputEmpty
  );
  const alphabeticalKeywordError = useSelector(
    (state) => state.alphabeticalKeywordError
  );
  const alphabeticalIngredientError = useSelector(
    (state) => state.alphabeticalIngredientError
  );

  const dispatch = useDispatch();

  const updateConfigState = useCallback(() => {
    if (checkAppIdExists(appId)) {
      dispatch(recipeSearchActions.setAppIdExists(true));
    } else if (!checkAppIdExists(appId)) {
      dispatch(recipeSearchActions.setAppIdExists(false));
    }

    if (checkApiKeyExists(apiKey)) {
      dispatch(recipeSearchActions.setApiKeyExists(true));
    } else if (checkApiKeyExists(apiKey)) {
      dispatch(recipeSearchActions.setApiKeyExists(false));
    }
  }, [dispatch]);

  useEffect(() => {
    updateConfigState();
  }, [updateConfigState]);

  const handleKeywordChange = (event) => {
    if (ingredientExists || ingredientLengthValid || !ingredientInputEmpty) {
      dispatch(recipeSearchActions.initializeIngredientErrors());
    }

    if (searchKeywordEmpty)
      dispatch(recipeSearchActions.setEmptyKeywordInputError(false));

    dispatch(recipeSearchActions.setEmptyRecipeResponseError(false));
    dispatch(recipeSearchActions.setSearchKeywordInput(event.target.value));

    if (alphabeticalKeywordError)
      dispatch(recipeSearchActions.setAlphabeticalKeywordError(false));

    if (alphabeticalIngredientError)
      dispatch(recipeSearchActions.setAlphabeticalIngredientError(false));
  };

  const handleSearchButton = () => {
    dispatch(recipeSearchActions.clearRecipes());
    if (searchKeyword.trim().length < 1) {
      dispatch(recipeSearchActions.setEmptyKeywordInputError(true));
      return;
    } else if (!validateAlphabeticInput(searchKeyword)) {
      dispatch(recipeSearchActions.setAlphabeticalKeywordError(true));
      return;
    }
    if (appIdExists && apiKeyExists) {
      const url = `https://api.edamam.com/api/recipes/v2?q=${searchKeyword} ${ingredients.join(
        " "
      )}&app_id=${appId}&app_key=${apiKey}&type=public`;

      dispatch(recipeSearchActions.setIsLoading(true));
      dispatch(fetchRecipeThunk(url));
    }
  };

  const handleEnterKeyDown = async (event) => {
    if (event.key === "Enter") {
      handleSearchButton();
    }
  };

  return (
    <>
      <Typography data-testid="chosen-keyword">
        Your chosen keyword: {searchKeyword}
      </Typography>
      <FormControl sx={{ m: 1, width: "16.5rem" }} variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-search-recipe"
          sx={{ textAlign: "center" }}
        >
          Enter Keyword
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-search-recipe"
          name="inputKeyword"
          label="Enter Keyword"
          value={searchKeyword}
          onChange={(event) => handleKeywordChange(event)}
          onKeyDown={(event) => handleEnterKeyDown(event)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                edge="end"
                data-testid="search-keyword-button"
                onClick={() => handleSearchButton()}
                name="add-ingredient-input-button"
              >
                <Typography
                  variant="caption"
                  style={{ wordWrap: "break-word", fontSize: "0.7rem" }}
                >
                  search
                </Typography>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />

        <SearchKeywordFeedback />
      </FormControl>
    </>
  );
}
