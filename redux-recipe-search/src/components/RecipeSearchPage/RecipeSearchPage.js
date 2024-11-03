import * as React from "react";

import PageHeader from "../PageHeader/PageHeader.js";
import SearchRecipeBar from "../SearchRecipeBar/SearchRecipeBar.js";
import AddIngredient from "../AddIngredient/AddIngredient.js";
import Recipe from "../Recipe/Recipe.js";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton.js";

export default function RecipeSearchPage() {
  return (
    <>
      <PageHeader />
      <SearchRecipeBar />
      <AddIngredient />
      <Recipe />
      <ScrollToTopButton />
    </>
  );
}
