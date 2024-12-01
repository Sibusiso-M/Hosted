import React, { useEffect, useMemo } from "react";
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
import { validateAlphabeticInput } from "../../utilities/helperFunction.js";
import SearchKeywordFeedback from "./SearchKeywordFeedback.js";
import debounce from "lodash/debounce";

export default function SearchRecipeBar() {
  const dispatch = useDispatch();
  const searchKeyword = useSelector((state) => state.searchKeyword);
  const searchKeywordEmpty = useSelector((state) => state.searchKeywordEmpty);
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

  const debouncedSearch = useMemo(
    () =>
      debounce(async (keyword, ingredients) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const body = { searchKeyword: keyword, ingredients };

        dispatch(recipeSearchActions.setIsLoading(true));
        dispatch(fetchRecipeThunk(apiUrl, body));
      }, 1500),
    [dispatch]
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleSearchButton = () => {
    dispatch(recipeSearchActions.clearRecipes());
    if (searchKeyword.trim().length < 1) {
      dispatch(recipeSearchActions.setEmptyKeywordInputError(true));
      return;
    } else if (!validateAlphabeticInput(searchKeyword)) {
      dispatch(recipeSearchActions.setAlphabeticalKeywordError(true));
      return;
    }
    debouncedSearch(searchKeyword, ingredients);
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
