import React from "react";
import GenericFeedback from "../FeedbackForUser/GenericFeedback";
const { useSelector } = require("react-redux");

const AddIngredientFeedback = () => {
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

  const addIngredientFeedbackConditions = [
    {
      condition: ingredientExists === true,
      text: "Ingredient Exists",
      dataTestID: "ingredient-error-text",
      type: "textbox",
    },
    {
      condition: ingredientLengthValid === false,
      text: "Ingredient Length Not Valid (must be greater or equal to 3 letters)",
      dataTestID: "ingredient-length-error-text",
      type: "textbox",
    },
    {
      condition: ingredientInputEmpty === true,
      text: "Please Enter An Ingredient",
      dataTestID: "ingredient-input-empty-error-text",
      type: "textbox",
    },
    {
      condition: alphabeticalIngredientError === true,
      text: "Ingredient should only contain alphabets",
      dataTestID: "ingredient-input-alphabetical-error-text",
      type: "textbox",
    },
  ];

  return (
    <GenericFeedback feedbackConditions={addIngredientFeedbackConditions} />
  );
};

export default AddIngredientFeedback;
