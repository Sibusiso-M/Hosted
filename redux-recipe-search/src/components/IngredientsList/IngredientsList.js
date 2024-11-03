import { Box, Typography } from "@mui/material";
import IngredientItems from "./IngredientItems";

export default function IngredientsList({ ingredients }) {
  return (
    <Box
      data-testid="ingredients"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      maxHeight={200}
      overflow={"auto"}
    >
      <Typography data-testid="ingredients-list">Ingredients List:</Typography>
      <IngredientItems ingredients={ingredients} />
    </Box>
  );
}
