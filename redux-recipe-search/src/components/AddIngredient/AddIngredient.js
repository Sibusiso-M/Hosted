import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  Typography,
} from "@mui/material";

import { recipeSearchActions } from "../../redux/actions.js";
import IngredientsList from "../IngredientsList/IngredientsList.js";
import {
  validateAlphabeticInput,
  validateIngredientInput,
} from "../../utilities/helperFunction.js";
import AddIngredientFeedback from "./AddIngredientFeedback.js";

export default function AddIngredient() {
  const dispatch = useDispatch();

  const ingredient = useSelector((state) => state.ingredient);
  const ingredients = useSelector((state) => state.ingredients);
  const ingredientExists = useSelector((state) => state.ingredientExists);
  const ingredientLengthValid = useSelector(
    (state) => state.ingredientLengthValid
  );
  const ingredientInputEmpty = useSelector(
    (state) => state.ingredientInputEmpty
  );
  const alphabeticalIngredientError = useSelector(
    (state) => state.alphabeticalIngredientError
  );
  const searchKeywordEmpty = useSelector((state) => state.searchKeywordEmpty);
  const alphabeticalKeywordError = useSelector(
    (state) => state.alphabeticalKeywordError
  );

  const handleAddIngredient = () => {
    const ingredientInput = ingredient.trim();

    if (ingredientInput === "") {
      dispatch(recipeSearchActions.setEmptyIngredientInputError(true));
    } else if (
      ingredientInput.length >= 3 &&
      validateIngredientInput(ingredientInput, ingredients)
    ) {
      dispatch(recipeSearchActions.setIngredientExist(true));
    } else if (!validateAlphabeticInput(ingredientInput)) {
      dispatch(recipeSearchActions.setAlphabeticalIngredientError(true));
      return;
    } else {
      dispatch(recipeSearchActions.addIngredient(ingredientInput));
    }
  };

  const handleIngredientChange = (event) => {
    if (searchKeywordEmpty)
      dispatch(recipeSearchActions.setEmptyKeywordInputError(false));

    dispatch(recipeSearchActions.setEmptyRecipeResponseError(false));
    dispatch(recipeSearchActions.setIngredientInput(event.target.value));

    if (ingredientExists || ingredientLengthValid || !ingredientInputEmpty) {
      dispatch(recipeSearchActions.initializeIngredientErrors());
    }

    if (alphabeticalKeywordError)
      dispatch(recipeSearchActions.setAlphabeticalKeywordError(false));

    if (alphabeticalIngredientError)
      dispatch(recipeSearchActions.setAlphabeticalIngredientError(false));
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddIngredient();
    }
  };

  return (
    <>
      <FormControl
        sx={{ m: 1, width: "16.5rem" }}
        variant="outlined"
        data-testid="add-ingredient-component"
      >
        <InputLabel
          htmlFor="outlined-adornment-ingredient-recipe"
          sx={{ padding: 0 }}
        >
          Enter Ingredient
        </InputLabel>
        <OutlinedInput
          data-testid="add-ingredient-input-box"
          id="outlined-adornment-ingredient-recipe"
          name="inputIngredient"
          label="Enter Ingredient"
          value={ingredient}
          onChange={(event) => handleIngredientChange(event)}
          onKeyDown={(event) => handleEnterKeyDown(event)}
          endAdornment={
            <InputAdornment position="end">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  spellCheck: "true",
                }}
              >
                <IconButton
                  data-testid="add-ingredient-button"
                  edge="end"
                  onClick={() => handleAddIngredient()}
                  name="add-ingredient-input-button"
                  size="small"
                >
                  <Typography
                    variant="caption"
                    style={{ wordWrap: "break-word", fontSize: "0.7rem" }}
                  >
                    add ingredient
                  </Typography>
                  <AddCircleOutlineIcon fontSize="small" />
                </IconButton>
              </div>
            </InputAdornment>
          }
        />
        <AddIngredientFeedback />
      </FormControl>
      <IngredientsList ingredients={ingredients} />
    </>
  );
}
