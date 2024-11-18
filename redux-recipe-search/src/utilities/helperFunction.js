export const validateIngredientInput = (input, ingredientsList) => {
  const ingredientsListLowerCase = ingredientsList.map((ingredient) =>
    ingredient.toLowerCase()
  );
  const inputLowerCase = input.toLowerCase();

  for (let i = 0; i < ingredientsListLowerCase.length; i++) {
    const ingredient = ingredientsListLowerCase[i];
    const inputCopy = inputLowerCase.split("").slice();

    for (let j = 0; j < ingredient.length; j++) {
      const letter = ingredient[j];

      if (inputCopy[j] !== letter) {
        inputCopy.splice(j, 1);
      }
    }

    if (similaritiesFound(ingredient, inputCopy)) return true;
  }
  return false;
};

const similaritiesFound = (ingredient, inputCopy) => {
  if (
    ingredient.startsWith(inputCopy.join("")) ||
    (ingredient.length === inputCopy.length &&
      inputCopy.join("") === ingredient)
  ) {
    return true;
  }
};

export const handleNewIngredient = (state, newIngredient) => {
  if (newIngredient.length < 3) {
    return updateState(state, false, false, false, "");
  } else {
    const ingredientExists = state.ingredients.includes(newIngredient);

    if (ingredientExists) {
      return updateState(state, true, true, false, "");
    } else {
      const updatedIngredients = [...state.ingredients, newIngredient];
      return updateState(state, true, false, false, "", updatedIngredients);
    }
  }
};

const updateState = (
  state,
  ingredientLengthValid,
  ingredientExists,
  ingredientInputEmpty,
  ingredient,
  ingredients
) => {
  return {
    ...state,
    ingredientLengthValid,
    ingredientExists,
    ingredientInputEmpty,
    ingredient,
    ingredients: ingredients || state.ingredients,
  };
};

export const validateAlphabeticInput = (inputValue) => {
  const alphabeticRegex = /^[A-Za-z\s]+$/;
  return alphabeticRegex.test(inputValue);
};
